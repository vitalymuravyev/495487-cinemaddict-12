import moment from "moment";

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

const isDate = (date) => date instanceof Date;

export const formatReleaseDate = (releaseDate) => {
  if (!isDate(releaseDate)) {
    return ``;
  }

  return moment(releaseDate).format(`DD MMMM YYYY`);
};

export const getReleaseYear = (releaseDate) => {
  if (!isDate(releaseDate)) {
    return ``;
  }

  return moment(releaseDate).format(`YYYY`);
};

export const formatDuration = (duration) => {
  const currentDuration = moment.duration(duration, `minutes`);

  return currentDuration.get(`hours`) ? `${currentDuration.get(`hours`)}h ${currentDuration.get(`minutes`)}m` : `${currentDuration.get(`minutes`)}m`;
};

export const formatCommentDate = (date) => {
  if (!isDate(date)) {
    return ``;
  }

  return moment(date).fromNow();
};
