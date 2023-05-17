export default class Card {
  constructor (data, cardTemplateSelector) {
    this.name = data.name;
    this.link = data.link;
    this.cardTemplateSelector = cardTemplateSelector;
  }

  #fillMarkupWithData () {
    this.cardTemplate = document.querySelector(this.cardTemplateSelector).content.firstElementChild;
    this.cardElement = this.cardTemplate.cloneNode(true);
    this.cardImage = this.cardElement.querySelector(".card__image");
    this.cardCaption = this.cardElement.querySelector(".card__caption");
    this.likeButton = this.cardElement.querySelector(".card__like-button");
    this.deleteButton = this.cardElement.querySelector(".card__delete");
    
    this.cardImage.src = this.link;
    this.cardImage.alt = this.name;
    this.cardCaption.textContent = this.name;

    return this.cardElement;
  }

  returnCard () {
    this.newCard = this.#fillMarkupWithData();

    return this.newCard;
  }
}
