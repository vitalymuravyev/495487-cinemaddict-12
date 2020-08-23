import AbstractView from "./abstract";

export default class FilmsContainer extends AbstractView {

  _getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
