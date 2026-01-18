// ====================================
// PÁGINA PRINCIPAL
// ====================================

// Usar la URL dinámicamente para funcionar en producción
const API_URL = `${window.location.origin}/api`;

document.addEventListener('DOMContentLoaded', () => {
  cargarCategorias();
  cargarProductosDestacados();
});

async function cargarCategorias() {
  console.log('=== INICIANDO CARGA DE CATEGORÍAS ===');
  const gridCategorias = document.getElementById('categoriesGrid');
  
  if (!gridCategorias) {
    console.error('❌ No se encontró el elemento con ID categoriesGrid');
    return;
  }
  
  // Categorías por defecto en caso de error
  const defaultCategories = ['Desinfectantes', 'Limpiadores', 'Jabones', 'Detergentes', 'Aseo y limpieza'];
  
  try {
    console.log(`🌐 Intentando conectar a: ${API_URL}/categorias`);
    const response = await fetch(`${API_URL}/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include'
    });
    
    console.log('📡 Estado de la respuesta:', response.status);
    
    let categorias;
    
    if (response.ok) {
      categorias = await response.json();
      console.log('✅ Categorías recibidas:', categorias);
    } else {
      console.warn('⚠️ Usando categorías por defecto debido a un error en la respuesta');
      categorias = defaultCategories;
    }
    
    // Aseguramos que tengamos un array
    if (!Array.isArray(categorias) || categorias.length === 0) {
      console.warn('⚠️ No se recibieron categorías válidas, usando valores por defecto');
      categorias = defaultCategories;
    }
    
    // Deduplicar categorías (remover duplicados)
    const categoriasUnicas = [...new Set(
      categorias
        .filter(cat => cat && String(cat).trim())
        .map(cat => String(cat).trim())
    )];
    
    console.log('✅ Categorías únicas después de deduplicación:', categoriasUnicas);
    
    // Renderizamos las categorías
    gridCategorias.innerHTML = categoriasUnicas
      .map(cat => {
        return `
          <a href="pages/catalogo.html?categoria=${encodeURIComponent(cat)}" 
             class="category-item"
             data-category="${cat.toLowerCase()}">
            ${cat}
          </a>
        `;
      })
      .join('');
    
    console.log('✅ Categorías renderizadas correctamente');
    
  } catch (error) {
    console.error('❌ Error al cargar categorías:', error);
    console.warn('⚠️ Usando categorías por defecto debido a un error');
    
    gridCategorias.innerHTML = defaultCategories
      .map(cat => `
        <a href="pages/catalogo.html?categoria=${encodeURIComponent(cat)}" 
           class="category-item"
           data-category="${cat.toLowerCase()}">
          ${cat}
        </a>
      `)
      .join('');
  } finally {
    console.log('=== FIN DE CARGA DE CATEGORÍAS ===');
  }
}

// ====================================
// CARGAR PRODUCTOS DESTACADOS
// ====================================

async function cargarProductosDestacados() {
  console.log('=== INICIANDO CARGA DE PRODUCTOS DESTACADOS ===');
  const gridProductos = document.getElementById('featuredProductsGrid');
  
  if (!gridProductos) {
    console.log('⚠️ Elemento featuredProductsGrid no encontrado, saltando carga');
    return;
  }
  
  try {
    console.log(`🌐 Cargando productos desde: ${API_URL}/productos`);
    const response = await fetch(`${API_URL}/productos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const productos = await response.json();
    console.log('✅ Productos recibidos:', productos.length, 'productos');
    
    if (!Array.isArray(productos) || productos.length === 0) {
      console.warn('⚠️ No hay productos disponibles');
      gridProductos.innerHTML = '<p style="text-align: center; padding: 2rem;">No hay productos disponibles en este momento</p>';
      return;
    }
    
    // Seleccionar 4 productos aleatorios
    const productosDestacados = seleccionarProductosAleatorios(productos, 4);
    console.log('✅ Productos destacados seleccionados:', productosDestacados.length);
    
    // Renderizar los productos
    gridProductos.innerHTML = productosDestacados
      .map(producto => crearProductoCard(producto))
      .join('');
    
    console.log('✅ Productos destacados renderizados correctamente');
    
  } catch (error) {
    console.error('❌ Error al cargar productos destacados:', error);
    gridProductos.innerHTML = '<p style="text-align: center; padding: 2rem;">Error al cargar los productos</p>';
  } finally {
    console.log('=== FIN DE CARGA DE PRODUCTOS DESTACADOS ===');
  }
}

// ====================================
// FUNCIONES AUXILIARES
// ====================================

/**
 * Selecciona N productos al azar de un array
 */
function seleccionarProductosAleatorios(array, cantidad) {
  const copia = [...array];
  const seleccionados = [];
  
  for (let i = 0; i < Math.min(cantidad, copia.length); i++) {
    const indiceAleatorio = Math.floor(Math.random() * copia.length);
    seleccionados.push(copia[indiceAleatorio]);
    copia.splice(indiceAleatorio, 1);
  }
  
  return seleccionados;
}

/**
 * Crea el HTML para una tarjeta de producto
 */
function crearProductoCard(producto) {
  const descripcionCorta = producto.descripcion.substring(0, 80) + '...';
  
  // Compatibilidad con ambos formatos: variaciones (antiguo) o campos individuales (nuevo)
  let imagen, valor, tamano;
  if (producto.variaciones && producto.variaciones.length > 0) {
    const primeraVariacion = producto.variaciones[0];
    imagen = primeraVariacion.imagen;
    valor = primeraVariacion.valor;
    tamano = primeraVariacion.tamano || primeraVariacion.tamaño;
  } else {
    imagen = producto.imagen;
    valor = producto.valor;
    tamano = producto.tamano || producto.tamaño;
  }
  
  return `
    <div class="product-card">
      <div class="product-image">
        ${imagen ? `<img src="${imagen.startsWith('http') ? imagen : `assets/images/${imagen}`}" alt="${producto.nombre}">` : '📦'}
      </div>
      <div class="product-info">
        <span class="product-category">${producto.categoria}</span>
        <div class="product-name">${producto.nombre}</div>
        <div class="product-description">${descripcionCorta}</div>
        <div class="product-price">$${valor.toLocaleString()}</div>
        <div class="product-actions">
          <a href="pages/catalogo.html" class="btn-ver-mas">
            Ver en Catálogo
          </a>
        </div>
      </div>
    </div>
  `;
}
