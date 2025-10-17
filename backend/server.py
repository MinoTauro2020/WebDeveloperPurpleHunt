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


# Configure logging (move before using logger)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Email Configuration Function (MUST be before endpoints)
def send_email_notification(contact_data: dict) -> bool:
    """
    Envía un email de notificación cuando se recibe un mensaje del formulario de contacto.
    
    CONFIGURACIÓN REQUERIDA:
    ======================
    Variables de entorno en .env:
    GMAIL_USER=ahfseguridad@gmail.com
    GMAIL_APP_PASSWORD=tu_contraseña_de_aplicacion_16_caracteres
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
        msg['Subject'] = "🔒 Nuevo mensaje de contacto - PurpleHunt.es"
        
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
    Envía el mensaje de contacto por email a ahfseguridad@gmail.com
    
    IMPORTANTE: Antes de usar en producción, configura las credenciales en .env:
    - GMAIL_USER=ahfseguridad@gmail.com
    - GMAIL_APP_PASSWORD=tu_contraseña_de_aplicacion
    """
    try:
        contact_dict = input.model_dump()
        
        # Enviar email
        email_sent = send_email_notification(contact_dict)
        
        if email_sent:
            logger.info(f"Contact message received and email sent from {contact_dict['email']}")
            return ContactResponse(
                success=True,
                message="Mensaje enviado correctamente. Te responderemos pronto.",
                id=str(uuid.uuid4())
            )
        else:
            # Si falla el envío de email, informar al usuario
            logger.error(f"Failed to send email for contact from {contact_dict['email']}")
            raise HTTPException(
                status_code=500, 
                detail="Error al enviar el mensaje. Por favor, intenta de nuevo o contacta directamente a ahfseguridad@gmail.com"
            )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al procesar el mensaje")

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
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Serve React Frontend (después de las rutas API)
try:
    from fastapi.staticfiles import StaticFiles
    from fastapi.responses import FileResponse
    import os
    
    # Detectar si estamos en desarrollo (Emergent) o producción (VPS)
    # En Emergent: /app/frontend/build
    # En VPS: /home/purplehunt.es/public_html/WebDeveloperPurpleHunt/frontend/build
    
    FRONTEND_BUILD_PATH = os.environ.get('FRONTEND_BUILD_PATH', '/app/frontend/build')
    
    if os.path.exists(FRONTEND_BUILD_PATH):
        # Servir archivos estáticos de React
        static_path = os.path.join(FRONTEND_BUILD_PATH, 'static')
        if os.path.exists(static_path):
            app.mount("/static", StaticFiles(directory=static_path), name="static")
        
        app.mount("/assets", StaticFiles(directory=FRONTEND_BUILD_PATH), name="assets")
        logger.info(f"Serving frontend from: {FRONTEND_BUILD_PATH}")
    else:
        logger.warning(f"Frontend build not found at: {FRONTEND_BUILD_PATH}")
        
except Exception as e:
    logger.error(f"Error mounting frontend: {e}")


@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    """
    Serve React app for all routes (catch-all)
    This must be registered AFTER all API routes
    """
    try:
        FRONTEND_BUILD_PATH = os.environ.get('FRONTEND_BUILD_PATH', '/app/frontend/build')
        index_path = os.path.join(FRONTEND_BUILD_PATH, 'index.html')
        
        if os.path.exists(index_path):
            return FileResponse(index_path)
        else:
            return {"message": "Frontend not built yet", "path": FRONTEND_BUILD_PATH}
    except Exception as e:
        logger.error(f"Error serving React app: {e}")
        return {"message": "Error loading frontend", "error": str(e)}


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get('PORT', 8001))
    logger.info(f"Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)