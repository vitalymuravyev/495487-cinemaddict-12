import {createElement} from "../utils";

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
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
