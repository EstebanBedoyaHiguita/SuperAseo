const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function testProductCreation() {
  try {
    console.log('=== PRUEBA DE CREACIÓN DE PRODUCTO ===');

    // 1. Login
    console.log('1. Haciendo login...');
    const loginResponse = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario: 'admin',
        contraseña: 'admin123'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

    if (!loginData.success) {
      console.log('❌ Error en login');
      return;
    }

    // 2. Crear FormData con datos de prueba
    console.log('2. Creando FormData...');
    const formData = new FormData();

    // Crear un archivo de imagen simple (1x1 pixel PNG)
    const imageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

    formData.append('nombre', 'Producto de Prueba Cloudinary');
    formData.append('descripcion', 'Este es un producto de prueba para verificar que Cloudinary funciona');
    formData.append('categoria', 'Pruebas');
    formData.append('tamaño', '100ml');
    formData.append('valor', '5000');
    formData.append('imagen', imageBuffer, {
      filename: 'test-image.png',
      contentType: 'image/png'
    });

    // 3. Crear producto
    console.log('3. Creando producto...');
    const createResponse = await fetch('http://localhost:3000/api/productos', {
      method: 'POST',
      body: formData
    });

    const createData = await createResponse.json();
    console.log('Create response status:', createResponse.status);
    console.log('Create response:', createData);

    if (createResponse.ok) {
      console.log('✅ Producto creado exitosamente');
      console.log('URL de imagen:', createData.imagen);
    } else {
      console.log('❌ Error creando producto');
    }

  } catch (error) {
    console.log('❌ Error en la prueba:', error.message);
  }
}

testProductCreation();