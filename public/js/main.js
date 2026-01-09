// ====================================
// PÁGINA PRINCIPAL
// ====================================

const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
  cargarCategorias();
});

async function cargarCategorias() {
  try {
    const response = await fetch(`${API_URL}/categorias`);
    const categorias = await response.json();
    
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
