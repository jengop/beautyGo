import { Router } from './routes/index.js';
import { Navbar } from './components/common/Navbar.js';
import { Footer } from './components/common/Footer.js';
import { ToastService } from './utils/toast.js';

// Initialize global toast service
window.toast = new ToastService();

const app = document.getElementById('app');

function renderApp() {
  const navbar = Navbar();
  const outlet = document.createElement('div');
  outlet.id = 'page-outlet';
  const footer = Footer();

  app.appendChild(navbar);
  app.appendChild(outlet);
  app.appendChild(footer);

  const router = new Router(outlet);
  router.init();
}

renderApp();
