import {RenderPosition, renderElement} from "../utils/render";

import FilmsContainerView from "../view/films-container";
import FilmsListView from "../view/films-list";
import FilmView from "../view/film";
import ShowMoreButtonView from "../view/show-more-button";
import FilmsExtraView from "../view/films-extra";
import FilmInfoView from "../view/film-details";
import NoFilmView from "../view/no_film";

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

const extraFields = new Set([`Top rated`, `Most commented`]);

const siteBody = document.querySelector(`body`);

export default class MovieList {
  constructor(container) {
    this._movieListContainer = container;
    this._movieCount = FILMS_COUNT_PER_STEP;
    this._filmCounter = this._movieCount;

    this._movieContainerComponent = new FilmsContainerView();
    this._movieListComponent = new FilmsListView();
    this._noMovieComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._filmsListContainer = this._movieListComponent.element.querySelector(`.films-list__container`);

    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
  }

  init(movies) {
    this._movies = movies.slice();

    renderElement(this._movieContainerComponent, this._movieListContainer, RenderPosition.BEFORE_END);
    this._renderMovieList();
  }

  _renderMovieList() {
    renderElement(this._movieListComponent, this._movieContainerComponent, RenderPosition.BEFORE_END);

    if (this._movies.length === 0) {
      this._renderNoMovie();
      return;
    }

    this._renderMovies(0, Math.min(this._movies.length, this._movieCount), this._filmsListContainer);
    this._renderExtraMovie();
  }

  _renderNoMovie() {
    renderElement(this._noMovieComponent, this._movieListComponent, RenderPosition.BEFORE_END);
  }

  _renderMovie(film, container) {
    const filmComponent = new FilmView(film);
    const filmInfoComponent = new FilmInfoView(film);

    const onFilmCardClick = () => {
      siteBody.appendChild(filmInfoComponent.element);
      document.addEventListener(`keydown`, onEscapePress);
    };

    const onEscapePress = (evt) => {
      if (evt.key === `Escape`) {
        siteBody.removeChild(filmInfoComponent.element);
        document.removeEventListener(`keydown`, onEscapePress);
      }
    };

    renderElement(filmComponent, container, RenderPosition.BEFORE_END);

    filmComponent.setOnCardClick(onFilmCardClick);

    filmInfoComponent.setOnExitClick(() => {
      siteBody.removeChild(filmInfoComponent.element);
      document.removeEventListener(`keydown`, onEscapePress);
    });
  }

  _renderMovies(from, to, place) {
    this._movies.slice(from, to).forEach((movie) => this._renderMovie(movie, place));

    if (this._movies.length > this._movieCount) {
      this._renderLoadMoreButton();
    }

  }

  _renderLoadMoreButton() {
    renderElement(this._showMoreButtonComponent, this._movieListComponent, RenderPosition.BEFORE_END);

    this._showMoreButtonComponent.setOnButtonClick(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {

    this._renderMovies(this._filmCounter, this._filmCounter + this._movieCount, this._filmsListContainer);

    this._filmCounter += this._movieCount;

    if (this._filmCounter >= this._movies.length) {
      this._showMoreButtonComponent.element.remove();
      this._showMoreButtonComponent.removeElement();
    }
  }

  _renderExtraMovie() {
    for (const field of extraFields) {
      const movieExtraComponent = new FilmsExtraView(field);
      renderElement(movieExtraComponent, this._movieContainerComponent, RenderPosition.BEFORE_END);
    }
    const extraFilmsContainers = this._movieContainerComponent.element.querySelectorAll(`.films-list--extra .films-list__container`);

    // пока просто отображаются фильмы из списка
    extraFilmsContainers.forEach((extraFilmsContainer) => {
      for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
        this._renderMovie(this._movies[i], extraFilmsContainer);
      }
    });
  }

}
