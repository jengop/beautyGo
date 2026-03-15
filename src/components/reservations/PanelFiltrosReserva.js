/**
 * PanelFiltrosReserva component
 * @param {Object} props
 * @param {string}   props.activeFilter
 * @param {Function} props.onChange   - called with new filter string
 * @returns {HTMLDivElement}
 */
export function PanelFiltrosReserva({ activeFilter = 'all', onChange } = {}) {
  const filters = [
    { key: 'all',       label: 'Todas'       },
    { key: 'confirmed', label: 'Confirmadas' },
    { key: 'pending',   label: 'Pendientes'  },
    { key: 'completed', label: 'Completadas' },
    { key: 'cancelled', label: 'Canceladas'  },
  ];

  const panel = document.createElement('div');
  panel.className = 'panel-filtros';

  filters.forEach(({ key, label }) => {
    const btn = document.createElement('button');
    btn.className = `filtro-btn${key === activeFilter ? ' active' : ''}`;
    btn.textContent = label;
    btn.addEventListener('click', () => {
      panel.querySelectorAll('.filtro-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (onChange) onChange(key);
    });
    panel.appendChild(btn);
  });

  return panel;
}
