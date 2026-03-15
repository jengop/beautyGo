import { Button } from '../common/Button.js';
import { userService } from '../../services/userService.js';
import { authService } from '../../services/authService.js';

/**
 * AddressCard component
 * @param {Object} props
 * @param {import('../../types/index.js').Address} props.address
 * @param {Function} [props.onRemove]
 * @returns {HTMLDivElement}
 */
export function AddressCard({ address, onRemove } = {}) {
  const card = document.createElement('div');
  card.className = 'address-card';

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:.4rem';

  const label = document.createElement('div');
  label.className = 'address-card__label';
  label.textContent = `📍 ${address.label}`;

  header.appendChild(label);

  if (onRemove) {
    const removeBtn = Button({
      label: '🗑',
      variant: 'ghost',
      size: 'sm',
      onClick: async () => {
        const user = authService.getCurrentUser();
        await userService.removeAddress(user?.id, address.id);
        window.toast?.success('Dirección eliminada.');
        onRemove(address.id);
      },
    });
    header.appendChild(removeBtn);
  }

  const text = document.createElement('div');
  text.className = 'address-card__text';
  text.textContent = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;

  card.appendChild(header);
  card.appendChild(text);
  return card;
}
