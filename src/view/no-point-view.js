import AbstractView from '../framework/view/abstract-view.js';
import { EmptyListMessage } from '../const.js';

const createEmptyListTemplate = (filterType) => `<p class="trip-events__msg">${EmptyListMessage[filterType]}</p>`;

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
