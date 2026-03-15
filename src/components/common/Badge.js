/**
 * Badge component
 * @param {Object} props
 * @param {string} props.label
 * @param {'primary'|'success'|'warning'|'danger'|'neutral'} [props.variant='primary']
 * @returns {HTMLSpanElement}
 */
export function Badge({ label, variant = 'primary' } = {}) {
  const span = document.createElement('span');
  span.className = `badge badge--${variant}`;
  span.textContent = label;
  return span;
}

/**
 * Map a reservation status to badge variant
 * @param {'pending'|'confirmed'|'completed'|'cancelled'} status
 */
export function statusBadge(status) {
  const map = {
    pending:   { label: 'Pendiente',   variant: 'warning'  },
    confirmed: { label: 'Confirmada',  variant: 'primary'  },
    completed: { label: 'Completada',  variant: 'success'  },
    cancelled: { label: 'Cancelada',   variant: 'danger'   },
  };
  const { label, variant } = map[status] || { label: status, variant: 'neutral' };
  return Badge({ label, variant });
}
