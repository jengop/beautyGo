# Beauty & Go — Prototipo de Aplicación Web

Plataforma de reservas de servicios de belleza a domicilio. Conecta clientes con profesionales de belleza certificados.

---

## Descripcion del Proyecto

**Beauty & Go** es una Single Page Application (SPA) desarrollada con HTML5 y JavaScript vanilla (ES Modules) que permite a los usuarios explorar profesionales de belleza, reservar citas, y gestionar sus perfiles. Los profesionales cuentan con un dashboard propio para administrar su agenda y servicios.

Este prototipo fue desarrollado como entrega del curso **Seminario de Proyecto II** — Trimestre XV, UAPA.

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estructura base (`index.html`) |
| CSS3 (Custom Properties) | Sistema de diseño completo |
| JavaScript ES Modules | Logica de la aplicacion (sin frameworks) |
| Google Fonts | Tipografias: Dancing Script, Playfair Display, Poppins |
| localStorage / sessionStorage | Persistencia de datos mock |
| `npx serve` | Servidor local para desarrollo |

---

## Estructura del Proyecto

```
beauty-go/
├── index.html                  # Punto de entrada de la SPA
└── src/
    ├── main.js                 # Inicializacion de la app
    ├── styles.css              # Sistema de diseño (variables CSS, componentes)
    ├── routes/
    │   └── index.js            # Router SPA (history.pushState)
    ├── pages/
    │   ├── Home.js             # Pagina principal / landing
    │   ├── Auth.js             # Login y registro
    │   ├── Professionals.js    # Listado de profesionales
    │   ├── ProfessionalProfile.js  # Perfil de profesional + servicios
    │   ├── Booking.js          # Flujo de reserva de cita
    │   ├── MyReservations.js   # Mis reservas (cliente)
    │   ├── UserProfile.js      # Perfil de usuario
    │   └── ProfessionalDashboard.js  # Dashboard del profesional
    ├── components/
    │   ├── common/             # Navbar, Button, Avatar, Badge, Input, RatingStars
    │   ├── professionals/      # CardProfesional, GaleriaTrabajos, CardReseña, ListaServicios
    │   ├── booking/            # CalendarioReserva, SelectorHoras, CardResumenReserva, CardMetodoPago
    │   ├── reservations/       # CardReserva, PanelFiltrosReserva
    │   └── profile/            # UserProfileCard, ProfileMenu, AddressCard, PaymentMethodCard
    ├── services/
    │   ├── authService.js      # Autenticacion (mock con sessionStorage)
    │   ├── professionalService.js  # Datos de profesionales (mock)
    │   ├── reservationService.js   # CRUD de reservas (localStorage)
    │   ├── paymentService.js   # Procesamiento de pagos (mock)
    │   └── userService.js      # Perfil y direcciones (localStorage)
    ├── hooks/
    │   ├── useAuth.js          # Guards de autenticacion
    │   └── useFetch.js         # Hook para carga de datos async
    ├── utils/
    │   ├── formatters.js       # formatCurrency, formatDate, formatTime, getInitials
    │   ├── validators.js       # validateForm, isValidEmail, isValidPassword
    │   └── toast.js            # Servicio de notificaciones toast
    └── types/
        └── index.js            # Tipos JSDoc (User, Professional, Reservation, etc.)
```

---

## Paginas del Prototipo

| Ruta | Pagina | Descripcion |
|---|---|---|
| `/` | Home | Landing page con hero, categorias, profesionales destacados y CTA |
| `/auth` | Auth | Login y registro con toggle entre formularios |
| `/professionals` | Professionals | Listado de profesionales con busqueda y filtros |
| `/professional/:id` | ProfessionalProfile | Perfil detallado, galeria de trabajos y resenas |
| `/booking/:id` | Booking | Reservar cita: seleccionar servicio, fecha, horario |
| `/my-reservations` | MyReservations | Historial de reservas del cliente con filtros |
| `/profile` | UserProfile | Perfil del usuario, metodos de pago y direcciones |
| `/dashboard` | ProfessionalDashboard | Panel del profesional: agenda, estadisticas y servicios |

---

## Como Ejecutar

### Requisitos
- Node.js instalado (para usar `npx`)
- Conexion a internet (para Google Fonts)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/beauty-go.git
cd beauty-go

# 2. Iniciar el servidor local (modo SPA)
npx serve -s . --listen 3000

# 3. Abrir en el navegador
# http://localhost:3000
```

> **Importante:** Se debe usar `npx serve -s .` (con la bandera `-s`) para que el enrutado SPA funcione correctamente. Abrir `index.html` directamente causara errores de modulos ES.

---

## Credenciales de Demo

| Rol | Email | Clave |
|---|---|---|
| Cliente | `maria@example.com` | `Password1` |
| Profesional | `carlos@example.com` | `Password1` |

---

## Sistema de Diseno

El sistema de diseno fue implementado con CSS Custom Properties, basado en los mockups de Figma del proyecto.

### Paleta de Colores

| Variable | Valor | Uso |
|---|---|---|
| `--color-primary` | `#D63E8D` | Color principal (botones, titulos, acentos) |
| `--color-primary-light` | `#FCE8F4` | Fondos suaves, hover states |
| `--color-primary-mid` | `#EF5DA8` | Gradientes, elementos secundarios |
| `--color-dark` | `#1E1E1E` | Texto principal |
| `--color-gray` | `#6B7280` | Texto secundario, placeholders |
| `--color-surface` | `#FFFFFF` | Fondo de tarjetas |
| `--color-danger` | `#EF4444` | Errores y alertas |

### Tipografia

| Variable | Fuente | Uso |
|---|---|---|
| `--font-logo` | Dancing Script | Logo "Beauty & Go" |
| `--font-heading` | Playfair Display | Titulos y encabezados |
| `--font-body` | Poppins | Texto general |

---

## Funcionalidades Implementadas

- Registro e inicio de sesion con validacion de formularios
- Listado y busqueda de profesionales
- Perfil detallado de profesional con galeria y resenas
- Flujo completo de reserva (servicio + fecha + horario + confirmacion)
- Historial de reservas con filtros y opcion de cancelacion
- Perfil de usuario con metodos de pago y direcciones
- Dashboard del profesional con estadisticas y agenda del dia
- Sistema de notificaciones toast
- Enrutado SPA sin recarga de pagina
- Persistencia de datos con localStorage
- Guards de autenticacion por rol (cliente / profesional)

---

## Autor

Desarrollado como prototipo de proyecto universitario — UAPA, Trimestre XV
Curso: Seminario de Proyecto II
