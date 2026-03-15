import { requireAuth } from '../hooks/useAuth.js';
import { reservationService } from '../services/reservationService.js';
import { professionalService } from '../services/professionalService.js';
import { authService } from '../services/authService.js';
import { statusBadge } from '../components/common/Badge.js';
import { Button } from '../components/common/Button.js';
import { formatCurrency } from '../utils/formatters.js';

const FILTERS = [
  { key: 'upcoming',  label: 'Próximas Citas'    },
  { key: 'history',   label: 'Historial de Citas' },
  { key: 'pending',   label: 'Pendiente de Pago'  },
  { key: 'status',    label: 'Estado'              },
];

export function MyReservations() {
  if (!requireAuth()) return document.createElement('div');

  const page = document.createElement('div');
  page.className = 'container page';

  const heading = document.createElement('h1');
  heading.style.cssText = 'font-family:var(--font-heading);font-size:1.6rem;font-weight:800;color:var(--color-primary);margin-bottom:1.5rem';
  heading.textContent = 'Mis Reservas';
  page.appendChild(heading);

  // ── Two-column layout: Filtros | List
  const layout = document.createElement('div');
  layout.style.cssText = 'display:grid;grid-template-columns:220px 1fr;gap:1.5rem;align-items:start';

  // ══ LEFT: Filters card ══════════════════════════════════════════
  const filterCard = document.createElement('div');
  filterCard.className = 'filter-card';

  const filterTitle = document.createElement('div');
  filterTitle.className = 'filter-card__title';
  filterTitle.textContent = 'Filtros';
  filterCard.appendChild(filterTitle);

  let activeKey = null;

  FILTERS.forEach(({ key, label }) => {
    const btn = document.createElement('button');
    btn.className = 'filter-item';
    btn.innerHTML = `<span>${label}</span><span>›</span>`;
    btn.addEventListener('click', () => {
      activeKey = activeKey === key ? null : key;
      renderList();
    });
    filterCard.appendChild(btn);
  });

  const resetBtn = document.createElement('button');
  resetBtn.style.cssText = 'width:100%;background:transparent;border:1.5px solid var(--color-primary);border-radius:var(--radius-full);padding:.6rem;font-family:var(--font-body);font-size:.85rem;font-weight:600;color:var(--color-primary);cursor:pointer;margin-top:.5rem;transition:all .2s';
  resetBtn.textContent = 'Restablecer Filtros';
  resetBtn.addEventListener('mouseenter', () => { resetBtn.style.background = 'var(--color-primary)'; resetBtn.style.color = '#fff'; });
  resetBtn.addEventListener('mouseleave', () => { resetBtn.style.background = 'transparent'; resetBtn.style.color = 'var(--color-primary)'; });
  resetBtn.addEventListener('click', () => { activeKey = null; renderList(); });
  filterCard.appendChild(resetBtn);

  layout.appendChild(filterCard);

  // ══ RIGHT: Reservation list ═════════════════════════════════════
  const listCol = document.createElement('div');
  listCol.style.cssText = 'display:flex;flex-direction:column;gap:0.75rem';
  layout.appendChild(listCol);
  page.appendChild(layout);

  let allReservations = [];
  let professionals = {};

  function renderList() {
    listCol.innerHTML = '';

    let filtered = [...allReservations];
    if (activeKey === 'upcoming')  filtered = filtered.filter((r) => r.status === 'confirmed' || r.status === 'pending');
    if (activeKey === 'history')   filtered = filtered.filter((r) => r.status === 'completed' || r.status === 'cancelled');
    if (activeKey === 'pending')   filtered = filtered.filter((r) => r.status === 'pending');

    if (filtered.length === 0) {
      listCol.innerHTML = `
        <div style="text-align:center;padding:3rem;color:var(--color-gray);background:var(--color-surface);border-radius:var(--radius-lg);border:1px solid var(--color-border)">
          <div style="font-size:3rem;margin-bottom:1rem">📋</div>
          <p style="font-weight:700;font-family:var(--font-heading);margin-bottom:.5rem">Sin reservas</p>
          <p style="font-size:.85rem;margin-bottom:1.5rem">No tienes reservas aún.</p>
          <a href="/professionals" data-link class="btn btn--primary">Explorar profesionales</a>
        </div>`;
      return;
    }

    filtered.forEach((res) => {
      const pro = professionals[res.professionalId];
      const card = buildResvCard(res, pro);
      listCol.appendChild(card);
    });
  }

  function buildResvCard(res, pro) {
    const card = document.createElement('div');
    card.className = 'resv-card';

    // Image
    const img = document.createElement('div');
    img.className = 'resv-card__img';
    img.innerHTML = '✂';
    card.appendChild(img);

    // Body
    const body = document.createElement('div');
    body.className = 'resv-card__body';

    const svcName = document.createElement('div');
    svcName.className = 'resv-card__service';
    svcName.textContent = `${res.serviceName || 'Servicio'} ${res.total ? formatCurrency(res.total) : ''}`;

    const proName = document.createElement('div');
    proName.className = 'resv-card__pro';
    proName.textContent = pro?.name || 'Profesional';

    const dateEl = document.createElement('div');
    dateEl.className = 'resv-card__date';
    dateEl.textContent = `${res.date || ''}  ${res.time || ''}`;

    body.appendChild(svcName);
    body.appendChild(proName);
    body.appendChild(dateEl);
    card.appendChild(body);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'resv-card__actions';
    actions.appendChild(statusBadge(res.status));

    const detailBtn = Button({
      label: 'Ver Detalles',
      variant: 'secondary',
      size: 'sm',
      onClick: () => {
        history.pushState(null, '', `/professional/${res.professionalId}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      },
    });
    actions.appendChild(detailBtn);

    if (res.status === 'confirmed' || res.status === 'pending') {
      const cancelBtn = Button({
        label: 'Cancelar',
        variant: 'ghost',
        size: 'sm',
        onClick: async () => {
          cancelBtn.disabled = true;
          try {
            await reservationService.cancel(res.id);
            window.toast?.success('Reserva cancelada.');
            await loadData();
          } catch (e) { window.toast?.error(e.message); cancelBtn.disabled = false; }
        },
      });
      actions.appendChild(cancelBtn);
    }
    card.appendChild(actions);
    return card;
  }

  async function loadData() {
    listCol.innerHTML = '<p style="color:var(--color-gray)">Cargando...</p>';
    const user = authService.getCurrentUser();
    try {
      allReservations = await reservationService.getByUser(user.id);
      const proIds = [...new Set(allReservations.map((r) => r.professionalId))];
      await Promise.all(proIds.map(async (pid) => {
        try { professionals[pid] = await professionalService.getById(pid); } catch {}
      }));
      renderList();
    } catch (err) {
      listCol.innerHTML = `<p style="color:var(--color-danger)">${err.message}</p>`;
    }
  }

  loadData();
  return page;
}
