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

function generateDescription() {
  const sentenceCount = getRandomInteger(1, 5);
  return Array.from({ length: sentenceCount }, () => getRandomArrayElement(DESCRIPTIONS)).join(' ');
}

function generatePictures() {
  return Array.from({ length: getRandomInteger(1, 5) }, (_, index) => ({
    src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
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
