import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #submitHandler;
  #form;

  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.#submitHandler = submitHandler;
    this.form = this.modalElement.querySelector(".modal__form");
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
    this.form.addEventListener("submit", () => {
      this.#submitHandler();
    });
  }

  close() {
    super.close();
  }

  logForm() {
    console.log(this.form);
  }
}
