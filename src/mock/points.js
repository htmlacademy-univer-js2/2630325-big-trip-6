import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { POINT_TYPES, POINT_COUNT } from '../const.js';
import { mockOffersByType } from './offers.js';
import { mockDestinations } from './destinations.js';

const MIN_DAY = 18;
const MAX_DAY = 22;
const MAX_HOUR = 23;
const MAX_MINUTE = 59;
const YEAR = 2019;
const MONTH = 2;
const MIN_DURATION = 30;
const MAX_DURATION = 180;
const MILLISECONDS_IN_MINUTE = 1000 * 60;
const MIN_PRICE = 20;
const MAX_PRICE = 600;

function generateDate() {
  const day = getRandomInteger(MIN_DAY, MAX_DAY);
  const hour = getRandomInteger(0, MAX_HOUR);
  const minute = getRandomInteger(0, MAX_MINUTE);
  return new Date(YEAR, MONTH, day, hour, minute);
}

function generatePoint(id) {
  const type = getRandomArrayElement(POINT_TYPES);
  const destination = getRandomArrayElement(mockDestinations);
  const dateFrom = generateDate();
  const durationInMinutes = getRandomInteger(MIN_DURATION, MAX_DURATION);
  const dateTo = new Date(dateFrom.getTime() + durationInMinutes * MILLISECONDS_IN_MINUTE);

  const typeOffers = mockOffersByType.find((offerGroup) => offerGroup.type === type);
  const RANDOM_BOOLEAN = 0;
  const selectedOffers = typeOffers
    ? typeOffers.offers
      .filter(() => Boolean(getRandomInteger(RANDOM_BOOLEAN, 1)))
      .map((offer) => offer.id)
    : [];

  return {
    id: String(id),
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
    destination: destination.id,
    isFavorite: Boolean(getRandomInteger(RANDOM_BOOLEAN, 1)),
    offers: selectedOffers,
    type,
  };
}

function generatePoints() {
  return Array.from({ length: POINT_COUNT }, (_, index) => generatePoint(index + 1));
}

export { generatePoints };
