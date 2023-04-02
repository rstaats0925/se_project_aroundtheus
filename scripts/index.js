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

const profileEditButton = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-close-button");

function toggleProfileEditModal() {
  profileEditModal.classList.toggle("modal__open");
}

profileEditButton.addEventListener("click", toggleProfileEditModal);
modalCloseButton.addEventListener("click", toggleProfileEditModal);