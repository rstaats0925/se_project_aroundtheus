import { handleImageModalInfo } from "../pages/index.js";
import {openModal} from "../utils/utils.js";

export default class Card {
  #card;
  #likeButton;
  #cardImage;
  #cardCaption;
  #deleteButton;
  #name;
  #link;
  #cardTemplateSelector;

  constructor (data, cardTemplateSelector) {
    this.#name = data.name;
    this.#link = data.link;
    this.#cardTemplateSelector = cardTemplateSelector;
  }

  #returnEmptyClone () {
    this.cardTemplate = document.querySelector(this.#cardTemplateSelector).content.firstElementChild;
    return this.cardTemplate.cloneNode(true);
  }

  #fillMarkupWithData () {
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;
    this.#cardCaption.textContent = this.#name;
  }

  #addLikeButtonEventListener () {
    this.#likeButton.addEventListener("click", this.#toggleLikeButton);
  }

  #toggleLikeButton (event) {
    event.target.classList.toggle("card__like-button_inactive");
  }

  #addDeleteButtonEventListener() {
    this.#deleteButton.addEventListener("click", this.#deleteCard);
  }

  #deleteCard (event) {
    event.target.closest(".card").remove();
  }

  #addImageEventListener () {
    this.#cardImage.addEventListener("click", this.#openImageModal);
  }

  #openImageModal (event) {
    const imageModal = document.querySelector("#image-modal");
    openModal(imageModal);
    handleImageModalInfo(event, imageModal);
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
    return this.#card;
  }

  returnCard () {
    return this.#completeNewCard();
  }
}
