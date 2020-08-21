import {createElement} from "../utils";


export default class FooterStatistic {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  _getTemplate(films) {
    const filmsCount = films.length;
    return (
      `<p>${filmsCount} movies inside</p>`
    );
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this._getTemplate(this._films));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
