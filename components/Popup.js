export default class Popup {
  constructor (popupSelector) {
    this.modalElement = document.querySelector(popupSelector);
    this.closeButton = this.modalElement.querySelector(".modal__close-button");
    this.setEventListeners();
  }

  open() {
    this.modalElement.classList.add("modal__open");
    this.#setHandleEscClose();
  }

  close() {
    this.modalElement.classList.remove("modal__open");
    this.#removeHandleEscClose();
  }


  #closeModalOnRemoteClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  #handleEscClose(event) {
    if (event.key === "Escape") {
      this.close(this);
    }
  }

  #setHandleEscClose() {
    document.addEventListener("keydown", (event) => {
      this.#handleEscClose(event);
    });
  }

  #removeHandleEscClose() {
    
  }

  setEventListeners() {
    this.closeButton.addEventListener("click",() => {
      this.close();
    });
    
    this.modalElement.addEventListener("mousedown", (event) => {
      this.#closeModalOnRemoteClick(event);
    });
  }
}
