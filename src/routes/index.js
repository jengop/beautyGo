import { Home } from '../pages/Home.js';
import { Professionals } from '../pages/Professionals.js';
import { ProfessionalProfile } from '../pages/ProfessionalProfile.js';
import { Booking } from '../pages/Booking.js';
import { MyReservations } from '../pages/MyReservations.js';
import { UserProfile } from '../pages/UserProfile.js';
import { ProfessionalDashboard } from '../pages/ProfessionalDashboard.js';
import { Auth } from '../pages/Auth.js';

const routes = [
  { path: '/',                    page: Home                  },
  { path: '/professionals',       page: Professionals         },
  { path: '/professional/:id',    page: ProfessionalProfile   },
  { path: '/booking/:id',         page: Booking               },
  { path: '/my-reservations',     page: MyReservations        },
  { path: '/profile',             page: UserProfile           },
  { path: '/dashboard',           page: ProfessionalDashboard },
  { path: '/auth',                page: Auth                  },
];

export class Router {
  constructor(outlet) {
    this.outlet = outlet;
    this.routes = routes;
  }

  init() {
    window.addEventListener('popstate', () => this._render());
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
    this._render();
  }

  navigate(path) {
    history.pushState(null, '', path);
    this._render();
  }

  _matchRoute(path) {
    for (const route of this.routes) {
      const paramNames = [];
      const regexStr = route.path.replace(/:([^/]+)/g, (_, name) => {
        paramNames.push(name);
        return '([^/]+)';
      });
      const regex = new RegExp(`^${regexStr}$`);
      const match = path.match(regex);
      if (match) {
        const params = {};
        paramNames.forEach((name, i) => (params[name] = match[i + 1]));
        return { page: route.page, params };
      }
    }
    return null;
  }

  _render() {
    const path = window.location.pathname;
    const matched = this._matchRoute(path);
    this.outlet.innerHTML = '';
    if (matched) {
      const pageEl = matched.page(matched.params || {});
      this.outlet.appendChild(pageEl);
    } else {
      this.outlet.innerHTML = `
        <div class="container page" style="text-align:center;padding-top:5rem">
          <h1 style="font-size:4rem;color:var(--color-border)">404</h1>
          <p style="color:var(--color-text-muted);margin:.5rem 0 1.5rem">Página no encontrada</p>
          <a href="/" data-link class="btn btn--primary">Volver al inicio</a>
        </div>`;
    }
    window.scrollTo(0, 0);
    // Update active nav links
    document.querySelectorAll('.navbar__link').forEach((el) => {
      el.classList.toggle('active', el.getAttribute('href') === path);
    });
  }
}

// Global helper
export function navigate(path) {
  history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
