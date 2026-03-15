const MOCK_PROFESSIONALS = [
  {
    id: 'p1',
    name: 'Ana Martínez',
    specialty: 'Estilista & Colorista',
    avatar: null,
    cover: null,
    rating: 4.9,
    reviewCount: 128,
    basePrice: 800,
    location: 'Santo Domingo, DN',
    bio: 'Especialista en coloración y cortes modernos con más de 10 años de experiencia.',
    services: [
      { id: 's1', name: 'Corte de cabello', duration: 45, price: 800 },
      { id: 's2', name: 'Coloración completa', duration: 120, price: 2500 },
      { id: 's3', name: 'Tratamiento capilar', duration: 60, price: 1200 },
    ],
    gallery: [null, null, null, null, null, null],
    available: true,
  },
  {
    id: 'p2',
    name: 'Luis Fernández',
    specialty: 'Barbero Profesional',
    avatar: null,
    cover: null,
    rating: 4.7,
    reviewCount: 89,
    basePrice: 500,
    location: 'Santiago, SH',
    bio: 'Barbero con experiencia en cortes clásicos y modernos, fade y diseños.',
    services: [
      { id: 's4', name: 'Corte clásico', duration: 30, price: 500 },
      { id: 's5', name: 'Corte + Afeitado', duration: 50, price: 800 },
      { id: 's6', name: 'Diseño de barba', duration: 25, price: 400 },
    ],
    gallery: [null, null, null, null],
    available: true,
  },
  {
    id: 'p3',
    name: 'Sofía Reyes',
    specialty: 'Manicurista & Nail Art',
    avatar: null,
    cover: null,
    rating: 4.8,
    reviewCount: 204,
    basePrice: 600,
    location: 'Santo Domingo Este',
    bio: 'Especialista en uñas acrílicas, gel y nail art personalizado.',
    services: [
      { id: 's7', name: 'Manicure clásico', duration: 40, price: 600 },
      { id: 's8', name: 'Uñas acrílicas', duration: 90, price: 1800 },
      { id: 's9', name: 'Nail Art premium', duration: 120, price: 2200 },
    ],
    gallery: [null, null, null, null, null],
    available: true,
  },
  {
    id: 'p4',
    name: 'Roberto Díaz',
    specialty: 'Masajista Terapéutico',
    avatar: null,
    cover: null,
    rating: 4.6,
    reviewCount: 57,
    basePrice: 1500,
    location: 'Punta Cana',
    bio: 'Terapeuta certificado en masaje sueco, deportivo y de tejido profundo.',
    services: [
      { id: 's10', name: 'Masaje relajante 60min', duration: 60, price: 1500 },
      { id: 's11', name: 'Masaje deportivo 90min', duration: 90, price: 2200 },
    ],
    gallery: [null, null, null],
    available: false,
  },
];

const MOCK_REVIEWS = {
  p1: [
    { id: 'r1', userId: 'u1', userName: 'María González', userAvatar: null, rating: 5, comment: 'Excelente servicio, quedé encantada con mi coloración.', date: '2026-02-15' },
    { id: 'r2', userId: 'u3', userName: 'Paola Torres', userAvatar: null, rating: 5, comment: 'La mejor estilista de la ciudad, súper profesional.', date: '2026-01-28' },
  ],
  p2: [
    { id: 'r3', userId: 'u1', userName: 'Pedro López', userAvatar: null, rating: 4, comment: 'Buen corte, muy limpio y puntual.', date: '2026-02-10' },
  ],
};

class ProfessionalService {
  async getAll(filters = {}) {
    await this._delay(400);
    let results = [...MOCK_PROFESSIONALS];
    if (filters.specialty) results = results.filter((p) => p.specialty.toLowerCase().includes(filters.specialty.toLowerCase()));
    if (filters.location) results = results.filter((p) => p.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.available) results = results.filter((p) => p.available);
    return results;
  }

  async getById(id) {
    await this._delay(300);
    const pro = MOCK_PROFESSIONALS.find((p) => p.id === id);
    if (!pro) throw new Error('Profesional no encontrado.');
    return pro;
  }

  async getReviews(professionalId) {
    await this._delay(300);
    return MOCK_REVIEWS[professionalId] || [];
  }

  async search(query) {
    await this._delay(400);
    const q = query.toLowerCase();
    return MOCK_PROFESSIONALS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.specialty.toLowerCase().includes(q)
    );
  }

  _delay(ms) { return new Promise((r) => setTimeout(r, ms)); }
}

export const professionalService = new ProfessionalService();
