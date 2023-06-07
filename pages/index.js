import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import initialCards from "../utils/constants.js";

//buttons
const profileEditButton = document.querySelector("#profile-edit-btn");
const addButton = document.querySelector("#add-button");

// function addCard(event) {
//   event.preventDefault(); 
  
//   const cardData = {
//     name: addCardTitleInput.value,
//     link: addCardLinkInput.value
//   }
//   const newCard = new Card(cardData, "#card-template").returnCard();
  
//   cardsGrid.prepend(newCard);
//   addCardModal.querySelector(".modal__form").reset();
//   utils.closeModal(addCardModal);
//   addCardValidator.disableButtonState();
// }

// function createCard (cardData) {
//   const card = new Card(cardData, "#card-template");
//   return card.returnCard();
// }

function placeHolder () {
  console.log("Firing placeHolder()");
}

const profileFormInputSelectors = {
  name: "#profile-input-username",
  job: "#profile-input-job"
};

const cardFormInputSelectors = {
  title: "#image-input-title",
  link: "#image-input-link"
}

//Form Handlers
const userInfo = new UserInfo(profileFormInputSelectors);
const cardInfo = new UserInfo(cardFormInputSelectors);

//Modal Handlers
const imageModalHandler = new PopupWithImage("#image-modal");
const profileModalHandler = new PopupWithForm("#profile-edit-modal", userInfo.setUserInfo.bind(userInfo));
const cardModalHandler = new PopupWithForm("#add-card-modal", placeHolder);

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

const addCardValidator = new FormValidator(config, "#add-card-modal");
addCardValidator.enableValidation();
