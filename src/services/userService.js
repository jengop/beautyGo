const STORAGE_KEY = 'ps_user_profiles';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function save(profiles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

class UserService {
  async getProfile(userId) {
    await this._delay(300);
    const profiles = load();
    return profiles[userId] || null;
  }

  async updateProfile(userId, data) {
    await this._delay(500);
    const profiles = load();
    profiles[userId] = { ...(profiles[userId] || {}), ...data, updatedAt: new Date().toISOString() };
    save(profiles);
    return profiles[userId];
  }

  async getAddresses(userId) {
    await this._delay(300);
    const profile = load()[userId];
    return profile?.addresses || [
      { id: 'addr1', label: 'Casa', street: 'Calle Principal #123', city: 'Santo Domingo', state: 'DN', zip: '10100' },
    ];
  }

  async addAddress(userId, address) {
    await this._delay(400);
    const profiles = load();
    const profile = profiles[userId] || {};
    const addresses = profile.addresses || [];
    const newAddr = { id: `addr_${Date.now()}`, ...address };
    addresses.push(newAddr);
    profiles[userId] = { ...profile, addresses };
    save(profiles);
    return newAddr;
  }

  async removeAddress(userId, addressId) {
    await this._delay(400);
    const profiles = load();
    const profile = profiles[userId] || {};
    profile.addresses = (profile.addresses || []).filter((a) => a.id !== addressId);
    profiles[userId] = profile;
    save(profiles);
  }

  async uploadAvatar(userId, file) {
    await this._delay(800);
    // In production this would upload to a storage service
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const avatarUrl = e.target.result;
        await this.updateProfile(userId, { avatar: avatarUrl });
        resolve(avatarUrl);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  _delay(ms) { return new Promise((r) => setTimeout(r, ms)); }
}

export const userService = new UserService();
