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
const editAvatarButton = document.querySelector(".avatar-edit-button");

//modalHandlers
const deleteModal = new PopupDeleteCard("#delete-card-modal");
deleteModal.setEventListeners();

const imageModal = new PopupWithImage("#image-modal");
imageModal.setEventListeners();

const profileModal = new PopupWithForm("#profile-edit-modal", (data) => {
  profileModal.changeButtonText(true);
  api.updateProfileInfo(data)
  .then(json => {
    profileInfo.setUserInfo(json);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    profileModal.changeButtonText(false);
  })
});
profileModal.setEventListeners();

const avatarModal = new PopupWithForm("#avatar-edit-modal", (data) => {
  avatarModal.changeButtonText(true);
  api.updateAvatar(data)
  .then(json => {
    api.updateAvatar(json);
    profileInfo.setAvatar(json);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    avatarModal.changeButtonText(false);
  })
});
avatarModal.setEventListeners();

const cardModal = new PopupWithForm("#add-card-modal",
  data => {
    cardModal.changeButtonText(true);
    api.addCard(data)
    .then(json => {
      addCard(json);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      cardModal.changeButtonText(false);
    })
  }
);
cardModal.setEventListeners();

//api for handling http requests
const api = new Api();

const section = new Section({
  items: [],
  renderer: addCard
}, ".cards__grid")

//used to render initial cards
function addCard (data) {
  const card = new Card(data, "#card-template",
  event => {  //image handler
    imageModal.open(event);
  },
  (data, event) => {  // delete button handler
    deleteModal.open();
    deleteModal.setSubmitAction(() => {
      api.removeCard(data)
      .then(json => {
        card.deleteCard(event);
      })
      .catch(err => {
        console.error(err);
      })
    })
  },
  (data, event) => {  //like button handler
    if (!card.liked) {
      api.addLike(data)
      .then(json => {
        card.updateLikeCount(json);
        card.toggleLikeButton(event);
        card.liked = !card.liked;
      })
      .catch(err => {
        console.error(err);
      })
    } else {
        api.removeLike(data)
        .then(json => {
          card.updateLikeCount(json);
          card.toggleLikeButton(event);
          card.liked = !card.liked;
        })
        .catch(err => {
          console.error(err);
        })
    }    
  }
  )
  section.addItem(card.returnCard());
}

const profileInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  aboutSelector: ".profile__about",
  avatarSelector: ".avatar"
});

api.getUserAndCardInfo().then(
  data => {
    profileInfo.setUserInfo(data[0]);
    section.items = data[1];
    section.renderItems();
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

const avatarValidator = new FormValidator(config, "#avatar-edit-modal");
avatarValidator.enableValidation();

//eventListeners
profileEditButton.addEventListener("click", (event) => {
  profileValidator.disableButtonState();
  profileModal.open(event);
});

addButton.addEventListener("click", (event) => {
  addCardValidator.disableButtonState();
  cardModal.open(event);
});

editAvatarButton.addEventListener("click", (event) => {
  avatarValidator.disableButtonState();
  avatarModal.open(event);
});
