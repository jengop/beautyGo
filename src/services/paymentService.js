const STORAGE_KEY = 'ps_payment_methods';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || getDefaults(); }
  catch { return getDefaults(); }
}

function save(methods) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(methods));
}

function getDefaults() {
  return [
    { id: 'pm1', type: 'card',   label: 'Visa',   last4: '4242', expiry: '12/27', icon: '💳' },
    { id: 'pm2', type: 'paypal', label: 'PayPal', last4: null,   expiry: null,    icon: '🅿️' },
    { id: 'pm3', type: 'cash',   label: 'Efectivo', last4: null, expiry: null,    icon: '💵' },
  ];
}

class PaymentService {
  async getMethods(userId) {
    await this._delay(300);
    return load();
  }

  async addMethod(userId, methodData) {
    await this._delay(500);
    const methods = load();
    const newMethod = { id: `pm_${Date.now()}`, icon: '💳', ...methodData };
    methods.push(newMethod);
    save(methods);
    return newMethod;
  }

  async removeMethod(userId, methodId) {
    await this._delay(400);
    const methods = load().filter((m) => m.id !== methodId);
    save(methods);
  }

  /**
   * Process a payment (mock – always succeeds in development)
   * @param {{ amount: number, methodId: string, reservationId: string }} data
   * @returns {Promise<{ transactionId: string, status: 'approved' }>}
   */
  async processPayment({ amount, methodId, reservationId }) {
    await this._delay(1200);
    // Simulate occasional failure for testing
    if (Math.random() < 0.05) throw new Error('Pago rechazado. Intenta con otro método.');
    return {
      transactionId: `txn_${Date.now()}`,
      status: 'approved',
      amount,
      methodId,
      reservationId,
    };
  }

  _delay(ms) { return new Promise((r) => setTimeout(r, ms)); }
}

export const paymentService = new PaymentService();
