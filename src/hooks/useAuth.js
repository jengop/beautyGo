import { authService } from '../services/authService.js';

/**
 * useAuth – reactive authentication state hook.
 * Subscribes to auth state changes and calls the provided callback.
 *
 * @param {(user: Object|null) => void} onChange
 * @returns {{ unsubscribe: Function }}
 */
export function useAuth(onChange) {
  // Immediately invoke with current user
  onChange(authService.getCurrentUser());

  // Subscribe to future auth changes
  const unsubscribe = authService.onAuthStateChanged(onChange);
  return { unsubscribe };
}

/**
 * Protect a page: redirect to /auth if not authenticated.
 * @returns {boolean} isAuthenticated
 */
export function requireAuth() {
  const user = authService.getCurrentUser();
  if (!user) {
    history.pushState(null, '', '/auth');
    window.dispatchEvent(new PopStateEvent('popstate'));
    return false;
  }
  return true;
}

/**
 * Protect a page: redirect to /auth if not a professional.
 * @returns {boolean}
 */
export function requireProfessional() {
  const user = authService.getCurrentUser();
  if (!user || user.role !== 'professional') {
    history.pushState(null, '', '/auth');
    window.dispatchEvent(new PopStateEvent('popstate'));
    return false;
  }
  return true;
}
