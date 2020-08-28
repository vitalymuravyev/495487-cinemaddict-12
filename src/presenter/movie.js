import FilmView from "../view/film";
import FilmInfoView from "../view/film-details";

import {RenderPosition, renderElement} from "../utils/render";

const siteBody = document.querySelector(`body`);

export default class Movie {
  constructor(container) {
    this._container = container;

    this._filmComponent = {};
    this._filmInfoComponent = {};

    this._onEscapePress = this._onEscapePress.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
  }

  init(film) {
    this._filmComponent = new FilmView(film);
    this._filmInfoComponent = new FilmInfoView(film);

    renderElement(this._filmComponent, this._container, RenderPosition.BEFORE_END);

    this._filmComponent.setOnCardClick(this._onFilmCardClick);

    this._filmInfoComponent.setOnExitClick(() => {
      siteBody.removeChild(this._filmInfoComponent.element);
      document.removeEventListener(`keydown`, this._onEscapePress);
    });
  }

  _onFilmCardClick() {
    siteBody.appendChild(this._filmInfoComponent.element);
    document.addEventListener(`keydown`, this._onEscapePress);
  }

  _onEscapePress(evt) {
    if (evt.key === `Escape`) {
      siteBody.removeChild(this._filmInfoComponent.element);
      document.removeEventListener(`keydown`, this._onEscapePress);
    }
  }

}


// const filmComponent = new FilmView(film);
// const filmInfoComponent = new FilmInfoView(film);

// const onFilmCardClick = () => {
//   siteBody.appendChild(filmInfoComponent.element);
//   document.addEventListener(`keydown`, onEscapePress);
// };

// const onEscapePress = (evt) => {
//   if (evt.key === `Escape`) {
//     siteBody.removeChild(filmInfoComponent.element);
//     document.removeEventListener(`keydown`, onEscapePress);
//   }
// };

// renderElement(filmComponent, container, RenderPosition.BEFORE_END);

// filmComponent.setOnCardClick(onFilmCardClick);

// filmInfoComponent.setOnExitClick(() => {
//   siteBody.removeChild(filmInfoComponent.element);
//   document.removeEventListener(`keydown`, onEscapePress);
// });
