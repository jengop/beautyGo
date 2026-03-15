const STORAGE_KEY = 'ps_current_user';

// Mock users for development
const MOCK_USERS = [
  {
    id: 'u1',
    name: 'María González',
    email: 'maria@example.com',
    password: 'Password1',
    avatar: null,
    phone: '809-555-0101',
    role: 'client',
  },
  {
    id: 'u2',
    name: 'Carlos Ramírez',
    email: 'carlos@example.com',
    password: 'Password1',
    avatar: null,
    phone: '809-555-0202',
    role: 'professional',
  },
];

class AuthService {
  constructor() {
    this._listeners = [];
  }

  getCurrentUser() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  async login(email, password) {
    await this._delay(600);
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) throw new Error('Correo o contraseña incorrectos.');
    const { password: _, ...safeUser } = user;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    this._notify(safeUser);
    return safeUser;
  }

  /**
   * @param {{ name: string, email: string, password: string, role: string }} data
   * @returns {Promise<Object>}
   */
  async register(data) {
    await this._delay(800);
    const exists = MOCK_USERS.some((u) => u.email === data.email);
    if (exists) throw new Error('Ya existe una cuenta con ese correo.');
    const newUser = {
      id: `u${Date.now()}`,
      avatar: null,
      phone: '',
      ...data,
    };
    MOCK_USERS.push(newUser);
    const { password: _, ...safeUser } = newUser;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    this._notify(safeUser);
    return safeUser;
  }

  logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    this._notify(null);
  }

  /**
   * Subscribe to auth state changes.
   * @param {Function} listener
   * @returns {Function} unsubscribe
   */
  onAuthStateChanged(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }

  _notify(user) {
    this._listeners.forEach((l) => l(user));
  }

  _delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}

export const authService = new AuthService();
