const initialCards = [ 
  {
    name: "Grand Canyon",
    link: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80"
  },
  
  {
    name: "Roman Coliseum",
    link: "https://images.unsplash.com/photo-1651984302679-2b247d0c9d7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
  },
  
  {
    name: "Hard Rock Cafe",
    link: "https://images.unsplash.com/photo-1519617535550-82004e4b8206?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80"
  },
  
  {
    name: "African Safari",
    link: "https://images.unsplash.com/photo-1534995385387-824e51d1c6a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=914&q=80"
  },
  
  {
    name: "Glacier Bay National Park",
    link: "https://images.unsplash.com/photo-1445196849952-1a17bdbb57b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=879&q=80"
  },
  
  {
    name: "Statue of Liberty",
    link: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
  } 
]

//variables
const profileEditButton = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const editProfileModalCloseButton = profileEditModal.querySelector("#modal-close-button");
const profileUserName = document.querySelector(".profile__user-name");
const modalInputUserName = document.querySelector("#modal-input-username");
const profileSubtext = document.querySelector('.profile__subtext');
const modalInputSubtext = document.querySelector("#modal-input-subtext");
const modalEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardsGrid = document.querySelector(".cards__grid");
const addCardModal = document.querySelector("#add-card-modal");
const addButton = document.querySelector("#add-button");
const modalAddCardCloseButton = document.querySelector("#add-card-close-button");
const addCardTitleInput = addCardModal.querySelector("#image-input-title");
const addCardLinkInput = addCardModal.querySelector("#modal-image-link");
const imageModal = document.querySelector("#image-modal");
const imageModalCloseButton = document.getElementById("image-modal-close-button");
const profileModalContainer =document.getElementById("profile-modal");
//functions
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileUserName.textContent = modalInputUserName.value;
  profileSubtext.textContent = modalInputSubtext.value;
  closeModal(profileEditModal);
}

function addCard(event) {
  event.preventDefault();
  const cardData = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value
  }
  const newCard = getCardElement(cardData);
  cardsGrid.prepend(newCard);
  addCardModal.querySelector(".modal__form").reset();
  closeModal(addCardModal);
}

function deleteCard(event) {
  const deleteButton = event.target;
  deleteButton.closest(".card").remove();
}

//Functions for opening modals

function openModal(modal) {
  modal.classList.add("modal__open");
}

function openProfileModal() {
  openModal(profileEditModal);
  fillProfileForm();
}

function openCardModal() {
  openModal(addCardModal);
  const saveButton = addCardModal.querySelector(".modal__save-button");
  saveButton.classList.add("modal__save-button_disabled");
}

function openImageModal(event) {
  openModal(imageModal);
  handleImageModalInfo(event);
}

function handleImageModalInfo(event) {
  const imageElement = imageModal.querySelector(".modal__image");
  const imageCaption = imageModal.querySelector(".modal__image-caption");
  imageElement.src = event.target.src;
  imageElement.alt = event.target.alt;
  imageCaption.textContent = event.target.alt;
}

function fillProfileForm() {
  modalInputUserName.value = profileUserName.textContent;
  modalInputSubtext.value = profileSubtext.textContent;
}

//Functions for closing modals

function closeModal(modal) {
  modal.classList.remove("modal__open");
}

function closeProfileModal() {
  closeModal(profileEditModal);
}

function closeCardModal() {
  closeModal(addCardModal);
  addCardModal.querySelector(".modal__form").reset();
}

function closeImageModal() {
  closeModal(imageModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardCaption = cardElement.querySelector(".card__caption");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete");
  
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardCaption.textContent = data.name;
  
  likeButton.addEventListener("click", ()=>{
    likeButton.classList.toggle("card__like-button_inactive");
  })

  cardImage.addEventListener("click", openImageModal);
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

//render intial cards onto page
initialCards.forEach((item) =>{
  cardsGrid.append(getCardElement(item))
});

//eventListeners
profileEditButton.addEventListener("click", openProfileModal);
editProfileModalCloseButton.addEventListener("click", closeProfileModal);
profileEditModal.addEventListener("click", (event) => {
  if (event.target.id === "profile-edit-modal") {
    closeProfileModal(profileEditModal);
  }
})
profileEditModal.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProfileModal(profileEditModal);
  }
})

addButton.addEventListener("click", openCardModal);
modalAddCardCloseButton.addEventListener("click", closeCardModal);
addCardModal.addEventListener("click", event => {
  if (event.target.id === "add-card-modal") {
    closeCardModal(addCardModal);
  }
})

addCardModal.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCardModal(addCardModal);
  }
})

imageModalCloseButton.addEventListener("click", closeImageModal);
imageModal.addEventListener("click", event => {
  if (event.target.id === "image-modal") {
    closeImageModal(imageModal);
  }
})

modalEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardModal.addEventListener("submit", addCard);