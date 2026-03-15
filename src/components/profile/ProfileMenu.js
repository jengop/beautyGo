import { authService } from '../../services/authService.js';

/**
 * ProfileMenu component
 * @param {Object} props
 * @param {Function} [props.onNavigate]  - called with path
 * @returns {HTMLDivElement}
 */
export function ProfileMenu({ onNavigate } = {}) {
  const user = authService.getCurrentUser();

  const menuItems = [
    { icon: '👤', label: 'Mis datos',        path: '/profile'          },
    { icon: '📋', label: 'Mis reservas',      path: '/my-reservations'  },
    { icon: '💳', label: 'Métodos de pago',   path: '/profile#payments' },
    { icon: '📍', label: 'Mis direcciones',   path: '/profile#addresses'},
    ...(user?.role === 'professional' ? [
      { icon: '📊', label: 'Mi dashboard', path: '/dashboard' },
    ] : []),
    { icon: '🔔', label: 'Notificaciones',    path: '/profile#notif'    },
    { icon: '❓', label: 'Ayuda',             path: '/help'             },
    { icon: '🚪', label: 'Cerrar sesión',     path: '__logout__', danger: true },
  ];

  const menu = document.createElement('div');
  menu.className = 'profile-menu';

  menuItems.forEach(({ icon, label, path, danger }) => {
    const item = document.createElement('div');
    item.className = `profile-menu__item${danger ? ' danger' : ''}`;

    const iconEl = document.createElement('span');
    iconEl.className = 'profile-menu__icon';
    iconEl.textContent = icon;

    const labelEl = document.createElement('span');
    labelEl.textContent = label;

    const arrow = document.createElement('span');
    arrow.style.cssText = 'margin-left:auto;color:var(--color-text-muted)';
    arrow.textContent = '›';

    item.appendChild(iconEl);
    item.appendChild(labelEl);
    item.appendChild(arrow);

    item.addEventListener('click', () => {
      if (path === '__logout__') {
        authService.logout();
        history.pushState(null, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return;
      }
      if (onNavigate) onNavigate(path);
      else {
        history.pushState(null, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    });

    menu.appendChild(item);
  });

  return menu;
}
