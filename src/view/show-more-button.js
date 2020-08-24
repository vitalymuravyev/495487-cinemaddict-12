import AbstractView from "./abstract";

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();
    this._buttonClick = this._buttonClick.bind(this);
  }
  _getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }

  _buttonClick(evt) {
    evt.preventDefault();
    this._callback.buttonClick();
  }

  setOnButtonClick(callback) {
    this._callback.buttonClick = callback;
    this.element.addEventListener(`click`, this._buttonClick);
  }

}
