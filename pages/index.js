import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import * as utils from "../utils/utils.js";
import initialCards from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

//variables
const profileEditButton = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
// const editProfileModalCloseButton = document.getElementById("profile-modal-close-button");
const profileUserName = document.querySelector(".profile__user-name");
// const modalInputUserName = document.querySelector("#modal-input-username");
const profileSubtext = document.querySelector('.profile__subtext');
// const modalInputSubtext = document.querySelector("#modal-input-subtext");
// const modalEditForm = document.getElementById("profile-edit-form");
const addCardModal = document.querySelector("#add-card-modal");
const addButton = document.querySelector("#add-button");
// const modalAddCardCloseButton = document.querySelector("#add-card-close-button");
const addCardTitleInput = addCardModal.querySelector("#image-input-title");
const addCardLinkInput = addCardModal.querySelector("#modal-image-link");



function addCard(event) {
  event.preventDefault(); 
  
  const cardData = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value
  }
  const newCard = new Card(cardData, "#card-template").returnCard();
  
  cardsGrid.prepend(newCard);
  addCardModal.querySelector(".modal__form").reset();
  utils.closeModal(addCardModal);
  addCardValidator.disableButtonState();
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  
  profileUserName.textContent = modalInputUserName.value;
  profileSubtext.textContent = modalInputSubtext.value;

  utils.closeModal(profileEditModal);
}

// function openProfileModal() {
//   utils.openModal(profileEditModal);
//   fillProfileForm();
// }

function fillProfileForm() {
  modalInputUserName.value = profileUserName.textContent;
  modalInputSubtext.value = profileSubtext.textContent;
}

// function openCardModal() {
//   utils.openModal(addCardModal);
// }

// function closeProfileModal() {
//   utils.closeModal(profileEditModal);
// }

// function closeCardModal() {
//   utils.closeModal(addCardModal);
// }

// function createCard (cardData) {
//   const card = new Card(cardData, "#card-template");
//   return card.returnCard();
// }

//modal handlers
function placeHolder () {
  console.log("Firing placeHolder()");
}

const imageModalHandler = new PopupWithImage("#image-modal");
const profileHandler = new PopupWithForm("#profile-edit-modal", placeHolder);
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
profileEditButton.addEventListener("click", profileHandler.open.bind(profileHandler));
addButton.addEventListener("click", cardModalHandler.open.bind(cardModalHandler));


// modalEditForm.addEventListener("submit", handleProfileFormSubmit);
// addCardModal.addEventListener("submit", addCard);

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
