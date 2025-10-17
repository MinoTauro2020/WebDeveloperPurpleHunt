# 🚀 GUÍA COMPLETA DE DESPLIEGUE - PurpleHunt.es en VPS con CyberPanel

## 📋 RESUMEN DEL PROYECTO

**Arquitectura:**
- ✅ Backend FastAPI sirve el frontend React (puerto 8002)
- ✅ Formulario envía emails a ahfseguridad@gmail.com
- ✅ NO usa MongoDB en producción
- ✅ Igual configuración que convertidordivisas.com

**Puertos:**
- convertidordivisas.com → Puerto 8001
- purplehunt.es → Puerto 8002

---

## 📦 PREREQUISITOS EN EL VPS

```bash
# 1. Actualizar sistema
sudo apt update && sudo apt upgrade -y

# 2. Instalar dependencias si no las tienes
sudo apt install python3 python3-pip python3-venv nodejs npm -y

# 3. Instalar PM2 globalmente
sudo npm install -g pm2

# 4. Verificar versiones
python3 --version  # Debe ser 3.8+
node --version     # Debe ser 16+
npm --version
pm2 --version
```

---

## 📁 PASO 1: SUBIR ARCHIVOS AL VPS

### Opción A: Desde GitHub (Recomendado)

```bash
# 1. Ir al directorio del dominio
cd /home/purplehunt.es/public_html/

# 2. Clonar repositorio
git clone https://github.com/tu-usuario/WebDeveloperPurpleHunt.git
cd WebDeveloperPurpleHunt

# Si ya está clonado, actualizar:
cd /home/purplehunt.es/public_html/WebDeveloperPurpleHunt
git pull origin main
```

### Opción B: Desde Local con SFTP/SCP

```bash
# En tu máquina local:
scp -r WebDeveloperPurpleHunt/ root@tu-servidor:/home/purplehunt.es/public_html/

# O usa FileZilla/WinSCP para subir la carpeta
```

---

## ⚙️ PASO 2: CONFIGURAR EL BACKEND

```bash
# 1. Ir a la carpeta del backend
cd /home/purplehunt.es/public_html/WebDeveloperPurpleHunt/backend

# 2. Crear entorno virtual
python3 -m venv venv

# 3. Activar entorno virtual
source venv/bin/activate

# 4. Instalar dependencias
pip install --upgrade pip
pip install -r requirements.txt

# 5. Configurar el archivo .env
nano .env
```

**Contenido del .env:**
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="purplehunt"
CORS_ORIGINS="*"

# CONFIGURACIÓN DE EMAIL - ¡IMPORTANTE!
GMAIL_USER=ahfseguridad@gmail.com
GMAIL_APP_PASSWORD=aqui_tu_contraseña_de_aplicacion_real

# CONFIGURACIÓN DEL SERVIDOR
PORT=8002
FRONTEND_BUILD_PATH=/home/purplehunt.es/public_html/WebDeveloperPurpleHunt/frontend/build
```

**⚠️ CRÍTICO:** Reemplaza `aqui_tu_contraseña_de_aplicacion_real` con tu contraseña real de Google.

Guarda (Ctrl+O, Enter, Ctrl+X)

```bash
# 6. Verificar que las dependencias están instaladas
pip list | grep fastapi
pip list | grep uvicorn

# 7. Desactivar entorno virtual (por ahora)
deactivate
```

---

## 🎨 PASO 3: COMPILAR EL FRONTEND

```bash
# 1. Ir a la carpeta del frontend
cd /home/purplehunt.es/public_html/WebDeveloperPurpleHunt/frontend

# 2. Instalar dependencias
npm install

# Si da error, prueba con:
npm install --legacy-peer-deps

# 3. Crear archivo .env del frontend
nano .env
```

**Contenido del .env del frontend:**
```env
REACT_APP_BACKEND_URL=https://purplehunt.es
```

Guarda (Ctrl+O, Enter, Ctrl+X)

```bash
# 4. Compilar para producción
npm run build

# Esto creará la carpeta: /frontend/build

# 5. Verificar que el build se creó
ls -la build/
# Debe mostrar: index.html, static/, manifest.json, etc.

# 6. Verificar tamaño
du -sh build/
# Debe ser aprox 1-5 MB
```

---

## 🔥 PASO 4: INICIAR EL BACKEND CON PM2

```bash
# 1. Ir al backend
cd /home/purplehunt.es/public_html/WebDeveloperPurpleHunt/backend

# 2. Iniciar con PM2
pm2 start server.py \
  --name purplehunt-backend \
  --interpreter /home/purplehunt.es/public_html/WebDeveloperPurpleHunt/backend/venv/bin/python3

# 3. Guardar configuración de PM2
pm2 save

# 4. Configurar PM2 para iniciar automáticamente al reiniciar servidor
pm2 startup
# Ejecuta el comando que te muestra PM2

# 5. Verificar que está corriendo
pm2 status

# Debes ver:
# ┌────┬─────────────────────┬─────────┬─────────┬──────────┐
# │ id │ name                │ status  │ restart │ uptime   │
# ├────┼─────────────────────┼─────────┼─────────┼──────────┤
# │ 0  │ purplehunt-backend  │ online  │ 0       │ 2s       │
# └────┴─────────────────────┴─────────┴─────────┴──────────┘

# 6. Ver logs
pm2 logs purplehunt-backend --lines 50

# Debe mostrar:
# INFO:     Uvicorn running on http://0.0.0.0:8002
# INFO:     Serving frontend from: /home/purplehunt.es/...

# 7. Probar localmente
curl http://localhost:8002/api/
# Debe retornar: {"message":"Hello World"}

curl -I http://localhost:8002/
# Debe retornar: 200 OK (sirviendo el frontend)
```

---

## 🌐 PASO 5: CONFIGURAR CYBERPANEL

### A. Crear/Verificar el Sitio Web

1. Accede a CyberPanel: `https://tu-servidor:8090`
2. **Websites** → **List Websites**
3. Verifica que **purplehunt.es** existe
4. Si no existe: **Create Website** → Ingresar `purplehunt.es`

### B. Configurar Rewrite Rules

1. **Websites** → **purplehunt.es** → **Rewrite Rules**
2. **Borra todo** lo que haya y pega esto:

```apache
# Redirigir HTTP a HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Proxy todo al backend en puerto 8002 (backend sirve frontend + API)
RewriteRule ^(.*)$ http://localhost:8002/$1 [P,L]
```

3. Click en **"Save Rewrite Rules"**

### C. Configurar SSL (HTTPS)

1. **SSL** → **Manage SSL** → Selecciona **purplehunt.es**
2. Click en **"Issue SSL"** (Let's Encrypt)
3. Espera 30-60 segundos
4. Verifica: **SSL Status: Active ✅**

---

## 🔧 PASO 6: CONFIGURAR PERMISOS

```bash
# 1. Ir al directorio del dominio
cd /home/purplehunt.es/public_html/

# 2. Cambiar propietario
sudo chown -R purplehunt:purplehunt WebDeveloperPurpleHunt/

# 3. Establecer permisos correctos
sudo chmod -R 755 WebDeveloperPurpleHunt/

# 4. Verificar
ls -la WebDeveloperPurpleHunt/
```

---

## ✅ PASO 7: VERIFICACIÓN FINAL

### 1. Verificar Backend

```bash
# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs purplehunt-backend

# Probar API localmente
curl http://localhost:8002/api/
# Debe retornar: {"message":"Hello World"}

# Probar frontend localmente
curl -I http://localhost:8002/
# Debe retornar: HTTP/1.1 200 OK
```

### 2. Verificar en Navegador

1. **Abrir:** `https://purplehunt.es`
2. **Verificar:**
   - ✅ La página carga correctamente
   - ✅ Header con navegación funciona
   - ✅ Secciones cargan: Hero, Servicios, Metodología, etc.
   - ✅ Navegación smooth scroll funciona

### 3. Probar Formulario de Contacto

1. **Scroll** hasta la sección "Hablemos de tu Seguridad"
2. **Rellenar formulario:**
   - Nombre: Test
   - Email: test@test.com
   - Empresa: Test S.L.
   - Mensaje: Este es un mensaje de prueba
3. **Click** en "Enviar Mensaje"
4. **Verificar:**
   - ✅ Mensaje de éxito aparece
   - ✅ Formulario se limpia
5. **Revisar email:** `ahfseguridad@gmail.com`
   - ✅ Debes recibir un email con el mensaje

### 4. Verificar Logs

```bash
# Si el formulario no funciona, ver logs:
pm2 logs purplehunt-backend --lines 100

# Buscar errores como:
# - "SMTP Authentication failed" → Contraseña incorrecta
# - "Email credentials not configured" → No configuraste .env
# - "Connection refused" → Backend no está corriendo
```

---

## 📊 COMANDOS ÚTILES PARA GESTIÓN

### Gestión de PM2

```bash
# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs purplehunt-backend

# Ver logs históricos
pm2 logs purplehunt-backend --lines 200

# Reiniciar backend
pm2 restart purplehunt-backend

# Detener backend
pm2 stop purplehunt-backend

# Iniciar backend
pm2 start purplehunt-backend

# Ver información detallada
pm2 show purplehunt-backend

# Monitorear CPU y memoria
pm2 monit
```

### Actualizar la Aplicación

```bash
# 1. Actualizar código desde GitHub
cd /home/purplehunt.es/public_html/WebDeveloperPurpleHunt
git pull origin main

# 2. Actualizar dependencias backend (si cambió requirements.txt)
cd backend
source venv/bin/activate
pip install -r requirements.txt
deactivate

# 3. Recompilar frontend (si cambió)
cd ../frontend
npm install
npm run build

# 4. Reiniciar backend
pm2 restart purplehunt-backend

# 5. Verificar
pm2 logs purplehunt-backend
```

### Verificar Logs del Sistema

```bash
# Logs de CyberPanel
tail -f /usr/local/lsws/logs/error.log

# Logs de OpenLiteSpeed
tail -f /usr/local/lsws/logs/stderr.log
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ Error: "Frontend not built yet"

**Causa:** El build del frontend no existe o la ruta es incorrecta

**Solución:**
```bash
cd /home/purplehunt.es/public_html/WebDeveloperPurpleHunt/frontend
npm run build

# Verificar que .env del backend tiene la ruta correcta:
cd ../backend
nano .env
# Debe tener: FRONTEND_BUILD_PATH=/home/purplehunt.es/public_html/WebDeveloperPurpleHunt/frontend/build

pm2 restart purplehunt-backend
```

---

### ❌ Error: "Email credentials not configured"

**Causa:** No configuraste GMAIL_USER y GMAIL_APP_PASSWORD en .env

**Solución:**
```bash
cd /home/purplehunt.es/public_html/WebDeveloperPurpleHunt/backend
nano .env

# Descomenta y configura:
# GMAIL_USER=ahfseguridad@gmail.com
# GMAIL_APP_PASSWORD=tu_contraseña_real

pm2 restart purplehunt-backend
pm2 logs purplehunt-backend
```

---

### ❌ Error: "SMTP Authentication failed"

**Causa:** La contraseña de aplicación de Google es incorrecta

**Solución:**
1. Ve a https://myaccount.google.com/security
2. "Contraseñas de aplicaciones"
3. Genera una nueva contraseña
4. Copia la contraseña (16 caracteres sin espacios)
5. Actualiza .env:
```bash
cd /home/purplehunt.es/public_html/WebDeveloperPurpleHunt/backend
nano .env
# GMAIL_APP_PASSWORD=nueva_contraseña_aqui
pm2 restart purplehunt-backend
```

---

### ❌ Error 502 Bad Gateway

**Causa:** El backend no está corriendo o no responde en el puerto 8002

**Solución:**
```bash
# Verificar que PM2 está corriendo
pm2 status

# Si está "stopped", iniciar:
pm2 start purplehunt-backend

# Si está "online" pero no responde:
pm2 restart purplehunt-backend

# Verificar logs:
pm2 logs purplehunt-backend

# Probar localmente:
curl http://localhost:8002/api/
```

---

### ❌ Página en Blanco

**Causa:** El frontend no se compiló o las rutas están mal configuradas

**Solución:**
```bash
# 1. Recompilar frontend
cd /home/purplehunt.es/public_html/WebDeveloperPurpleHunt/frontend
rm -rf build/
npm run build

# 2. Verificar que build existe
ls -la build/

# 3. Reiniciar backend
pm2 restart purplehunt-backend

# 4. Ver logs
pm2 logs purplehunt-backend

# Debe mostrar: "Serving frontend from: /home/purplehunt.es/..."
```

---

### ❌ CSS/JS no carga (Error 404)

**Causa:** Las rutas de archivos estáticos no están configuradas correctamente

**Solución:**
```bash
# Verificar permisos
cd /home/purplehunt.es/public_html/WebDeveloperPurpleHunt/frontend/build
ls -la static/

# Debe tener:
# drwxr-xr-x css/
# drwxr-xr-x js/

# Si no tiene permisos:
sudo chmod -R 755 static/

# Reiniciar
pm2 restart purplehunt-backend
```

---

### ❌ Navegación no funciona (Error 404 en /servicios)

**Causa:** React Router no está configurado correctamente

**Solución:**
Verifica que el catch-all route `@app.get("/{full_path:path}")` esté al FINAL de server.py

```bash
cd /home/purplehunt.es/public_html/WebDeveloperPurpleHunt/backend
nano server.py

# Debe estar al final (después de todas las rutas /api)
# @app.get("/{full_path:path}")
# async def serve_react_app(full_path: str):
#     ...

pm2 restart purplehunt-backend
```

---

## 📈 MONITOREO Y MANTENIMIENTO

### Logs Recomendados

```bash
# Ver logs de backend cada día
pm2 logs purplehunt-backend --lines 100

# Ver uso de recursos
pm2 monit

# Ver estadísticas
pm2 info purplehunt-backend
```

### Backup Recomendado

```bash
# Hacer backup del código
cd /home/purplehunt.es/public_html/
tar -czf purplehunt_backup_$(date +%Y%m%d).tar.gz WebDeveloperPurpleHunt/

# Guardar en carpeta segura
mv purplehunt_backup_*.tar.gz /root/backups/
```

---

## 🎯 CHECKLIST FINAL DE DESPLIEGUE

- [ ] ✅ Backend corriendo en puerto 8002 (`pm2 status`)
- [ ] ✅ Frontend compilado (`ls frontend/build/`)
- [ ] ✅ .env configurado con GMAIL_USER y GMAIL_APP_PASSWORD
- [ ] ✅ FRONTEND_BUILD_PATH correcto en .env
- [ ] ✅ PORT=8002 en .env
- [ ] ✅ Rewrite Rules configuradas en CyberPanel
- [ ] ✅ SSL activo (https://purplehunt.es)
- [ ] ✅ Página carga correctamente
- [ ] ✅ Formulario probado y email recibido
- [ ] ✅ PM2 guardado (`pm2 save`)
- [ ] ✅ PM2 startup configurado

---

## 📞 CONTACTOS Y RECURSOS

**Logs importantes:**
- Backend: `pm2 logs purplehunt-backend`
- CyberPanel: `/usr/local/lsws/logs/error.log`
- OpenLiteSpeed: `/usr/local/lsws/logs/stderr.log`

**Archivos de configuración:**
- Backend: `/home/purplehunt.es/public_html/WebDeveloperPurpleHunt/backend/.env`
- Frontend: `/home/purplehunt.es/public_html/WebDeveloperPurpleHunt/frontend/.env`
- CyberPanel Rewrite: CyberPanel Web UI

**Comandos rápidos:**
```bash
# Reiniciar todo
pm2 restart purplehunt-backend && pm2 logs purplehunt-backend

# Ver estado
pm2 status && curl http://localhost:8002/api/

# Ver logs
pm2 logs purplehunt-backend --lines 50
```

---

¡Tu aplicación PurpleHunt.es está lista para producción! 🚀🔒
