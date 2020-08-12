import {getRandom, getRandomInteger, generateRandomValue, getBoolean} from "../utils";
import {sentences, TITLES, ACTIONS, POSTERS, EMOJIES, AUTHORS, DIRECTORS, WRITERS, ACTORS, COUNTRIES} from "../const";

const FILMS_COUNT = 17;


const getRandomDuration = () => {
  const MIN_DURATION = 50;
  const MAX_DURATION = 100;

  const duration = getRandomInteger(MIN_DURATION, MAX_DURATION);

  return duration >= 60 ? `${Math.trunc(duration / 60)}h ${duration % 60}m` : `${duration}m`;
};

const getRandomDescription = () => {
  const MAX_SENTENCE = 5;
  const sentenceCount = getRandomInteger(1, MAX_SENTENCE);
  let description = ``;
  for (let i = 0; i < sentenceCount; i++) {
    const randomSentence = sentences[getRandomInteger(sentences.length - 1)];
    description += ` ${randomSentence}.`.trim();
  }
  return description;
};

const getComment = () => {
  const comment = {
    post: sentences[getRandomInteger(sentences.length - 1)],
    author: generateRandomValue(AUTHORS),
    date: getRandomDate(),
    emoji: generateRandomValue(EMOJIES),
  };

  return comment;
};

const getComments = () => {
  const MAX_COMMENTS_COUNT = 5;

  const commentsCount = getRandomInteger(MAX_COMMENTS_COUNT);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(getComment());
  }

  return comments;
};

const getRandomDate = () => {
  const MAX_DATE_GAP = 25550;

  const dateGap = getRandomInteger(MAX_DATE_GAP);
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() - dateGap);

  return currentDate;
};

const getRandomWriters = () => {
  const writersCount = getRandomInteger(1, 2);

  let writers = Array(writersCount).fill().map(() => generateRandomValue(WRITERS));
  return writers;

};

const getRandomActors = () => {
  const actorsCount = getRandomInteger(3, 5);

  const actors = Array(actorsCount).fill().map(() => generateRandomValue(ACTORS));
  return actors;
};

const getRandomGenres = () => {
  const genresCount = getRandomInteger(1, 3);

  const genres = Array(genresCount).fill().map(() => generateRandomValue(ACTIONS));

  return genres;
};

const generateFilm = () => {
  const title = generateRandomValue(TITLES);
  const realiseDate = getRandomDate();
  return {
    poster: generateRandomValue(POSTERS),
    title,
    originalTitle: title.toUpperCase(),
    rating: getRandom(10).toFixed(1),
    director: generateRandomValue(DIRECTORS),
    writers: getRandomWriters(),
    actors: getRandomActors(),
    duration: getRandomDuration(),
    country: generateRandomValue(COUNTRIES),
    genre: getRandomGenres(),
    ageRating: getRandomInteger(5, 18),
    realiseDate,
    realiseYear: realiseDate.getFullYear(),
    description: getRandomDescription(),
    comments: getComments(),
    isInWatchList: getBoolean(),
    isWatched: getBoolean(),
    isFavorite: getBoolean(),
  };

};

export const films = Array(FILMS_COUNT).fill().map(generateFilm);
