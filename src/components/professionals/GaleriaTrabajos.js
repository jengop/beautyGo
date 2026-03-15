/**
 * GaleriaTrabajos – photo gallery grid
 * @param {Object} props
 * @param {string[]} props.images   - array of image URLs (null = placeholder)
 * @param {string}  [props.title]
 * @returns {HTMLDivElement}
 */
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

    if (src) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Trabajo ${idx + 1}`;
      item.appendChild(img);
    } else {
      // Placeholder gradient
      item.style.background = `hsl(${(idx * 47) % 360},45%,75%)`;
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.justifyContent = 'center';
      item.innerHTML = '<span style="font-size:1.5rem;opacity:.5">🖼</span>';
    }

    item.addEventListener('click', () => {
      if (src) window.open(src, '_blank');
    });

    grid.appendChild(item);
  });

  section.appendChild(grid);
  return section;
}
