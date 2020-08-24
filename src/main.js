import {RenderPosition, renderElement} from "./utils/render";
import MovieListPresenter from "./presenter/movie-list";

import UserRatingView from "./view/user-rating";
import MenuContainerView from "./view/menu-container";
import MainMenuView from "./view/main-menu";
import MainMenuStatisticView from "./view/menu-statistic";
import SortView from "./view/sort";

import FooterStatisticView from "./view/footer-statistic";

import {generateFilms} from "./mock/film";
import {generateFilters} from "./mock/filter";

const FILMS_COUNT = 17;


const films = generateFilms(FILMS_COUNT);
const filters = generateFilters(films);
const watchedFilmsCount = filters.find((item) => item.name === `history`).count;

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`.header`);
const siteMain = siteBody.querySelector(`.main`);
const siteStatistic = siteBody.querySelector(`.footer__statistics`);


renderElement(new UserRatingView(watchedFilmsCount), siteHeader, RenderPosition.BEFORE_END);

const mainContainerComponent = new MenuContainerView();
renderElement(mainContainerComponent, siteMain, RenderPosition.BEFORE_END);

renderElement(new MainMenuView(filters), mainContainerComponent, RenderPosition.BEFORE_END);
renderElement(new MainMenuStatisticView(), mainContainerComponent, RenderPosition.BEFORE_END);
renderElement(new SortView(), siteMain, RenderPosition.BEFORE_END);

const movieListPresenter = new MovieListPresenter(siteMain);
movieListPresenter.init(films);

renderElement(new FooterStatisticView(films.length), siteStatistic, RenderPosition.BEFORE_END);
