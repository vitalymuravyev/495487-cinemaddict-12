import {createUserRatingTemplate} from "./view/user-rating";
import {createMainMenuContainerTemplate} from "./view/menu-container";
import {createMainMenuTemplate} from "./view/main-menu";
import {createMainMenuStatisticTemplate} from "./view/menu-statistic";
import {createFilterTemplate} from "./view/filter";
import {createFilmsContainerTemplate} from "./view/films-container";
import {createFilmsListTemplate} from "./view/films-list";
import {createFilmTemplate} from "./view/film";
import {createShowMoreButton} from "./view/show-more-button";
import {createFilmsExtraTemplate} from "./view/films-extra";
import {createFooterStatisticTemplate} from "./view/footer-statistic";
import {createFilmDetailsTemplate} from "./view/film-details";

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

const render = (template, container, position) => {
  container.insertAdjacentHTML(position, template);
};

render(createUserRatingTemplate(watchedFilmsCount), siteHeader, `beforeend`);
render(createMainMenuContainerTemplate(), siteMain, `beforeend`);

const siteMainMenu = siteMain.querySelector(`.main-navigation`);

render(createMainMenuTemplate(filters), siteMainMenu, `beforeend`);
render(createMainMenuStatisticTemplate(), siteMainMenu, `beforeend`);
render(createFilterTemplate(), siteMain, `beforeend`);
render(createFilmsContainerTemplate(), siteMain, `beforeend`);

const filmsBoard = siteMain.querySelector(`.films`);

render(createFilmsListTemplate(), filmsBoard, `beforeend`);

const filmsListContainer = filmsBoard.querySelector(`.films-list__container`);

for (let i = 1; i <= Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  render(createFilmTemplate(films[i]), filmsListContainer, `beforeend`);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let filmCounter = FILMS_COUNT_PER_STEP;
  render(createShowMoreButton(), filmsBoard, `beforeend`);

  const showMoreButton = filmsBoard.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(filmCounter, filmCounter + FILMS_COUNT_PER_STEP)
    .forEach((film) => render(createFilmTemplate(film), filmsListContainer, `beforeend`));

    filmCounter += FILMS_COUNT_PER_STEP;

    if (filmCounter >= films.length) {
      showMoreButton.remove();
    }
  });
}
for (let i = 0; i < EXTRA_FIELD_COUNT; i++) {
  render(createFilmsExtraTemplate(), filmsBoard, `beforeend`);
}

const extraFilmsContainers = filmsBoard.querySelectorAll(`.films-list--extra .films-list__container`);

for (const extraFilmsContainer of extraFilmsContainers) {
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    render(createFilmTemplate(films[i]), extraFilmsContainer, `beforeend`); // пока просто отображаются фильмы из списка
  }
}

render(createFooterStatisticTemplate(), siteStatistic, `beforeend`);

render(createFilmDetailsTemplate(films[0]), siteBody, `beforeend`);
