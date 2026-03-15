import { Button } from '../common/Button.js';
import { paymentService } from '../../services/paymentService.js';
import { authService } from '../../services/authService.js';

/**
 * PaymentMethodCard component
 * @param {Object} props
 * @param {import('../../types/index.js').PaymentMethod} props.method
 * @param {Function} [props.onRemove]
 * @returns {HTMLDivElement}
 */
export function PaymentMethodCard({ method, onRemove } = {}) {
  const card = document.createElement('div');
  card.className = 'payment-method-card';

  const icon = document.createElement('span');
  icon.style.fontSize = '1.6rem';
  icon.textContent = method.icon || '💳';

  const info = document.createElement('div');
  info.style.flex = '1';

  const number = document.createElement('div');
  number.className = 'payment-method-card__number';
  number.textContent = method.last4 ? `${method.label}  ••••  ${method.last4}` : method.label;

  const exp = document.createElement('div');
  exp.className = 'payment-method-card__exp';
  exp.textContent = method.expiry ? `Vence: ${method.expiry}` : '';

  info.appendChild(number);
  if (method.expiry) info.appendChild(exp);

  card.appendChild(icon);
  card.appendChild(info);

  if (onRemove) {
    const removeBtn = Button({
      label: '🗑',
      variant: 'ghost',
      size: 'sm',
      onClick: async () => {
        const user = authService.getCurrentUser();
        await paymentService.removeMethod(user?.id, method.id);
        window.toast?.success('Método de pago eliminado.');
        onRemove(method.id);
      },
    });
    card.appendChild(removeBtn);
  }

  return card;
}
