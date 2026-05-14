import TripInfoView from '../view/trip-info-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { sortByDay } from '../utils.js';
import dayjs from 'dayjs';

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

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({ title, duration, cost });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #getTripTitle(points) {
    const destinations = this.#pointsModel.destinations;
    const destinationNames = points.map((point) => {
      const dest = destinations.find((d) => d.id === point.destination);
      return dest ? dest.name : '';
    });

    if (destinationNames.length === 0) {
      return '';
    }

    if (destinationNames.length <= 3) {
      return destinationNames.join(' — ');
    }

    return `${destinationNames[0]} — ... — ${destinationNames[destinationNames.length - 1]}`;
  }

  #getTripDuration(points) {
    if (points.length === 0) {
      return '';
    }

    const startDate = points[0].dateFrom;
    const endDate = points[points.length - 1].dateTo;

    const startMonth = dayjs(startDate).format('MMM');
    const endMonth = dayjs(endDate).format('MMM');
    const startDay = dayjs(startDate).format('DD');
    const endDay = dayjs(endDate).format('DD');

    // Если даты и месяцы полностью совпадают (один день)
    if (startMonth === endMonth && startDay === endDay) {
      return `${startDay} ${startMonth}`;
    }

    // Если месяцы совпадают, но дни разные (например 15 JUL — 16 JUL)
    if (startMonth === endMonth) {
      return `${startDay} ${startMonth}&nbsp;&mdash;&nbsp;${endDay} ${startMonth}`;
    }

    // Если месяцы разные
    return `${startDay} ${startMonth}&nbsp;&mdash;&nbsp;${endDay} ${endMonth}`;
  }

  #getTripCost(points) {
    const offers = this.#pointsModel.offers;
    let cost = 0;

    points.forEach((point) => {
      cost += point.basePrice;

      const pointTypeOffers = offers.find((o) => o.type === point.type);
      if (pointTypeOffers) {
        point.offers.forEach((offerId) => {
          const offer = pointTypeOffers.offers.find((o) => o.id === offerId);
          if (offer) {
            cost += offer.price;
          }
        });
      }
    });

    return cost;
  }
}
