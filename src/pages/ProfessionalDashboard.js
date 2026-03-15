import { requireProfessional } from '../hooks/useAuth.js';
import { authService } from '../services/authService.js';
import { statusBadge } from '../components/common/Badge.js';
import { Avatar } from '../components/common/Avatar.js';

const MOCK_STATS = [
  { label: 'Total de Citas', value: '20',       change: '+ 15%' },
  { label: 'Ingresos',       value: '$9,450.00', change: '+ 27%' },
];

const MOCK_TODAY = [
  { icon: '💅', serviceName: 'Pintado en Gel $750',       clientName: 'Clienta Maria Juarez', location: 'Ubicacion: Los Jazmines, STGO', status: 'pending'   },
  { icon: '💇', serviceName: 'Peinado Elaborado $800',     clientName: 'Clienta Joana Pimentel', location: 'Ubicacion: Los Rieles, STGO', status: 'confirmed' },
  { icon: '✂',  serviceName: 'Corte de Cabello $500',      clientName: 'Clienta Laura Sánchez',  location: 'Ubicacion: Ensanche, STGO',   status: 'confirmed' },
];

const SIDEBAR_ITEMS = [
  { label: 'Calendario'        },
  { label: 'Mis Servicios'     },
  { label: 'Balance'           },
  { label: 'Estados de cuenta' },
];

export function ProfessionalDashboard() {
  if (!requireProfessional()) return document.createElement('div');

  const user = authService.getCurrentUser();
  const page = document.createElement('div');
  page.className = 'container';

  // ── Greeting bar (matches Figma: "Hola Adeline!" centered with bell + avatar)
  const greeting = document.createElement('div');
  greeting.className = 'dash-greeting';
  greeting.innerHTML = `<span class="dash-greeting__text">Hola ${user?.name?.split(' ')[0] || 'Profesional'}!</span>`;
  const greetActions = document.createElement('div');
  greetActions.style.cssText = 'display:flex;align-items:center;gap:.75rem';
  const bellBtn = document.createElement('button');
  bellBtn.className = 'navbar__icon-btn';
  bellBtn.innerHTML = '🔔';
  greetActions.appendChild(bellBtn);
  greetActions.appendChild(Avatar({ name: user?.name, size: 'sm' }));
  greeting.appendChild(greetActions);
  page.appendChild(greeting);

  // ── Section title
  const sectionTitle = document.createElement('h1');
  sectionTitle.style.cssText = 'font-family:var(--font-heading);font-size:1.5rem;font-weight:800;color:var(--color-primary);margin-bottom:1.5rem';
  sectionTitle.textContent = 'Perfil Profesional';
  page.appendChild(sectionTitle);

  // ── Two-column layout
  const layout = document.createElement('div');
  layout.style.cssText = 'display:grid;grid-template-columns:220px 1fr;gap:1.5rem;align-items:start';

  // ══ LEFT: Sidebar accordion ══════════════════════════════════════
  const sidebar = document.createElement('div');
  sidebar.className = 'card card__body';

  SIDEBAR_ITEMS.forEach(({ label }) => {
    const btn = document.createElement('button');
    btn.className = 'dash-sidebar-btn';
    btn.innerHTML = `<span>${label}</span><span>›</span>`;
    sidebar.appendChild(btn);
  });
  layout.appendChild(sidebar);

  // ══ RIGHT ════════════════════════════════════════════════════════
  const main = document.createElement('div');
  main.style.cssText = 'display:flex;flex-direction:column;gap:1.25rem';

  // Stats row
  const statsRow = document.createElement('div');
  statsRow.style.cssText = 'display:grid;grid-template-columns:repeat(2,1fr);gap:1rem';
  MOCK_STATS.forEach(({ label, value, change }) => {
    const block = document.createElement('div');
    block.className = 'dash-stat-block';
    block.innerHTML = `
      <div class="dash-stat-block__label">${label}</div>
      <div class="dash-stat-block__value">${value}</div>
      <div class="dash-stat-block__change">${change}</div>`;
    statsRow.appendChild(block);
  });
  main.appendChild(statsRow);

  // Agenda title
  const agendaTitle = document.createElement('h2');
  agendaTitle.style.cssText = 'font-family:var(--font-heading);font-size:1.2rem;font-weight:800;color:var(--color-dark);text-align:center';
  agendaTitle.textContent = 'Agenda de Hoy';
  main.appendChild(agendaTitle);

  // Appointment cards
  MOCK_TODAY.forEach(({ icon, serviceName, clientName, location, status }) => {
    const card = document.createElement('div');
    card.className = 'dash-appt-card';

    const img = document.createElement('div');
    img.className = 'dash-appt-card__img';
    img.textContent = icon;

    const body = document.createElement('div');
    body.className = 'dash-appt-card__body';
    body.innerHTML = `
      <div class="dash-appt-card__service">${serviceName}</div>
      <div class="dash-appt-card__client">${clientName}</div>
      <div class="dash-appt-card__location">${location}</div>`;

    const badgeWrap = document.createElement('div');
    badgeWrap.className = 'dash-appt-card__badge';
    badgeWrap.appendChild(statusBadge(status));

    card.appendChild(img);
    card.appendChild(body);
    card.appendChild(badgeWrap);
    main.appendChild(card);
  });

  layout.appendChild(main);
  page.appendChild(layout);
  return page;
}
