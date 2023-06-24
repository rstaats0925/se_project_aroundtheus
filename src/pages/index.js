import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

//Buttons
const profileEditButton = document.querySelector("#profile-edit-btn");
const addButton = document.querySelector("#add-button");

//modalHandlers
const deleteModalHandler = new PopupDeleteCard("#delete-card-modal");
deleteModalHandler.setEventListeners();

const imageModalHandler = new PopupWithImage("#image-modal");
imageModalHandler.setEventListeners();

const profileModalHandler = new PopupWithForm("#profile-edit-modal", (data) => {
  api.updateProfileInfo(data).then((res) => {
    profileInfo.setUserInfo(res)
  })
});
profileModalHandler.setEventListeners();

const cardModalHandler = new PopupWithForm("#add-card-modal", (data) => {
  api.addCard(data).then(response => {
    const section = new Section({
      items: [response],
      renderer: addCard
    }, ".cards__grid")

    const domCard = new Card(response, "#card-template", (event) => {
      imageModalHandler.open(event);
    })
    
    section.addItem(domCard.returnCard());
  })
});
cardModalHandler.setEventListeners();

//api for handling http requests
const api = new Api();

//used to render initial cards
function addCard (cardDataObj) {
  const cardInstance = new Card(cardDataObj, "#card-template", (event) => {
    imageModalHandler.open(event);
  }, (data) => {
    deleteModalHandler.open();
    deleteModalHandler.setSubmitAction(() => {
      api.removeCard(data);
    })
  });
  
  const domCard = cardInstance.returnCard();

  this.addItem(domCard);
}

function deleteCard (data) {
  api.removeCard(data);
}

const profileInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  aboutSelector: ".profile__about",
  avatarSelector: ".avatar"
});

api.getUserAndCardInfo().then(
  promises => {
    profileInfo.setUserInfo(promises[0]);

    const gridHandler = new Section({
      items: promises[1],
      renderer: addCard
    }, ".cards__grid");

    gridHandler.renderItems();
  });

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
