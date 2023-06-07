import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #submitHandler;
  #form;

  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.#submitHandler = submitHandler;
    this.#form = this.modalElement.querySelector(".modal__form");
    this.setEventListeners();
  }

  #getInputValues() {
    this.inputInfo = {};
    const inputs = Array.from(this.modalElement.querySelectorAll(".modal__input"));
    inputs.forEach(input => {
      this.inputInfo[input.placeholder] = input.value;
    })

    return this.inputInfo;
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", () => {
      this.close();
    });

    this.modalElement.addEventListener("mousedown", (event) => {
      this.closeModalOnRemoteClick(event);
    })
    
    this.#form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#submitHandler();
      this.close();
    });
  }

  close() {
    this.#form.reset();
    this.modalElement.classList.remove("modal__open");
  }
}
