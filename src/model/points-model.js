import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

const KEY_MAPPING_TO_CLIENT = Object.freeze({
  'base_price': 'basePrice',
  'date_from': 'dateFrom',
  'date_to': 'dateTo',
  'is_favorite': 'isFavorite',
});

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const [points, offers, destinations] = await Promise.all([
        this.#pointsApiService.points,
        this.#pointsApiService.offers,
        this.#pointsApiService.destinations,
      ]);

      this.#points = points.map(this.#adaptToClient);
      this.#offers = offers;
      this.#destinations = destinations;

      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];

      this._notify(UpdateType.ERROR);
    }
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [newPoint, ...this.#points];

      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient = (point) => {
    const adaptedPoint = Object.entries(point).reduce((accumulator, [key, value]) => {
      const clientKey = KEY_MAPPING_TO_CLIENT[key] || key;
      let clientValue = value;

      if (key === 'date_from' || key === 'date_to') {
        clientValue = value !== null ? new Date(value) : value;
      }

      accumulator[clientKey] = clientValue;
      return accumulator;
    }, {});

    return adaptedPoint;
  };
}
