/**
 * CalendarioReserva component
 * @param {Object} props
 * @param {string} [props.selectedDate]   - 'YYYY-MM-DD'
 * @param {Function} props.onSelect       - called with 'YYYY-MM-DD'
 * @param {string[]} [props.disabledDates]
 * @returns {HTMLDivElement}
 */
export function CalendarioReserva({ selectedDate, onSelect, disabledDates = [] } = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'calendario-reserva';

  const today = new Date();
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();

  const DAY_NAMES = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  function toKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }

  function render() {
    wrapper.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'calendario-reserva__header';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn btn--ghost btn--sm';
    prevBtn.textContent = '←';
    prevBtn.addEventListener('click', () => {
      if (viewMonth === 0) { viewMonth = 11; viewYear--; } else viewMonth--;
      render();
    });

    const title = document.createElement('span');
    title.className = 'calendario-reserva__title';
    title.textContent = `${MONTH_NAMES[viewMonth]} ${viewYear}`;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn--ghost btn--sm';
    nextBtn.textContent = '→';
    nextBtn.addEventListener('click', () => {
      if (viewMonth === 11) { viewMonth = 0; viewYear++; } else viewMonth++;
      render();
    });

    header.appendChild(prevBtn);
    header.appendChild(title);
    header.appendChild(nextBtn);
    wrapper.appendChild(header);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'calendario-reserva__grid';

    // Day names
    DAY_NAMES.forEach((d) => {
      const dn = document.createElement('div');
      dn.className = 'calendario-reserva__day-name';
      dn.textContent = d;
      grid.appendChild(dn);
    });

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      grid.appendChild(empty);
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewYear, viewMonth, d);
      const key = toKey(date);
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isDisabled = isPast || disabledDates.includes(key);
      const isToday = key === toKey(today);
      const isSelected = key === selectedDate;

      const cell = document.createElement('div');
      cell.className = [
        'calendario-reserva__day',
        isToday ? 'today' : '',
        isSelected ? 'selected' : '',
        isDisabled ? 'disabled' : '',
      ].filter(Boolean).join(' ');
      cell.textContent = d;

      if (!isDisabled) {
        cell.addEventListener('click', () => {
          selectedDate = key;
          if (onSelect) onSelect(key);
          render();
        });
      }

      grid.appendChild(cell);
    }

    wrapper.appendChild(grid);
  }

  render();
  return wrapper;
}
