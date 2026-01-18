// ====================================
// PÁGINA PRINCIPAL
// ====================================

const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
  cargarCategorias();
});

async function cargarCategorias() {
  console.log('Iniciando carga de categorías...');
  try {
    console.log('Solicitando categorías a:', `${API_URL}/categorias`);
    const response = await fetch(`${API_URL}/categorias`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const categorias = await response.json();
    console.log('Categorías recibidas:', categorias);
    
    const gridCategorias = document.getElementById('categoriesGrid');
    if (gridCategorias) {
      console.log('Contenedor de categorías encontrado');
      if (categorias && categorias.length > 0) {
        gridCategorias.innerHTML = categorias.map(cat => `
          <a href="pages/catalogo.html?categoria=${encodeURIComponent(cat)}" class="category-item">
            ${cat}
          </a>
        `).join('');
        console.log('Categorías renderizadas:', categorias);
      } else {
        gridCategorias.innerHTML = '<p>No se encontraron categorías</p>';
        console.warn('No se encontraron categorías');
      }
    } else {
      console.error('No se encontró el elemento con ID categoriesGrid');
    }
  } catch (error) {
    console.error('Error cargando categorías:', error);
    const gridCategorias = document.getElementById('categoriesGrid');
    if (gridCategorias) {
      gridCategorias.innerHTML = '<p>Error al cargar las categorías. Por favor, intente recargar la página.</p>';
    }
  }
}
