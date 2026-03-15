import { formatCurrency, formatDuration } from '../../utils/formatters.js';
import { Button } from '../common/Button.js';

/**
 * ListaServicios component
 * @param {Object} props
 * @param {import('../../types/index.js').Service[]} props.services
 * @param {string} [props.professionalId]
 * @param {boolean} [props.selectable]    - show "Reservar" per row
 * @param {Function} [props.onSelect]     - called with service when clicked
 * @returns {HTMLDivElement}
 */
export function ListaServicios({ services = [], professionalId, selectable = false, onSelect } = {}) {
  const wrapper = document.createElement('div');

  const heading = document.createElement('h3');
  heading.style.cssText = 'font-size:1rem;font-weight:700;margin-bottom:1rem';
  heading.textContent = 'Servicios';
  wrapper.appendChild(heading);

  if (services.length === 0) {
    wrapper.innerHTML += '<p style="color:var(--color-text-muted);font-size:.88rem">Sin servicios registrados.</p>';
    return wrapper;
  }

  const list = document.createElement('ul');

  services.forEach((service) => {
    const item = document.createElement('li');
    item.className = 'lista-servicios__item';

    const left = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'lista-servicios__name';
    name.textContent = service.name;
    const duration = document.createElement('div');
    duration.className = 'lista-servicios__duration';
    duration.textContent = `⏱ ${formatDuration(service.duration)}`;
    left.appendChild(name);
    left.appendChild(duration);

    const right = document.createElement('div');
    right.style.cssText = 'display:flex;align-items:center;gap:.75rem';
    const price = document.createElement('span');
    price.className = 'lista-servicios__price';
    price.textContent = formatCurrency(service.price);
    right.appendChild(price);

    if (selectable) {
      const btn = Button({ label: 'Reservar', variant: 'primary', size: 'sm', onClick: () => {
        if (onSelect) onSelect(service);
        else {
          history.pushState(null, '', `/booking/${professionalId}?service=${service.id}`);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }});
      right.appendChild(btn);
    }

    item.appendChild(left);
    item.appendChild(right);
    list.appendChild(item);
  });

  wrapper.appendChild(list);
  return wrapper;
}
