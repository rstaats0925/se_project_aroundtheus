export default class Popup {
  #handleEscClose;

  constructor (popupSelector) {
    this.modalElement = document.querySelector(popupSelector);
    this.submitButton = this.modalElement.querySelector(".modal__save-button");
    this.closeButton = this.modalElement.querySelector(".modal__close-button");
    this.#handleEscClose = this.#handleEscapeClose.bind(this);
  }

  open() {
    this.modalElement.classList.add("modal__open");
    this.#setHandleEscClose();
  }

  close() {
    this.modalElement.classList.remove("modal__open");
    this.#removeHandleEscClose();
  }

  changeButtonText (isLoading) {
    if (isLoading) {
      this.submitButton.textContent = "Saving...";
    } else {
      this.submitButton.textContent = "Save";
    }
  }

  #closeModalOnRemoteClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  #handleEscapeClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  #setHandleEscClose() {
    document.addEventListener("keydown", this.#handleEscClose);
  }

  #removeHandleEscClose() {
    document.removeEventListener("keydown", this.#handleEscClose);
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
