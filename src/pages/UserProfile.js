import { Avatar } from '../components/common/Avatar.js';
import { Button } from '../components/common/Button.js';
import { requireAuth } from '../hooks/useAuth.js';
import { authService } from '../services/authService.js';
import { userService } from '../services/userService.js';
import { paymentService } from '../services/paymentService.js';

const MENU_ITEMS = [
  { label: 'Datos Personales' },
  { label: 'Teléfono'         },
  { label: 'Cambiar Clave'    },
  { label: 'Puntos Acumulados'},
];

export function UserProfile() {
  if (!requireAuth()) return document.createElement('div');

  const user = authService.getCurrentUser();
  const page = document.createElement('div');
  page.className = 'container page';

  // ── Two-column layout
  const layout = document.createElement('div');
  layout.style.cssText = 'display:grid;grid-template-columns:260px 1fr;gap:1.5rem;align-items:start';

  // ══ LEFT: Profile card ═══════════════════════════════════════════
  const leftCard = document.createElement('div');
  leftCard.className = 'profile-left-card';

  const avatarWrap = document.createElement('div');
  avatarWrap.style.cssText = 'width:90px;height:90px;border-radius:50%;overflow:hidden;margin:0 auto 1rem;border:3px solid var(--color-primary-light);box-shadow:var(--shadow-sm)';
  avatarWrap.appendChild(Avatar({ src: user?.avatar, name: user?.name, size: 'xl' }));
  leftCard.appendChild(avatarWrap);

  const nameEl = document.createElement('div');
  nameEl.style.cssText = 'font-family:var(--font-heading);font-size:1.1rem;font-weight:700;color:var(--color-primary);margin-bottom:.2rem';
  nameEl.textContent = user?.name || 'Usuario';
  leftCard.appendChild(nameEl);

  const levelEl = document.createElement('div');
  levelEl.style.cssText = 'font-size:.72rem;font-weight:700;color:var(--color-gray);text-transform:uppercase;letter-spacing:.08em;margin-bottom:1.25rem';
  levelEl.textContent = user?.role === 'professional' ? 'Profesional' : 'Cliente Nivel 2';
  leftCard.appendChild(levelEl);

  MENU_ITEMS.forEach(({ label }) => {
    const btn = document.createElement('button');
    btn.className = 'profile-pill-btn';
    btn.textContent = label;
    leftCard.appendChild(btn);
  });

  layout.appendChild(leftCard);

  // ══ RIGHT ════════════════════════════════════════════════════════
  const right = document.createElement('div');
  right.style.cssText = 'display:flex;flex-direction:column;gap:1.5rem';

  // ── Payment Methods section
  const pmCard = document.createElement('div');
  pmCard.className = 'card';

  const pmHeader = document.createElement('div');
  pmHeader.className = 'card__header';
  pmHeader.style.cssText = 'display:flex;align-items:center;justify-content:space-between';
  pmHeader.innerHTML = `<span style="color:var(--color-primary);font-family:var(--font-heading)">Metodo de Pago</span>`;

  const pmActions = document.createElement('div');
  pmActions.style.cssText = 'display:flex;align-items:center;gap:.75rem';
  const addBtn = document.createElement('button');
  addBtn.style.cssText = 'background:none;border:none;cursor:pointer;font-size:1.2rem;color:var(--color-primary)';
  addBtn.textContent = '+';
  const newLabel = document.createElement('span');
  newLabel.style.cssText = 'font-size:.78rem;color:var(--color-gray)';
  newLabel.textContent = 'Nueva Tarjeta';
  pmActions.appendChild(addBtn);
  pmActions.appendChild(newLabel);
  pmHeader.appendChild(pmActions);
  pmCard.appendChild(pmHeader);

  const pmBody = document.createElement('div');
  pmBody.className = 'card__body';
  pmBody.style.cssText = 'display:flex;flex-direction:column;gap:.75rem';
  pmCard.appendChild(pmBody);

  async function loadPayments() {
    pmBody.innerHTML = '<p style="color:var(--color-gray);font-size:.85rem">Cargando...</p>';
    const methods = await paymentService.getMethods(user.id);
    pmBody.innerHTML = '';
    methods.filter((m) => m.type === 'card').forEach((m) => {
      const row = document.createElement('div');
      row.className = 'payment-row';
      row.innerHTML = `
        <span class="payment-row__brand">${m.icon || '💳'}</span>
        <span class="payment-row__bank">Banco Popular Dominicano</span>
        <span class="payment-row__mask">•••• •••• •••• ${m.last4 || '0000'}</span>
        <span class="payment-dot"></span>`;
      pmBody.appendChild(row);
    });
    if (pmBody.children.length === 0) {
      pmBody.innerHTML = '<p style="color:var(--color-gray);font-size:.85rem">Sin métodos guardados.</p>';
    }
  }
  loadPayments();
  right.appendChild(pmCard);

  // ── Address section
  const addrCard = document.createElement('div');
  addrCard.className = 'card card__body';

  const addrInner = document.createElement('div');
  addrInner.id = 'addr-inner';
  addrCard.appendChild(addrInner);

  async function loadAddresses() {
    addrInner.innerHTML = '<p style="color:var(--color-gray);font-size:.85rem">Cargando...</p>';
    const addresses = await userService.getAddresses(user.id);
    addrInner.innerHTML = '';
    addresses.forEach((addr) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;padding:.5rem 0;border-bottom:1px solid var(--color-border)';

      const info = document.createElement('div');
      info.innerHTML = `
        <div style="font-size:.75rem;font-weight:600;color:var(--color-gray);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.2rem">Dirección</div>
        <div style="font-weight:600;font-size:.9rem">${user?.name || ''}</div>
        <div style="font-size:.83rem;color:var(--color-gray)">${addr.street}, ${addr.city}, ${addr.state}.</div>
        <div style="font-size:.83rem;color:var(--color-gray)">Phone: ${user?.phone || '—'}</div>`;

      const badge = document.createElement('span');
      badge.style.cssText = 'background:var(--color-primary);color:#fff;border-radius:var(--radius-full);padding:.3rem .85rem;font-size:.8rem;font-weight:700;white-space:nowrap;flex-shrink:0';
      badge.textContent = addr.label;

      row.appendChild(info);
      row.appendChild(badge);
      addrInner.appendChild(row);
    });

    const addAddrBtn = Button({
      label: '+ Agregar dirección',
      variant: 'secondary',
      size: 'sm',
    });
    addAddrBtn.style.marginTop = '1rem';
    addrInner.appendChild(addAddrBtn);
  }
  loadAddresses();
  right.appendChild(addrCard);

  layout.appendChild(right);
  page.appendChild(layout);
  return page;
}
