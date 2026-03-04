const MONTH_NAMES = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function getRandomArrayElement(items) {
  return items[getRandomInteger(0, items.length - 1)];
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ---------- Date Formatting ----------

function humanizePointDate(dateString) {
  const date = new Date(dateString);
  return `${MONTH_NAMES[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}`;
}

function humanizePointTime(dateString) {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function getDatetimeAttribute(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTimeAttribute(dateString) {
  return `${getDatetimeAttribute(dateString)}T${humanizePointTime(dateString)}`;
}

function formatEditDate(dateString) {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function getDuration(dateFrom, dateTo) {
  const diff = new Date(dateTo) - new Date(dateFrom);
  const totalMinutes = Math.floor(diff / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }
  return `${minutes}M`;
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
};
