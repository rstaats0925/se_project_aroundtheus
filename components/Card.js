export default class Card {
  constructor (data, cardTemplateSelector) {
    this.name = data.name;
    this.link = data.link;
    this.cardTemplateSelector = cardTemplateSelector;
  }

  returnCard () {
    this.cardTemplate = document.querySelector("#card-template").content.firstElementChild;
    this.cardElement = this.cardTemplate.cloneNode(true);
    return this.cardElement;
  }
}