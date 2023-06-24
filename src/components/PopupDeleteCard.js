import Popup from "./Popup.js"

export default class PopupDeleteCard extends Popup {
  setSubmitAction;

  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;
    this.form = this.modalElement.querySelector(".modal__form");
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.close();
    })
  }
}
