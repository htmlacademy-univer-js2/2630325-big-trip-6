import { generatePoints } from '../mock/points.js';
import { mockOffersByType } from '../mock/offers.js';
import { mockDestinations } from '../mock/destinations.js';

export default class PointsModel {
  #points = generatePoints();
  #offers = mockOffersByType;
  #destinations = mockDestinations;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
