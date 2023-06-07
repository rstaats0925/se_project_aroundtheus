import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import * as utils from "../utils/utils.js";
import initialCards from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

//variables
const profileEditButton = document.querySelector("#profile-edit-btn");
const profileUserName = document.querySelector(".profile__user-name");
const profileSubtext = document.querySelector('.profile__subtext');
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

function handleProfileFormSubmit(event) {
  event.preventDefault();
  
  profileUserName.textContent = modalInputUserName.value;
  profileSubtext.textContent = modalInputSubtext.value;

  utils.closeModal(profileEditModal);
}

function fillProfileForm() {
  modalInputUserName.value = profileUserName.textContent;
  modalInputSubtext.value = profileSubtext.textContent;
}

// function createCard (cardData) {
//   const card = new Card(cardData, "#card-template");
//   return card.returnCard();
// }

//modal handlers
function placeHolder () {
  console.log("Firing placeHolder()");
}

const imageModalHandler = new PopupWithImage("#image-modal");
const profileModalHandler = new PopupWithForm("#profile-edit-modal", placeHolder);
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
