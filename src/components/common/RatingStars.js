/**
 * RatingStars component
 * @param {Object} props
 * @param {number} props.rating        - value 0–5
 * @param {number} [props.count]       - review count shown beside stars
 * @param {boolean} [props.interactive] - allow user to click to rate
 * @param {Function} [props.onRate]    - called with new rating value
 * @returns {HTMLDivElement}
 */
export function RatingStars({ rating = 0, count, interactive = false, onRate } = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'rating-stars';

  let currentRating = rating;

  function renderStars(hovered = null) {
    wrapper.querySelectorAll('.rating-stars__star').forEach((s) => s.remove());
    const display = hovered !== null ? hovered : currentRating;

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = `rating-stars__star${i <= display ? ' filled' : ''}`;
      star.textContent = '★';

      if (interactive) {
        star.style.cursor = 'pointer';
        star.addEventListener('mouseenter', () => renderStars(i));
        star.addEventListener('mouseleave', () => renderStars(null));
        star.addEventListener('click', () => {
          currentRating = i;
          if (onRate) onRate(i);
          renderStars(null);
        });
      }

      wrapper.insertBefore(star, wrapper.querySelector('.rating-stars__count'));
    }
  }

  if (count !== undefined) {
    const countEl = document.createElement('span');
    countEl.className = 'rating-stars__count';
    countEl.textContent = `(${count})`;
    wrapper.appendChild(countEl);
  }

  renderStars();
  return wrapper;
}
