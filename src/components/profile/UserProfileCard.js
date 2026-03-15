import { Avatar } from '../common/Avatar.js';
import { Button } from '../common/Button.js';
import { Badge } from '../common/Badge.js';

/**
 * UserProfileCard component
 * @param {Object} props
 * @param {import('../../types/index.js').User} props.user
 * @param {Function} [props.onEdit]
 * @returns {HTMLDivElement}
 */
export function UserProfileCard({ user, onEdit } = {}) {
  const card = document.createElement('div');
  card.className = 'card';

  const body = document.createElement('div');
  body.className = 'user-profile-card';

  const avatarEl = Avatar({ src: user?.avatar, name: user?.name, size: 'xl' });
  body.appendChild(avatarEl);

  const info = document.createElement('div');
  info.className = 'user-profile-card__info';

  const name = document.createElement('h2');
  name.textContent = user?.name || 'Usuario';

  const email = document.createElement('p');
  email.textContent = user?.email || '';

  const phone = document.createElement('p');
  phone.textContent = user?.phone ? `📞 ${user.phone}` : '';

  const roleBadge = Badge({
    label: user?.role === 'professional' ? 'Profesional' : 'Cliente',
    variant: user?.role === 'professional' ? 'primary' : 'success',
  });

  info.appendChild(name);
  info.appendChild(email);
  if (user?.phone) info.appendChild(phone);
  info.appendChild(roleBadge);

  body.appendChild(info);
  card.appendChild(body);

  if (onEdit) {
    const footer = document.createElement('div');
    footer.className = 'card__footer';
    const editBtn = Button({ label: 'Editar perfil', variant: 'secondary', size: 'sm', onClick: onEdit });
    footer.appendChild(editBtn);
    card.appendChild(footer);
  }

  return card;
}
