import {createElement} from "../utils";

export default class NoFilm {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return `<h2 class="films-list__title">There are no movies in our database</h2>`;
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
