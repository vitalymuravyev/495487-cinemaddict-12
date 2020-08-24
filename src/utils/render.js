import AbstractView from "../view/abstract";

export const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
};

export const renderTemplate = (template, container, position) => {
  container.insertAdjacentHTML(position, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const renderElement = (template, container, position) => {
  if (template instanceof AbstractView) {
    template = template.element;
  }

  if (container instanceof AbstractView) {
    container = container.element;
  }

  switch (position) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(template);
      break;
    case RenderPosition.BEFORE_END:
      container.append(template);
      break;
    default:
      throw new Error(`Wrong element position!`);
  }
};
