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


const FILMS_COUNT = 5;
const EXTRA_FIELD_COUNT = 2;
const EXTRA_FILMS_COUNT = 2;

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`.header`);
const siteMain = siteBody.querySelector(`.main`);
const siteStatistic = siteBody.querySelector(`.footer__statistics`);

const render = (template, container, position) => {
  container.insertAdjacentHTML(position, template);
};

render(createUserRatingTemplate(), siteHeader, `beforeend`);
render(createMainMenuContainerTemplate(), siteMain, `beforeend`);

const siteMainMenu = siteMain.querySelector(`.main-navigation`);

render(createMainMenuTemplate(), siteMainMenu, `beforeend`);
render(createMainMenuStatisticTemplate(), siteMainMenu, `beforeend`);
render(createFilterTemplate(), siteMain, `beforeend`);
render(createFilmsContainerTemplate(), siteMain, `beforeend`);

const filmsBoard = siteMain.querySelector(`.films`);

render(createFilmsListTemplate(), filmsBoard, `beforeend`);

const filmsListContainer = filmsBoard.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(createFilmTemplate(), filmsListContainer, `beforeend`);
}
render(createShowMoreButton(), filmsBoard, `beforeend`);

for (let i = 0; i < EXTRA_FIELD_COUNT; i++) {
  render(createFilmsExtraTemplate(), filmsBoard, `beforeend`);
}

const extraFilmsContainers = filmsBoard.querySelectorAll(`.films-list--extra .films-list__container`);

for (const extraFilmsContainer of extraFilmsContainers) {
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    render(createFilmTemplate(), extraFilmsContainer, `beforeend`);
  }
}

render(createFooterStatisticTemplate(), siteStatistic, `beforeend`);

render(createFilmDetailsTemplate(), siteBody, `beforeend`);
