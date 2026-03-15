import { Avatar } from '../common/Avatar.js';
import { RatingStars } from '../common/RatingStars.js';
import { formatDate } from '../../utils/formatters.js';

/**
 * CardReseña component
 * @param {import('../../types/index.js').Review} review
 * @returns {HTMLDivElement}
 */
export function CardReseña(review) {
  const { userName, userAvatar, rating, comment, date } = review;

  const card = document.createElement('div');
  card.className = 'card-resena';

  const header = document.createElement('div');
  header.className = 'card-resena__header';

  const avatarEl = Avatar({ src: userAvatar, name: userName, size: 'sm' });
  header.appendChild(avatarEl);

  const info = document.createElement('div');
  info.style.flex = '1';
  const author = document.createElement('div');
  author.className = 'card-resena__author';
  author.textContent = userName;
  const dateEl = document.createElement('div');
  dateEl.className = 'card-resena__date';
  dateEl.textContent = formatDate(date);
  info.appendChild(author);
  info.appendChild(dateEl);
  header.appendChild(info);

  const stars = RatingStars({ rating });
  header.appendChild(stars);

  const text = document.createElement('p');
  text.className = 'card-resena__text';
  text.textContent = comment;

  card.appendChild(header);
  card.appendChild(text);
  return card;
}
