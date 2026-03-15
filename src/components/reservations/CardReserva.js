import { Avatar } from '../common/Avatar.js';
import { statusBadge } from '../common/Badge.js';
import { Button } from '../common/Button.js';
import { formatDate, formatTime } from '../../utils/formatters.js';
import { reservationService } from '../../services/reservationService.js';

/**
 * CardReserva component
 * @param {Object} props
 * @param {import('../../types/index.js').Reservation} props.reservation
 * @param {import('../../types/index.js').Professional} [props.professional]
 * @param {Function} [props.onUpdate]  - called after status change
 * @returns {HTMLDivElement}
 */
export function CardReserva({ reservation, professional, onUpdate } = {}) {
  const { id, serviceName, date, time, status } = reservation;
  const proName = professional?.name || 'Profesional';

  const card = document.createElement('div');
  card.className = 'card-reserva';

  const avatarEl = Avatar({ name: proName, size: 'md' });
  card.appendChild(avatarEl);

  const info = document.createElement('div');
  info.className = 'card-reserva__info';

  const service = document.createElement('div');
  service.className = 'card-reserva__service';
  service.textContent = serviceName || 'Servicio';

  const pro = document.createElement('div');
  pro.className = 'card-reserva__pro';
  pro.textContent = `con ${proName}`;

  const datetime = document.createElement('div');
  datetime.className = 'card-reserva__datetime';
  datetime.innerHTML = `📅 ${date ? formatDate(date) : '—'}  🕐 ${time ? formatTime(time) : '—'}`;

  const badgeEl = statusBadge(status);

  const actions = document.createElement('div');
  actions.className = 'card-reserva__actions';

  if (status === 'confirmed' || status === 'pending') {
    const cancelBtn = Button({
      label: 'Cancelar',
      variant: 'danger',
      size: 'sm',
      onClick: async () => {
        cancelBtn.disabled = true;
        cancelBtn.textContent = '...';
        try {
          await reservationService.cancel(id);
          window.toast?.success('Reserva cancelada.');
          if (onUpdate) onUpdate();
        } catch (err) {
          window.toast?.error(err.message);
        }
      },
    });
    actions.appendChild(cancelBtn);
  }

  const detailBtn = Button({
    label: 'Ver detalles',
    variant: 'ghost',
    size: 'sm',
    onClick: () => {
      history.pushState(null, '', `/booking/${reservation.professionalId}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    },
  });
  actions.appendChild(detailBtn);

  info.appendChild(service);
  info.appendChild(pro);
  info.appendChild(datetime);
  info.appendChild(badgeEl);
  info.appendChild(actions);
  card.appendChild(info);

  return card;
}
