let initialCards = [ 
  {
    name: "Grand Canyon",
    link: "https://unsplash.com/photos/ZZnH4GOzDgc"
  },
  
  {
    name: "Roman Coliseum",
    link: "https://unsplash.com/photos/ybtNz4PeyPI"
  },
  
  {
    name: "Hard Rock Cafe",
    link: "https://unsplash.com/photos/W1pewWc6e9E"
  },
  
  {
    name: "African Safari",
    link: "https://unsplash.com/photos/OFbws4f_Ya8"
  },
  
  {
    name: "Glacier Bay National Park",
    link: "https://unsplash.com/photos/gjD66bFxpKE"
  },
  
  {
    name: "Statue of Liberty",
    link: "https://unsplash.com/photos/sf8b4ucpdkg"
  } 
]

//elements
const profileEditButton = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileUsername = document.querySelector(".profile__user-name");
const modalInputUsername = document.querySelector("#modal-input-username");
const profileSubtext = document.querySelector('.profile__subtext');
const modalInputSubtext = document.querySelector("#modal-input-subtext");
const modalEditForm = profileEditModal.querySelector(".modal__form");

function applyFormInputValues(event) {
  event.preventDefault();
  profileUsername.textContent = modalInputUsername.value;
  profileSubtext.textContent = modalInputSubtext.value;
  profileEditModal.classList.remove("modal__open");
}

function toggleProfileEditModal(event) {
  modalInputUsername.value = profileUsername.textContent;
  modalInputSubtext.value = profileSubtext.textContent;
  profileEditModal.classList.toggle("modal__open");
}

profileEditButton.addEventListener("click", toggleProfileEditModal);
modalCloseButton.addEventListener("click", toggleProfileEditModal);
modalEditForm.addEventListener("submit", applyFormInputValues);