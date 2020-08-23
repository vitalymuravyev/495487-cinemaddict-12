import AbstractView from "./abstract";

export default class MainMenuStatistic extends AbstractView {
  _getTemplate() {
    return (
      `<a href="#stats" class="main-navigation__additional">Stats</a>`
    );
  }
}
