/**
 * Validate email format
 * @param {string} email
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate password strength (min 8 chars, 1 uppercase, 1 number)
 * @param {string} password
 */
export function isValidPassword(password) {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

/**
 * Validate phone number (Dominican format)
 * @param {string} phone
 */
export function isValidPhone(phone) {
  return /^(\+1)?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone.replace(/\s/g, ''));
}

/**
 * Check if a string is non-empty
 * @param {string} value
 */
export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}

/**
 * Validate a credit card number (Luhn algorithm)
 * @param {string} number
 */
export function isValidCardNumber(number) {
  const digits = number.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (isEven) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

/**
 * Validate form fields and return errors object
 * @param {Object} fields  - { fieldName: value }
 * @param {Object} rules   - { fieldName: ['required', 'email', ...] }
 * @returns {Object} errors
 */
export function validateForm(fields, rules) {
  const errors = {};
  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) {
      if (rule === 'required' && !isRequired(fields[field])) {
        errors[field] = 'Este campo es requerido.';
        break;
      }
      if (rule === 'email' && !isValidEmail(fields[field])) {
        errors[field] = 'Ingresa un correo electrónico válido.';
        break;
      }
      if (rule === 'password' && !isValidPassword(fields[field])) {
        errors[field] = 'Mínimo 8 caracteres, una mayúscula y un número.';
        break;
      }
      if (rule === 'phone' && !isValidPhone(fields[field])) {
        errors[field] = 'Ingresa un número de teléfono válido.';
        break;
      }
    }
  }
  return errors;
}
