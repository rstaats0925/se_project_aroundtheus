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
  #cardOwner;
  #likeCounter;

  constructor ({name, link, owner}, userId, cardTemplateSelector, handleImageClick, deleteButtonHandler, likeButtonHandler) {
    this.#title = name;
    this.#link = link;
    this.#userId = userId;
    this.#cardOwner = owner._id;
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
      this.#deleteButtonHandler(this, event);
    });
  }

  deleteCard (event) {
    event.target.closest(".card").remove();
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
    console.log(this)
    if (this.#userId === this.#cardOwner) {
      this.#deleteButton.disabled = false;
    }
    else{
      this.#deleteButton.disabled = true;
    }

    return this.#card;
  }

  returnCard () {
    return this.#completeNewCard();
  }
}
