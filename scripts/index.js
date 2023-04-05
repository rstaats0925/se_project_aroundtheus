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

//elements
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

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileUserName.textContent = modalInputUserName.value;
  profileSubtext.textContent = modalInputSubtext.value;
  closeModal();
}

function openModal() {
  profileEditModal.classList.add("modal__open");
  fillProfileForm();
}

function closeModal() {
  profileEditModal.classList.remove("modal__open");
}

function fillProfileForm() {
  modalInputUserName.value = profileUserName.textContent;
  modalInputSubtext.value = profileSubtext.textContent;
}

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  let cardCaption = cardElement.querySelector(".card__caption");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardCaption.textContent = data.name;
  return cardElement;
}

for (card of initialCards) {
  cardsGrid.append(getCardElement(card));
}

profileEditButton.addEventListener("click", openModal);
editProfileModalCloseButton.addEventListener("click", closeModal);
modalEditForm.addEventListener("submit", handleProfileFormSubmit);