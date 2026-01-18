// ====================================
// PÁGINA PRINCIPAL
// ====================================

// Usar la URL dinámicamente para funcionar en producción
const API_URL = `${window.location.origin}/api`;

document.addEventListener('DOMContentLoaded', () => {
  cargarCategorias();
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
    
    // Renderizamos las categorías
    gridCategorias.innerHTML = categorias
      .filter(cat => cat && String(cat).trim())
      .map(cat => {
        const categoria = String(cat).trim();
        return `
          <a href="pages/catalogo.html?categoria=${encodeURIComponent(categoria)}" 
             class="category-item"
             data-category="${categoria.toLowerCase()}">
            ${categoria}
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
