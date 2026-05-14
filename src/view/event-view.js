import AbstractView from '../framework/view/abstract-view.js';
import {
  capitalizeWord,
  formatDate,
  calculateDuration,
  escapeHtml
} from '../utils.js';
import { DateFormat } from '../const.js';

const createSelectedOffersTemplate = (selectedOffers) => {
  if (selectedOffers.length === 0) {
    return '';
  }

  const items = selectedOffers
    .map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${escapeHtml(offer.title)}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `)
    .join('');

  return `
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${items}
    </ul>
  `;
};

const createEventTemplate = (point, allOffers, allDestinations) => {
  const {
    type,
    dateFrom,
    dateTo,
    basePrice,
    isFavorite,
    offers: selectedOfferIds,
    destination: destinationId,
  } = point;

  const destination = allDestinations.find((item) => item.id === destinationId);
  const typeOffers = allOffers.find((item) => item.type === type);

  const selectedOffers = typeOffers
    ? typeOffers.offers.filter((offer) => selectedOfferIds.includes(offer.id))
    : [];

  const favoriteClass = isFavorite ? ' event__favorite-btn--active' : '';
  const destinationName = destination ? escapeHtml(destination.name) : '';

  const humanizedDate = formatDate(dateFrom, DateFormat.SHORT_DATE).toUpperCase();
  const humanizedStartTime = formatDate(dateFrom, DateFormat.TIME);
  const humanizedEndTime = formatDate(dateTo, DateFormat.TIME);

  const datetimeAttribute = formatDate(dateFrom, DateFormat.HTML_DATE);
  const startDatetimeAttribute = formatDate(dateFrom, DateFormat.HTML_DATETIME);
  const endDatetimeAttribute = formatDate(dateTo, DateFormat.HTML_DATETIME);

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${datetimeAttribute}">${humanizedDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalizeWord(type)} ${destinationName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDatetimeAttribute}">${humanizedStartTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDatetimeAttribute}">${humanizedEndTime}</time>
          </p>
          <p class="event__duration">${calculateDuration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        ${createSelectedOffersTemplate(selectedOffers)}

        <button class="event__favorite-btn${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class EventView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, offers, destinations, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventTemplate(this.#point, this.#offers, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
