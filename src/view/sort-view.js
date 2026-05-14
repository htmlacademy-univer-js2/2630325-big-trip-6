import AbstractView from '../framework/view/abstract-view.js';
import { SortType, ALLOWED_SORT_TYPES } from '../const.js';
import { capitalizeWord } from '../utils.js';

const createSortItemTemplate = (sortType, currentSortType) => {
  const isDisabled = !ALLOWED_SORT_TYPES.has(sortType);
  const isChecked = sortType === currentSortType;

  return `
    <div class="trip-sort__item  trip-sort__item--${sortType}">
      <input
        id="sort-${sortType}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortType}"
        data-sort-type="${sortType}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="sort-${sortType}">${capitalizeWord(sortType)}</label>
    </div>
  `;
};

const createSortTemplate = (currentSortType) => {
  const sortItemsTemplate = Object.values(SortType)
    .map((type) => createSortItemTemplate(type, currentSortType))
    .join('');

  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>
  `;
};

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
