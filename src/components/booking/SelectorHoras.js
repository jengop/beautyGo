import { formatTime } from '../../utils/formatters.js';

/**
 * SelectorHoras component
 * @param {Object} props
 * @param {string[]} props.slots          - available time strings 'HH:MM'
 * @param {string[]} [props.unavailable]  - booked/unavailable slots
 * @param {string}   [props.selected]     - currently selected slot
 * @param {Function} props.onSelect       - called with 'HH:MM'
 * @returns {HTMLDivElement}
 */
export function SelectorHoras({ slots = [], unavailable = [], selected, onSelect } = {}) {
  const wrapper = document.createElement('div');

  const heading = document.createElement('p');
  heading.style.cssText = 'font-weight:600;font-size:.9rem;margin-bottom:.75rem';
  heading.textContent = 'Selecciona una hora';
  wrapper.appendChild(heading);

  if (slots.length === 0) {
    const msg = document.createElement('p');
    msg.style.cssText = 'color:var(--color-text-muted);font-size:.88rem';
    msg.textContent = 'No hay horarios disponibles para este día.';
    wrapper.appendChild(msg);
    return wrapper;
  }

  const grid = document.createElement('div');
  grid.className = 'selector-horas';

  slots.forEach((slot) => {
    const isUnavailable = unavailable.includes(slot);
    const isSelected = slot === selected;

    const btn = document.createElement('div');
    btn.className = [
      'selector-horas__slot',
      isSelected ? 'selected' : '',
      isUnavailable ? 'disabled' : '',
    ].filter(Boolean).join(' ');
    btn.textContent = formatTime(slot);

    if (!isUnavailable) {
      btn.addEventListener('click', () => {
        selected = slot;
        if (onSelect) onSelect(slot);
        // Update selection visually
        grid.querySelectorAll('.selector-horas__slot').forEach((el) => {
          el.classList.toggle('selected', el === btn);
        });
      });
    }

    grid.appendChild(btn);
  });

  wrapper.appendChild(grid);
  return wrapper;
}

/** Generate time slots from startHour to endHour every intervalMin */
export function generateSlots(startHour = 8, endHour = 18, intervalMin = 30) {
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += intervalMin) {
      slots.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
    }
  }
  return slots;
}
