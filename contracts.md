# PurpleHunt.es - Contrato API y Plan de Integración

## 1. Datos Mock Actuales (frontend/src/mock.js)

### Services Data
- 3 packs de servicios con features, títulos, subtítulos y cobertura APT
- Mock completamente funcional, no requiere cambios

### Testimonials Data  
- 3 testimonios con autor, empresa, rol y texto
- Mock completamente funcional, no requiere cambios

### Contact Form Submit
- Función mock que simula envío de formulario
- **A reemplazar con API real**

## 2. API Endpoints a Implementar

### POST /api/contact
**Propósito:** Recibir y almacenar mensajes de contacto del formulario

**Request Body:**
```json
{
  "nombre": "string",
  "email": "string", 
  "empresa": "string",
  "mensaje": "string"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente",
  "id": "contact_id"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Error al enviar el mensaje"
}
```

### GET /api/contact
**Propósito:** Obtener todos los mensajes de contacto (para admin)

**Response:**
```json
[
  {
    "id": "string",
    "nombre": "string",
    "email": "string",
    "empresa": "string", 
    "mensaje": "string",
    "created_at": "datetime"
  }
]
```

## 3. MongoDB Schema

### Collection: contacts
```javascript
{
  _id: ObjectId,
  nombre: String,
  email: String,
  empresa: String,
  mensaje: String,
  created_at: Date
}
```

## 4. Integración Frontend-Backend

### Archivo a Modificar: frontend/src/components/TestimonialsContactFooter.jsx

**Cambios necesarios:**
1. Reemplazar importación de `contactFormSubmit` de mock.js
2. Usar axios para llamar a `/api/contact`
3. Mantener misma estructura de formData
4. Mantener manejo de estados (isSubmitting, toast)

**Código actual (mock):**
```javascript
import { contactFormSubmit } from '../mock';
const result = await contactFormSubmit(formData);
```

**Código nuevo (API real):**
```javascript
import axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const result = await axios.post(`${BACKEND_URL}/api/contact`, formData);
```

## 5. Validaciones

### Backend (FastAPI):
- Email válido (usar Pydantic EmailStr)
- Todos los campos requeridos
- Longitud mínima de mensaje: 10 caracteres
- Longitud máxima de mensaje: 2000 caracteres

### Frontend:
- Ya implementadas validaciones HTML5 (required)
- Validación adicional opcional: formato de email

## 6. Testing Checklist

### Backend Testing:
- [ ] POST /api/contact guarda correctamente en MongoDB
- [ ] Validaciones de campos funcionan
- [ ] GET /api/contact retorna todos los contactos
- [ ] Manejo de errores correcto

### Frontend Testing:
- [ ] Formulario envía datos correctamente
- [ ] Toast de éxito se muestra
- [ ] Formulario se limpia después de envío exitoso
- [ ] Toast de error se muestra en caso de fallo
- [ ] Estado de loading (isSubmitting) funciona

## 7. Notas de Implementación

- Los datos de services y testimonials permanecen en mock.js (no requieren backend)
- Solo el formulario de contacto necesita backend
- Mantener estructura de respuesta consistente con el mock actual
- No modificar componentes Header, HeroSection, ServicesSection
- Solo modificar ContactSection en TestimonialsContactFooter.jsx
