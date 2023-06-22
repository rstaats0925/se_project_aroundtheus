import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #submitHandler;
  #form;

  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.#submitHandler = submitHandler;
    this.#form = this.modalElement.querySelector(".modal__form");
  }

  #getInputValues() {
    const inputInfo = {};
    const inputs = Array.from(this.modalElement.querySelectorAll(".modal__input"));
    inputs.forEach(input => {
      inputInfo[input.name] = input.value;
    })

    console.log(inputInfo);
    return inputInfo;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this.#form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#submitHandler(this.#getInputValues());
      this.close();
    });
  }

  close() {
    this.#form.reset();
    super.close();
  }
}
