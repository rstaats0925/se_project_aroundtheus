import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #submitHandler;
  #form;
  #submitButton;

  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.#submitHandler = submitHandler;
    this.#form = this.modalElement.querySelector(".modal__form");
    this.#submitButton = this.#form.querySelector(".modal__save-button");
  }

  changeButtonText (isLoading) {
    if (isLoading) {
      this.submitButton.textContent = "Saving...";
    } else {
      this.submitButton.textContent = "Save";
    }
  }

  #getInputValues() {
    const inputInfo = {};
    const inputs = Array.from(this.modalElement.querySelectorAll(".modal__input"));
    inputs.forEach(input => {
      inputInfo[input.name] = input.value;
    })

    return inputInfo;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this.#form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#submitHandler(this.#getInputValues());
    });
  }

  close() {
    this.#form.reset();
    super.close();
  }
}
