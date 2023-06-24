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
  #owner;

  constructor ({name, link, owner, _id}, cardTemplateSelector, handleImageClick, deleteButtonHandler) {
    this.#title = name;
    this.#link = link;
    this.#owner = owner;
    this._id = _id;
    this.#cardTemplateSelector = cardTemplateSelector;
    this.#handleImageClick = handleImageClick;
    this.#deleteButtonHandler = deleteButtonHandler;
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
    this.#likeButton.addEventListener("click", this.#toggleLikeButton);
  }

  #toggleLikeButton (event) {
    event.target.classList.toggle("card__like-button_inactive");
  }

  #addDeleteButtonEventListener() {
    this.#deleteButton.addEventListener("click", () => {
      this.#deleteButtonHandler(this);
    });
  }

  #deleteCard (event) {
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
    this.#cardImage = this.#card.querySelector(".card__image");
    this.#cardCaption = this.#card.querySelector(".card__caption");
    this.#deleteButton = this.#card.querySelector(".card__delete");
    this.#fillMarkupWithData();
    this.#addEventListeners();

    if (this.#owner._id != "da6f0aaa844471b7fec4eea5") {
      this.#deleteButton.hidden = true;
    }
    this.#deleteButton._id

    return this.#card;
  }

  returnCard () {
    return this.#completeNewCard();
  }
}
