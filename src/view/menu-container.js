import AbstractView from "./abstract";

export default class MenuContainer extends AbstractView {

  _getTemplate() {
    return (
      `<nav class="main-navigation"></nav>`
    );
  }

}
