import { getRandomInteger, getRandomArrayElement } from '../utils.js';

const CITIES = ['Amsterdam', 'Geneva', 'Chamonix', 'Paris', 'London', 'Berlin', 'Tokyo'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const MIN_SENTENCE_COUNT = 1;
const MAX_SENTENCE_COUNT = 5;
const MIN_PICTURE_COUNT = 1;
const MAX_PICTURE_COUNT = 5;
const MAX_RANDOM_NUMBER = 1000;

function generateDescription() {
  const sentenceCount = getRandomInteger(MIN_SENTENCE_COUNT, MAX_SENTENCE_COUNT);
  return Array.from({ length: sentenceCount }, () => getRandomArrayElement(DESCRIPTIONS)).join(' ');
}

function generatePictures() {
  const pictureCount = getRandomInteger(MIN_PICTURE_COUNT, MAX_PICTURE_COUNT);
  return Array.from({ length: pictureCount }, (_, index) => ({
    src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, MAX_RANDOM_NUMBER)}`,
    description: `Photo ${index + 1}`,
  }));
}

const mockDestinations = CITIES.map((city, index) => ({
  id: String(index + 1),
  description: generateDescription(),
  name: city,
  pictures: generatePictures(),
}));

export { mockDestinations };
