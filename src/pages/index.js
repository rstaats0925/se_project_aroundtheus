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

//modals
const deleteModal = new PopupDeleteCard("#delete-card-modal");
deleteModal.setEventListeners();

const imageModal = new PopupWithImage("#image-modal");
imageModal.setEventListeners();

const profileModal = new PopupWithForm("#profile-edit-modal", (data) => {
  profileModal.changeButtonText(true);
  api.updateProfileInfo(data)
  .then(json => {
    profileInfo.setUserInfo(json);
    profileModal.close();
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
    profileInfo.setAvatar(json);
    avatarModal.close();
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
      cardModal.close();
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
const api = new Api({
  authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4",
  "Content-Type": "application/json"}
  );

//section for rendering items on page
const section = new Section({
  items: [],
  renderer: addCard
}, ".cards__grid")

//function that's called whenever a card needs to be added to
function addCard (data) {
  const card = new Card(data, profileInfo.userId, "#card-template",
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

api.getUserAndCardInfo()
  .then(data => {
    profileInfo.setUserId(data[0]);
    profileInfo.setUserInfo(data[0]);
    section.items = data[1];
    section.renderItems();
  })
  .catch(err => {
    console.error(err);
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
  profileModal.setInputValues(profileInfo.getUserInfo());
});

addButton.addEventListener("click", (event) => {
  addCardValidator.disableButtonState();
  cardModal.open(event);
});

editAvatarButton.addEventListener("click", (event) => {
  avatarValidator.disableButtonState();
  avatarModal.open(event);
});
