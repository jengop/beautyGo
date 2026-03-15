import { authService } from '../../services/authService.js';
import { Avatar } from './Avatar.js';

export function Navbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  function render(user) {
    nav.innerHTML = '';

    // Logo
    const logo = document.createElement('a');
    logo.href = '/';
    logo.setAttribute('data-link', '');
    logo.className = 'navbar__logo';
    logo.innerHTML = `<span style="font-size:1.1rem">🌸</span> Beauty & Go`;
    nav.appendChild(logo);

    // Links
    const links = document.createElement('div');
    links.className = 'navbar__links';
    const navLinks = [
      { label: 'Inicio',        href: '/'               },
      { label: 'Profesionales', href: '/professionals'  },
      ...(user ? [
        { label: 'Mis Reservas', href: '/my-reservations' },
        ...(user.role === 'professional' ? [{ label: 'Dashboard', href: '/dashboard' }] : []),
      ] : []),
    ];
    navLinks.forEach(({ label, href }) => {
      const a = document.createElement('a');
      a.href = href;
      a.setAttribute('data-link', '');
      a.className = 'navbar__link';
      a.textContent = label;
      if (window.location.pathname === href) a.classList.add('active');
      links.appendChild(a);
    });
    nav.appendChild(links);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'navbar__actions';

    if (user) {
      const avatarEl = Avatar({ name: user.name, size: 'sm' });
      avatarEl.style.cursor = 'pointer';
      avatarEl.title = user.name;
      avatarEl.addEventListener('click', () => {
        history.pushState(null, '', '/profile');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      actions.appendChild(avatarEl);

      const logoutBtn = document.createElement('button');
      logoutBtn.className = 'btn btn--ghost btn--sm';
      logoutBtn.textContent = 'Salir';
      logoutBtn.addEventListener('click', () => {
        authService.logout();
        history.pushState(null, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      actions.appendChild(logoutBtn);
    } else {
      const loginLink = document.createElement('a');
      loginLink.href = '/auth';
      loginLink.setAttribute('data-link', '');
      loginLink.className = 'btn btn--secondary btn--sm';
      loginLink.textContent = 'Iniciar sesión';
      actions.appendChild(loginLink);

      const registerLink = document.createElement('a');
      registerLink.href = '/auth';
      registerLink.setAttribute('data-link', '');
      registerLink.className = 'btn btn--primary btn--sm';
      registerLink.textContent = 'Registrarse';
      actions.appendChild(registerLink);
    }

    nav.appendChild(actions);
  }

  render(authService.getCurrentUser());
  authService.onAuthStateChanged((user) => render(user));

  return nav;
}
