import SmartView from "./smart";

import {renderTemplate, RenderPosition} from "../utils/render";
import {formatReleaseDate, formatDuration, formatCommentDate} from "../utils";

const createGenreItemTemplate = (genre) => `<span class="film-details__genre">${genre}</span>`;

const addChecked = (property) => property ? `checked` : ``;

const createEmojiImgtemplate = (emoji) => `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;

const createCommentItemTemplate = ({post, author, date, emoji}) => {
  const formattedDate = formatCommentDate(date);
  const emojiItem = createEmojiImgtemplate(emoji);
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        ${emojiItem}
      </span>
      <div>
        <p class="film-details__comment-text">${post}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formattedDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class FilmInfo extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._isNewEmodji = false;

    this._exitClick = this._exitClick.bind(this);
    this._watchListClick = this._watchListClick.bind(this);
    this._watchedClick = this._watchedClick.bind(this);
    this._favoriteClick = this._favoriteClick.bind(this);
    this._onEmojiChange = this._onEmojiChange.bind(this);

    this._changeEmoji();
  }

  _getTemplate() {
    return this._createTemplate(this._film);
  }

  _createTemplate(film) {
    const {description, duration, realiseDate, title, originalTitle, rating, comments} = film;
    const {director, country, writers, actors, genre, poster, ageRating, isInWatchList, isWatched, isFavorite} = film;

    const date = formatReleaseDate(realiseDate);
    const formattedDuration = formatDuration(duration);
    const genreTitle = genre.length > 1 ? `Genres` : `Genre`;
    const genreItemsTemplate = genre.map((item) => createGenreItemTemplate(item)).join(``);
    const watchListChecked = addChecked(isInWatchList);
    const watchedChecked = addChecked(isWatched);
    const favoriteChecked = addChecked(isFavorite);
    const commentsItemsTemplate = comments.map((comment) => createCommentItemTemplate(comment)).join(``);

    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

                <p class="film-details__age">${ageRating}+</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">Original: ${originalTitle}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${rating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${writers.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${actors.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${date}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${formattedDuration}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${genreTitle}</td>
                    <td class="film-details__cell">
                      ${genreItemsTemplate}
                  </tr>
                </table>

                <p class="film-details__film-description">
                  ${description}
                </p>
              </div>
            </div>

            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchListChecked}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedChecked}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteChecked}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>

          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

              <ul class="film-details__comments-list">
                ${commentsItemsTemplate}
              </ul>

              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label"></div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>`
    );
  }

  _exitClick(evt) {
    evt.preventDefault();
    this._callback.exitClick();
  }

  _watchListClick(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _watchedClick(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClick(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _onEmojiChange(evt) {
    evt.preventDefault();

    if (this.element.querySelector(`.film-details__add-emoji-label img`)) {
      this.element.querySelector(`.film-details__add-emoji-label img`).remove();
    }

    renderTemplate(createEmojiImgtemplate(evt.target.value), this.element.querySelector(`.film-details__add-emoji-label`), RenderPosition.BEFORE_END);
  }

  _changeEmoji() {

    this.element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._onEmojiChange);

  }

  setOnExitClick(callback) {
    this._callback.exitClick = callback;
    this.element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._exitClick);
  }

  setOnWatchListClick(callback) {
    this._callback.watchListClick = callback;
    this.element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchListClick);
  }

  setOnWatchedClick(callback) {
    this._callback.watchedClick = callback;
    this.element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClick);
  }

  setOnFavoriteClick(callback) {
    this._callback.favoriteClick = callback;
    this.element.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClick);
  }

}
