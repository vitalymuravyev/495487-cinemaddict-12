import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  // updateData(update, justDataUpdating) {
  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    // if (justDataUpdating) {
    //   return;
    // }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
