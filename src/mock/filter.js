const filmFilters = {
  all: (films) => films.length,
  watchList: (films) => films.filter((film) => film.isInWatchList).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favorite: (films) => films.filter((film) => film.isFavorite).length,
};

export const generateFilters = (films) => {
  return Object.entries(filmFilters).map(([filterName, filmsCount]) => ({
    name: filterName,
    count: filmsCount(films),
  }));
};
