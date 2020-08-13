const createCountTemplate = (name, count) => {
  return name !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``;
};

const createMenuFilterTemplate = ({name, count}, isActive) => {

  const activeFilterClassName = isActive ? `main-navigation__item--active` : ``;
  const formatName = name[0].toUpperCase() + name.slice(1).toLowerCase();

  return (
    `<a href="#watchlist" class="main-navigation__item ${activeFilterClassName}">
      ${formatName}
      ${createCountTemplate(name, count)}
    </a>`
  );
};

export const createMainMenuTemplate = (filters) => {
  const menuFilterTemplate = filters.map((filter, index) => createMenuFilterTemplate(filter, index === 0)).join(``);
  return (
    `<div class="main-navigation__items">
      ${menuFilterTemplate}
    </div>`
  );
};
