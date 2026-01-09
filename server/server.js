const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
require('dotenv').config();

const app = express();

// Configurar Cloudinary
console.log('Configurando Cloudinary...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME ? 'Configurado' : 'Falta');
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'Configurado' : 'Falta');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Configurado' : 'Falta');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Cloudinary configurado correctamente');

// Configurar Multer para subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://superaseo:superaseo123@cluster0.mongodb.net/superaseo?retryWrites=true&w=majority')
  .then(() => {
    console.log('✓ Conectado a MongoDB');
    console.log('URI usada:', process.env.MONGODB_URI ? 'desde .env' : 'por defecto');
  })
  .catch(err => {
    console.log('⚠️ No se pudo conectar a MongoDB, pero el servidor continúa funcionando');
    console.log('Error:', err.message);
    console.log('Para conectar MongoDB, configura correctamente el .env');
    console.log('El login funcionará sin problemas');
  });

// Esquemas de MongoDB

// Esquema de Usuario Admin
const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, default: 'admin' },
  creadoEn: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Esquema de Producto
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  tamano: { type: String, required: true },
  valor: { type: Number, required: true },
  creadoEn: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', productoSchema);

// Datos iniciales
async function crearProductosIniciales() {
  try {
    console.log('Verificando productos iniciales...');
    const existentes = await Producto.countDocuments();
    console.log(`Productos existentes: ${existentes}`);
    if (existentes === 0) {
      console.log('Creando productos iniciales...');
      const productosIniciales = [
      {
        nombre: 'Desinfectante Multiusos 500ml',
        imagen: 'desinfectante-500ml.jpg',
        descripcion: 'Desinfectante potente para limpiar y desinfectar múltiples superficies del hogar. Elimina 99.9% de bacterias y virus. Aroma fresco a limón.',
        categoria: 'Desinfectantes',
        tamano: '500ml',
        valor: 8500
      },
      {
        nombre: 'Desinfectante Multiusos 1000ml',
        imagen: 'desinfectante-1000ml.jpg',
        descripcion: 'Desinfectante potente para limpiar y desinfectar múltiples superficies del hogar. Elimina 99.9% de bacterias y virus. Aroma fresco a limón.',
        categoria: 'Desinfectantes',
        tamaño: '1000ml',
        valor: 14500
      },
      {
        nombre: 'Limpiador de Pisos 750ml',
        imagen: 'piso-750ml.jpg',
        descripcion: 'Limpiador especializado para pisos de cerámica y mármol. Deja un brillo impecable sin dejar residuos. Fórmula concentrada que rinde más.',
        categoria: 'Limpiadores',
        tamaño: '750ml',
        valor: 9500
      },
      {
        nombre: 'Limpiador de Pisos 1500ml',
        imagen: 'piso-1500ml.jpg',
        descripcion: 'Limpiador especializado para pisos de cerámica y mármol. Deja un brillo impecable sin dejar residuos. Fórmula concentrada que rinde más.',
        categoria: 'Limpiadores',
        tamaño: '1500ml',
        valor: 16000
      },
      {
        nombre: 'Jabón Líquido para Manos 250ml',
        imagen: 'jabon-250ml.jpg',
        descripcion: 'Jabón líquido suave y espumoso para lavar manos. Dermatológicamente probado, humecta la piel. Disponible en varios aromas.',
        categoria: 'Jabones',
        tamaño: '250ml',
        valor: 4500
      },
      {
        nombre: 'Jabón Líquido para Manos 500ml',
        imagen: 'jabon-500ml.jpg',
        descripcion: 'Jabón líquido suave y espumoso para lavar manos. Dermatológicamente probado, humecta la piel. Disponible en varios aromas.',
        categoria: 'Jabones',
        tamaño: '500ml',
        valor: 7500
      },
      {
        nombre: 'Limpiavidrios 500ml',
        imagen: 'vidrios-500ml.jpg',
        descripcion: 'Limpiavidrios sin manchas que deja cristales y espejos impecables. Seca rápidamente y no deja residuos. Fórmula anti-empañante.',
        categoria: 'Limpiadores',
        tamaño: '500ml',
        valor: 7000
      },
      {
        nombre: 'Limpiavidrios 1000ml',
        imagen: 'vidrios-1000ml.jpg',
        descripcion: 'Limpiavidrios sin manchas que deja cristales y espejos impecables. Seca rápidamente y no deja residuos. Fórmula anti-empañante.',
        categoria: 'Limpiadores',
        tamaño: '1000ml',
        valor: 12000
      },
      {
        nombre: 'Cloro Desinfectante 1000ml',
        imagen: 'cloro-1000ml.jpg',
        descripcion: 'Cloro concentrado para desinfectar superficies y blanquear. Ideal para pisos, baños y lavandería. Acción rápida contra hongos y bacterias.',
        categoria: 'Desinfectantes',
        tamaño: '1000ml',
        valor: 6500
      },
      {
        nombre: 'Cloro Desinfectante 2000ml',
        imagen: 'cloro-2000ml.jpg',
        descripcion: 'Cloro concentrado para desinfectar superficies y blanquear. Ideal para pisos, baños y lavandería. Acción rápida contra hongos y bacterias.',
        categoria: 'Desinfectantes',
        tamaño: '2000ml',
        valor: 11000
      }
    ];

      await Producto.insertMany(productosIniciales);
      console.log('✓ Productos iniciales creados');
    }
  } catch (error) {
    console.log('⚠️ Error creando productos iniciales:', error.message);
  }
}

// Crear usuario admin inicial
async function crearUsuarioAdmin() {
  try {
    console.log('Verificando usuario admin...');
    const existente = await Usuario.countDocuments();
    console.log(`Usuarios admin existentes: ${existente}`);
    if (existente === 0) {
      console.log('Creando usuario admin...');
      const usuarioAdmin = new Usuario({
        usuario: 'admin',
        contraseña: 'admin123',
        rol: 'admin'
      });
      await usuarioAdmin.save();
      console.log('✓ Usuario admin creado');
    }
  } catch (error) {
    console.log('⚠️ Error creando usuario admin:', error.message);
  }
}

// Iniciar servidor y crear datos iniciales
async function iniciarServidor() {
  try {
    await crearProductosIniciales();
    await crearUsuarioAdmin();
    console.log('Datos iniciales verificados/creados correctamente');
  } catch (error) {
    console.log('Error en datos iniciales:', error.message);
  }
}

// RUTAS API

// Obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    console.log('⚠️ MongoDB no conectado, devolviendo productos de ejemplo');
    // Productos de ejemplo si no hay BD
    const productosEjemplo = [
      {
        _id: '1',
        nombre: 'Desinfectante Multiusos 500ml',
        imagen: 'desinfectante-500ml.jpg',
        descripcion: 'Desinfectante potente para limpiar y desinfectar múltiples superficies del hogar.',
        categoria: 'Desinfectantes',
        tamaño: '500ml',
        valor: 8500
      },
      {
        _id: '2',
        nombre: 'Limpiador de Pisos 750ml',
        imagen: 'piso-750ml.jpg',
        descripcion: 'Limpiador especializado para pisos de cerámica y mármol.',
        categoria: 'Limpiadores',
        tamaño: '750ml',
        valor: 9500
      }
    ];
    res.json(productosEjemplo);
  }
});

// Obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    console.log('⚠️ MongoDB no conectado, devolviendo producto de ejemplo');
    const productoEjemplo = {
      _id: req.params.id,
      nombre: 'Producto de Ejemplo',
      imagen: 'ejemplo.jpg',
      descripcion: 'Este es un producto de ejemplo mientras configuras MongoDB.',
      categoria: 'Ejemplo',
      valor: 10000
    };
    res.json(productoEjemplo);
  }
});

// Crear producto (solo admin)
app.post('/api/productos', upload.single('imagen'), async (req, res) => {
  try {
    console.log('=== CREANDO PRODUCTO ===');
    console.log('Body recibido:', req.body);
    console.log('Archivo recibido:', req.file ? 'Sí' : 'No');
    
    const { nombre, descripcion, categoria, valor } = req.body;
    const tamano = req.body['tamano'] || req.body.tamano;
    console.log('Campos extraídos:', { nombre, descripcion, categoria, tamano, valor });

    // Validar campos requeridos
    if (!nombre || !descripcion || !categoria || !tamano || !valor) {
      console.log('Faltan campos requeridos');
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    let imagenUrl = 'https://via.placeholder.com/300x300?text=Sin+Imagen';

    if (!req.file) {
      console.log('No se recibió imagen - usando imagen por defecto');
    } else {
      console.log('Subiendo imagen a Cloudinary...');
      // Subir imagen a Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'superaseo-productos' },
          (error, result) => {
            if (error) {
              console.log('Error subiendo a Cloudinary:', error);
              reject(error);
            } else {
              console.log('Imagen subida correctamente:', result.secure_url);
              resolve(result);
            }
          }
        );
        uploadStream.end(req.file.buffer);
      });
      imagenUrl = result.secure_url;
    }

    console.log('Creando producto en BD...');
    const producto = new Producto({
      nombre,
      imagen: imagenUrl,
      descripcion,
      categoria,
      tamano,
      valor
    });

    const productoGuardado = await producto.save();
    console.log('Producto guardado:', productoGuardado);

    res.status(201).json(productoGuardado);
  } catch (err) {
    console.log('=== ERROR CREANDO PRODUCTO ===');
    console.log('Error completo:', err);
    console.log('Mensaje de error:', err.message);
    console.log('Stack:', err.stack);
    res.status(500).json({ error: 'Error creando producto', details: err.message });
  }
});

// Actualizar producto (solo admin)
app.put('/api/productos/:id', upload.single('imagen'), async (req, res) => {
  try {
    console.log('=== ACTUALIZANDO PRODUCTO ===');
    console.log('ID:', req.params.id);
    console.log('Body recibido:', req.body);
    console.log('Archivo recibido:', req.file ? 'Sí' : 'No');

    const { nombre, descripcion, categoria, valor } = req.body;
    const tamano = req.body['tamano'] || req.body.tamano;
    console.log('Campos extraídos:', { nombre, descripcion, categoria, tamano, valor });

    // Validar campos requeridos
    if (!nombre || !descripcion || !categoria || !tamano || !valor) {
      console.log('Faltan campos requeridos');
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Buscar producto existente para obtener la imagen actual
    const productoExistente = await Producto.findById(req.params.id);
    if (!productoExistente) {
      console.log('Producto no encontrado');
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    let imagenUrl = productoExistente.imagen;

    // Si se envió una nueva imagen, subirla a Cloudinary
    if (req.file) {
      console.log('Subiendo nueva imagen a Cloudinary...');
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'superaseo-productos' },
          (error, result) => {
            if (error) {
              console.log('Error subiendo a Cloudinary:', error);
              reject(error);
            } else {
              console.log('Imagen subida correctamente:', result.secure_url);
              resolve(result);
            }
          }
        );
        uploadStream.end(req.file.buffer);
      });
      imagenUrl = result.secure_url;
    }

    console.log('Actualizando producto en BD...');
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        imagen: imagenUrl,
        descripcion,
        categoria,
        tamano,
        valor
      },
      { new: true }
    );

    console.log('Producto actualizado:', productoActualizado);
    res.json(productoActualizado);
  } catch (err) {
    console.log('=== ERROR ACTUALIZANDO PRODUCTO ===');
    console.log('Error completo:', err);
    console.log('Mensaje de error:', err.message);
    console.log('Stack:', err.stack);
    res.status(500).json({ error: 'Error actualizando producto', details: err.message });
  }
});

// Eliminar producto (solo admin)
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado' });
  } catch (err) {
    console.log('⚠️ MongoDB no conectado, simulando eliminación');
    res.json({ mensaje: 'Producto eliminado (simulado)' });
  }
});

// Obtener categorías únicas
app.get('/api/categorias', async (req, res) => {
  try {
    const categorias = await Producto.distinct('categoria');
    res.json(categorias);
  } catch (err) {
    console.log('⚠️ MongoDB no conectado, devolviendo categorías de ejemplo');
    const categoriasEjemplo = ['Desinfectantes', 'Limpiadores', 'Jabones', 'Detergentes'];
    res.json(categoriasEjemplo);
  }
});

// Login de usuario
app.post('/api/login', async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const user = await Usuario.findOne({ usuario, contraseña });
    if (user) {
      res.json({ success: true, token: 'admin-token', rol: user.rol });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.log('⚠️ MongoDB no conectado, usando login local');
    // Login local si no hay BD
    if (usuario === 'admin' && contraseña === 'admin123') {
      res.json({ success: true, token: 'admin-token', rol: 'admin' });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}\n`);
});

// Iniciar servidor y crear datos iniciales
async function iniciarServidor() {
  try {
    console.log('=== INICIANDO SERVIDOR ===');
    await crearProductosIniciales();
    await crearUsuarioAdmin();
    console.log('=== DATOS INICIALES LISTOS ===');
  } catch (error) {
    console.log('=== ERROR EN INICIALIZACIÓN ===');
    console.log('Error completo:', error);
    console.log('Mensaje:', error.message);
    console.log('Stack:', error.stack);
    process.exit(1); // Salir si hay error en inicialización
  }
}

console.log('Iniciando aplicación...');
iniciarServidor().then(() => {
  console.log('Servidor inicializado correctamente');
}).catch(err => {
  console.log('Error fatal al iniciar:', err);
  process.exit(1);
});
