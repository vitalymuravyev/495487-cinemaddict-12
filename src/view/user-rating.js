
const userRatingItemTemplate = (count) => {
  let rating = ``;

  if (count >= 1 && count <= 10) {
    rating = `Novice`;
  }
  if (count >= 11 && count <= 20) {
    rating = `Fan`;
  }
  if (count > 20) {
    rating = `Movie Buff`;
  }

  return `<p class="profile__rating">${rating}</p>`;
};

export const createUserRatingTemplate = (filters) => {
  let count;
  for (const filter of filters) {
    if (filter.name === `history`) {
      count = filter.count;
    }
  }
  const userRating = userRatingItemTemplate(count);
  return (
    `<section class="header__profile profile">
      ${userRating}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`);
};
