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

import {generateFilms} from "./mock/film";
import {generateFilters} from "./mock/filter";

const FILMS_COUNT = 17;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FIELD_COUNT = 2;
const EXTRA_FILMS_COUNT = 2;

const films = generateFilms(FILMS_COUNT);
const filters = generateFilters(films);
const watchedFilmsCount = filters.find((item) => item.name === `history`).count;

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`.header`);
const siteMain = siteBody.querySelector(`.main`);
const siteStatistic = siteBody.querySelector(`.footer__statistics`);

const renderFilm = (film) => {
  const filmComponent = new FilmView(film);
  const filmInfoComponent = new FilmInfoView(film);

  const openPopup = () => {
    siteBody.appendChild(filmInfoComponent.element);
  };

  renderElement(filmComponent.element, filmsListContainer, RenderPosition.BEFORE_END);

  filmComponent.element.querySelector(`.film-card__poster`).addEventListener(`click`, openPopup);
  filmComponent.element.querySelector(`.film-card__title`).addEventListener(`click`, openPopup);
  filmComponent.element.querySelector(`.film-card__comments`).addEventListener(`click`, openPopup);

  filmInfoComponent.element.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    siteBody.removeChild(filmInfoComponent.element);
  });
};

renderElement(new UserRatingView(watchedFilmsCount).element, siteHeader, RenderPosition.BEFORE_END);

const mainContainerComponent = new MenuContainerView();
renderElement(mainContainerComponent.element, siteMain, RenderPosition.BEFORE_END);

renderElement(new MainMenuView(filters).element, mainContainerComponent.element, RenderPosition.BEFORE_END);
renderElement(new MainMenuStatisticView().element, mainContainerComponent.element, RenderPosition.BEFORE_END);
renderElement(new SortView().element, siteMain, RenderPosition.BEFORE_END);

const filmsContainerComponent = new FilmsContainerView();
renderElement(filmsContainerComponent.element, siteMain, RenderPosition.BEFORE_END);

const filmsListComponent = new FilmsListView();
renderElement(filmsListComponent.element, filmsContainerComponent.element, RenderPosition.BEFORE_END);

const filmsListContainer = filmsContainerComponent.element.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderFilm(films[i]);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let filmCounter = FILMS_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();
  renderElement(showMoreButtonComponent.element, filmsContainerComponent.element, RenderPosition.BEFORE_END);

  showMoreButtonComponent.element.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(filmCounter, filmCounter + FILMS_COUNT_PER_STEP)
    .forEach((film) => renderFilm(film));

    filmCounter += FILMS_COUNT_PER_STEP;

    if (filmCounter >= films.length) {
      showMoreButtonComponent.element.remove();
      showMoreButtonComponent.removeElement();
    }
  });
}
for (let i = 0; i < EXTRA_FIELD_COUNT; i++) {
  const filmsExtraComponent = new FilmsExtraView();
  renderElement(filmsExtraComponent.element, filmsContainerComponent.element, `beforeend`);
}

const extraFilmsContainers = filmsContainerComponent.element.querySelectorAll(`.films-list--extra .films-list__container`);

for (const extraFilmsContainer of extraFilmsContainers) {
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    renderElement(new FilmView(films[i]).element, extraFilmsContainer, RenderPosition.BEFORE_END); // пока просто отображаются фильмы из списка
  }
}

renderElement(new FooterStatisticView().element, siteStatistic, RenderPosition.BEFORE_END);

// renderElement(new FilmInfoView(films[0]).element, siteBody, RenderPosition.BEFORE_END);
