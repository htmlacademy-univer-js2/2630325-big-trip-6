import TripInfoView from '../view/trip-info-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { sortByDay, formatDate } from '../utils.js';

const MAX_DESTINATIONS_TO_DISPLAY = 3;

export default class TripInfoPresenter {
  #container = null;
  #pointsModel = null;
  #tripInfoComponent = null;

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const points = this.#pointsModel.points;

    if (points.length === 0) {
      if (this.#tripInfoComponent) {
        remove(this.#tripInfoComponent);
        this.#tripInfoComponent = null;
      }
      return;
    }

    const sortedPoints = [...points].sort(sortByDay);
    const title = this.#getTripTitle(sortedPoints);
    const duration = this.#getTripDuration(sortedPoints);
    const cost = this.#getTripCost(sortedPoints);

    const previousTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({ title, duration, cost });

    if (!previousTripInfoComponent) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, previousTripInfoComponent);
    remove(previousTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #getTripTitle(points) {
    const destinations = this.#pointsModel.destinations;

    const destinationNames = points
      .map((point) => destinations.find((destination) => destination.id === point.destination)?.name)
      .filter(Boolean);

    if (destinationNames.length === 0) {
      return '';
    }

    if (destinationNames.length <= MAX_DESTINATIONS_TO_DISPLAY) {
      return destinationNames.join(' — ');
    }

    return `${destinationNames.at(0)} — ... — ${destinationNames.at(-1)}`;
  }

  #getTripDuration(points) {
    if (points.length === 0) {
      return '';
    }

    const startDate = points.at(0).dateFrom;
    const endDate = points.at(-1).dateTo;

    const startMonth = formatDate(startDate, 'MMM');
    const endMonth = formatDate(endDate, 'MMM');
    const startDay = formatDate(startDate, 'DD');
    const endDay = formatDate(endDate, 'DD');

    if (startMonth === endMonth && startDay === endDay) {
      return `${startDay} ${startMonth}`;
    }

    if (startMonth === endMonth) {
      return `${startDay} ${startMonth}&nbsp;&mdash;&nbsp;${endDay} ${startMonth}`;
    }

    return `${startDay} ${startMonth}&nbsp;&mdash;&nbsp;${endDay} ${endMonth}`;
  }

  #getTripCost(points) {
    const allOffers = this.#pointsModel.offers;

    return points.reduce((totalCost, point) => {
      const pointTypeOffers = allOffers.find((offerGroup) => offerGroup.type === point.type);

      const offersCost = pointTypeOffers
        ? pointTypeOffers.offers
          .filter((offer) => point.offers.includes(offer.id))
          .reduce((sum, offer) => sum + offer.price, 0)
        : 0;

      return totalCost + point.basePrice + offersCost;
    }, 0);
  }
}
