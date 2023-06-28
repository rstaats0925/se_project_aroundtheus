import Popup from "./Popup.js"

export default class PopupDeleteCard extends Popup {
  submitHandler;

  constructor (popupSelector) {
    super(popupSelector);
    this.form = this.modalElement.querySelector(".modal__form");
  }

  changeButtonText (isLoading) {
    if (isLoading) {
      this.submitButton.textContent = "Saving...";
    } else {
      this.submitButton.textContent = "Yes";
    }
  }

  setSubmitAction(callback) {
    this.submitHandler = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submitHandler();
    })
  }
}
