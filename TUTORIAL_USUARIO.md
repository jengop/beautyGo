# Tutorial del Prototipo — Beauty & Go

## Aplicacion de Servicios de Belleza a Domicilio

**Autor:** Jenisee y Adeline
**Asignatura:** Seminario de Proyecto II  
**Universidad:** UAPA  
**Trimestre:** XV  
**Fecha:** Abril 2026

---

## Tabla de Contenido

1. [Introduccion](#1-introduccion)
2. [Requisitos para ejecutar el prototipo](#2-requisitos-para-ejecutar-el-prototipo)
3. [Como iniciar la aplicacion](#3-como-iniciar-la-aplicacion)
4. [Pagina de Inicio](#4-pagina-de-inicio)
5. [Registro de cuenta nueva](#5-registro-de-cuenta-nueva)
6. [Inicio de sesion](#6-inicio-de-sesion)
7. [Buscar y explorar profesionales](#7-buscar-y-explorar-profesionales)
8. [Ver perfil de un profesional](#8-ver-perfil-de-un-profesional)
9. [Realizar una reserva](#9-realizar-una-reserva)
10. [Gestionar mis reservas](#10-gestionar-mis-reservas)
11. [Mi perfil de usuario](#11-mi-perfil-de-usuario)
12. [Panel del profesional (Dashboard)](#12-panel-del-profesional-dashboard)
13. [Cerrar sesion](#13-cerrar-sesion)
14. [Credenciales de prueba](#14-credenciales-de-prueba)
15. [Estructura tecnica del proyecto](#15-estructura-tecnica-del-proyecto)
16. [Glosario](#16-glosario)

---

## 1. Introduccion

**Beauty & Go** es una aplicacion web tipo SPA (Single Page Application) que conecta a clientes con profesionales de belleza certificados para recibir servicios a domicilio. La plataforma permite buscar profesionales, ver sus perfiles, reservar citas seleccionando fecha y hora, y gestionar las reservas de forma sencilla.

### Objetivos de la aplicacion

- Facilitar la busqueda de profesionales de belleza por categoria, disponibilidad y valoracion.
- Permitir la reserva de citas en linea con seleccion de fecha, hora y servicio.
- Ofrecer gestion completa de reservas (ver, filtrar, cancelar).
- Proporcionar perfiles diferenciados para clientes y profesionales.

### Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estructura de la aplicacion |
| CSS3 (Custom Properties) | Sistema de diseno y estilos |
| JavaScript ES Modules | Logica de la aplicacion (vanilla JS, sin frameworks) |
| localStorage / sessionStorage | Persistencia de datos (prototipo) |
| Google Fonts | Tipografias (Dancing Script, Playfair Display, Poppins) |

---

## 2. Requisitos para ejecutar el prototipo

Para ejecutar la aplicacion necesitas:

- **Navegador web moderno**: Google Chrome, Mozilla Firefox, Microsoft Edge o Safari (versiones actualizadas).
- **Servidor local**: La aplicacion usa modulos ES (`type="module"`), por lo que **no se puede abrir directamente con doble clic** en el archivo HTML. Se necesita un servidor HTTP local.

### Opciones para el servidor local

**Opcion A — VS Code con Live Server (Recomendado):**

1. Abrir Visual Studio Code.
2. Instalar la extension **"Live Server"** de Ritwick Dey.
3. Abrir la carpeta del proyecto (`Desarrollo/`).
4. Hacer clic derecho sobre `index.html` y seleccionar **"Open with Live Server"**.
5. Se abrira automaticamente el navegador en `http://127.0.0.1:5500`.

**Opcion B — Python (si esta instalado):**

```bash
cd "ruta/al/proyecto/Desarrollo"
python3 -m http.server 8080
```

Luego abrir `http://localhost:8080` en el navegador.

**Opcion C — Node.js (si esta instalado):**

```bash
npx serve .
```

---

## 3. Como iniciar la aplicacion

1. Iniciar el servidor local con cualquiera de las opciones anteriores.
2. Abrir el navegador y navegar a la URL del servidor (por ejemplo, `http://127.0.0.1:5500`).
3. Se cargara la **pagina de inicio** de Beauty & Go.

La aplicacion no requiere instalacion de dependencias (`npm install`), base de datos, ni configuracion adicional. Todo funciona con archivos estaticos.

---

## 4. Pagina de Inicio

Al abrir la aplicacion, se presenta la **pagina de inicio** con las siguientes secciones:

### 4.1 Barra de navegacion (Navbar)

Ubicada en la parte superior, contiene:

- **Logo "Beauty & Go"** (esquina izquierda): Hace clic para volver al inicio en cualquier momento.
- **Enlaces de navegacion**: "Inicio" y "Profesionales". Si el usuario ha iniciado sesion, tambien aparecen "Mis Reservas" y "Dashboard" (si es profesional).
- **Botones de accion** (esquina derecha):
  - Sin sesion: "Iniciar sesion" y "Registrarse".
  - Con sesion: Avatar del usuario (clic para ir al perfil) y boton "Salir".

### 4.2 Seccion Hero

Es la seccion principal con:

- **Titulo**: "Belleza donde tu estes".
- **Subtitulo** describiendo el servicio.
- **Boton "Reserva Ahora"**: Lleva directamente a la lista de profesionales.
- **Boton "Ver profesionales"**: Igual que el anterior.
- **Barra de busqueda**: Permite escribir un servicio o nombre de profesional y buscar directamente.

**Como usar la barra de busqueda:**
1. Escribir en el campo de texto (ejemplo: "Manicure" o "Ana").
2. Hacer clic en "Buscar" o presionar la tecla Enter.
3. Se redirige a la pagina de profesionales con los resultados filtrados.

### 4.3 Explora por Categoria

Muestra tarjetas con las categorias de servicio disponibles:

- Barberia & Peluqueria
- Unas & Nail Art
- Masajes & Spa
- Maquillaje
- Depilacion
- Estetica dental

**Como usar:** Hacer clic en cualquier categoria para ver los profesionales de ese tipo.

### 4.4 Profesionales Destacados

Muestra una seleccion de los 3 profesionales mejor valorados con:

- Nombre y especialidad.
- Valoracion con estrellas.
- Precio base del servicio.
- Botones "Ver perfil" y "Reservar".

### 4.5 Como Funciona

Explica el proceso en 3 pasos:

1. **Buscar**: Encontrar el profesional ideal.
2. **Reservar**: Seleccionar fecha y hora.
3. **Disfrutar**: Recibir el servicio en casa.

### 4.6 Seccion CTA para Profesionales

Invitacion a profesionales de belleza a registrarse en la plataforma.

### 4.7 Pie de Pagina (Footer)

Contiene:

- Descripcion de la marca.
- Enlaces rapidos a servicios, empresa y legal.
- Iconos de redes sociales.
- Copyright.

---

## 5. Registro de cuenta nueva

### Paso a paso:

1. Hacer clic en **"Registrarse"** en la barra de navegacion (o en el enlace "Registrate como profesional" del inicio).
2. Se muestra la pagina de autenticacion. Si aparece el formulario de inicio de sesion, hacer clic en **"Registrate"** en la parte inferior.
3. Completar los campos:
   - **Nombre completo**: Escribir nombre y apellido.
   - **Email**: Escribir un correo electronico valido.
   - **Clave**: Minimo 8 caracteres, al menos una mayuscula y un numero.
   - **Tipo de cuenta**: Seleccionar "Cliente" o "Profesional" en el menu desplegable.
4. Hacer clic en **"Registrarte"**.
5. Si todo es correcto:
   - Aparece una notificacion verde "Cuenta creada!".
   - Si se registro como **cliente**, se redirige al inicio.
   - Si se registro como **profesional**, se redirige al dashboard.

### Validaciones del formulario:

| Campo | Regla |
|---|---|
| Nombre | Obligatorio |
| Email | Obligatorio, formato de correo valido |
| Clave | Obligatorio, minimo 8 caracteres, 1 mayuscula, 1 numero |

Si hay un error de validacion, aparece un mensaje en rojo debajo de los campos.

---

## 6. Inicio de sesion

### Paso a paso:

1. Hacer clic en **"Iniciar sesion"** en la barra de navegacion.
2. Se muestra el formulario con:
   - Campo **Email**.
   - Campo **Clave**.
   - Casilla "Recuerda mi clave" (visual, no funcional en prototipo).
3. Ingresar las credenciales.
4. Hacer clic en **"Ingresar"**.
5. Si las credenciales son correctas:
   - Notificacion verde "Bienvenida!".
   - Se redirige al inicio.
   - La barra de navegacion se actualiza mostrando el avatar y nuevos enlaces.

### Credenciales de demo:

| Rol | Email | Clave |
|---|---|---|
| Cliente | `maria@example.com` | `Password1` |
| Profesional | `carlos@example.com` | `Password1` |

Si las credenciales son incorrectas, aparece el mensaje: *"Correo o contrasena incorrectos."*

---

## 7. Buscar y explorar profesionales

### Como acceder:

- Hacer clic en **"Profesionales"** en la barra de navegacion.
- O hacer clic en **"Ver todos los profesionales"** desde la pagina de inicio.

### Funcionalidades de la pagina:

#### 7.1 Barra de busqueda

1. Escribir en el campo "Buscar..." (ejemplo: "barber", "Ana", "unas").
2. Hacer clic en **"Buscar"** o presionar Enter.
3. Los resultados se actualizan mostrando solo los profesionales que coinciden.

#### 7.2 Filtros rapidos

Tres botones de filtro:

- **Todos**: Muestra todos los profesionales (por defecto).
- **Disponibles**: Muestra solo los que tienen disponibilidad activa.
- **Mejor valorados**: Ordena por valoracion de mayor a menor.

**Como usar:** Hacer clic en un filtro. El filtro activo se resalta en rosa.

#### 7.3 Tarjetas de profesionales

Cada tarjeta muestra:

- **Avatar**: Iniciales del profesional en circulo rosa.
- **Nombre y especialidad**.
- **Estrellas de valoracion** y numero de resenas.
- **Precio base** del servicio mas economico.
- **Botones**:
  - "Ver perfil": Navega al perfil completo del profesional.
  - "Reservar": Lleva directamente al flujo de reserva.

---

## 8. Ver perfil de un profesional

### Como acceder:

Hacer clic en **"Ver perfil"** en la tarjeta de cualquier profesional.

### Contenido del perfil:

#### 8.1 Columna izquierda

- **Tarjeta del profesional**: Avatar, nombre, especialidad, valoracion con estrellas.
- **Boton "Reservar Ahora"**: Inicia el flujo de reserva.
- **Lista de servicios**: Cada servicio muestra nombre y precio. Hacer clic en un servicio lleva directamente a reservar ese servicio especifico.

#### 8.2 Columna derecha

- **Galeria de trabajos**: Cuadricula de imagenes (en el prototipo se muestran como placeholders visuales con iconos).
- **Sobre mi**: Biografia breve del profesional.
- **Resena**: Muestra la ultima resena recibida con nombre del cliente, estrellas y comentario.

---

## 9. Realizar una reserva

**Requisito**: Debes tener sesion iniciada como **cliente**. Si no has iniciado sesion, la aplicacion te redirigira a la pagina de autenticacion.

### Paso a paso:

1. Desde el perfil de un profesional o la lista de profesionales, hacer clic en **"Reservar"** o **"Reservar Ahora"**.

2. **Seleccionar servicio** (columna izquierda):
   - Se muestra la tarjeta del profesional con su info.
   - Debajo aparece la lista de servicios disponibles.
   - Hacer clic en el servicio deseado. El servicio seleccionado se resalta en rosa.

3. **Seleccionar fecha** (columna derecha):
   - Se muestra un calendario interactivo del mes actual.
   - Los dias pasados estan deshabilitados (en gris).
   - Hacer clic en un dia disponible. El dia seleccionado se muestra con circulo rosa.
   - Se puede navegar entre meses con las flechas `<` y `>`.

4. **Seleccionar hora**:
   - Al seleccionar una fecha, aparece la lista de horarios disponibles a la derecha del calendario.
   - Horarios disponibles: desde 8:00 AM hasta 9:30 PM.
   - Los horarios ya reservados por otros clientes aparecen deshabilitados.
   - Hacer clic en el horario deseado. Se resalta en rosa.

5. **Revisar resumen de la reserva**:
   - En la parte inferior se muestra "Tu Reserva" con:
     - Servicio seleccionado y precio.
     - Fecha y hora seleccionadas.
     - Cargo de desplazamiento e impuesto (RD$ 400.00).

6. **Confirmar reserva**:
   - Hacer clic en **"Confirmar Reserva"** (el boton solo se activa cuando servicio, fecha y hora estan seleccionados).
   - Se procesa el pago (simulado).
   - Aparece notificacion verde: *"Reserva confirmada con exito!"*.
   - Se redirige automaticamente a **"Mis Reservas"**.

### Posibles errores:

- Si el pago falla (5% de probabilidad simulada), aparece: *"Pago rechazado. Intenta con otro metodo."* Se puede intentar de nuevo.

---

## 10. Gestionar mis reservas

**Requisito**: Sesion iniciada.

### Como acceder:

Hacer clic en **"Mis Reservas"** en la barra de navegacion.

### Funcionalidades:

#### 10.1 Panel de filtros (columna izquierda)

Cuatro filtros disponibles:

| Filtro | Que muestra |
|---|---|
| Proximas Citas | Reservas confirmadas o pendientes |
| Historial de Citas | Reservas completadas o canceladas |
| Pendiente de Pago | Reservas con estado "pendiente" |
| Estado | Todas (sin filtro adicional) |

- Hacer clic en un filtro para activarlo.
- Hacer clic de nuevo para desactivarlo.
- **"Restablecer Filtros"**: Quita todos los filtros y muestra todas las reservas.

#### 10.2 Lista de reservas (columna derecha)

Cada tarjeta de reserva muestra:

- **Icono del servicio** (lado izquierdo).
- **Nombre del servicio y precio**.
- **Nombre del profesional**.
- **Fecha y hora** de la cita.
- **Estado** (badge de color):
  - Rosa: Pendiente.
  - Verde: Confirmada.
  - Gris: Completada.
  - Rojo: Cancelada.
- **Botones de accion**:
  - "Ver Detalles": Navega al perfil del profesional.
  - "Cancelar" (solo si la reserva esta confirmada o pendiente).

#### 10.3 Cancelar una reserva

1. Localizar la reserva en la lista.
2. Hacer clic en **"Cancelar"**.
3. La reserva cambia a estado "Cancelada".
4. Aparece notificacion: *"Reserva cancelada."*
5. La lista se actualiza automaticamente.

#### 10.4 Sin reservas

Si no hay reservas, se muestra un mensaje con un boton **"Explorar profesionales"** para comenzar a buscar.

---

## 11. Mi perfil de usuario

**Requisito**: Sesion iniciada.

### Como acceder:

Hacer clic en el **avatar** (circulo con iniciales) en la barra de navegacion.

### Contenido del perfil:

#### 11.1 Columna izquierda

- **Avatar** con iniciales.
- **Nombre del usuario**.
- **Nivel**: "Cliente Nivel 2" o "Profesional".
- **Menu de opciones**:
  - Datos Personales
  - Telefono
  - Cambiar Clave
  - Puntos Acumulados

#### 11.2 Columna derecha

- **Metodos de pago**: Lista de tarjetas guardadas (Visa predeterminada). Boton "+" para agregar nueva tarjeta.
- **Direcciones**: Direccion(es) registrada(s) con boton para agregar mas.

---

## 12. Panel del profesional (Dashboard)

**Requisito**: Sesion iniciada como **profesional**.

### Como acceder:

- Hacer clic en **"Dashboard"** en la barra de navegacion (solo visible para usuarios profesionales).

### Contenido del dashboard:

#### 12.1 Barra de saludo

Muestra: *"Hola [Nombre]!"* con campana de notificaciones y avatar.

#### 12.2 Menu lateral (columna izquierda)

Opciones del panel:

- Calendario
- Mis Servicios
- Balance
- Estados de cuenta

#### 12.3 Estadisticas (columna derecha superior)

Dos tarjetas de metricas:

| Metrica | Valor | Cambio |
|---|---|---|
| Total de Citas | 20 | + 15% |
| Ingresos | $9,450.00 | + 27% |

#### 12.4 Agenda de Hoy

Lista de citas del dia con:

- Icono del servicio.
- Nombre del servicio y precio.
- Nombre de la cliente.
- Ubicacion del servicio.
- Estado (badge pendiente o confirmado).

---

## 13. Cerrar sesion

1. Hacer clic en el boton **"Salir"** en la barra de navegacion (esquina derecha).
2. La sesion se cierra inmediatamente.
3. Se redirige a la pagina de inicio.
4. La barra de navegacion vuelve a mostrar "Iniciar sesion" y "Registrarse".

---

## 14. Credenciales de prueba

El prototipo incluye dos cuentas predefinidas para pruebas:

### Cuenta de cliente:
```
Email:    maria@example.com
Clave:    Password1
Nombre:   Maria Gonzalez
Telefono: 809-555-0101
```

### Cuenta de profesional:
```
Email:    carlos@example.com
Clave:    Password1
Nombre:   Carlos Ramirez
Telefono: 809-555-0202
```

### Profesionales disponibles en el catalogo:

| Nombre | Especialidad | Precio Base | Ubicacion | Valoracion |
|---|---|---|---|---|
| Ana Martinez | Estilista & Colorista | RD$ 800 | Santo Domingo, DN | 4.9 |
| Luis Fernandez | Barbero Profesional | RD$ 500 | Santiago, SH | 4.7 |
| Sofia Reyes | Manicurista & Nail Art | RD$ 600 | Santo Domingo Este | 4.8 |
| Roberto Diaz | Masajista Terapeutico | RD$ 1,500 | Punta Cana | 4.6 |

**Nota:** Roberto Diaz aparece como "No disponible" para demostrar el filtro de disponibilidad.

---

## 15. Estructura tecnica del proyecto

```
Desarrollo/
  index.html                    -- Punto de entrada de la aplicacion
  src/
    main.js                     -- Inicializacion de la app
    styles.css                  -- Sistema de diseno completo (CSS)
    routes/
      index.js                  -- Enrutador SPA con 8 rutas
    pages/
      Home.js                   -- Pagina de inicio
      Auth.js                   -- Login y registro
      Professionals.js          -- Listado de profesionales
      ProfessionalProfile.js    -- Perfil detallado
      Booking.js                -- Flujo de reserva
      MyReservations.js         -- Mis reservas
      UserProfile.js            -- Perfil del cliente
      ProfessionalDashboard.js  -- Dashboard del profesional
    components/
      common/                   -- Navbar, Footer, Avatar, Button, Badge, Input, RatingStars
      professionals/            -- CardProfesional, GaleriaTrabajos, CardResena, ListaServicios
      booking/                  -- CalendarioReserva, SelectorHoras, CardResumenReserva, CardMetodoPago
      profile/                  -- UserProfileCard, ProfileMenu, AddressCard, PaymentMethodCard
      professional-dashboard/   -- StatsCard, TodayAgendaCard, ProfessionalSidebarMenu
      reservations/             -- CardReserva, PanelFiltrosReserva
    services/
      authService.js            -- Autenticacion (mock)
      professionalService.js    -- Datos de profesionales (mock)
      reservationService.js     -- CRUD de reservas (localStorage)
      userService.js            -- Perfil y direcciones (localStorage)
      paymentService.js         -- Metodos de pago (mock)
    hooks/
      useAuth.js                -- Guard de autenticacion
      useFetch.js               -- Carga asincrona de datos
    utils/
      validators.js             -- Validacion de formularios
      formatters.js             -- Formateo de moneda, fecha, hora
      toast.js                  -- Notificaciones toast
    types/
      index.js                  -- Definiciones JSDoc
```

### Rutas de la aplicacion:

| Ruta | Pagina | Acceso |
|---|---|---|
| `/` | Inicio | Publico |
| `/auth` | Login / Registro | Publico |
| `/professionals` | Lista de profesionales | Publico |
| `/professional/:id` | Perfil de profesional | Publico |
| `/booking/:id` | Reservar cita | Requiere sesion (cliente) |
| `/my-reservations` | Mis reservas | Requiere sesion |
| `/profile` | Mi perfil | Requiere sesion |
| `/dashboard` | Panel profesional | Requiere sesion (profesional) |

---

## 16. Glosario

| Termino | Descripcion |
|---|---|
| SPA | Single Page Application - aplicacion de una sola pagina que no recarga el navegador |
| Mock | Datos simulados para el prototipo, sin conexion a base de datos real |
| localStorage | Almacenamiento del navegador que persiste entre sesiones |
| sessionStorage | Almacenamiento del navegador que se borra al cerrar la pestana |
| Toast | Notificacion emergente temporal que aparece en la esquina de la pantalla |
| CSS Custom Properties | Variables CSS reutilizables para mantener consistencia en el diseno |
| ES Modules | Sistema de modulos nativo de JavaScript para organizar el codigo |
| Badge | Etiqueta visual que indica el estado de un elemento (pendiente, confirmado, etc.) |

---

*Documento generado como parte del Seminario de Proyecto II — UAPA, Trimestre XV, Abril 2026.*
