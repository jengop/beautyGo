/**
 * Input component
 * @param {Object} props
 * @param {string} props.name
 * @param {string} [props.label]
 * @param {string} [props.type='text']
 * @param {string} [props.placeholder]
 * @param {string} [props.value]
 * @param {string} [props.error]
 * @param {string} [props.icon]   - emoji displayed inside left padding
 * @param {Function} [props.onInput]
 * @param {Function} [props.onChange]
 * @returns {HTMLDivElement}
 */
export function Input({ name, label, type = 'text', placeholder = '', value = '', error = '', icon = '', onInput, onChange } = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'input-group';

  if (label) {
    const lbl = document.createElement('label');
    lbl.className = 'input-group__label';
    lbl.htmlFor = name;
    lbl.textContent = label;
    wrapper.appendChild(lbl);
  }

  const inputWrapper = document.createElement('div');
  inputWrapper.className = icon ? 'input-group__icon' : '';

  if (icon) {
    const iconEl = document.createElement('span');
    iconEl.className = 'input-group__icon-el';
    iconEl.textContent = icon;
    inputWrapper.appendChild(iconEl);
  }

  const input = document.createElement('input');
  input.id = name;
  input.name = name;
  input.type = type;
  input.placeholder = placeholder;
  input.value = value;
  input.className = `input${error ? ' input--error' : ''}`;
  if (onInput) input.addEventListener('input', (e) => onInput(e.target.value, e));
  if (onChange) input.addEventListener('change', (e) => onChange(e.target.value, e));
  inputWrapper.appendChild(input);
  wrapper.appendChild(inputWrapper);

  if (error) {
    const errEl = document.createElement('span');
    errEl.className = 'input-group__error';
    errEl.textContent = error;
    wrapper.appendChild(errEl);
  }

  // Expose the inner input for external read
  wrapper.getInput = () => input;

  return wrapper;
}
