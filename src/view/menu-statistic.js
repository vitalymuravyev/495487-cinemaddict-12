import {createElement} from "../utils";

export default class MainMenuStatistic {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<a href="#stats" class="main-navigation__additional">Stats</a>`
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
