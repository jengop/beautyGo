import { CardProfesional } from '../components/professionals/CardProfesional.js';
import { professionalService } from '../services/professionalService.js';
import { useFetch } from '../hooks/useFetch.js';

const CATEGORIES = [
  { icon: '✂',  label: 'Barbería & Peluquería' },
  { icon: '💅', label: 'Uñas & Nail Art'        },
  { icon: '💆', label: 'Masajes & Spa'           },
  { icon: '💄', label: 'Maquillaje'              },
  { icon: '🪒', label: 'Depilación'              },
  { icon: '🦷', label: 'Estética dental'         },
];

const HOW_STEPS = [
  { icon: '🔍', label: 'Paso 1', title: 'Buscar',   text: 'Encuentra el profesional ideal filtrando por servicio, precio y valoración.' },
  { icon: '📅', label: 'Paso 2', title: 'Reservar',  text: 'Selecciona fecha y hora disponibles para agendar tu cita fácilmente.' },
  { icon: '❤️', label: 'Paso 3', title: 'Disfrutar', text: 'Recibe el servicio en la comodidad de tu hogar y relájate.' },
];

export function Home() {
  const page = document.createElement('div');

  // ── Hero ──────────────────────────────────────────────────────────
  const hero = document.createElement('section');
  hero.className = 'hero';

  const heroInner = document.createElement('div');
  heroInner.className = 'container';

  const heroGrid = document.createElement('div');
  heroGrid.className = 'hero__inner';

  // Left text
  const heroText = document.createElement('div');
  heroText.className = 'hero__text';
  heroText.innerHTML = `
    <div class="hero__label">🌸 Servicios de belleza a domicilio</div>
    <h1 class="hero__title">Belleza<br>donde tú <span>estés</span></h1>
    <p class="hero__subtitle">Reserva servicios profesionales a domicilio en minutos.<br>Encuentra estilistas, manicuristas, masajistas y más.</p>
    <div class="hero__actions">
      <a href="/professionals" data-link class="btn btn--primary btn--lg">Reserva Ahora</a>
      <a href="/professionals" data-link class="btn btn--secondary btn--lg">Ver profesionales</a>
    </div>`;

  // Search bar below CTAs
  const searchRow = document.createElement('div');
  searchRow.className = 'hero__search-row';
  searchRow.innerHTML = `
    <span style="color:var(--color-primary);font-size:1rem">🔍</span>
    <input id="hero-search" type="text" placeholder="Busca un servicio o profesional..." />
    <button class="btn btn--primary btn--sm" id="hero-search-btn" style="flex-shrink:0">Buscar</button>`;
  heroText.appendChild(searchRow);

  // Right image
  const heroImage = document.createElement('div');
  heroImage.className = 'hero__image-col';
  heroImage.innerHTML = `
    <div class="hero__img-circle">💇‍♀️</div>
    <div class="hero__float-badge">
      <span style="font-size:1.4rem">⭐</span>
      <div>
        <strong>+500 profesionales</strong>
        <span>Verificados y valorados</span>
      </div>
    </div>`;

  heroGrid.appendChild(heroText);
  heroGrid.appendChild(heroImage);
  heroInner.appendChild(heroGrid);
  hero.appendChild(heroInner);
  page.appendChild(hero);

  // Search events
  page.querySelector('#hero-search-btn').addEventListener('click', () => {
    const q = page.querySelector('#hero-search').value.trim();
    if (q) {
      history.pushState(null, '', `/professionals?q=${encodeURIComponent(q)}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  });
  page.querySelector('#hero-search').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') page.querySelector('#hero-search-btn').click();
  });

  // ── Main container ────────────────────────────────────────────────
  const container = document.createElement('div');
  container.className = 'container';

  // ── Categories ────────────────────────────────────────────────────
  const catSection = document.createElement('section');
  catSection.className = 'section';

  const catHeader = document.createElement('div');
  catHeader.className = 'section__header';
  catHeader.innerHTML = `
    <span class="section__label">Servicios</span>
    <h2 class="section__title">Explora por categoría</h2>
    <p class="section__subtitle">Encuentra el servicio que necesitas</p>
    <div class="section__divider"></div>`;
  catSection.appendChild(catHeader);

  const catGrid = document.createElement('div');
  catGrid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:1rem';
  CATEGORIES.forEach(({ icon, label }) => {
    const pill = document.createElement('button');
    pill.className = 'category-pill';
    pill.innerHTML = `
      <div class="category-pill__icon">${icon}</div>
      <span class="category-pill__label">${label}</span>`;
    pill.addEventListener('click', () => {
      history.pushState(null, '', `/professionals?q=${encodeURIComponent(label)}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    catGrid.appendChild(pill);
  });
  catSection.appendChild(catGrid);
  container.appendChild(catSection);

  // ── Featured Professionals ────────────────────────────────────────
  const proSection = document.createElement('section');
  proSection.className = 'section';

  const proHeader = document.createElement('div');
  proHeader.className = 'section__header';
  proHeader.innerHTML = `
    <span class="section__label">Profesionales</span>
    <h2 class="section__title">Profesionales Destacados</h2>
    <p class="section__subtitle">Los mejor valorados de nuestra plataforma</p>
    <div class="section__divider"></div>`;
  proSection.appendChild(proHeader);

  const proGrid = document.createElement('div');
  proGrid.className = 'grid-3';
  proGrid.innerHTML = '<p style="color:var(--color-gray)">Cargando...</p>';
  proSection.appendChild(proGrid);

  useFetch(() => professionalService.getAll(), ({ data, loading, error }) => {
    if (loading) return;
    proGrid.innerHTML = '';
    if (error) { proGrid.innerHTML = `<p style="color:var(--color-danger)">${error}</p>`; return; }
    data.slice(0, 3).forEach((pro) => proGrid.appendChild(CardProfesional(pro)));
  });

  // "Ver todos" link
  const verTodosRow = document.createElement('div');
  verTodosRow.style.cssText = 'text-align:center;margin-top:2rem';
  verTodosRow.innerHTML = `<a href="/professionals" data-link class="btn btn--secondary btn--lg">Ver todos los profesionales</a>`;
  proSection.appendChild(verTodosRow);
  container.appendChild(proSection);

  // ── Cómo Funciona ─────────────────────────────────────────────────
  const howSection = document.createElement('section');
  howSection.className = 'section';
  howSection.style.background = 'var(--color-gray-light)';
  howSection.style.borderRadius = 'var(--radius-xl)';
  howSection.style.padding = '3rem 2rem';
  howSection.style.marginBottom = '1rem';

  const howHeader = document.createElement('div');
  howHeader.className = 'section__header';
  howHeader.innerHTML = `
    <span class="section__label">Proceso</span>
    <h2 class="section__title">Cómo Funciona</h2>
    <p class="section__subtitle">Reserva tu cita en 3 simples pasos</p>
    <div class="section__divider"></div>`;
  howSection.appendChild(howHeader);

  const howGrid = document.createElement('div');
  howGrid.className = 'grid-3';
  HOW_STEPS.forEach(({ icon, label, title, text }) => {
    const card = document.createElement('div');
    card.className = 'how-card';
    card.innerHTML = `
      <div class="how-card__icon">${icon}</div>
      <div class="how-card__num">${label}</div>
      <div class="how-card__title">${title}</div>
      <p class="how-card__text">${text}</p>`;
    howGrid.appendChild(card);
  });
  howSection.appendChild(howGrid);
  container.appendChild(howSection);

  // ── CTA ───────────────────────────────────────────────────────────
  const ctaSection = document.createElement('section');
  ctaSection.className = 'section';
  const ctaInner = document.createElement('div');
  ctaInner.className = 'cta-section';
  ctaInner.innerHTML = `
    <h2>¿Eres profesional?</h2>
    <p>Únete a nuestra plataforma, llega a más clientes<br>y gestiona tu agenda fácilmente.</p>
    <a href="/auth" data-link class="btn btn--cta-white btn--lg">Registrarme como profesional</a>`;
  ctaSection.appendChild(ctaInner);
  container.appendChild(ctaSection);

  page.appendChild(container);
  return page;
}
