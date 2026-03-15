/**
 * CardMetodoPago component
 * @param {Object} props
 * @param {import('../../types/index.js').PaymentMethod} props.method
 * @param {boolean} [props.selected]
 * @param {Function} [props.onSelect]
 * @returns {HTMLDivElement}
 */
export function CardMetodoPago({ method, selected = false, onSelect } = {}) {
  const card = document.createElement('div');
  card.className = `card-metodo-pago${selected ? ' selected' : ''}`;

  const icon = document.createElement('span');
  icon.className = 'card-metodo-pago__icon';
  icon.textContent = method.icon || '💳';

  const info = document.createElement('div');
  info.style.flex = '1';

  const name = document.createElement('div');
  name.className = 'card-metodo-pago__name';
  name.textContent = method.label;

  const detail = document.createElement('div');
  detail.className = 'card-metodo-pago__detail';
  detail.textContent = method.last4 ? `•••• ${method.last4}  |  Exp. ${method.expiry}` : 'Método alternativo';

  info.appendChild(name);
  info.appendChild(detail);

  const radio = document.createElement('span');
  radio.style.cssText = 'font-size:1.2rem;color:var(--color-primary)';
  radio.textContent = selected ? '🔵' : '⚪';

  card.appendChild(icon);
  card.appendChild(info);
  card.appendChild(radio);

  card.addEventListener('click', () => {
    if (onSelect) onSelect(method);
  });

  return card;
}
