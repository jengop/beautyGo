/**
 * Format a number as currency (RD$ or USD)
 * @param {number} amount
 * @param {string} [currency='RD$']
 */
export function formatCurrency(amount, currency = 'RD$') {
  return `${currency} ${amount.toLocaleString('es-DO', { minimumFractionDigits: 2 })}`;
}

/**
 * Format an ISO date string to locale date
 * @param {string} dateStr
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Format minutes to "Xh Ym" or "Xm"
 * @param {number} minutes
 */
export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

/**
 * Get user initials from a full name
 * @param {string} name
 */
export function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/**
 * Capitalize first letter
 * @param {string} str
 */
export function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format a time slot "HH:MM" to "H:MM AM/PM"
 * @param {string} time  e.g. "14:30"
 */
export function formatTime(time) {
  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

/**
 * Truncate text to maxLength characters
 * @param {string} text
 * @param {number} maxLength
 */
export function truncate(text = '', maxLength = 100) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
