import { CalendarioReserva } from '../components/booking/CalendarioReserva.js';
import { Button } from '../components/common/Button.js';
import { Avatar } from '../components/common/Avatar.js';
import { RatingStars } from '../components/common/RatingStars.js';
import { professionalService } from '../services/professionalService.js';
import { reservationService } from '../services/reservationService.js';
import { paymentService } from '../services/paymentService.js';
import { authService } from '../services/authService.js';
import { requireAuth } from '../hooks/useAuth.js';
import { formatCurrency, formatTime } from '../utils/formatters.js';

// Time slots based on Figma: 5:30 PM – 9:30 PM in 1h increments (demo)
function generateAfternoonSlots() {
  return ['08:00','09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:30','18:30','19:30','20:30','21:30'];
}

export function Booking({ id } = {}) {
  if (!requireAuth()) return document.createElement('div');

  const page = document.createElement('div');
  page.className = 'container page';

  const state = {
    professional: null,
    selectedService: null,
    selectedDate: null,
    selectedTime: null,
    unavailableSlots: [],
  };

  async function init() {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get('service');
    try {
      const pro = await professionalService.getById(id);
      state.professional = pro;
      if (serviceId) state.selectedService = pro.services.find((s) => s.id === serviceId) || null;
      renderPage();
    } catch (err) {
      page.innerHTML = `<p style="color:var(--color-danger)">${err.message}</p>`;
    }
  }

  function renderPage() {
    page.innerHTML = '';
    const pro = state.professional;

    // ── Page title
    const title = document.createElement('h1');
    title.style.cssText = 'font-family:var(--font-heading);font-size:1.4rem;font-weight:800;color:var(--color-primary);margin-bottom:1.5rem;text-align:center';
    title.textContent = `Confirma tu cita con ${pro.name}`;
    page.appendChild(title);

    // ── Two-column layout: [left sidebar] [right: calendar + times + summary]
    const layout = document.createElement('div');
    layout.className = 'booking-layout';

    // ══ LEFT: Pro card + Service selector ════════════════════════
    const leftCol = document.createElement('div');
    leftCol.style.cssText = 'display:flex;flex-direction:column;gap:1rem';

    // Pro mini card
    const proCard = document.createElement('div');
    proCard.className = 'pro-profile-card';

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'pro-profile-card__avatar';
    avatarWrap.appendChild(Avatar({ name: pro.name, size: 'xl' }));

    const pName = document.createElement('div');
    pName.className = 'pro-profile-card__name';
    pName.textContent = pro.name;

    const pSpec = document.createElement('div');
    pSpec.className = 'pro-profile-card__specialty';
    pSpec.textContent = pro.specialty;

    const pRating = document.createElement('div');
    pRating.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:.3rem;margin:.4rem 0 .75rem';
    pRating.appendChild(RatingStars({ rating: pro.rating }));
    const rNum = document.createElement('span');
    rNum.style.cssText = 'font-weight:700;font-size:.88rem';
    rNum.textContent = pro.rating.toFixed(1);
    pRating.appendChild(rNum);

    const verPerfilBtn = Button({
      label: 'Ver Perfil',
      variant: 'primary',
      full: true,
      size: 'sm',
      onClick: () => {
        history.pushState(null, '', `/professional/${pro.id}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      },
    });

    proCard.appendChild(avatarWrap);
    proCard.appendChild(pName);
    proCard.appendChild(pSpec);
    proCard.appendChild(pRating);
    proCard.appendChild(verPerfilBtn);
    leftCol.appendChild(proCard);

    // Service selector
    const svcCard = document.createElement('div');
    svcCard.className = 'card card__body';
    const svcTitle = document.createElement('p');
    svcTitle.style.cssText = 'font-weight:700;font-size:.88rem;margin-bottom:.75rem;text-align:center;color:var(--color-dark)';
    svcTitle.textContent = 'Selecciona el servicio';
    svcCard.appendChild(svcTitle);

    pro.services.forEach((svc) => {
      const pill = document.createElement('button');
      pill.className = `service-pill${state.selectedService?.id === svc.id ? ' selected' : ''}`;
      pill.style.marginBottom = '0.5rem';
      pill.innerHTML = `${svc.name} <span style="float:right">${formatCurrency(svc.price)}</span>`;
      pill.addEventListener('click', () => {
        state.selectedService = svc;
        renderPage();
      });
      svcCard.appendChild(pill);
    });
    leftCol.appendChild(svcCard);

    // ══ RIGHT: Calendar + Time slots + Summary ════════════════════
    const rightCol = document.createElement('div');
    rightCol.style.cssText = 'display:flex;flex-direction:column;gap:1rem';

    // Calendar row — calendar on left, time slots on right
    const calRow = document.createElement('div');
    calRow.style.cssText = 'display:grid;grid-template-columns:1fr 180px;gap:1rem;align-items:start';

    const calCard = document.createElement('div');
    calCard.className = 'card card__body';
    const cal = CalendarioReserva({
      selectedDate: state.selectedDate,
      onSelect: async (date) => {
        state.selectedDate = date;
        state.selectedTime = null;
        state.unavailableSlots = await reservationService.getUnavailableSlots(pro.id, date);
        renderPage();
      },
    });
    calCard.appendChild(cal);
    calRow.appendChild(calCard);

    // Time slots column
    const timeCard = document.createElement('div');
    timeCard.className = 'card card__body';
    if (state.selectedDate) {
      const dateLabel = document.createElement('p');
      dateLabel.style.cssText = 'font-size:.78rem;font-weight:600;color:var(--color-gray);margin-bottom:.75rem';
      const d = new Date(state.selectedDate + 'T00:00');
      dateLabel.textContent = d.toLocaleDateString('es-DO', { weekday: 'long', day: 'numeric', month: 'long' });
      timeCard.appendChild(dateLabel);

      const slots = generateAfternoonSlots();
      const timeList = document.createElement('div');
      timeList.className = 'time-slot-list';
      slots.forEach((slot) => {
        const isUnavailable = state.unavailableSlots.includes(slot);
        const isSelected = state.selectedTime === slot;
        const btn = document.createElement('button');
        btn.className = `time-slot${isSelected ? ' selected' : ''}${isUnavailable ? ' disabled' : ''}`;
        btn.textContent = formatTime(slot);
        if (!isUnavailable) {
          btn.addEventListener('click', () => {
            state.selectedTime = slot;
            renderPage();
          });
        }
        timeList.appendChild(btn);
      });
      timeCard.appendChild(timeList);
    } else {
      timeCard.innerHTML = '<p style="color:var(--color-gray);font-size:.83rem;text-align:center">Selecciona una fecha</p>';
    }
    calRow.appendChild(timeCard);
    rightCol.appendChild(calRow);

    // Summary card
    const summaryCard = document.createElement('div');
    summaryCard.className = 'booking-summary';
    summaryCard.innerHTML = `<div class="booking-summary__title">Tu Reserva</div>`;

    if (state.selectedService) {
      const schip = document.createElement('div');
      schip.className = 'booking-summary__chip';
      schip.textContent = `${state.selectedService.name} ${formatCurrency(state.selectedService.price)}`;
      summaryCard.appendChild(schip);
    }
    if (state.selectedDate && state.selectedTime) {
      const dchip = document.createElement('div');
      dchip.className = 'booking-summary__chip';
      const d = new Date(state.selectedDate + 'T00:00');
      dchip.textContent = `${d.toLocaleDateString('es-DO', { weekday: 'long', day: 'numeric', month: 'long' })} ${formatTime(state.selectedTime)}`;
      summaryCard.appendChild(dchip);
    }
    const feeChip = document.createElement('div');
    feeChip.className = 'booking-summary__chip';
    feeChip.textContent = `Desplazamiento e impuesto ${formatCurrency(400)}`;
    summaryCard.appendChild(feeChip);

    summaryCard.appendChild(document.createElement('br'));

    const confirmBtn = Button({
      label: 'Confirmar Reserva',
      variant: 'primary',
      full: true,
      disabled: !state.selectedService || !state.selectedDate || !state.selectedTime,
      onClick: async () => {
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'Confirmando...';
        try {
          const user = authService.getCurrentUser();
          const methods = await paymentService.getMethods(user.id);
          await paymentService.processPayment({
            amount: state.selectedService.price + 400,
            methodId: methods[0]?.id || 'cash',
            reservationId: 'tmp',
          });
          await reservationService.create({
            userId: user.id,
            professionalId: pro.id,
            serviceId: state.selectedService.id,
            serviceName: state.selectedService.name,
            date: state.selectedDate,
            time: state.selectedTime,
            total: state.selectedService.price + 400,
            paymentMethod: methods[0]?.label || 'Efectivo',
          });
          window.toast?.success('¡Reserva confirmada con éxito!');
          history.pushState(null, '', '/my-reservations');
          window.dispatchEvent(new PopStateEvent('popstate'));
        } catch (err) {
          window.toast?.error(err.message);
          confirmBtn.disabled = false;
          confirmBtn.textContent = 'Confirmar Reserva';
        }
      },
    });
    summaryCard.appendChild(confirmBtn);
    rightCol.appendChild(summaryCard);

    layout.appendChild(leftCol);
    layout.appendChild(rightCol);
    page.appendChild(layout);
  }

  init();
  return page;
}
