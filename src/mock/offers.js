const mockOffersByType = [
  {
    type: 'taxi',
    offers: [
      { id: 'taxi-1', title: 'Order Uber', price: 20 },
      { id: 'taxi-2', title: 'Upgrade to a business class', price: 120 },
    ],
  },
  {
    type: 'bus',
    offers: [],
  },
  {
    type: 'train',
    offers: [
      { id: 'train-1', title: 'Book a seat', price: 40 },
    ],
  },
  {
    type: 'ship',
    offers: [
      { id: 'ship-1', title: 'Choose a cabin', price: 150 },
      { id: 'ship-2', title: 'Choose a meal', price: 50 },
    ],
  },
  {
    type: 'drive',
    offers: [
      { id: 'drive-1', title: 'Rent a car', price: 200 },
    ],
  },
  {
    type: 'flight',
    offers: [
      { id: 'flight-1', title: 'Add luggage', price: 50 },
      { id: 'flight-2', title: 'Switch to comfort', price: 80 },
      { id: 'flight-3', title: 'Add meal', price: 15 },
      { id: 'flight-4', title: 'Choose seats', price: 5 },
      { id: 'flight-5', title: 'Travel by train', price: 40 },
    ],
  },
  {
    type: 'check-in',
    offers: [
      { id: 'check-in-1', title: 'Add breakfast', price: 50 },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      { id: 'sightseeing-1', title: 'Book tickets', price: 40 },
      { id: 'sightseeing-2', title: 'Lunch in city', price: 30 },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      { id: 'restaurant-1', title: 'Reserve a table', price: 20 },
    ],
  },
];

export { mockOffersByType };
