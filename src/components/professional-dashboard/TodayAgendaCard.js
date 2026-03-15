import { Avatar } from '../common/Avatar.js';
import { statusBadge } from '../common/Badge.js';
import { formatTime } from '../../utils/formatters.js';

/**
 * TodayAgendaCard component
 * @param {Object} props
 * @param {Array}  props.appointments   - today's reservation list
 * @returns {HTMLDivElement}
 */
export function TodayAgendaCard({ appointments = [] } = {}) {
  const card = document.createElement('div');
  card.className = 'card';

  const header = document.createElement('div');
  header.className = 'card__header';
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.innerHTML = `<span>Agenda de hoy</span><span style="font-size:.82rem;color:var(--color-text-muted);font-weight:400">${appointments.length} citas</span>`;
  card.appendChild(header);

  const list = document.createElement('div');
  list.className = 'today-agenda';

  if (appointments.length === 0) {
    const empty = document.createElement('div');
    empty.style.cssText = 'padding:1.5rem;text-align:center;color:var(--color-text-muted);font-size:.88rem';
    empty.textContent = 'Sin citas para hoy 🎉';
    list.appendChild(empty);
  } else {
    appointments.forEach((appt) => {
      const item = document.createElement('div');
      item.className = 'today-agenda__item';

      const time = document.createElement('div');
      time.className = 'today-agenda__time';
      time.textContent = appt.time ? formatTime(appt.time) : '—';

      const avatarEl = Avatar({ name: appt.clientName || 'C', size: 'sm' });

      const details = document.createElement('div');
      details.style.flex = '1';
      const service = document.createElement('div');
      service.className = 'today-agenda__service';
      service.textContent = appt.serviceName || 'Servicio';
      const client = document.createElement('div');
      client.className = 'today-agenda__client';
      client.textContent = appt.clientName || 'Cliente';
      details.appendChild(service);
      details.appendChild(client);

      const badge = statusBadge(appt.status);

      item.appendChild(time);
      item.appendChild(avatarEl);
      item.appendChild(details);
      item.appendChild(badge);
      list.appendChild(item);
    });
  }

  card.appendChild(list);
  return card;
}
