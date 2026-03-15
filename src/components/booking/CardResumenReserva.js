import { formatCurrency, formatDate, formatTime } from '../../utils/formatters.js';

/**
 * CardResumenReserva component
 * @param {Object} props
 * @param {string}  props.professionalName
 * @param {string}  props.serviceName
 * @param {number}  props.servicePrice
 * @param {string}  [props.date]
 * @param {string}  [props.time]
 * @param {number}  [props.serviceFee=0]
 * @returns {HTMLDivElement}
 */
export function CardResumenReserva({ professionalName, serviceName, servicePrice, date, time, serviceFee = 0 } = {}) {
  const card = document.createElement('div');
  card.className = 'card';

  const header = document.createElement('div');
  header.className = 'card__header';
  header.textContent = 'Resumen de tu reserva';
  card.appendChild(header);

  const body = document.createElement('div');
  body.className = 'card-resumen';

  const rows = [
    { label: 'Profesional',  value: professionalName || '—' },
    { label: 'Servicio',     value: serviceName || '—'      },
    { label: 'Fecha',        value: date ? formatDate(date) : '—' },
    { label: 'Hora',         value: time ? formatTime(time) : '—' },
    { label: 'Precio',       value: formatCurrency(servicePrice || 0) },
    ...(serviceFee > 0 ? [{ label: 'Cargo de servicio', value: formatCurrency(serviceFee) }] : []),
  ];

  rows.forEach(({ label, value }) => {
    const row = document.createElement('div');
    row.className = 'card-resumen__row';
    row.innerHTML = `<span style="color:var(--color-text-muted)">${label}</span><span>${value}</span>`;
    body.appendChild(row);
  });

  const total = document.createElement('div');
  total.className = 'card-resumen__row card-resumen__row--total';
  total.innerHTML = `<span>Total</span><span>${formatCurrency((servicePrice || 0) + serviceFee)}</span>`;
  body.appendChild(total);

  card.appendChild(body);
  return card;
}
