import {createElement} from "../utils";

export default class FooterStatistic {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<p>130 291 movies inside</p>`
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
