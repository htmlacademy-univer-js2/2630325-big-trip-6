import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { POINT_TYPES, POINT_COUNT } from '../const.js';
import { mockOffersByType } from './offers.js';
import { mockDestinations } from './destinations.js';

function generateDate() {
  const day = getRandomInteger(18, 22);
  const hour = getRandomInteger(0, 23);
  const minute = getRandomInteger(0, 59);
  return new Date(2019, 2, day, hour, minute);
}

function generatePoint(id) {
  const type = getRandomArrayElement(POINT_TYPES);
  const destination = getRandomArrayElement(mockDestinations);
  const dateFrom = generateDate();
  const dateTo = new Date(dateFrom.getTime() + getRandomInteger(30, 180) * 60 * 1000);

  const typeOffers = mockOffersByType.find((offerGroup) => offerGroup.type === type);
  const selectedOffers = typeOffers
    ? typeOffers.offers
      .filter(() => Boolean(getRandomInteger(0, 1)))
      .map((offer) => offer.id)
    : [];

  return {
    id: String(id),
    basePrice: getRandomInteger(20, 600),
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
    destination: destination.id,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: selectedOffers,
    type,
  };
}

function generatePoints() {
  return Array.from({ length: POINT_COUNT }, (_, index) => generatePoint(index + 1));
}

export { generatePoints };
