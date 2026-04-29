import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizeFirstLetter, formatEditDate, escapeHtml } from '../utils.js';
import { POINT_TYPES } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const FLATPICKR_DATE_FORMAT = 'd/m/y H:i';
const FLATPICKR_FIRST_DAY_OF_WEEK = 1;

function createTypeListTemplate(currentType) {
  return POINT_TYPES
    .map((type) => `
      <div class="event__type-item">
        <input
          id="event-type-${type}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${type}"
          ${type === currentType ? 'checked' : ''}
        >
        <label
          class="event__type-label  event__type-label--${type}"
          for="event-type-${type}-1"
        >${capitalizeFirstLetter(type)}</label>
      </div>
    `)
    .join('');
}

function createDestinationListTemplate(destinations) {
  return destinations
    .map((destination) => `<option value="${escapeHtml(destination.name)}"></option>`)
    .join('');
}

function createOffersTemplate(availableOffers, selectedOfferIds, isDisabled) {
  if (!availableOffers || availableOffers.length === 0) {
    return '';
  }

  const items = availableOffers
    .map((offer) => {
      const isChecked = selectedOfferIds.includes(offer.id);

      return `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox  visually-hidden"
            id="event-offer-${offer.id}"
            type="checkbox"
            name="event-offer-${offer.id}"
            data-offer-id="${offer.id}"
            ${isChecked ? 'checked' : ''}
            ${isDisabled ? 'disabled' : ''}
          >
          <label class="event__offer-label" for="event-offer-${offer.id}">
            <span class="event__offer-title">${escapeHtml(offer.title)}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `;
    })
    .join('');

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${items}
      </div>
    </section>
  `;
}

function createDestinationTemplate(destination) {
  if (!destination || !destination.description) {
    return '';
  }

  const photosTemplate = destination.pictures && destination.pictures.length > 0
    ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.pictures.map((picture) => `
            <img
              class="event__photo"
              src="${escapeHtml(picture.src)}"
              alt="${escapeHtml(picture.description)}"
            >
          `).join('')}
        </div>
      </div>
    `
    : '';

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${escapeHtml(destination.description)}</p>
      ${photosTemplate}
    </section>
  `;
}

function createEventEditTemplate(state, allOffers, allDestinations, isCreating) {
  const {
    type,
    dateFrom,
    dateTo,
    basePrice,
    offers: selectedOfferIds,
    destination: destinationId,
    isDisabled,
  } = state;

  const destination = allDestinations.find((item) => item.id === destinationId);
  const typeOffers = allOffers.find((item) => item.type === type);
  const availableOffers = typeOffers ? typeOffers.offers : [];

  const offersTemplate = createOffersTemplate(availableOffers, selectedOfferIds, isDisabled);
  const destinationTemplate = createDestinationTemplate(destination);
  const detailsTemplate = offersTemplate || destinationTemplate
    ? `<section class="event__details">${offersTemplate}${destinationTemplate}</section>`
    : '';

  const resetButtonText = isCreating ? 'Cancel' : 'Delete';

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img
                class="event__type-icon"
                width="17"
                height="17"
                src="img/icons/${type}.png"
                alt="Event type icon"
              >
            </label>
            <input
              class="event__type-toggle  visually-hidden"
              id="event-type-toggle-1"
              type="checkbox"
              ${isDisabled ? 'disabled' : ''}
            >

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTypeListTemplate(type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${capitalizeFirstLetter(type)}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destination ? escapeHtml(destination.name) : ''}"
              list="destination-list-1"
              ${isDisabled ? 'disabled' : ''}
            >
            <datalist id="destination-list-1">
              ${createDestinationListTemplate(allDestinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${formatEditDate(dateFrom)}"
              ${isDisabled ? 'disabled' : ''}
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${formatEditDate(dateTo)}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-1"
              type="text"
              name="event-price"
              value="${basePrice}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>Save</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${resetButtonText}</button>
          ${!isCreating ? '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>' : ''}
        </header>
        ${detailsTemplate}
      </form>
    </li>
  `;
}

export default class EventEditView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleCloseClick = null;
  #dateFromPicker = null;
  #dateToPicker = null;
  #isCreating = false;

  constructor({ point, offers, destinations, onFormSubmit, onDeleteClick, onCloseClick, isCreating = false }) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCloseClick = onCloseClick;
    this.#isCreating = isCreating;

    this._setState(EventEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state, this.#offers, this.#destinations, this.#isCreating);
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  reset(point) {
    this.updateElement(EventEditView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteHandler);

    if (!this.#isCreating) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeClickHandler);
    }

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);

    this.#setDatepickers();
  }

  #setDatepickers() {
    const dateFromElement = this.element.querySelector('#event-start-time-1');
    const dateToElement = this.element.querySelector('#event-end-time-1');

    const commonConfig = {
      dateFormat: FLATPICKR_DATE_FORMAT,
      enableTime: true,
      'time_24hr': true,
      locale: {
        firstDayOfWeek: FLATPICKR_FIRST_DAY_OF_WEEK,
      },
    };

    this.#dateFromPicker = flatpickr(dateFromElement, {
      ...commonConfig,
      defaultDate: this._state.dateFrom,
      maxDate: this._state.dateTo,
      onChange: this.#dateFromChangeHandler,
    });

    this.#dateToPicker = flatpickr(dateToElement, {
      ...commonConfig,
      defaultDate: this._state.dateTo,
      minDate: this._state.dateFrom,
      onChange: this.#dateToChangeHandler,
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToPoint(this._state));
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EventEditView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#destinations.find(
      (destination) => destination.name === evt.target.value
    );

    if (!selectedDestination) {
      evt.target.value = '';
      return;
    }

    this.updateElement({
      destination: selectedDestination.id,
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    const PRICE_REGEX = /^\d*$/;
    if (!PRICE_REGEX.test(evt.target.value)) {
      evt.target.value = this._state.basePrice;
      return;
    }
    this._setState({
      basePrice: evt.target.value === '' ? 0 : Number(evt.target.value),
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate.toISOString(),
    });
    this.#dateToPicker.set('minDate', userDate);
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate.toISOString(),
    });
    this.#dateFromPicker.set('maxDate', userDate);
  };

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    delete point.isDisabled;
    return point;
  }
}
