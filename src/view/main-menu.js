import AbstractView from "./abstract";

const createCountTemplate = (name, count) => {
  return name !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``;
};

const createMenuFilterTemplate = ({name, count}, isActive) => {

  const activeFilterClassName = isActive ? `main-navigation__item--active` : ``;
  const formattedName = name[0].toUpperCase() + name.slice(1).toLowerCase();

  return (
    `<a href="#watchlist" class="main-navigation__item ${activeFilterClassName}">
      ${formattedName}
      ${createCountTemplate(name, count)}
    </a>`
  );
};

export default class MainMenu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  _getTemplate() {
    return this._createTemplate(this._filters);
  }

  _createTemplate(filters) {
    const menuFilterTemplate = filters.map((filter, index) => createMenuFilterTemplate(filter, index === 0)).join(``);
    return (
      `<div class="main-navigation__items">
        ${menuFilterTemplate}
      </div>`
    );
  }

}
