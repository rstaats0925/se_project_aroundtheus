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

  #isInvalid (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  #toggleButtonState (inputList, submitButton) {
    if (this.#isInvalid(inputList)) {
      submitButton.classList.add(this.config.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this.config.inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  #setEventListeners () {
    const inputList = [...this.formElement.querySelectorAll(this.config.inputSelector)];
    const submitButton = this.formElement.querySelector(this.config.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState(inputList, submitButton);
      })
    })

    this.#toggleButtonState(inputList, submitButton);
  }

  disableButtonState () {
    const button = this.formElement.querySelector(this.config.submitButtonSelector);
    button.disabled = true;
  }

  enableValidation () {
    this.#setEventListeners()
  }
}
