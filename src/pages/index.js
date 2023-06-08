import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import initialCards from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//Buttons
const profileEditButton = document.querySelector("#profile-edit-btn");
const addButton = document.querySelector("#add-button");

//submit function for addCard Form
function addCard (cardDataObj) {
  const cardInstance = new Card(cardDataObj, "#card-template", imageModalHandler.open.bind(imageModalHandler));
  const domCard = cardInstance.returnCard();

  gridHandler.addItem(domCard);
}

const profileFormInputSelectors = {
  name: "#profile-input-username",
  job: "#profile-input-job"
};

const profileInfo = new UserInfo(profileFormInputSelectors);

//Modal Handlers
const imageModalHandler = new PopupWithImage("#image-modal");
const profileModalHandler = new PopupWithForm("#profile-edit-modal", profileInfo.setUserInfo.bind(profileInfo));
const cardModalHandler = new PopupWithForm("#add-card-modal", addCard);

//Render Initial cards onto the page
const gridHandler = new Section({
  items: initialCards,
  renderer: (dataObj) => {
    const card = new Card(dataObj, "#card-template", imageModalHandler.open.bind(imageModalHandler));
    const cardElement = card.returnCard();
    gridHandler.addItem(cardElement);
  }
}, ".cards__grid");

gridHandler.renderItems();

//eventListeners
profileEditButton.addEventListener("click", profileModalHandler.open.bind(profileModalHandler));
addButton.addEventListener("click", cardModalHandler.open.bind(cardModalHandler));

//Form Validation
const config = { 
  formSelector: ".modal__form", 
  inputSelector: ".modal__input", 
  submitButtonSelector: ".modal__save-button", 
  inactiveButtonClass: "modal__save-button_disabled", 
  inputErrorClass: "modal__input-error", 
  errorClass: "modal__input-error_active" 
}; 

const profileValidator = new FormValidator(config, "#profile-edit-form");
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, "#add-card-form");
addCardValidator.enableValidation();
