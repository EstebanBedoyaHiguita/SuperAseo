// ====================================
// VARIABLES GLOBALES
// ====================================

const API_URL = `${window.location.origin}/api`;
let productosActuales = [];
let productosFiltrados = [];

// ====================================
// FUNCIÓN PRINCIPAL - CARGAR PRODUCTOS
// ====================================

async function cargarProductos() {
  try {
    const response = await fetch(`${API_URL}/productos`);
    const data = await response.json();
    productosActuales = data;
    productosFiltrados = data;
    mostrarProductos();
    cargarCategorias();
  } catch (error) {
    console.error('Error cargando productos:', error);
  }
}

// ====================================
// MOSTRAR PRODUCTOS EN GRID
// ====================================

function mostrarProductos() {
  const container = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');

  if (!container) return;

  if (productosFiltrados.length === 0) {
    container.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';
  container.innerHTML = productosFiltrados.map(producto => {
    const descripcionCorta = producto.descripcion.substring(0, 80) + '...';
    
    // Compatibilidad con ambos formatos: variaciones (antiguo) o campos individuales (nuevo)
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
      <div class="product-card" onclick="abrirModal('${producto._id}')">
        <div class="product-image">
          ${imagen ? `<img src="${imagen.startsWith('http') ? imagen : `assets/images/${imagen}`}" alt="${producto.nombre}">` : '📦'}
        </div>
        <div class="product-info">
          <span class="product-category">${producto.categoria}</span>
          <div class="product-name">${producto.nombre}</div>
          <div class="product-description">${descripcionCorta}</div>
          <div class="product-price">$${valor.toLocaleString()}</div>
          <div class="product-actions">
            <button class="btn-ver-mas" onclick="event.stopPropagation(); abrirModal('${producto._id}')">
              Ver Más
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ====================================
// CARGAR CATEGORÍAS
// ====================================

async function cargarCategorias() {
  try {
    const response = await fetch(`${API_URL}/categorias`);
    const categorias = await response.json();
    
    const select = document.getElementById('categoryFilter');
    if (select) {
      select.innerHTML = '<option value="">Todas las categorías</option>';
      categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
      });
    }

    // Cargar categorías en página principal
    const gridCategorias = document.getElementById('categoriesGrid');
    if (gridCategorias) {
      gridCategorias.innerHTML = categorias.map(cat => `
        <a href="pages/catalogo.html?categoria=${cat}" class="category-item">
          ${cat}
        </a>
      `).join('');
    }
  } catch (error) {
    console.error('Error cargando categorías:', error);
  }
}

// ====================================
// BÚSQUEDA DE PRODUCTOS
// ====================================

function filtrarProductos() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  if (!searchInput || !categoryFilter) return;

  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  productosFiltrados = productosActuales.filter(producto => {
    const matchesSearch = 
      producto.nombre.toLowerCase().includes(searchTerm) ||
      producto.descripcion.toLowerCase().includes(searchTerm);
    
    const matchesCategory = !selectedCategory || producto.categoria === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  mostrarProductos();
}

// ====================================
// MODAL - ABRIR Y CERRAR
// ====================================

function abrirModal(productoId) {
  const producto = productosActuales.find(p => p._id === productoId);
  if (!producto) return;

  const modalBody = document.getElementById('modalBody');
  
  // Compatibilidad con ambos formatos
  let imagen, valor, tamaño;
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

  modalBody.innerHTML = `
    ${imagen ? `<img src="${imagen.startsWith('http') ? imagen : `assets/images/${imagen}`}" alt="${producto.nombre}" class="modal-image">` : ''}
    <h2 class="modal-title">${producto.nombre}</h2>
    <div class="modal-description">${producto.descripcion}</div>
    <div class="product-details">
      <div class="detail-item">
        <strong>Categoría:</strong> ${producto.categoria}
      </div>
      <div class="detail-item">
        <strong>Tamaño:</strong> ${tamano}
      </div>
      <div class="detail-item">
        <strong>Precio:</strong> $${valor.toLocaleString()}
      </div>
    </div>
  `;

  const modal = document.getElementById('productModal');
  modal.classList.add('show');
}

function cerrarModal() {
  const modal = document.getElementById('productModal');
  modal.classList.remove('show');
}

// ====================================
// EVENT LISTENERS
// ====================================

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();

  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  if (searchInput) {
    searchInput.addEventListener('input', filtrarProductos);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', filtrarProductos);
  }

  // Cerrar modal al hacer click en X
  const closeBtn = document.querySelector('.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', cerrarModal);
  }

  // Cerrar modal al hacer click fuera de él
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        cerrarModal();
      }
    });
  }

  // Cargar categoría desde URL si existe
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get('categoria');
  if (categoria) {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
      categoryFilter.value = categoria;
      filtrarProductos();
    }
  }
});
