// ====================================
// MÓDULO ADMINISTRADOR
// ====================================

const API_URL = 'http://localhost:3000/api';
let adminAutenticado = false;
let productoEnEdicion = null;

// ====================================
// LOGIN
// ====================================

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const usuario = document.getElementById('usuario').value;
      const contraseña = document.getElementById('contraseña').value;

      try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario, contraseña })
        });

        const data = await response.json();

        if (response.ok) {
          adminAutenticado = true;
          localStorage.setItem('adminToken', data.token);
          mostrarPanelAdmin();
          cargarProductosAdmin();
        } else {
          mostrarErrorLogin(data.error);
        }
      } catch (error) {
        mostrarErrorLogin('Error conectando con el servidor');
        console.error('Error login:', error);
      }
    });
  }

  // Botón logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', cerrarSesion);
  }

  // Formulario de producto
  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', guardarProducto);
  }

  // Verificar si ya está autenticado
  const token = localStorage.getItem('adminToken');
  if (token) {
    adminAutenticado = true;
    mostrarPanelAdmin();
    cargarProductosAdmin();
  }
});

function mostrarErrorLogin(mensaje) {
  const errorDiv = document.getElementById('loginError');
  errorDiv.textContent = '❌ ' + mensaje;
  errorDiv.style.display = 'block';
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
}

function mostrarPanelAdmin() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('adminSection').style.display = 'block';
}

function ocultarPanelAdmin() {
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('adminSection').style.display = 'none';
}

function cerrarSesion() {
  adminAutenticado = false;
  localStorage.removeItem('adminToken');
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
  productoEnEdicion = null;
  ocultarPanelAdmin();
}

// ====================================
// CARGAR PRODUCTOS EN ADMIN
// ====================================

async function cargarProductosAdmin() {
  try {
    const response = await fetch(`${API_URL}/productos`);
    const productos = await response.json();
    mostrarProductosAdmin(productos);
  } catch (error) {
    console.error('Error cargando productos:', error);
  }
}

function mostrarProductosAdmin(productos) {
  const container = document.getElementById('adminProductsList');
  
  container.innerHTML = productos.map(producto => {
    // Compatibilidad con ambos formatos
    let imagen, valor, tamano;
    if (producto.variaciones && producto.variaciones.length > 0) {
      // Formato antiguo con variaciones
      const primeraVariacion = producto.variaciones[0];
      imagen = primeraVariacion.imagen;
      valor = primeraVariacion.valor;
      tamano = primeraVariacion.tamano || primeraVariacion.tamaño;
    } else {
      // Formato nuevo con campos individuales
      imagen = producto.imagen;
      valor = producto.valor;
      tamano = producto.tamano || producto.tamaño;
    }
    
    return `
      <div class="admin-product-item">
        <div class="admin-product-info">
          <h3>${producto.nombre}</h3>
          <p><strong>Categoría:</strong> ${producto.categoria}</p>
          <p><strong>Tamaño:</strong> ${tamano}</p>
          <p><strong>Valor:</strong> $${valor}</p>
          <p><strong>Imagen:</strong> ${imagen}</p>
        </div>
        <div class="admin-product-actions">
          <button class="btn btn-secondary btn-small" onclick="editarProducto('${producto._id}')">✏️ Editar</button>
          <button class="btn btn-danger btn-small" onclick="eliminarProducto('${producto._id}')">🗑️ Eliminar</button>
        </div>
      </div>
    `;
  }).join('');
}

// ====================================
// GUARDAR PRODUCTO (CREATE/UPDATE)
// ====================================

async function guardarProducto(e) {
  e.preventDefault();

  const productId = document.getElementById('productId').value;
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const categoria = document.getElementById('categoria').value;
  const tamano = document.getElementById('tamano').value;
  const valor = parseInt(document.getElementById('valor').value);
  const imagen = document.getElementById('imagen').files[0];

  if (!nombre || !descripcion || !categoria || !tamano || !valor) {
    alert('❌ Todos los campos son obligatorios (la imagen es opcional)');
    return;
  }

  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('descripcion', descripcion);
  formData.append('categoria', categoria);
  formData.append('tamano', tamano);
  formData.append('valor', valor);
  if (imagen) {
    formData.append('imagen', imagen);
  }

  try {
    let response;
    
    if (productId) {
      // Actualizar
      response = await fetch(`${API_URL}/productos/${productId}`, {
        method: 'PUT',
        body: formData
      });
    } else {
      // Crear
      response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        body: formData
      });
    }

    if (response.ok) {
      alert('✅ Producto guardado correctamente');
      limpiarFormulario();
      cargarProductosAdmin();
    } else {
      alert('❌ Error guardando producto');
    }
  } catch (error) {
    alert('❌ Error conectando con el servidor');
    console.error('Error:', error);
  }
}

// ====================================
// EDITAR PRODUCTO
// ====================================

async function editarProducto(productId) {
  try {
    const response = await fetch(`${API_URL}/productos/${productId}`);
    const producto = await response.json();

    document.getElementById('productId').value = producto._id;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('categoria').value = producto.categoria;
    
    // Compatibilidad con ambos formatos
    let imagen, valor, tamano;
    if (producto.variaciones && producto.variaciones.length > 0) {
      // Formato antiguo con variaciones
      const primeraVariacion = producto.variaciones[0];
      imagen = primeraVariacion.imagen;
      valor = primeraVariacion.valor;
      tamano = primeraVariacion.tamano || primeraVariacion.tamaño;
    } else {
      // Formato nuevo con campos individuales
      imagen = producto.imagen;
      valor = producto.valor;
      tamano = producto.tamano || producto.tamaño;
    }
    
    document.getElementById('tamano').value = tamano;
    document.getElementById('valor').value = valor;
    // Nota: No asignamos valor al input file por seguridad del navegador
    // El usuario podrá seleccionar una nueva imagen si quiere actualizarla

    // Scroll al formulario
    document.querySelector('.admin-form-container').scrollIntoView({ behavior: 'smooth' });
    productoEnEdicion = producto._id;
  } catch (error) {
    alert('❌ Error cargando producto');
    console.error('Error:', error);
  }
}

// ====================================
// ELIMINAR PRODUCTO
// ====================================

async function eliminarProducto(productId) {
  if (!confirm('¿Está seguro de que desea eliminar este producto?')) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/productos/${productId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('✅ Producto eliminado correctamente');
      cargarProductosAdmin();
    } else {
      alert('❌ Error eliminando producto');
    }
  } catch (error) {
    alert('❌ Error conectando con el servidor');
    console.error('Error:', error);
  }
}

// ====================================
// UTILIDADES
// ====================================

function limpiarFormulario() {
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
  productoEnEdicion = null;
}
