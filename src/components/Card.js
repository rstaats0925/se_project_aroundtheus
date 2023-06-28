export default class Card {
  #card;
  #likeButton;
  #cardImage;
  #cardCaption;
  #deleteButton;
  #title;
  #link;
  #cardTemplateSelector;
  #handleImageClick;
  #deleteButtonHandler;
  #likeButtonHandler;
  #userId;
  #likes;
  #likeCounter;
  #numberOfLikes;

  constructor ({name, link, owner, _id, likes}, userId, cardTemplateSelector, handleImageClick, deleteButtonHandler, likeButtonHandler) {
    this.#title = name;
    this.#link = link;
    this.#numberOfLikes = likes.length;
    this.#likes = likes;
    this.#userId = userId;
    this.isMine = (userId === owner._id);
    this._id = _id;
    this.cardOwner = owner;
    this.#cardTemplateSelector = cardTemplateSelector;
    this.#handleImageClick = handleImageClick;
    this.#deleteButtonHandler = deleteButtonHandler;
    this.#likeButtonHandler = likeButtonHandler;
    this.liked = false;
  }

  #returnEmptyClone () {
    this.cardTemplate = document.querySelector(this.#cardTemplateSelector).content.firstElementChild;
    return this.cardTemplate.cloneNode(true);
  }

  #fillMarkupWithData () {
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#title;
    this.#cardCaption.textContent = this.#title;
    this.#likeCounter.textContent = this.#numberOfLikes;
    this.#setLikeButton();
  }

  #setLikeButton() {
    if (this.#likes.some(obj => {
      return obj._id == this.#userId;
    })) {
      this.#likeButton.classList.add("card__like-button_inactive");
      this.liked = true;
    }
  }

  #addLikeButtonEventListener () {
    this.#likeButton.addEventListener("click", (event) => {
      this.#likeButtonHandler(this, event);
    });
  }

  toggleLikeButton (event) {
    event.target.classList.toggle("card__like-button_inactive");
  }

  updateLikeCount(data) {
    this.#likeCounter.textContent = data.likes.length;
  }

  #addDeleteButtonEventListener() {
    this.#deleteButton.addEventListener("click", (event) => {
      this.#deleteButtonHandler(this._id);
    });
  }

  deleteCard () {
    // event.target.closest(".card").remove();
    this.#card.remove();
  }

  #addImageEventListener () {
    this.#cardImage.addEventListener("click", (event)=>{
      this.#handleImageClick(event)
    });
  }

  #addEventListeners () {
    this.#addLikeButtonEventListener();
    this.#addDeleteButtonEventListener();
    this.#addImageEventListener();
  }

  #completeNewCard () {
    this.#card = this.#returnEmptyClone();
    this.#likeButton = this.#card.querySelector(".card__like-button");
    this.#likeCounter = this.#card.querySelector(".card__like-count");
    this.#cardImage = this.#card.querySelector(".card__image");
    this.#cardCaption = this.#card.querySelector(".card__caption");
    this.#deleteButton = this.#card.querySelector(".card__delete");
    this.#fillMarkupWithData();
    this.#addEventListeners();
    
    if (!this.isMine) {
      // this.#deleteButton.disabled = false;
      this.#deleteButton.hidden = true;
    }
    // else{
    //   this.#deleteButton.disabled = true;
    // }
    return this.#card;
  }

  returnCard () {
    return this.#completeNewCard();
  }
}
