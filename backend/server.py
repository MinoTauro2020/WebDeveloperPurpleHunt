from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactCreate(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    empresa: str = Field(..., min_length=1, max_length=200)
    mensaje: str = Field(..., min_length=10, max_length=2000)

    @validator('nombre', 'empresa', 'mensaje')
    def strip_whitespace(cls, v):
        return v.strip()

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nombre: str
    email: str
    empresa: str
    mensaje: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Contact endpoints
@api_router.post("/contact", response_model=ContactResponse)
async def create_contact(input: ContactCreate):
    """
    Create a new contact message from the website form
    """
    try:
        contact_dict = input.model_dump()
        contact_obj = Contact(**contact_dict)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = contact_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Insert into MongoDB
        result = await db.contacts.insert_one(doc)
        
        if result.inserted_id:
            logger.info(f"Contact message created: {contact_obj.id} from {contact_obj.email}")
            return ContactResponse(
                success=True,
                message="Mensaje enviado correctamente",
                id=contact_obj.id
            )
        else:
            raise HTTPException(status_code=500, detail="Error al guardar el mensaje")
    except Exception as e:
        logger.error(f"Error creating contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al enviar el mensaje")

@api_router.get("/contact", response_model=List[Contact])
async def get_contacts():
    """
    Get all contact messages (for admin purposes)
    """
    try:
        # Exclude MongoDB's _id field from the query results
        contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for contact in contacts:
            if isinstance(contact['created_at'], str):
                contact['created_at'] = datetime.fromisoformat(contact['created_at'])
        
        return contacts
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al obtener los contactos")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


# Email Configuration Function
def send_email_notification(contact_data: dict) -> bool:
    """
    Envía un email de notificación cuando se recibe un mensaje del formulario de contacto.
    
    CONFIGURACIÓN REQUERIDA:
    ======================
    Debes crear un archivo .env en la carpeta /backend con estas variables:
    
    GMAIL_USER=ahfseguridad@gmail.com
    GMAIL_APP_PASSWORD=tu_contraseña_de_aplicacion_aqui
    
    Cómo obtener GMAIL_APP_PASSWORD:
    1. Ve a https://myaccount.google.com/security
    2. Activa "Verificación en dos pasos"
    3. Busca "Contraseñas de aplicaciones"
    4. Genera una nueva contraseña para "Correo"
    5. Copia la contraseña de 16 caracteres (sin espacios)
    6. Pégala en el archivo .env como GMAIL_APP_PASSWORD
    """
    try:
        # Leer configuración del .env
        gmail_user = os.environ.get('GMAIL_USER')
        gmail_password = os.environ.get('GMAIL_APP_PASSWORD')
        
        # Validar que las credenciales estén configuradas
        if not gmail_user or not gmail_password:
            logger.error("Email credentials not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env file")
            return False
        
        # Crear el mensaje de email
        msg = MIMEMultipart('alternative')
        msg['From'] = gmail_user
        msg['To'] = gmail_user  # Enviamos el mensaje a nosotros mismos
        msg['Subject'] = f"🔒 Nuevo mensaje de contacto - PurpleHunt.es"
        
        # Crear el cuerpo del email en HTML
        html_body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #000000; color: #ffffff; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border: 2px solid #A020F0; padding: 30px;">
                    <h2 style="color: #A020F0; border-bottom: 2px solid #A020F0; padding-bottom: 10px;">
                        🔒 Nuevo Mensaje de Contacto - PurpleHunt.es
                    </h2>
                    
                    <div style="margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong style="color: #A020F0;">Nombre:</strong> {contact_data['nombre']}</p>
                        <p style="margin: 10px 0;"><strong style="color: #A020F0;">Email:</strong> {contact_data['email']}</p>
                        <p style="margin: 10px 0;"><strong style="color: #A020F0;">Empresa:</strong> {contact_data['empresa']}</p>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 15px; background-color: #0a0a0a; border-left: 4px solid #A020F0;">
                        <p style="margin: 0;"><strong style="color: #A020F0;">Mensaje:</strong></p>
                        <p style="margin: 10px 0; line-height: 1.6;">{contact_data['mensaje']}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                        <p style="color: #888; font-size: 12px; margin: 0;">
                            Este email fue enviado automáticamente desde el formulario de contacto de PurpleHunt.es
                        </p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Adjuntar el HTML al mensaje
        html_part = MIMEText(html_body, 'html')
        msg.attach(html_part)
        
        # Conectar al servidor SMTP de Gmail y enviar
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(gmail_user, gmail_password)
            server.send_message(msg)
        
        logger.info(f"Email sent successfully to {gmail_user} from {contact_data['email']}")
        return True
        
    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP Authentication failed. Check your GMAIL_USER and GMAIL_APP_PASSWORD in .env file")
        return False
    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        return False