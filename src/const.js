const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const POINT_COUNT = 4;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const NoPointMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const EnabledSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFER]: false,
};

const DateFormat = {
  DATE_FORMAT: 'MMM DD',
  TIME_FORMAT: 'HH:mm',
  DATETIME_ATTRIBUTE: 'YYYY-MM-DD',
  TIME_ATTRIBUTE: 'YYYY-MM-DDTHH:mm',
  EDIT_DATE_FORMAT: 'DD/MM/YY HH:mm',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export {
  POINT_TYPES,
  POINT_COUNT,
  FilterType,
  NoPointMessage,
  SortType,
  EnabledSortType,
  DateFormat,
  Mode,
};
