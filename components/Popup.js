export default class Popup {

  constructor (popupSelector) {
    this.modalElement = document.querySelector(popupSelector);
    this.closeButton = this.modalElement.querySelector(".modal__close-button");
  }

  open() {
    this.modalElement.classList.add("modal__open");
    this.setEventListeners();
  }

  close() {
    this.modalElement.removeEventListener("mousedown", this.#closeModalOnRemoteClick);
    document.removeEventListener("keydown", this.#handleEscClose);
    this.modalElement.classList.remove("modal__open");
  }

  #closeModalOnRemoteClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  #handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.closeButton.addEventListener("click",() => {
      this.close();
    });
    
    this.modalElement.addEventListener("mousedown", (event) => {
      this.#closeModalOnRemoteClick(event);
    });
    
    document.addEventListener("keydown", event => {
      this.#handleEscClose(event);
    });
  }
}
