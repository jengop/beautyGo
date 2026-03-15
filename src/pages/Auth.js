import { authService } from '../services/authService.js';
import { validateForm } from '../utils/validators.js';

export function Auth() {
  const page = document.createElement('div');
  page.className = 'auth-page--bg';

  const card = document.createElement('div');
  card.className = 'auth-card--figma';

  // Logo
  const logo = document.createElement('span');
  logo.className = 'auth-logo';
  logo.textContent = 'Beauty & Go';
  card.appendChild(logo);

  const formContainer = document.createElement('div');
  card.appendChild(formContainer);

  // ── Login form ───────────────────────────────────────────────────
  function renderLogin() {
    formContainer.innerHTML = '';

    const title = document.createElement('h1');
    title.style.cssText = 'font-family:var(--font-heading);font-size:1.4rem;font-weight:800;margin-bottom:.3rem;color:var(--color-dark)';
    title.textContent = 'Bienvenida';
    const subtitle = document.createElement('p');
    subtitle.style.cssText = 'font-size:.83rem;color:var(--color-gray);margin-bottom:1.5rem';
    subtitle.textContent = 'Ingresa tus credenciales para iniciar sesión';
    formContainer.appendChild(title);
    formContainer.appendChild(subtitle);

    const form = document.createElement('form');
    form.noValidate = true;

    const emailField = makeField('email', 'Email', 'email', 'correo@ejemplo.com');
    const passField  = makeField('password', 'Clave', 'password', '••••••••');

    const rememberRow = document.createElement('div');
    rememberRow.style.cssText = 'display:flex;align-items:center;gap:.4rem;margin:.5rem 0';
    rememberRow.innerHTML = `<input type="checkbox" id="remember" style="accent-color:var(--color-primary)"><label for="remember" style="font-size:.8rem;color:var(--color-gray)">Recuerda mi clave</label>`;

    const errorMsg = document.createElement('p');
    errorMsg.style.cssText = 'color:var(--color-danger);font-size:.8rem;display:none;margin:.5rem 0';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn--primary btn--full btn--lg';
    submitBtn.textContent = 'Ingresar';

    const hint = document.createElement('p');
    hint.style.cssText = 'font-size:.75rem;color:var(--color-gray);text-align:center;margin-top:.5rem';
    hint.innerHTML = 'Demo: <code>maria@example.com</code> / <code>Password1</code>';

    // Social
    const socialRow = document.createElement('div');
    socialRow.className = 'auth-social-row';
    ['🇬 Sign in with Google', '🍎 Sign in with Apple'].forEach((label) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'auth-social-btn';
      btn.textContent = label;
      socialRow.appendChild(btn);
    });

    const switchEl = document.createElement('div');
    switchEl.className = 'auth-switch';
    switchEl.innerHTML = `No tienes una cuenta? <a id="to-register">Regístrate</a>`;

    form.appendChild(emailField.wrapper);
    form.appendChild(passField.wrapper);
    form.appendChild(rememberRow);
    form.appendChild(errorMsg);
    form.appendChild(submitBtn);
    form.appendChild(hint);
    formContainer.appendChild(form);
    formContainer.appendChild(socialRow);
    formContainer.appendChild(switchEl);

    formContainer.querySelector('#to-register').addEventListener('click', () => renderRegister());

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email    = emailField.input.value;
      const password = passField.input.value;
      const errors = validateForm({ email, password }, { email: ['required', 'email'], password: ['required'] });
      if (Object.keys(errors).length) { errorMsg.textContent = Object.values(errors)[0]; errorMsg.style.display = 'block'; return; }
      submitBtn.disabled = true; submitBtn.textContent = 'Ingresando...'; errorMsg.style.display = 'none';
      try {
        await authService.login(email, password);
        window.toast?.success('¡Bienvenida!');
        history.pushState(null, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch (err) {
        errorMsg.textContent = err.message; errorMsg.style.display = 'block';
        submitBtn.disabled = false; submitBtn.textContent = 'Ingresar';
      }
    });
  }

  // ── Register form ────────────────────────────────────────────────
  function renderRegister() {
    formContainer.innerHTML = '';

    const title = document.createElement('h1');
    title.style.cssText = 'font-family:var(--font-heading);font-size:1.4rem;font-weight:800;margin-bottom:.3rem;color:var(--color-dark)';
    title.textContent = 'Comienza ahora';
    const subtitle = document.createElement('p');
    subtitle.style.cssText = 'font-size:.83rem;color:var(--color-gray);margin-bottom:1.5rem';
    subtitle.textContent = 'Ingresa tus credenciales para registrarte';
    formContainer.appendChild(title);
    formContainer.appendChild(subtitle);

    const form = document.createElement('form');
    form.noValidate = true;

    const nameField  = makeField('name', 'Nombre completo', 'text', 'Tu nombre');
    const emailField = makeField('email', 'Email', 'email', 'correo@ejemplo.com');
    const passField  = makeField('password', 'Clave', 'password', '••••••••');

    const roleLabel = document.createElement('div');
    roleLabel.innerHTML = `<label class="auth-input-label">Tipo de cuenta</label>`;
    const roleSelect = document.createElement('select');
    roleSelect.className = 'auth-input-plain';
    roleSelect.innerHTML = '<option value="client">Cliente</option><option value="professional">Profesional</option>';
    roleLabel.appendChild(roleSelect);

    const rememberRow = document.createElement('div');
    rememberRow.style.cssText = 'display:flex;align-items:center;gap:.4rem;margin:.5rem 0';
    rememberRow.innerHTML = `<input type="checkbox" id="remember-reg" style="accent-color:var(--color-primary)"><label for="remember-reg" style="font-size:.8rem;color:var(--color-gray)">Recuerda mi clave</label>`;

    const errorMsg = document.createElement('p');
    errorMsg.style.cssText = 'color:var(--color-danger);font-size:.8rem;display:none;margin:.5rem 0';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn--primary btn--full btn--lg';
    submitBtn.textContent = 'Registrarte';

    const socialRow = document.createElement('div');
    socialRow.className = 'auth-social-row';
    ['🇬 Sign in with Google', '🍎 Sign in with Apple'].forEach((label) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'auth-social-btn';
      btn.textContent = label;
      socialRow.appendChild(btn);
    });

    const switchEl = document.createElement('div');
    switchEl.className = 'auth-switch';
    switchEl.innerHTML = `Ya tienes cuenta? <a id="to-login">Inicia sesión</a>`;

    form.appendChild(nameField.wrapper);
    form.appendChild(emailField.wrapper);
    form.appendChild(passField.wrapper);
    form.appendChild(roleLabel);
    form.appendChild(rememberRow);
    form.appendChild(errorMsg);
    form.appendChild(submitBtn);
    formContainer.appendChild(form);
    formContainer.appendChild(socialRow);
    formContainer.appendChild(switchEl);

    formContainer.querySelector('#to-login').addEventListener('click', () => renderLogin());

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name     = nameField.input.value;
      const email    = emailField.input.value;
      const password = passField.input.value;
      const role     = roleSelect.value;
      const errors = validateForm({ name, email, password }, { name: ['required'], email: ['required', 'email'], password: ['required', 'password'] });
      if (Object.keys(errors).length) { errorMsg.textContent = Object.values(errors)[0]; errorMsg.style.display = 'block'; return; }
      submitBtn.disabled = true; submitBtn.textContent = 'Registrando...'; errorMsg.style.display = 'none';
      try {
        await authService.register({ name, email, password, role });
        window.toast?.success('¡Cuenta creada!');
        history.pushState(null, '', role === 'professional' ? '/dashboard' : '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch (err) {
        errorMsg.textContent = err.message; errorMsg.style.display = 'block';
        submitBtn.disabled = false; submitBtn.textContent = 'Registrarte';
      }
    });
  }

  // ── Helper: underline input field
  function makeField(name, label, type, placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'auth-field';
    const lbl = document.createElement('label');
    lbl.className = 'auth-input-label';
    lbl.textContent = label;
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    input.className = 'auth-input-plain';
    wrapper.appendChild(lbl);
    wrapper.appendChild(input);
    return { wrapper, input };
  }

  renderLogin();
  page.appendChild(card);
  return page;
}
