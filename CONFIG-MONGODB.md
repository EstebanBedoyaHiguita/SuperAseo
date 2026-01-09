# Configuración de MongoDB Atlas Gratuita

## Pasos para crear la conexión MongoDB

### 1. Crear cuenta en MongoDB Atlas
- Ir a: https://www.mongodb.com/cloud/atlas
- Hacer click en "Sign Up"
- Registrarse con email

### 2. Crear un cluster gratuito
- Click en "Create a Deployment"
- Seleccionar "FREE" (M0)
- Elegir proveedor (AWS, Google Cloud, etc)
- Elegir región cercana
- Click "Create Cluster"
- Esperar 1-2 minutos a que se cree

### 3. Crear usuario de base de datos
- En el menú, ir a "Database Access"
- Click "Add New Database User"
- Username: cualquier nombre (ej: "superaseo")
- Password: crear contraseña segura
- Click "Add User"

### 4. Configurar acceso desde cualquier IP
- En el menú, ir a "Network Access"
- Click "Add IP Address"
- Click "Allow access from anywhere" (0.0.0.0/0)
- Click "Confirm"

### 5. Obtener cadena de conexión
- Ir a "Databases" o "Clusters"
- Click en el botón "Connect" de tu cluster
- Seleccionar "Drivers" (Node.js)
- Copiar la cadena de conexión
- Debería verse así:

mongodb+srv://usuario:contraseña@cluster0.mongodb.net/?retryWrites=true&w=majority

### 6. Actualizar el .env
- Reemplazar "usuario" con tu usuario creado
- Reemplazar "contraseña" con tu contraseña
- Reemplazar "cluster0" si es diferente
- Resultado final:

MONGODB_URI=mongodb+srv://superaseo:micontraseña123@cluster0.mongodb.net/superaseo?retryWrites=true&w=majority
PORT=3000

## ⚠️ IMPORTANTE
- NUNCA compartas tu .env con nadie
- No subas el .env a repositorios públicos
- El archivo .env está en el .gitignore (seguro)

## ✅ Verificar que funciona
- Ejecuta: npm start
- Deberías ver: "✓ Conectado a MongoDB"
- Si hay error, revisa que:
  - La URL sea correcta
  - El usuario y contraseña sean exactos
  - Tu IP esté agregada en Network Access

¡Listo! 🎉
