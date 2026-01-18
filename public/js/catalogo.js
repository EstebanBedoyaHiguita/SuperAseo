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
    
    // Si no hay productos, usar datos de ejemplo
    if (!data || data.length === 0) {
      console.log('⚠️ No hay productos, cargando datos de ejemplo');
      productosActuales = [
        {
          _id: '1',
          nombre: 'Desinfectante Multiusos',
          imagen: 'https://via.placeholder.com/300x300?text=Desinfectante',
          descripcion: 'Desinfectante potente para limpiar y desinfectar múltiples superficies del hogar. Elimina 99.9% de bacterias y virus. Aroma fresco a limón.',
          categoria: 'Desinfectantes',
          tamano: '500ml',
          valor: 8500
        },
        {
          _id: '2',
          nombre: 'Desinfectante Multiusos 1L',
          imagen: 'https://via.placeholder.com/300x300?text=Desinfectante+1L',
          descripcion: 'Desinfectante potente para limpiar y desinfectar múltiples superficies del hogar. Botella grande de 1 litro.',
          categoria: 'Desinfectantes',
          tamano: '1000ml',
          valor: 14500
        },
        {
          _id: '3',
          nombre: 'Limpiador de Pisos',
          imagen: 'https://via.placeholder.com/300x300?text=Limpiador+Pisos',
          descripcion: 'Limpiador especializado para pisos de cerámica y mármol. Deja un brillo impecable sin dejar residuos.',
          categoria: 'Limpiadores',
          tamano: '750ml',
          valor: 9500
        },
        {
          _id: '4',
          nombre: 'Jabón Líquido para Manos',
          imagen: 'https://via.placeholder.com/300x300?text=Jabon+Manos',
          descripcion: 'Jabón líquido suave y espumoso para lavar manos. Dermatológicamente probado, humecta la piel.',
          categoria: 'Jabones',
          tamano: '250ml',
          valor: 4500
        },
        {
          _id: '5',
          nombre: 'Detergente Ropa',
          imagen: 'https://via.placeholder.com/300x300?text=Detergente',
          descripcion: 'Detergente potente para ropa blanca y de color. Elimina manchas difíciles. Aroma fresco y duradero.',
          categoria: 'Detergentes',
          tamano: '500ml',
          valor: 6500
        }
      ];
    } else {
      productosActuales = data;
    }
    
    productosFiltrados = productosActuales;
    mostrarProductos();
    cargarCategorias();
  } catch (error) {
    console.error('Error cargando productos:', error);
    // Si hay error en la solicitud, usar datos de ejemplo
    productosActuales = [
      {
        _id: '1',
        nombre: 'Desinfectante Multiusos',
        imagen: 'https://via.placeholder.com/300x300?text=Desinfectante',
        descripcion: 'Desinfectante potente para limpiar y desinfectar múltiples superficies del hogar.',
        categoria: 'Desinfectantes',
        tamano: '500ml',
        valor: 8500
      },
      {
        _id: '2',
        nombre: 'Limpiador de Pisos',
        imagen: 'https://via.placeholder.com/300x300?text=Limpiador',
        descripcion: 'Limpiador especializado para pisos de cerámica y mármol.',
        categoria: 'Limpiadores',
        tamano: '750ml',
        valor: 9500
      },
      {
        _id: '3',
        nombre: 'Jabón Líquido para Manos',
        imagen: 'https://via.placeholder.com/300x300?text=Jabon',
        descripcion: 'Jabón líquido suave y espumoso para lavar manos.',
        categoria: 'Jabones',
        tamano: '250ml',
        valor: 4500
      }
    ];
    productosFiltrados = productosActuales;
    mostrarProductos();
    cargarCategorias();
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
    console.log('Cargando categorías desde API...');
    const response = await fetch(`${API_URL}/categorias`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    let categorias = await response.json();
    console.log('Categorías recibidas del servidor:', categorias);
    
    // Si el array está vacío o nulo, usar categorías de ejemplo
    if (!categorias || categorias.length === 0) {
      console.log('⚠️ No hay categorías del servidor, usando categorías de ejemplo');
      categorias = ['Desinfectantes', 'Limpiadores', 'Jabones', 'Detergentes', 'Aseo y limpieza'];
    }
    
    // Deduplicar categorías (remover duplicados)
    const categoriasUnicas = [...new Set(
      categorias
        .filter(cat => cat && String(cat).trim())
        .map(cat => String(cat).trim())
    )];
    
    console.log('Categorías únicas después de deduplicación:', categoriasUnicas);
    
    // Llenar el select de categorías en catálogo
    const select = document.getElementById('categoryFilter');
    if (select) {
      console.log('Rellenando select con', categoriasUnicas.length, 'categorías');
      select.innerHTML = '<option value="">Todas las categorías</option>';
      categoriasUnicas.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
        console.log('Opción añadida:', cat);
      });
    } else {
      console.warn('⚠️ No se encontró el elemento categoryFilter');
    }

    // Cargar categorías en página principal (si existe el elemento)
    const gridCategorias = document.getElementById('categoriesGrid');
    if (gridCategorias) {
      console.log('Rellenando grid de categorías');
      gridCategorias.innerHTML = categoriasUnicas.map(cat => `
        <a href="pages/catalogo.html?categoria=${encodeURIComponent(cat)}" class="category-item">
          ${cat}
        </a>
      `).join('');
    }
  } catch (error) {
    console.error('Error cargando categorías:', error);
    // Si hay error, usar categorías de ejemplo
    const categoriasEjemplo = ['Desinfectantes', 'Limpiadores', 'Jabones', 'Detergentes', 'Aseo y limpieza'];
    const select = document.getElementById('categoryFilter');
    if (select) {
      select.innerHTML = '<option value="">Todas las categorías</option>';
      categoriasEjemplo.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
      });
    }
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
