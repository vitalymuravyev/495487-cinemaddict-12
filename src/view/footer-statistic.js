import {createElement} from "../utils";


export default class FooterStatistic {
  constructor(filmsCount) {
    this._element = null;
    this._filmsCount = filmsCount;
  }

  _getTemplate() {
    return (
      `<p>${this._filmsCount} movies inside</p>`
    );
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
