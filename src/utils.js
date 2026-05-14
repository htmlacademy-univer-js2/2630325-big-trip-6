import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import { FilterType } from './const.js';

dayjs.extend(durationPlugin);

const TIME_PAD_LENGTH = 2;
const TIME_PAD_STRING = '0';

const HtmlEscapeMap = Object.freeze({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#039;',
});

const formatToTwoDigits = (value) => String(value).padStart(TIME_PAD_LENGTH, TIME_PAD_STRING);

const capitalizeWord = (word) => {
  if (!word) {
    return '';
  }

  const [firstLetter, ...remainingLetters] = word;
  return `${firstLetter.toUpperCase()}${remainingLetters.join('')}`;
};

const formatDate = (dateString, format) => {
  if (!dateString) {
    return '';
  }

  return dayjs(dateString).format(format);
};

const calculateDuration = (dateFrom, dateTo) => {
  const timeDifference = dayjs(dateTo).diff(dayjs(dateFrom));
  const durationObject = dayjs.duration(timeDifference);

  const days = Math.floor(durationObject.asDays());
  const hours = durationObject.hours();
  const minutes = durationObject.minutes();

  const daysPart = days ? `${formatToTwoDigits(days)}D` : '';
  const hoursPart = (days || hours) ? `${formatToTwoDigits(hours)}H` : '';
  const minutesPart = `${formatToTwoDigits(minutes)}M`;

  return [daysPart, hoursPart, minutesPart].filter(Boolean).join(' ');
};

const isPointInFuture = (point) => dayjs().isBefore(dayjs(point.dateFrom));
const isPointPresent = (point) => dayjs().isAfter(dayjs(point.dateFrom)) && dayjs().isBefore(dayjs(point.dateTo));
const isPointInPast = (point) => dayjs().isAfter(dayjs(point.dateTo));

const filterByRule = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isPointInFuture),
  [FilterType.PRESENT]: (points) => points.filter(isPointPresent),
  [FilterType.PAST]: (points) => points.filter(isPointInPast),
};

const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom).valueOf() - dayjs(pointB.dateFrom).valueOf();

const sortByTime = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).valueOf() - dayjs(pointA.dateFrom).valueOf();
  const durationB = dayjs(pointB.dateTo).valueOf() - dayjs(pointB.dateFrom).valueOf();
  return durationB - durationA;
};

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const escapeHtml = (text) => {
  if (!text) {
    return '';
  }

  return String(text).replace(/[&<>"']/g, (match) => HtmlEscapeMap[match]);
};

export {
  capitalizeWord,
  formatDate,
  calculateDuration,
  filterByRule,
  sortByDay,
  sortByTime,
  sortByPrice,
  escapeHtml,
};
