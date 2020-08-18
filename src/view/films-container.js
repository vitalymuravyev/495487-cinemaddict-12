import {createElement} from "../utils";

export default class FilmsContainer {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<section class="films"></section>`
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
