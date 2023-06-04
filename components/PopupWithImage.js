import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  #image;
  #caption;

  constructor(popupSelector) {
    super(popupSelector);
    this.#image = this.modalElement.querySelector(".modal__image");
    this.#caption = this.modalElement.querySelector(".modal__image-caption");
  }

  open(event) {
    super.open();
    this.#image.src = event.target.src;
    this.#image.alt = event.target.alt;
    this.#caption.textContent = event.target.alt;
  }
}
