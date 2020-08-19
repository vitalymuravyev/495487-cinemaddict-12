import {createElement} from "../utils";

export default class Sort {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<ul class="sort">
       <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
       <li><a href="#" class="sort__button">Sort by date</a></li>
       <li><a href="#" class="sort__button">Sort by rating</a></li>
     </ul>`
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
