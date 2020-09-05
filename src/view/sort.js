import AbstractView from "./abstract";

import {SortType} from "../const";

export default class Sort extends AbstractView {

  constructor() {
    super();

    this._onSortChange = this._onSortChange.bind(this);
  }

  _getTemplate() {
    return (
      `<ul class="sort">
       <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
       <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
       <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
     </ul>`
    );
  }

  _onSortChange(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.onSortChange(evt.target.dataset.sortType);
  }

  setOnSortChange(callback) {
    this._callback.onSortChange = callback;
    this.element.addEventListener(`click`, this._onSortChange);
  }

}
