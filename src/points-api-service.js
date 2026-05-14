import ApiService from './framework/api-service.js';
import { HttpMethod } from './const.js';

const KEY_MAPPING_TO_SERVER = {
  basePrice: 'base_price',
  dateFrom: 'date_from',
  dateTo: 'date_to',
  isFavorite: 'is_favorite',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: HttpMethod.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await ApiService.parseResponse(response);
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: HttpMethod.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await ApiService.parseResponse(response);
  }

  async deletePoint(point) {
    return await this._load({
      url: `points/${point.id}`,
      method: HttpMethod.DELETE,
    });
  }

  #adaptToServer(point) {
    const adaptedPoint = Object.entries(point).reduce((accumulator, [key, value]) => {
      const serverKey = KEY_MAPPING_TO_SERVER[key] || key;
      let serverValue = value;

      if (value instanceof Date) {
        serverValue = value.toISOString();
      }

      accumulator[serverKey] = serverValue;
      return accumulator;
    }, {});

    return adaptedPoint;
  }
}
