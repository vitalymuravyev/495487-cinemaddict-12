import {renderTemplate, RenderPosition, renderElement} from "./utils";

import {createUserRatingTemplate} from "./view/user-rating";
import MenuContainerView from "./view/menu-container";
import {createMainMenuTemplate} from "./view/main-menu";
import MainMenuStatisticView from "./view/menu-statistic";
import SortView from "./view/sort";
import FilmsContainerView from "./view/films-container";
import FilmsListView from "./view/films-list";
import {createFilmTemplate} from "./view/film";
import ShowMoreButtonView from "./view/show-more-button";
// import {createFilmsExtraTemplate} from "./view/films-extra";
import FooterStatisticView from "./view/footer-statistic";
// import {createFilmDetailsTemplate} from "./view/film-details";

import {generateFilms} from "./mock/film";
import {generateFilters} from "./mock/filter";

const FILMS_COUNT = 17;
const FILMS_COUNT_PER_STEP = 5;
// const EXTRA_FIELD_COUNT = 2;
// const EXTRA_FILMS_COUNT = 2;

const films = generateFilms(FILMS_COUNT);
const filters = generateFilters(films);
const watchedFilmsCount = filters.find((item) => item.name === `history`).count;

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`.header`);
const siteMain = siteBody.querySelector(`.main`);
const siteStatistic = siteBody.querySelector(`.footer__statistics`);

renderTemplate(createUserRatingTemplate(watchedFilmsCount), siteHeader, `beforeend`);

const mainContainerComponent = new MenuContainerView();
renderElement(mainContainerComponent.element, siteMain, RenderPosition.BEFORE_END);

renderTemplate(createMainMenuTemplate(filters), mainContainerComponent.element, `beforeend`);
renderElement(new MainMenuStatisticView().element, mainContainerComponent.element, RenderPosition.BEFORE_END);
renderElement(new SortView().element, siteMain, RenderPosition.BEFORE_END);

const filmsContainerComponent = new FilmsContainerView();
renderElement(filmsContainerComponent.element, siteMain, RenderPosition.BEFORE_END);

const filmsListComponent = new FilmsListView();
renderElement(filmsListComponent.element, filmsContainerComponent.element, RenderPosition.BEFORE_END);

const filmsListContainer = filmsContainerComponent.element.querySelector(`.films-list__container`);

for (let i = 1; i <= Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderTemplate(createFilmTemplate(films[i]), filmsListContainer, `beforeend`);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let filmCounter = FILMS_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();
  renderElement(showMoreButtonComponent.element, filmsContainerComponent.element, RenderPosition.BEFORE_END);

  // const showMoreButton = filmsContainerComponent.element.querySelector(`.films-list__show-more`);
  showMoreButtonComponent.element.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(filmCounter, filmCounter + FILMS_COUNT_PER_STEP)
    .forEach((film) => renderTemplate(createFilmTemplate(film), filmsListContainer, `beforeend`));

    filmCounter += FILMS_COUNT_PER_STEP;

    if (filmCounter >= films.length) {
      showMoreButtonComponent.element.remove();
      showMoreButtonComponent.removeElement();
    }
  });
}
// for (let i = 0; i < EXTRA_FIELD_COUNT; i++) {
//   renderTemplate(createFilmsExtraTemplate(), filmsBoard, `beforeend`);
// }

// const extraFilmsContainers = filmsBoard.querySelectorAll(`.films-list--extra .films-list__container`);

// for (const extraFilmsContainer of extraFilmsContainers) {
//   for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
//     renderTemplate(createFilmTemplate(films[i]), extraFilmsContainer, `beforeend`); // пока просто отображаются фильмы из списка
//   }
// }

renderElement(new FooterStatisticView().element, siteStatistic, RenderPosition.BEFORE_END);

// render(createFilmDetailsTemplate(films[0]), siteBody, `beforeend`);
