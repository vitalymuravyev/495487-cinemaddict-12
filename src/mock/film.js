import {getRandom, getRandomInteger, generateRandomItem, getRandomBoolean} from "../utils";
import {SENTENCES, TITLES, ACTIONS, POSTERS, EMOJIES, AUTHORS, DIRECTORS, WRITERS, ACTORS, COUNTRIES} from "../const";

const MINUTES_IN_HOUR = 60;
const MAX_SENTENCE = 5;
const MAX_COMMENTS_COUNT = 5;
const MAX_DATE_GAP = 25550;

const Duration = {
  MIN: 50,
  MAX: 100,
};
const WritersCount = {
  MIN: 1,
  MAX: 2,
};
const ActorsCount = {
  MIN: 3,
  MAX: 5,
};
const GenresCount = {
  MIN: 1,
  MAX: 3,
};

const getRandomDuration = () => {
  const duration = getRandomInteger(Duration.MIN, Duration.MAX);

  return duration >= MINUTES_IN_HOUR ? `${Math.trunc(duration / MINUTES_IN_HOUR)}h ${duration % MINUTES_IN_HOUR}m` : `${duration}m`;
};

const getRandomDescription = () => {
  const sentenceCount = getRandomInteger(1, MAX_SENTENCE);
  let description = ``;
  for (let i = 0; i < sentenceCount; i++) {
    const randomSentence = generateRandomItem(SENTENCES);
    description += ` ${randomSentence}.`.trim();
  }
  return description;
};

const getComment = () => ({
  post: generateRandomItem(SENTENCES),
  author: generateRandomItem(AUTHORS),
  date: getRandomDate(),
  emoji: generateRandomItem(EMOJIES),
});

const getComments = () => {
  const commentsCount = getRandomInteger(MAX_COMMENTS_COUNT);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(getComment());
  }

  return comments;
};

const getRandomDate = () => {
  const dateGap = getRandomInteger(MAX_DATE_GAP);
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() - dateGap);

  return currentDate;
};

const getRandomWriters = () => {
  const writersCount = getRandomInteger(WritersCount.MIN, WritersCount.MAX);

  return Array(writersCount).fill(``).map(() => generateRandomItem(WRITERS));

};

const getRandomActors = () => {
  const actorsCount = getRandomInteger(ActorsCount.MIN, ActorsCount.MAX);

  return Array(actorsCount).fill(``).map(() => generateRandomItem(ACTORS));
};

const getRandomGenres = () => {
  const genresCount = getRandomInteger(GenresCount.MIN, GenresCount.MAX);

  return Array(genresCount).fill(``).map(() => generateRandomItem(ACTIONS));
};

const generateFilm = () => {
  const title = generateRandomItem(TITLES);
  const realiseDate = getRandomDate();
  return {
    poster: generateRandomItem(POSTERS),
    title,
    originalTitle: title.toUpperCase(),
    rating: getRandom(10).toFixed(1),
    director: generateRandomItem(DIRECTORS),
    writers: getRandomWriters(),
    actors: getRandomActors(),
    duration: getRandomDuration(),
    country: generateRandomItem(COUNTRIES),
    genre: getRandomGenres(),
    ageRating: getRandomInteger(5, 18),
    realiseDate,
    realiseYear: realiseDate.getFullYear(),
    description: getRandomDescription(),
    comments: getComments(),
    isInWatchList: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };

};

export const generateFilms = (filmsCount) => Array(filmsCount).fill(``).map(generateFilm);
