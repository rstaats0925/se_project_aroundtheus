export default class Popup {
  #modalElement;
  #closeButton;

  constructor (popupSelector) {
    this.#modalElement = document.querySelector(popupSelector);
    this.#closeButton = this.#modalElement.querySelector(".modal__close-button");
  }

  open() {
    this.#modalElement.classList.add("modal__open");
    this.setEventListeners();
  }

  close() {
    this.#modalElement.removeEventListener("mousedown", this.#closeModalOnRemoteClick);
    document.removeEventListener("keydown", this.#handleEscClose);
    this.#modalElement.remove("modal__open");
  }

  #closeModalOnRemoteClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this.#closeButton.addEventListener("click", this.close);
    this.#modalElement.addEventListener("mousedown", this.#closeModalOnRemoteClick);
    document.addEventListener("keydown", this.#handleEscClose);
  }

  #handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
