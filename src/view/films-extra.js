import AbstractView from "./abstract";

export default class FilmsExtra extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  _getTemplate() {
    return (
      `<section class="films-list--extra">
        <h2 class="films-list__title">${this._title}</h2>

        <div class="films-list__container"></div>
      </section>`
    );
  }

}
