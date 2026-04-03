export function Footer() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="footer__inner">
      <div>
        <div class="footer__brand-name">🌸 Beauty & Go</div>
        <p class="footer__brand-desc">Tu plataforma de servicios de belleza a domicilio. Conectamos clientes con profesionales certificados.</p>
      </div>
      <div>
        <div class="footer__col-title">Servicios</div>
        <a href="/professionals" data-link class="footer__link">Peluquería</a>
        <a href="/professionals" data-link class="footer__link">Manicure</a>
        <a href="/professionals" data-link class="footer__link">Masajes</a>
        <a href="/professionals" data-link class="footer__link">Maquillaje</a>
      </div>
      <div>
        <div class="footer__col-title">Empresa</div>
        <a href="/" data-link class="footer__link">Sobre nosotros</a>
        <a href="/" data-link class="footer__link">Contacto</a>
        <a href="/" data-link class="footer__link">Trabaja con nosotros</a>
        <a href="/" data-link class="footer__link">Blog</a>
      </div>
      <div>
        <div class="footer__col-title">Legal</div>
        <a href="/" data-link class="footer__link">Términos de uso</a>
        <a href="/" data-link class="footer__link">Privacidad</a>
        <a href="/" data-link class="footer__link">Cookies</a>
      </div>
    </div>
    <div class="footer__bottom">
      <span>&copy; 2026 Beauty & Go. Todos los derechos reservados.</span>
      <div class="footer__social">
        <span class="footer__social-icon">📘</span>
        <span class="footer__social-icon">📸</span>
        <span class="footer__social-icon">🐦</span>
      </div>
    </div>`;

  return footer;
}
