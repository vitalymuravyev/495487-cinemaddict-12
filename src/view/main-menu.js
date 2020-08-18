import {createElement} from "../utils";

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

// export const createMainMenuTemplate = (filters) => {
//   const menuFilterTemplate = filters.map((filter, index) => createMenuFilterTemplate(filter, index === 0)).join(``);
//   return (
//     `<div class="main-navigation__items">
//       ${menuFilterTemplate}
//     </div>`
//   );
// };

export default class MainMenu {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  _getTemplate(filters) {
    const menuFilterTemplate = filters.map((filter, index) => createMenuFilterTemplate(filter, index === 0)).join(``);
    return (
      `<div class="main-navigation__items">
        ${menuFilterTemplate}
      </div>`
    );
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this._getTemplate(this._filters));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
