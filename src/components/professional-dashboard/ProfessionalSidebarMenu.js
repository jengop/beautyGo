/**
 * ProfessionalSidebarMenu component
 * @param {Object} props
 * @param {string} [props.active]  - active path
 * @returns {HTMLDivElement}
 */
export function ProfessionalSidebarMenu({ active = '/dashboard' } = {}) {
  const sections = [
    {
      title: 'Principal',
      items: [
        { icon: '📊', label: 'Resumen',       path: '/dashboard'            },
        { icon: '📅', label: 'Agenda',         path: '/dashboard/agenda'    },
        { icon: '🔔', label: 'Notificaciones', path: '/dashboard/notifs'    },
      ],
    },
    {
      title: 'Gestión',
      items: [
        { icon: '✂', label: 'Mis servicios',  path: '/dashboard/services'  },
        { icon: '🖼', label: 'Galería',        path: '/dashboard/gallery'   },
        { icon: '⭐', label: 'Reseñas',        path: '/dashboard/reviews'   },
      ],
    },
    {
      title: 'Cuenta',
      items: [
        { icon: '👤', label: 'Mi perfil',      path: '/profile'             },
        { icon: '💳', label: 'Pagos',          path: '/dashboard/payments'  },
        { icon: '⚙',  label: 'Configuración',  path: '/dashboard/settings'  },
      ],
    },
  ];

  const sidebar = document.createElement('div');
  sidebar.className = 'pro-sidebar';

  sections.forEach(({ title, items }) => {
    const secHeader = document.createElement('div');
    secHeader.className = 'pro-sidebar__header';
    secHeader.textContent = title;
    sidebar.appendChild(secHeader);

    items.forEach(({ icon, label, path }) => {
      const item = document.createElement('div');
      item.className = `pro-sidebar__item${path === active ? ' active' : ''}`;

      const iconEl = document.createElement('span');
      iconEl.textContent = icon;

      const labelEl = document.createElement('span');
      labelEl.textContent = label;

      item.appendChild(iconEl);
      item.appendChild(labelEl);

      item.addEventListener('click', () => {
        history.pushState(null, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      sidebar.appendChild(item);
    });
  });

  return sidebar;
}
