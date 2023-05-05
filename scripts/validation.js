const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__input-error_active"
};

function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}


function checkInputValidity (formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function isInvalid (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (inputList, submitButton, {inactiveButtonClass}) {
  if (isInvalid(inputList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formElement, options) {
  const {inputSelector} = options;
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector("options.submitButtonSelector");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, submitButton, options);
    })
  });

  toggleButtonState(inputList, submitButton, options.inactiveButtonClass);
}

function enableValidation(options) {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    setEventListeners(formElement, options);
  })
}

enableValidation(config);