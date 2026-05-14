const POINT_TYPES = Object.freeze([
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
]);

const DEFAULT_POINT_TYPE = 'flight';

const SERVER_URL = 'https://24.objects.htmlacademy.pro/big-trip';
const AUTH_TOKEN = 'Basic hS2sfS44wcl1sa2j';

const FilterType = Object.freeze({
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
});

const EmptyListMessage = Object.freeze({
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
});

const SortType = Object.freeze({
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
});

const ALLOWED_SORT_TYPES = new Set([
  SortType.DAY,
  SortType.TIME,
  SortType.PRICE,
]);

const DateFormat = Object.freeze({
  SHORT_DATE: 'MMM DD',
  TIME: 'HH:mm',
  HTML_DATE: 'YYYY-MM-DD',
  HTML_DATETIME: 'YYYY-MM-DDTHH:mm',
  PICKER_DATETIME: 'DD/MM/YY HH:mm',
});

const Mode = Object.freeze({
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
});

const UserAction = Object.freeze({
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
});

const UpdateType = Object.freeze({
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
});

const BLANK_POINT = Object.freeze({
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_POINT_TYPE,
});

const HttpMethod = Object.freeze({
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
});

const BlockerTimeLimit = Object.freeze({
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
});

export {
  POINT_TYPES,
  DEFAULT_POINT_TYPE,
  SERVER_URL,
  AUTH_TOKEN,
  FilterType,
  EmptyListMessage,
  SortType,
  ALLOWED_SORT_TYPES,
  DateFormat,
  Mode,
  UserAction,
  UpdateType,
  BLANK_POINT,
  HttpMethod,
  BlockerTimeLimit,
};
