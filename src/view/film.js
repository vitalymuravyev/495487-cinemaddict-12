import AbstractView from "./abstract";

const MAX_LENGTH = 140;

const addClassName = (property) => property ? `film-card__controls-item--active` : ``;

export default class Film extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._cardClick = this._cardClick.bind(this);
  }

  _getTemplate() {
    return this._createTemplate(this._film);
  }

  _createTemplate(film) {
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

  _cardClick(evt) {
    evt.preventDefault();
    this._callback.cardClick();
  }

  setOnCardClick(callback) {
    this._callback.cardClick = callback;
    this.element.querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
    .forEach((filmCard) => filmCard.addEventListener(`click`, this._cardClick));
  }
}
