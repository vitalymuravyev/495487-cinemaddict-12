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

export const generateRandomValue = (arr) => {
  return arr[getRandomInteger(0, arr.length - 1)];
};

export const getBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};
