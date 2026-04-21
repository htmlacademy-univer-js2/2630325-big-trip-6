import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FilterType, DateFormat } from './const.js';

dayjs.extend(duration);

function getRandomInteger(min = 0, max = 1) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function getRandomArrayElement(items) {
  return items[getRandomInteger(0, items.length - 1)];
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function humanizePointDate(dateString) {
  return dayjs(dateString).format(DateFormat.DATE_FORMAT).toUpperCase();
}

function humanizePointTime(dateString) {
  return dayjs(dateString).format(DateFormat.TIME_FORMAT);
}

function getDatetimeAttribute(dateString) {
  return dayjs(dateString).format(DateFormat.DATETIME_ATTRIBUTE);
}

function getTimeAttribute(dateString) {
  return dayjs(dateString).format(DateFormat.TIME_ATTRIBUTE);
}

function formatEditDate(dateString) {
  if (!dateString) {
    return '';
  }
  return dayjs(dateString).format(DateFormat.EDIT_DATE_FORMAT);
}

function getDuration(dateFrom, dateTo) {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  const durationObj = dayjs.duration(diff);

  const days = Math.floor(durationObj.asDays());
  const hours = durationObj.hours();
  const minutes = durationObj.minutes();

  const PAD_LENGTH = 2;
  const PAD_STRING = '0';

  if (days > 0) {
    return `${String(days).padStart(PAD_LENGTH, PAD_STRING)}D ${String(hours).padStart(PAD_LENGTH, PAD_STRING)}H ${String(minutes).padStart(PAD_LENGTH, PAD_STRING)}M`;
  }
  if (hours > 0) {
    return `${String(hours).padStart(PAD_LENGTH, PAD_STRING)}H ${String(minutes).padStart(PAD_LENGTH, PAD_STRING)}M`;
  }
  return `${minutes}M`;
}

function isPointFuture(point) {
  return dayjs().isBefore(dayjs(point.dateFrom));
}

function isPointPresent(point) {
  return dayjs().isAfter(dayjs(point.dateFrom)) && dayjs().isBefore(dayjs(point.dateTo));
}

function isPointPast(point) {
  return dayjs().isAfter(dayjs(point.dateTo));
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isPointFuture),
  [FilterType.PRESENT]: (points) => points.filter(isPointPresent),
  [FilterType.PAST]: (points) => points.filter(isPointPast),
};

function sortByDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortByTime(pointA, pointB) {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return durationB - durationA;
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function escapeHtml(str) {
  if (!str) {
    return '';
  }
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export {
  getRandomInteger,
  getRandomArrayElement,
  capitalizeFirstLetter,
  humanizePointDate,
  humanizePointTime,
  getDatetimeAttribute,
  getTimeAttribute,
  formatEditDate,
  getDuration,
  filter,
  sortByDay,
  sortByTime,
  sortByPrice,
  escapeHtml,
};
