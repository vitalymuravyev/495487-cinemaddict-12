import {createElement} from "../utils";

const getUserRating = (count) => {
  const levelsLowLine = {
    NOVICE: 1,
    FAN: 11,
    MOVIE_BUFF: 21,
  };
  let rating = ``;

  if (count >= levelsLowLine.NOVICE && count < levelsLowLine.FAN) {
    rating = `Novice`;
  }
  if (count >= levelsLowLine.FAN && count < levelsLowLine.MOVIE_BUFF) {
    rating = `Fan`;
  }
  if (count >= levelsLowLine.MOVIE_BUFF) {
    rating = `Movie Buff`;
  }

  return rating;
};

const createUserRatingItemTemplate = (count) => {
  const ratingLevel = getUserRating(count);

  return `<p class="profile__rating">${ratingLevel}</p>`;
};

export default class UserRating {
  constructor(count) {
    this._element = null;
    this._count = count;
  }

  _getTemplate(count) {
    const userRating = createUserRatingItemTemplate(count);

    return (
      `<section class="header__profile profile">
      ${userRating}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this._getTemplate(this._count));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
