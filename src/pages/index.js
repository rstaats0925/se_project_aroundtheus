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

function addCard (cardDataObj) {
  const cardInstance = new Card(cardDataObj, "#card-template", (event) => {
    imageModalHandler.open(event);
  });
  
  const domCard = cardInstance.returnCard();

  gridHandler.addItem(domCard);
}

const profileInfoSelectors = {
  nameSelector: ".profile__user-name",
  jobSelector: ".profile__job"
}

const profileInfo = new UserInfo(profileInfoSelectors);

//Modal Handlers
const imageModalHandler = new PopupWithImage("#image-modal");

const profileModalHandler = new PopupWithForm("#profile-edit-modal", (data) => {
  profileInfo.setUserInfo(data)
});

const cardModalHandler = new PopupWithForm("#add-card-modal", addCard);

//Render Initial cards onto the page
const gridHandler = new Section({
  items: initialCards,
  renderer: addCard
}, ".cards__grid");

gridHandler.renderItems();

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

//eventListeners
profileEditButton.addEventListener("click", (event) => {
  profileValidator.disableButtonState();
  profileModalHandler.open(event);
});

addButton.addEventListener("click", (event) => {
  addCardValidator.disableButtonState();
  cardModalHandler.open(event);
});
