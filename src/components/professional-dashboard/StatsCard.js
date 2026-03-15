/**
 * StatsCard component
 * @param {Object} props
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {string} [props.icon]
 * @param {string} [props.change]    - e.g. '+12%' or '-3%'
 * @returns {HTMLDivElement}
 */
export function StatsCard({ label, value, icon = '', change } = {}) {
  const card = document.createElement('div');
  card.className = 'stats-card';

  const lbl = document.createElement('div');
  lbl.className = 'stats-card__label';
  lbl.textContent = `${icon}  ${label}`;

  const val = document.createElement('div');
  val.className = 'stats-card__value';
  val.textContent = value;

  card.appendChild(lbl);
  card.appendChild(val);

  if (change !== undefined) {
    const isUp = String(change).startsWith('+');
    const changeEl = document.createElement('div');
    changeEl.className = `stats-card__change ${isUp ? 'up' : 'down'}`;
    changeEl.textContent = `${isUp ? '▲' : '▼'} ${change} vs mes anterior`;
    card.appendChild(changeEl);
  }

  return card;
}
