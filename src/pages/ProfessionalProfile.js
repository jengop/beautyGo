import { Avatar } from '../components/common/Avatar.js';
import { RatingStars } from '../components/common/RatingStars.js';
import { Button } from '../components/common/Button.js';
import { GaleriaTrabajos } from '../components/professionals/GaleriaTrabajos.js';
import { CardReseña } from '../components/professionals/CardReseña.js';
import { professionalService } from '../services/professionalService.js';
import { formatCurrency } from '../utils/formatters.js';

export function ProfessionalProfile({ id } = {}) {
  const page = document.createElement('div');
  page.className = 'container page';
  page.innerHTML = '<p style="color:var(--color-gray)">Cargando perfil...</p>';

  async function load() {
    try {
      const [pro, reviews] = await Promise.all([
        professionalService.getById(id),
        professionalService.getReviews(id),
      ]);
      render(pro, reviews);
    } catch (err) {
      page.innerHTML = `<p style="color:var(--color-danger)">${err.message}</p>`;
    }
  }

  function render(pro, reviews) {
    page.innerHTML = '';

    // ── Top header: name + specialty label (matches Figma top of right column)
    const topRow = document.createElement('div');
    topRow.style.cssText = 'display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap';
    topRow.innerHTML = `
      <h1 style="font-family:var(--font-heading);font-size:1.6rem;font-weight:800;color:var(--color-primary)">${pro.name}</h1>
      <span style="font-size:.75rem;font-weight:700;color:var(--color-gray);text-transform:uppercase;letter-spacing:.08em">${pro.specialty}</span>`;
    page.appendChild(topRow);

    // ── Two-column layout
    const layout = document.createElement('div');
    layout.style.cssText = 'display:grid;grid-template-columns:260px 1fr;gap:1.5rem;align-items:start';

    // ══ LEFT COLUMN ══════════════════════════════════════════════
    const left = document.createElement('div');
    left.style.cssText = 'display:flex;flex-direction:column;gap:1rem';

    // Pro card (avatar + name + specialty + rating + CTA)
    const proCard = document.createElement('div');
    proCard.className = 'pro-profile-card';

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'pro-profile-card__avatar';
    if (pro.avatar) {
      const img = document.createElement('img');
      img.src = pro.avatar;
      img.alt = pro.name;
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%';
      avatarWrap.appendChild(img);
    } else {
      avatarWrap.appendChild(Avatar({ name: pro.name, size: 'xl' }));
    }

    const proName = document.createElement('div');
    proName.className = 'pro-profile-card__name';
    proName.textContent = pro.name;

    const proSpec = document.createElement('div');
    proSpec.className = 'pro-profile-card__specialty';
    proSpec.textContent = pro.specialty;

    const proRating = document.createElement('div');
    proRating.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:.35rem;margin:.5rem 0';
    proRating.appendChild(RatingStars({ rating: pro.rating }));
    const ratingNum = document.createElement('span');
    ratingNum.style.cssText = 'font-weight:700;font-size:.9rem;color:var(--color-dark)';
    ratingNum.textContent = pro.rating.toFixed(1);
    proRating.appendChild(ratingNum);

    const reservarBtn = Button({
      label: 'Reservar Ahora',
      variant: 'primary',
      full: true,
      onClick: () => {
        history.pushState(null, '', `/booking/${pro.id}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      },
    });

    proCard.appendChild(avatarWrap);
    proCard.appendChild(proName);
    proCard.appendChild(proSpec);
    proCard.appendChild(proRating);
    proCard.appendChild(reservarBtn);
    left.appendChild(proCard);

    // Services card — pink pill buttons
    const svcCard = document.createElement('div');
    svcCard.className = 'card card__body';
    const svcTitle = document.createElement('h3');
    svcTitle.style.cssText = 'font-family:var(--font-heading);font-size:1rem;font-weight:700;margin-bottom:1rem;text-align:center;color:var(--color-primary)';
    svcTitle.textContent = 'Servicios';
    svcCard.appendChild(svcTitle);

    pro.services.forEach((svc) => {
      const pill = document.createElement('button');
      pill.className = 'service-pill';
      pill.style.marginBottom = '0.5rem';
      pill.innerHTML = `<span>${svc.name}</span><span style="float:right">${formatCurrency(svc.price)}</span>`;
      pill.addEventListener('click', () => {
        history.pushState(null, '', `/booking/${pro.id}?service=${svc.id}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      svcCard.appendChild(pill);
    });
    left.appendChild(svcCard);

    // ══ RIGHT COLUMN ═════════════════════════════════════════════
    const right = document.createElement('div');
    right.style.cssText = 'display:flex;flex-direction:column;gap:1rem';

    // Gallery (2×3)
    const galleryCard = document.createElement('div');
    galleryCard.className = 'card card__body';
    galleryCard.appendChild(GaleriaTrabajos({ images: pro.gallery }));
    right.appendChild(galleryCard);

    // Bio + First Review side by side
    const bottomRow = document.createElement('div');
    bottomRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:1rem';

    // Sobre mi
    const bioCard = document.createElement('div');
    bioCard.className = 'card card__body';
    bioCard.innerHTML = `
      <h3 style="font-family:var(--font-heading);font-size:1rem;font-weight:700;margin-bottom:.75rem;color:var(--color-primary);text-align:center">Sobre mi</h3>
      <p style="font-size:.83rem;color:var(--color-gray);line-height:1.75;text-align:center;text-transform:uppercase;letter-spacing:.03em">${pro.bio || 'Sin descripción.'}</p>`;
    bottomRow.appendChild(bioCard);

    // Reseña card — shows first review
    const reseñaCard = document.createElement('div');
    reseñaCard.className = 'card card__body';
    const reseñaTitle = document.createElement('h3');
    reseñaTitle.style.cssText = 'font-family:var(--font-heading);font-size:1rem;font-weight:700;margin-bottom:.75rem;color:var(--color-primary);text-align:center';
    reseñaTitle.textContent = 'Reseña';
    reseñaCard.appendChild(reseñaTitle);

    if (reviews.length > 0) {
      reseñaCard.appendChild(CardReseña(reviews[0]));
      if (reviews.length > 1) {
        const more = document.createElement('p');
        more.style.cssText = 'font-size:.78rem;color:var(--color-gray);text-align:center;margin-top:.75rem';
        more.textContent = `+${reviews.length - 1} reseña(s) más`;
        reseñaCard.appendChild(more);
      }
    } else {
      reseñaCard.innerHTML += '<p style="font-size:.83rem;color:var(--color-gray);text-align:center">Sin reseñas aún.</p>';
    }
    bottomRow.appendChild(reseñaCard);
    right.appendChild(bottomRow);

    layout.appendChild(left);
    layout.appendChild(right);
    page.appendChild(layout);
  }

  load();
  return page;
}
