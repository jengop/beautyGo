/**
 * GaleriaTrabajos – photo gallery grid
 * @param {Object} props
 * @param {string[]} props.images   - array of image URLs or placeholder keys
 * @param {string}  [props.title]
 * @returns {HTMLDivElement}
 */

const PLACEHOLDER_ICONS = ['✂', '💇', '💅', '💄', '💆', '🪒', '🌸', '✨', '🎀'];

export function GaleriaTrabajos({ images = [], title = 'Galería de trabajos' } = {}) {
  const section = document.createElement('div');

  const heading = document.createElement('h3');
  heading.style.cssText = 'font-size:1rem;font-weight:700;margin-bottom:1rem';
  heading.textContent = title;
  section.appendChild(heading);

  if (images.length === 0) {
    section.innerHTML += '<p style="color:var(--color-text-muted);font-size:.88rem">Sin fotos aún.</p>';
    return section;
  }

  const grid = document.createElement('div');
  grid.className = 'galeria-trabajos';

  images.forEach((src, idx) => {
    const item = document.createElement('div');
    item.className = 'galeria-trabajos__item';

    const isUrl = src && (src.startsWith('http') || src.startsWith('data:'));

    if (isUrl) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Trabajo ${idx + 1}`;
      item.appendChild(img);
    } else {
      // Styled placeholder with gradient and icon
      const hue = (idx * 47 + 320) % 360;
      item.style.background = `linear-gradient(135deg, hsl(${hue},55%,82%), hsl(${(hue + 30) % 360},50%,72%))`;
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.justifyContent = 'center';
      item.style.flexDirection = 'column';
      item.style.gap = '0.25rem';
      const icon = PLACEHOLDER_ICONS[idx % PLACEHOLDER_ICONS.length];
      item.innerHTML = `<span style="font-size:1.8rem">${icon}</span><span style="font-size:.65rem;font-weight:600;color:rgba(255,255,255,.85)">Foto ${idx + 1}</span>`;
    }

    grid.appendChild(item);
  });

  section.appendChild(grid);
  return section;
}
