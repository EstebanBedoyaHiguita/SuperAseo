# 🧹 SuperAseo - Catálogo Web de Productos de Aseo y Limpieza

Plataforma web completa para vendedor de productos de aseo y limpieza con catálogo responsivo, blog estático y panel administrador.

## 📋 Características

✅ **Catálogo Responsivo**
- Grid de productos adaptable a mobile y desktop
- Búsqueda en tiempo real
- Filtrado por categoría
- Tarjetas con animaciones suaves
- Modal con detalles completos y variaciones de tamaño

✅ **Blog Estático**
- 6 artículos sobre limpieza e higiene
- Diseño responsivo
- Fácil de editar

✅ **Panel Administrador**
- Autenticación local (Usuario: `Mhiguita`, Contraseña: `43549040`)
- CRUD completo de productos
- Gestión de variaciones (tamaño y precio)
- Almacenamiento de imágenes en local

✅ **Base de Datos**
- MongoDB Atlas (gratuito)
- Conexión segura con Node.js + Express
- 5 productos iniciales incluidos

✅ **Diseño**
- Colores acordes al nicho (verdes, azules, blancos)
- Totalmente responsivo mobile-first
- Animaciones básicas elegantes

---

## 🚀 Instalación y Configuración

### 1. **Clonar o descargar el proyecto**

```bash
cd c:\Users\bedoy\OneDrive\Escritorio\SuperAseo-web
```

### 2. **Instalar dependencias**

```bash
npm install
```

### 3. **Configurar MongoDB Atlas**

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un cluster gratuito
4. Crea un usuario de base de datos
5. Obtén la cadena de conexión (URL)

### 4. **Configurar variables de entorno**

1. Copia el archivo `.env.example` y renómbralo a `.env`
2. Reemplaza `mongodb+srv://usuario:contraseña@cluster...` con tu URL de MongoDB

```env
MONGODB_URI=mongodb+srv://tu_usuario:tu_contraseña@cluster.mongodb.net/superaseo?retryWrites=true&w=majority
PORT=3000
```

### 5. **Iniciar el servidor**

```bash
npm start
```

El servidor correrá en `http://localhost:3000`

---

## 📱 Uso de la Plataforma

### **Página Principal**
- Accede a `http://localhost:3000/`
- Visualiza categorías y características

### **Catálogo**
- Busca productos por nombre
- Filtra por categoría
- Haz click en "Ver Más" para ver detalles completos

### **Blog**
- Lee artículos sobre limpieza y mantenimiento

### **Panel Administrador**
- Accede a `/pages/admin.html`
- **Credenciales:**
  - Usuario: `Mhiguita`
  - Contraseña: `43549040`
- Crea, edita y elimina productos
- Agrega variaciones de tamaño y precio

---

## 📁 Estructura del Proyecto

```
SuperAseo-web/
├── public/
│   ├── index.html                  # Página principal
│   ├── pages/
│   │   ├── catalogo.html           # Página de catálogo
│   │   ├── blog.html               # Blog estático
│   │   └── admin.html              # Panel administrador
│   ├── css/
│   │   └── styles.css              # Estilos responsive
│   ├── js/
│   │   ├── main.js                 # Script página principal
│   │   ├── catalogo.js             # Lógica de catálogo
│   │   ├── navbar.js               # Menú responsivo
│   │   └── admin.js                # Lógica administrador
│   └── assets/
│       └── images/                 # Carpeta para imágenes (local)
├── server/
│   └── server.js                   # Servidor Node.js + Express + MongoDB
├── package.json
├── .env                            # Variables de entorno
├── .env.example                    # Ejemplo de variables
└── README.md                       # Este archivo
```

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript vanilla
- **Backend:** Node.js, Express.js
- **Base de Datos:** MongoDB Atlas
- **Almacenamiento:** Local (`/public/assets/images/`)
- **Autenticación:** Local (quemada)

---

## 💾 Agregar Imágenes de Productos

1. Coloca tus imágenes en `/public/assets/images/`
2. En el panel admin, cuando crees/edites un producto, ingresa el **nombre del archivo** en el campo "Nombre imagen"
3. Ej: Si tu imagen es `desinfectante-500ml.jpg`, ingresa exactamente ese nombre

---

## 🔐 Seguridad (Importante)

⚠️ **NOTA:** Las credenciales del admin están quemadas en el código por propósitos de demostración. Para producción, implementa:

- Hashing de contraseñas
- JWT tokens
- Validación en el servidor
- HTTPS
- Protección CORS

---

## 📝 Ejemplo de Producto en la BD

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nombre": "Desinfectante Multiusos",
  "descripcion": "Desinfectante potente...",
  "categoria": "Desinfectantes",
  "variaciones": [
    {
      "tamaño": "500ml",
      "valor": 8500,
      "imagen": "desinfectante-500ml.jpg"
    },
    {
      "tamaño": "1000ml",
      "valor": 14500,
      "imagen": "desinfectante-1000ml.jpg"
    }
  ]
}
```

---

## 🐛 Troubleshooting

**Error: "Cannot GET /"**
- Asegúrate que el servidor esté corriendo: `npm start`
- Verifica que estés en `http://localhost:3000`

**Error: "Cannot connect to MongoDB"**
- Verifica tu URL en `.env`
- Asegúrate de agregar tu IP en MongoDB Atlas > Network Access
- Verifica usuario y contraseña

**Las imágenes no se cargan**
- Coloca las imágenes en `/public/assets/images/`
- Usa el nombre exacto de la imagen en el admin

**El menú mobile no funciona**
- Asegúrate que `navbar.js` esté incluido en todas las páginas
- Verifica la consola del navegador para errores

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa la consola del navegador (F12)
2. Verifica los logs del servidor
3. Asegúrate de que MongoDB esté conectado

---

## 📄 Licencia

Proyecto personal - SuperAseo 2024

---

## ✨ Próximas Mejoras Sugeridas

- [ ] Sistema de autenticación robusto con JWT
- [ ] Carrito de compras
- [ ] Sistema de pago
- [ ] Dashboard estadístico
- [ ] Envío de emails
- [ ] Sistema de comentarios en blog
- [ ] Galería de imágenes por producto
- [ ] Historial de cambios
- [ ] Caché de productos

---

**¡Gracias por usar SuperAseo! 🧹✨**
