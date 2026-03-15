import { CardProfesional } from '../components/professionals/CardProfesional.js';
import { professionalService } from '../services/professionalService.js';
import { useFetch } from '../hooks/useFetch.js';

export function Professionals() {
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q') || '';

  const page = document.createElement('div');
  page.className = 'container page';

  // Header
  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem';
  header.innerHTML = `<h1 style="font-size:1.5rem;font-weight:800">Profesionales</h1>`;

  const searchRow = document.createElement('div');
  searchRow.style.cssText = 'display:flex;gap:.5rem';
  searchRow.innerHTML = `
    <input class="input" id="search-input" type="text" placeholder="Buscar..." value="${initialQuery}" style="width:220px" />
    <button class="btn btn--primary btn--sm" id="search-btn">Buscar</button>`;
  header.appendChild(searchRow);
  page.appendChild(header);

  // Filters row
  const filterRow = document.createElement('div');
  filterRow.style.cssText = 'display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.5rem';
  ['Todos', 'Disponibles', 'Mejor valorados'].forEach((f, i) => {
    const btn = document.createElement('button');
    btn.className = `filtro-btn${i === 0 ? ' active' : ''}`;
    btn.textContent = f;
    btn.addEventListener('click', () => {
      filterRow.querySelectorAll('.filtro-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
    filterRow.appendChild(btn);
  });
  page.appendChild(filterRow);

  // Grid
  const grid = document.createElement('div');
  grid.className = 'grid-3';
  grid.innerHTML = '<p style="color:var(--color-text-muted)">Cargando profesionales...</p>';
  page.appendChild(grid);

  function loadProfessionals(query = '') {
    grid.innerHTML = '<p style="color:var(--color-text-muted)">Cargando...</p>';
    useFetch(
      () => query ? professionalService.search(query) : professionalService.getAll(),
      ({ data, loading, error }) => {
        if (loading) return;
        grid.innerHTML = '';
        if (error) { grid.innerHTML = `<p style="color:var(--color-danger)">${error}</p>`; return; }
        if (data.length === 0) {
          grid.innerHTML = '<p style="color:var(--color-text-muted)">No se encontraron profesionales.</p>';
          return;
        }
        data.forEach((pro) => grid.appendChild(CardProfesional(pro)));
      }
    );
  }

  loadProfessionals(initialQuery);

  page.querySelector('#search-btn').addEventListener('click', () => {
    const q = page.querySelector('#search-input').value.trim();
    loadProfessionals(q);
  });

  page.querySelector('#search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') page.querySelector('#search-btn').click();
  });

  return page;
}
