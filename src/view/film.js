import {createElement} from "../utils";

const MAX_LENGTH = 140;

const addClassName = (property) => property ? `film-card__controls-item--active` : ``;

export default class Film {
  constructor(film) {
    this._element = null;
    this._film = film;
  }

  _getTemplate(film) {
    const {description, rating, title, realiseYear, duration, genre, comments, poster, isFavorite, isWatched, isInWatchList} = film;
    const shortDescription = description.length >= MAX_LENGTH ? description.slice(0, MAX_LENGTH - 2).concat(`...`) : description;
    const watchListClassName = addClassName(isInWatchList);
    const watchedClassName = addClassName(isWatched);
    const favoriteClassName = addClassName(isFavorite);
    return (
      `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${realiseYear}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${shortDescription}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListClassName}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}">Mark as favorite</button>
        </form>
      </article>`
    );
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this._getTemplate(this._film));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
