import Popup from "./Popup.js"

export default class PopupDeleteCard extends Popup {
    

  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;
    this.form = this.modalElement.querySelector(".modal__form");
  }

  setSubmitAction(callback) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.close();
    });
  }
}
