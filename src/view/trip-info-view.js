import AbstractView from '../framework/view/abstract-view.js';
import { escapeHtml } from '../utils.js';

const createTripInfoTemplate = (title, duration, cost) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${escapeHtml(title)}</h1>
      <p class="trip-info__dates">${duration}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  </section>
`;

export default class TripInfoView extends AbstractView {
  #title = null;
  #duration = null;
  #cost = null;

  constructor({ title, duration, cost }) {
    super();
    this.#title = title;
    this.#duration = duration;
    this.#cost = cost;
  }

  get template() {
    return createTripInfoTemplate(this.#title, this.#duration, this.#cost);
  }
}
