export default class Card {
  #newCard;

  constructor (data, cardTemplateSelector) {
    this.name = data.name;
    this.link = data.link;
    this.cardTemplateSelector = cardTemplateSelector;
    this.#newCard = this.#returnEmptyClone();
  }

  #returnEmptyClone () {
    this.cardTemplate = document.querySelector(this.cardTemplateSelector).content.firstElementChild;
    return this.cardTemplate.cloneNode(true);
  }

  #fillMarkupWithData (card) {
    this.cardImage = card.querySelector(".card__image");
    this.cardCaption = card.querySelector(".card__caption");
    this.likeButton = card.querySelector(".card__like-button");
    this.deleteButton = card.querySelector(".card__delete");
    
    this.cardImage.src = this.link;
    this.cardImage.alt = this.name;
    this.cardCaption.textContent = this.name;
  }

  #addLikeButtonEventListener (card) {
    this.likeButton = card.querySelector(".card__like-button");
    this.likeButton.addEventListener("click", this.#toggleLikeButton);
  }

  #toggleLikeButton (event) {
    event.target.classList.toggle("card__like-button_inactive");
  }

  #addEventListeners (card) {
    this.#addLikeButtonEventListener(card);
  }

  returnCard () {
    this.#fillMarkupWithData(this.#newCard);
    this.#addEventListeners(this.#newCard);

    return this.#newCard;
  }
}
