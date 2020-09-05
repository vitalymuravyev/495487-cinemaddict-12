

export const getRandom = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

export const getRandomInteger = (a, b = 0) => {
  const low = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(low + Math.random() * (max - low + 1));
};

export const generateRandomItem = (arr) => arr[getRandomInteger(0, arr.length - 1)];

export const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const sortMovieRating = (movie1, movie2) => movie2.rating - movie1.rating;

export const sortMovieDate = (movie1, movie2) => movie2.realiseDate.getTime() - movie1.realiseDate.getTime();
