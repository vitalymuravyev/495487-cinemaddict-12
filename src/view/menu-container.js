import {createElement} from "../utils";

export default class MenuContainer {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<nav class="main-navigation"></nav>`
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
