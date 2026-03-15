const STORAGE_KEY = 'ps_reservations';

function loadReservations() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveReservations(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

class ReservationService {
  async create(data) {
    await this._delay(600);
    const reservations = loadReservations();
    const newReservation = {
      id: `res_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...data,
    };
    reservations.push(newReservation);
    saveReservations(reservations);
    return newReservation;
  }

  async getByUser(userId) {
    await this._delay(300);
    return loadReservations().filter((r) => r.userId === userId);
  }

  async getByProfessional(professionalId) {
    await this._delay(300);
    return loadReservations().filter((r) => r.professionalId === professionalId);
  }

  async getById(id) {
    await this._delay(200);
    const res = loadReservations().find((r) => r.id === id);
    if (!res) throw new Error('Reserva no encontrada.');
    return res;
  }

  async cancel(id) {
    await this._delay(500);
    const reservations = loadReservations();
    const idx = reservations.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error('Reserva no encontrada.');
    reservations[idx].status = 'cancelled';
    saveReservations(reservations);
    return reservations[idx];
  }

  async complete(id) {
    await this._delay(400);
    const reservations = loadReservations();
    const idx = reservations.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error('Reserva no encontrada.');
    reservations[idx].status = 'completed';
    saveReservations(reservations);
    return reservations[idx];
  }

  /**
   * Get unavailable time slots for a professional on a given date
   * @param {string} professionalId
   * @param {string} date  - 'YYYY-MM-DD'
   * @returns {Promise<string[]>}  - array of 'HH:MM'
   */
  async getUnavailableSlots(professionalId, date) {
    await this._delay(200);
    return loadReservations()
      .filter((r) => r.professionalId === professionalId && r.date === date && r.status !== 'cancelled')
      .map((r) => r.time);
  }

  _delay(ms) { return new Promise((r) => setTimeout(r, ms)); }
}

export const reservationService = new ReservationService();
