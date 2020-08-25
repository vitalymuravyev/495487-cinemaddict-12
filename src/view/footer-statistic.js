import AbstractView from "./abstract";


export default class FooterStatistic extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  _getTemplate() {
    return (
      `<p>${this._filmsCount} movies inside</p>`
    );
  }

}
