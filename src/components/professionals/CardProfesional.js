import { Avatar } from '../common/Avatar.js';
import { RatingStars } from '../common/RatingStars.js';
import { Button } from '../common/Button.js';
import { formatCurrency } from '../../utils/formatters.js';

/**
 * CardProfesional — matches Beauty & Go Figma card layout:
 * [image | name, specialty, rating, price, actions]
 *
 * @param {import('../../types/index.js').Professional} professional
 * @param {Function} [onClick]
 * @returns {HTMLDivElement}
 */
export function CardProfesional(professional, onClick) {
  const { id, name, specialty, avatar, rating, reviewCount, basePrice } = professional;

  const card = document.createElement('div');
  card.className = 'card-profesional';

  // Left: image thumbnail
  const img = document.createElement('div');
  img.className = 'card-profesional__img';
  if (avatar) {
    const imgEl = document.createElement('img');
    imgEl.src = avatar;
    imgEl.alt = name;
    imgEl.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md)';
    img.appendChild(imgEl);
    img.style.background = 'none';
  } else {
    // Placeholder with initials
    img.appendChild(Avatar({ name, size: 'md' }));
    img.querySelector('.avatar').style.cssText = 'width:90px;height:90px;font-size:1.4rem';
  }
  card.appendChild(img);

  // Right: content
  const content = document.createElement('div');
  content.className = 'card-profesional__content';

  const nameEl = document.createElement('div');
  nameEl.className = 'card-profesional__name';
  nameEl.textContent = name;

  const specialtyEl = document.createElement('div');
  specialtyEl.className = 'card-profesional__specialty';
  specialtyEl.textContent = specialty;

  const ratingEl = document.createElement('div');
  ratingEl.className = 'card-profesional__rating';
  ratingEl.appendChild(RatingStars({ rating, count: reviewCount }));

  const priceEl = document.createElement('div');
  priceEl.className = 'card-profesional__price';
  priceEl.textContent = `Desde ${formatCurrency(basePrice)}`;

  const actions = document.createElement('div');
  actions.className = 'card-profesional__actions';

  const reservarBtn = Button({
    label: 'Reservar Servicio',
    variant: 'primary',
    size: 'sm',
    onClick: (e) => {
      e.stopPropagation();
      history.pushState(null, '', `/booking/${id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    },
  });

  const verPerfilBtn = Button({
    label: 'Ver perfil',
    variant: 'ghost',
    size: 'sm',
    onClick: (e) => {
      e.stopPropagation();
      history.pushState(null, '', `/professional/${id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    },
  });

  // Style "Ver perfil" as a text link
  verPerfilBtn.style.cssText = 'color:var(--color-primary);text-decoration:underline;padding-left:0;background:none;border:none;font-size:.82rem;cursor:pointer;font-family:var(--font-body);font-weight:500';

  actions.appendChild(reservarBtn);
  actions.appendChild(verPerfilBtn);

  content.appendChild(nameEl);
  content.appendChild(specialtyEl);
  content.appendChild(ratingEl);
  content.appendChild(priceEl);
  content.appendChild(actions);
  card.appendChild(content);

  card.addEventListener('click', () => {
    if (onClick) onClick(professional);
    else {
      history.pushState(null, '', `/professional/${id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  });

  return card;
}
