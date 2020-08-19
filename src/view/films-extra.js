import {createElement} from "../utils";


export default class FilmsExtra {
  constructor(title) {
    this._element = null;
    this._title = title;
  }

  _getTemplate(title) {
    return (
      `<section class="films-list--extra">
        <h2 class="films-list__title">${title}</h2>

        <div class="films-list__container"></div>
      </section>`
    );
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this._getTemplate(this._title));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
