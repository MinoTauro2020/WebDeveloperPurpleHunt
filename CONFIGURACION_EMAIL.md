# 📧 Configuración de Envío de Emails - PurpleHunt.es

## ¿Cómo funciona el formulario ahora?

Cuando alguien rellena el formulario de contacto en tu web:
1. ✅ Se validan los datos (nombre, email, empresa, mensaje)
2. ✅ Se envía un **email automático a ahfseguridad@gmail.com**
3. ✅ El usuario ve un mensaje de éxito

**NO se guarda nada en base de datos**, solo se envía el email directamente.

---

## 🔐 Configuración Paso a Paso

### **PASO 1: Obtener Contraseña de Aplicación de Google**

1. Ve a tu cuenta de Google: **https://myaccount.google.com/security**

2. **Activa la Verificación en Dos Pasos:**
   - Busca la sección "Verificación en dos pasos"
   - Click en "Verificación en dos pasos" 
   - Sigue los pasos (te pedirá verificar con tu teléfono)
   - Completa la activación

3. **Genera la Contraseña de Aplicación:**
   - Vuelve a: **https://myaccount.google.com/security**
   - Busca "Contraseñas de aplicaciones" (aparece después del paso anterior)
   - Click en "Contraseñas de aplicaciones"
   - Es posible que te pida tu contraseña de nuevo
   - En "Selecciona la app": elige **"Correo"**
   - En "Selecciona el dispositivo": elige **"Otro (nombre personalizado)"**
   - Escribe: **"PurpleHunt Contacto"**
   - Click en **"Generar"**

4. **¡IMPORTANTE!** Google te mostrará una contraseña de 16 caracteres:
   ```
   Ejemplo: abcd efgh ijkl mnop
   ```
   - **COPIA esta contraseña** (sin los espacios)
   - No podrás verla de nuevo

---

### **PASO 2: Configurar el Backend**

1. **Copia el archivo de ejemplo:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edita el archivo `.env`:**
   ```bash
   nano .env
   # o usa tu editor favorito
   ```

3. **Pega tus credenciales:**
   ```env
   GMAIL_USER=ahfseguridad@gmail.com
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```
   ⚠️ **Reemplaza `abcdefghijklmnop` con tu contraseña de aplicación real**

4. **Guarda el archivo** (Ctrl+O en nano, luego Ctrl+X)

---

### **PASO 3: Reiniciar el Backend**

```bash
# Si usas supervisor
sudo supervisorctl restart backend

# Si usas PM2
pm2 restart backend

# Si usas directamente
# Detén el proceso actual (Ctrl+C) y vuelve a ejecutar:
uvicorn server:app --host 0.0.0.0 --port 8001
```

---

## ✅ Verificar que Funciona

### **Probar el Formulario:**
1. Ve a tu web
2. Rellena el formulario de contacto
3. Envía el mensaje
4. **Revisa tu email ahfseguridad@gmail.com**

Deberías recibir un email como este:

```
🔒 Nuevo Mensaje de Contacto - PurpleHunt.es

Nombre: Juan Pérez
Email: juan@ejemplo.com  
Empresa: TechCorp S.L.

Mensaje:
Hola, me interesa contratar sus servicios...
```

---

## 🐛 Solución de Problemas

### **Error: "Email credentials not configured"**
- ❌ No configuraste el archivo `.env`
- ✅ Solución: Completa el PASO 2

### **Error: "SMTP Authentication failed"**
- ❌ La contraseña de aplicación es incorrecta
- ✅ Solución: Genera una nueva contraseña de aplicación

### **No recibo emails**
1. Verifica que configuraste GMAIL_USER y GMAIL_APP_PASSWORD correctamente
2. Revisa la carpeta de SPAM en tu Gmail
3. Mira los logs del backend: `tail -f /var/log/supervisor/backend.err.log`

### **Error: "Login blocked"**
- ❌ No activaste la verificación en dos pasos
- ✅ Solución: Completa el PASO 1 correctamente

---

## 🔒 Seguridad

⚠️ **IMPORTANTE:**
- **NUNCA** subas el archivo `.env` a GitHub o repositorios públicos
- El `.env` ya está en `.gitignore`
- La contraseña de aplicación es diferente a tu contraseña de Gmail normal
- Si comprometes la contraseña, puedes revocarla en Google y generar una nueva

---

## 📝 Notas Adicionales

- **Límite de envío:** Gmail permite 500 emails/día con este método
- **Tiempo de envío:** El email llega en segundos
- **Formato:** El email tiene diseño HTML con el tema purple/black de tu web
- **Base de datos:** Ya no se usa MongoDB para guardar contactos

---

## 📞 Soporte

Si tienes problemas con la configuración, revisa:
1. Los logs del backend
2. Que el archivo `.env` esté en la carpeta `/backend`
3. Que reiniciaste el backend después de configurar

¡Listo! Tu formulario enviará emails directamente a tu Gmail.
