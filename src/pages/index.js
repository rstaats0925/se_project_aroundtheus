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

const cardModalHandler = new PopupWithForm("#add-card-modal",
  (data) => {
    api.addCard(data).then(response => {
      if (!response.ok) {
        return Promise.reject(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then(json => {
      const card = new Card(json, "#card-template",
        (event) => {  //image handler
          imageModalHandler.open(event);
        },
        (data, event) => {  //delete button handler
          deleteModalHandler.open();
          deleteModalHandler.setSubmitAction(() => {
            api.removeCard(data).then(response => {
              if (!response.ok) {
                return Promise.reject(`Error: ${response.status}`);
              }
              card.deleteCard(event);
            })
            .catch(err => {
              console.error(err);
            })
          })
        },
        (data, event) => {  //like button handler
          if (!card.liked) {
            api.addLike(data).then(response => {
              if (!response.ok) {
                return Promise.reject(`Error: ${response.status}`);
              }
              return response.json();
            })
            .then(json => {
              card.updateLikeCount(json);
              card.toggleLikeButton(event);
              card.liked = !card.liked;
            })
          } else {
            api.removeLike(data).then(response => {
              if (!response.ok) {
                return Promise.reject(`Error: ${response.status}`);
              }
              return response.json();
            })
            .then(json => {
              card.updateLikeCount(json);
              card.toggleLikeButton(event);
              card.liked = !card.liked;
            })
          }
        }      
        )
        section.addItem(card.returnCard());
    })
});
cardModalHandler.setEventListeners();

//api for handling http requests
const api = new Api();

const section = new Section({
  items: [],
  renderer: addCard
}, ".cards__grid")

//used to render initial cards
function addCard (cardDataObj) {
  const cardInstance = new Card(cardDataObj, "#card-template",
  (event) => {
    imageModalHandler.open(event);
  },
  (data, event) => {
    deleteModalHandler.open();
    deleteModalHandler.setSubmitAction(() => {
      api.removeCard(data).then(response => {
        if (response.ok) {
          cardInstance.deleteCard(event);
        }
      })
    })
  },
  (data, event) => {
    if (!cardInstance.liked) {
      api.addLike(data).then(json => {
        cardInstance.updateLikeCount(json);
      })
      cardInstance.toggleLikeButton(event);
      cardInstance.liked = !cardInstance.liked;
    } else {
        api.removeLike(data).then(json => {
          cardInstance.updateLikeCount(json);
        })
        cardInstance.toggleLikeButton(event);
        cardInstance.liked = !cardInstance.liked;
    }
  })
  
  const domCard = cardInstance.returnCard();

  this.addItem(domCard);
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
