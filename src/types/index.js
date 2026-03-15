/**
 * @typedef {Object} User
 * @property {string}  id
 * @property {string}  name
 * @property {string}  email
 * @property {string}  avatar
 * @property {string}  phone
 * @property {'client'|'professional'} role
 */

/**
 * @typedef {Object} Professional
 * @property {string}   id
 * @property {string}   name
 * @property {string}   specialty
 * @property {string}   avatar
 * @property {string}   cover
 * @property {number}   rating
 * @property {number}   reviewCount
 * @property {number}   basePrice
 * @property {string}   location
 * @property {string}   bio
 * @property {Service[]} services
 * @property {string[]} gallery
 */

/**
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} name
 * @property {number} duration   - minutes
 * @property {number} price
 */

/**
 * @typedef {Object} Reservation
 * @property {string}   id
 * @property {string}   professionalId
 * @property {string}   serviceId
 * @property {string}   userId
 * @property {string}   date         - ISO date string
 * @property {string}   time         - 'HH:MM'
 * @property {'pending'|'confirmed'|'completed'|'cancelled'} status
 * @property {number}   total
 * @property {string}   paymentMethod
 */

/**
 * @typedef {Object} Review
 * @property {string} id
 * @property {string} userId
 * @property {string} userName
 * @property {string} userAvatar
 * @property {number} rating
 * @property {string} comment
 * @property {string} date
 */

/**
 * @typedef {Object} PaymentMethod
 * @property {string} id
 * @property {'card'|'paypal'|'cash'} type
 * @property {string} label
 * @property {string} last4
 * @property {string} expiry
 */

/**
 * @typedef {Object} Address
 * @property {string} id
 * @property {string} label
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} zip
 */

export {};
