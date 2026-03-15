/**
 * Button component
 * @param {Object} props
 * @param {string} props.label
 * @param {'primary'|'secondary'|'danger'|'ghost'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.full=false]
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.loading=false]
 * @param {string}  [props.icon]  - emoji or HTML string before label
 * @param {Function} [props.onClick]
 * @returns {HTMLButtonElement}
 */
export function Button({ label, variant = 'primary', size = 'md', full = false, disabled = false, loading = false, icon = '', onClick } = {}) {
  const btn = document.createElement('button');
  btn.className = [
    'btn',
    `btn--${variant}`,
    size !== 'md' ? `btn--${size}` : '',
    full ? 'btn--full' : '',
  ].filter(Boolean).join(' ');

  btn.disabled = disabled || loading;
  btn.innerHTML = loading
    ? `<span class="btn-spinner" style="display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite"></span> Cargando...`
    : `${icon ? `<span>${icon}</span>` : ''}${label}`;

  if (onClick) btn.addEventListener('click', onClick);

  // Inject spinner keyframe if needed
  if (!document.getElementById('btn-spin-style')) {
    const style = document.createElement('style');
    style.id = 'btn-spin-style';
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }

  return btn;
}
