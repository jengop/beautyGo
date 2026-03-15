import { getInitials } from '../../utils/formatters.js';

/**
 * Avatar component
 * @param {Object} props
 * @param {string} [props.src]    - image URL
 * @param {string} [props.name]   - used for initials fallback
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {string} [props.className]
 * @returns {HTMLElement}
 */
export function Avatar({ src, name = '', size = 'md', className = '' } = {}) {
  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = name;
    img.className = `avatar avatar--${size} ${className}`.trim();
    return img;
  }

  const span = document.createElement('span');
  span.className = `avatar avatar--${size} ${className}`.trim();
  span.textContent = getInitials(name);

  // Generate a consistent color from the name
  const colors = ['#4f46e5', '#7c3aed', '#db2777', '#0891b2', '#059669', '#d97706'];
  const idx = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  span.style.background = colors[idx];

  return span;
}
