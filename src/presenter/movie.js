import FilmView from "../view/film";
import FilmInfoView from "../view/film-details";

import {RenderPosition, renderElement, replace, remove} from "../utils/render";

const Mode = {
  DEFAULT: `DEFAULT`,
  DETAILS: `DETAILS`
};

const siteBody = document.querySelector(`body`);

export default class Movie {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;

    this._filmComponent = null;
    this._filmInfoComponent = null;

    this._onEscapePress = this._onEscapePress.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onWatchListClick = this._onWatchListClick.bind(this);
    this._onWatchedClick = this._onWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
  }

  init(film) {
    this._movie = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmInfoComponent = this._filmInfoComponent;

    this._filmComponent = new FilmView(film);
    this._filmInfoComponent = new FilmInfoView(film);

    this._filmComponent.setOnCardClick(this._onFilmCardClick);
    this._filmComponent.setOnWatchListClick(this._onWatchListClick);
    this._filmComponent.setOnWatchedClick(this._onWatchedClick);
    this._filmComponent.setOnFavoriteClick(this._onFavoriteClick);

    this._filmInfoComponent.setOnWatchListClick(this._onWatchListClick);
    this._filmInfoComponent.setOnWatchedClick(this._onWatchedClick);
    this._filmInfoComponent.setOnFavoriteClick(this._onFavoriteClick);

    this._filmInfoComponent.setOnExitClick(() => {
      siteBody.removeChild(this._filmInfoComponent.element);
      this._mode = Mode.DEFAULT;
      document.removeEventListener(`keydown`, this._onEscapePress);
    });

    if (prevFilmComponent === null) {
      renderElement(this._filmComponent, this._container, RenderPosition.BEFORE_END);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);

    if (prevFilmInfoComponent.element.parentElement !== null) {
      replace(this._filmInfoComponent, prevFilmInfoComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmInfoComponent);


  }

  _onFilmCardClick() {
    siteBody.appendChild(this._filmInfoComponent.element);
    this._changeMode();
    this._mode = Mode.DETAILS;
    document.addEventListener(`keydown`, this._onEscapePress);
  }

  _onEscapePress(evt) {
    if (evt.key === `Escape`) {
      siteBody.removeChild(this._filmInfoComponent.element);
      this._mode = Mode.DEFAULT;
      document.removeEventListener(`keydown`, this._onEscapePress);
    }
  }

  _onWatchListClick() {
    this._changeData(Object.assign({}, this._movie, {isInWatchList: !this._movie.isInWatchList}));
  }

  _onWatchedClick() {
    this._changeData(Object.assign({}, this._movie, {isWatched: !this._movie.isWatched}));
  }

  _onFavoriteClick() {
    this._changeData(Object.assign({}, this._movie, {isFavorite: !this._movie.isFavorite}));
  }

  closePopup() {
    if (this._mode !== Mode.DEFAULT) {
      siteBody.removeChild(this._filmInfoComponent.element);
      document.removeEventListener(`keydown`, this._onEscapePress);
      this._mode = Mode.DEFAULT;
    }
  }

}
