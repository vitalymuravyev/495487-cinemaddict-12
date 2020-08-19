export const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
}

export const getRandom = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

export const getRandomInteger = (a, b = 0) => {
  const low = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(low + Math.random() * (max - low + 1));
};

export const generateRandomItem = (arr) => arr[getRandomInteger(0, arr.length - 1)];

export const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

export const renderTemplate = (template, container, position) => {
  container.insertAdjacentHTML(position, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const renderElement = (template, container, position) => {
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
