export default class formValidator {
  constructor(configObj, formElement) {
    this.config = configObj;
    this.formElement = document.querySelector(formElement);
  }

  #showInputError (inputElement) {
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.config.errorClass);
    inputElement.classList.add(this.config.inputErrorClass);
  }

  #hideInputError (inputElement) {
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this.config.inputErrorClass);
  }

  #checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) { 
      this.#showInputError(inputElement);
    } else { 
      this.#hideInputError(inputElement); 
    } 
  }

  #setEventListeners () {
    const inputList = [...this.formElement.querySelectorAll(this.config.inputSelector)];

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
      })
    })
  }

  enableValidation () {
    this.#setEventListeners()
  }
}
