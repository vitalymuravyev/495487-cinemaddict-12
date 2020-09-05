import {RenderPosition, renderElement} from "../utils/render";
import {updateItem, sortMovieRating, sortMovieDate} from "../utils";
import {SortType} from "../const";

import FilmsContainerView from "../view/films-container";
import FilmsListView from "../view/films-list";
import ShowMoreButtonView from "../view/show-more-button";
import FilmsExtraView from "../view/films-extra";
import NoFilmView from "../view/no_film";
import SortView from "../view/sort";

import MoviePresenter from "./movie";

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

const extraFields = new Set([`Top rated`, `Most commented`]);


export default class MovieList {
  constructor(container) {
    this._movieListContainer = container;
    this._movieCount = FILMS_COUNT_PER_STEP;
    this._filmCounter = this._movieCount;
    this._moviePresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._movieContainerComponent = new FilmsContainerView();
    this._movieListComponent = new FilmsListView();
    this._noMovieComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._sortComponent = new SortView();

    this._filmsListContainer = this._movieListComponent.element.querySelector(`.films-list__container`);

    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onMovieChange = this._onMovieChange.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  init(movies) {
    this._movies = movies.slice();
    this._backupMovies = movies.slice();

    this._renderSort();
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
    // this._renderExtraMovie();
  }

  _renderSort() {
    renderElement(this._sortComponent, this._movieListContainer, RenderPosition.BEFORE_END);
    this._sortComponent.setOnSortChange(this._onSortTypeChange);
  }

  _renderNoMovie() {
    renderElement(this._noMovieComponent, this._movieListComponent, RenderPosition.BEFORE_END);
  }

  _renderMovie(film, container) {
    const moviePresenter = new MoviePresenter(container, this._onMovieChange, this._onModeChange);

    moviePresenter.init(film);
    this._moviePresenter[film.id] = moviePresenter;
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

  _onMovieChange(updatedMovie) {
    this._movies = updateItem(this._movies, updatedMovie);
    this._moviePresenter[updatedMovie.id].init(updatedMovie);
  }

  _onModeChange() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.closePopup());
  }

  _onSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortMovies(sortType);
    this._clearTaskList();
    this._renderMovieList();
  }

  _sortMovies(sortType) {
    switch (sortType) {
      case SortType.RATING:
        this._movies.sort(sortMovieRating);
        break;
      case SortType.DATE:
        this._movies.sort(sortMovieDate);
        break;
      default:
        this._movies = this._backupMovies.slice();
    }

    this._currentSortType = sortType;
  }

  _clearTaskList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());

    this._moviePresenter = {};
    this._movieCount = FILMS_COUNT_PER_STEP;
  }

}
