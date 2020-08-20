import {RenderPosition, renderElement} from "./utils";

import UserRatingView from "./view/user-rating";
import MenuContainerView from "./view/menu-container";
import MainMenuView from "./view/main-menu";
import MainMenuStatisticView from "./view/menu-statistic";
import SortView from "./view/sort";
import FilmsContainerView from "./view/films-container";
import FilmsListView from "./view/films-list";
import FilmView from "./view/film";
import ShowMoreButtonView from "./view/show-more-button";
import FilmsExtraView from "./view/films-extra";
import FooterStatisticView from "./view/footer-statistic";
import FilmInfoView from "./view/film-details";
import NoFilmView from "./view/no_film";

import {generateFilms} from "./mock/film";
import {generateFilters} from "./mock/filter";

const FILMS_COUNT = 0;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

const extraFields = new Set([`Top rated`, `Most commented`]);

const films = generateFilms(FILMS_COUNT);
const filters = generateFilters(films);
const watchedFilmsCount = filters.find((item) => item.name === `history`).count;

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`.header`);
const siteMain = siteBody.querySelector(`.main`);
const siteStatistic = siteBody.querySelector(`.footer__statistics`);

const renderFilmContainer = (movies, container) => {
  const filmsContainerComponent = new FilmsContainerView();
  renderElement(filmsContainerComponent.element, container, RenderPosition.BEFORE_END);

  const filmsListComponent = new FilmsListView();
  renderElement(filmsListComponent.element, filmsContainerComponent.element, RenderPosition.BEFORE_END);

  if (movies.length === 0) {
    renderElement(new NoFilmView().element, filmsListComponent.element, RenderPosition.BEFORE_END);
    return;
  }

  const filmsListContainer = filmsContainerComponent.element.querySelector(`.films-list__container`);

  for (let i = 0; i < Math.min(movies.length, FILMS_COUNT_PER_STEP); i++) {
    renderFilm(movies[i], filmsListContainer);
  }

  if (movies.length > FILMS_COUNT_PER_STEP) {
    let filmCounter = FILMS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    renderElement(showMoreButtonComponent.element, filmsContainerComponent.element, RenderPosition.BEFORE_END);

    showMoreButtonComponent.element.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      movies.slice(filmCounter, filmCounter + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilm(film, filmsListContainer));

      filmCounter += FILMS_COUNT_PER_STEP;

      if (filmCounter >= movies.length) {
        showMoreButtonComponent.element.remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  for (const field of extraFields) {
    const filmsExtraComponent = new FilmsExtraView(field);
    renderElement(filmsExtraComponent.element, filmsContainerComponent.element, RenderPosition.BEFORE_END);
  }
  const extraFilmsContainers = filmsContainerComponent.element.querySelectorAll(`.films-list--extra .films-list__container`);

  // пока просто отображаются фильмы из списка
  for (const extraFilmsContainer of extraFilmsContainers) {
    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      renderFilm(movies[i], extraFilmsContainer);
    }
  }
};

const renderFilm = (film, container) => {
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

  renderElement(filmComponent.element, container, RenderPosition.BEFORE_END);

  filmComponent.element
    .querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
    .forEach((filmCard) => filmCard.addEventListener(`click`, onFilmCardClick));

  filmInfoComponent.element.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    siteBody.removeChild(filmInfoComponent.element);
    document.removeEventListener(`keydown`, onEscapePress);
  });
};

renderElement(new UserRatingView(watchedFilmsCount).element, siteHeader, RenderPosition.BEFORE_END);

const mainContainerComponent = new MenuContainerView();
renderElement(mainContainerComponent.element, siteMain, RenderPosition.BEFORE_END);

renderElement(new MainMenuView(filters).element, mainContainerComponent.element, RenderPosition.BEFORE_END);
renderElement(new MainMenuStatisticView().element, mainContainerComponent.element, RenderPosition.BEFORE_END);
renderElement(new SortView().element, siteMain, RenderPosition.BEFORE_END);

renderFilmContainer(films, siteMain);

renderElement(new FooterStatisticView(films).element, siteStatistic, RenderPosition.BEFORE_END);
