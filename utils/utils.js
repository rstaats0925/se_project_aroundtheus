// export function deleteCard (event) {
//   event.target.closest(".card").remove();
// }

//Functions for handling Modals
export function openModal (modal) {
  modal.classList.add("modal__open");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", closeModalByEscapeKey);
}

export function openProfileModal() {
  const editProfileModal = document.querySelector("#profile-edit-modal");
  openModal(editProfileModal);
  fillProfileForm(editProfileModal);
}

function fillProfileForm(profileModal) {
  const modalInputUserName = profileModal.querySelector("#modal-input-username");
  const modalInputSubtext = document.querySelector("#modal-input-subtext");
  const profileUserName = document.querySelector(".profile__user-name");
  const profileSubtext = document.querySelector('.profile__subtext');
  
  modalInputUserName.value = profileUserName.textContent;
  modalInputSubtext.value = profileSubtext.textContent;
}

export function handleImageModalInfo(event, imageModal) {
  const imageElement = imageModal.querySelector(".modal__image");
  const imageCaption = imageModal.querySelector(".modal__image-caption");
  imageElement.src = event.target.src;
  imageElement.alt = event.target.alt;
  imageCaption.textContent = event.target.alt;
}

export function openCardModal() {
  const addCardModal = document.getElementById("add-card-modal");
  openModal(addCardModal);
}

// export function openImageModal(event) {
//   const imageModal = document.querySelector("#image-modal");
//   openModal(imageModal);
//   handleImageModalInfo(event, imageModal);
// }

export function closeModal(modal) {
  modal.classList.remove("modal__open");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeModalByEscapeKey);
}

export function closeProfileModal() {
  const editProfileModal = document.querySelector("#profile-edit-modal");
  closeModal(editProfileModal);
}

export function closeCardModal() {
  const addCardModal = document.querySelector("#add-card-modal");
  closeModal(addCardModal);
}

export function closeModalOnRemoteClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

export function closeModalByEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal__open");
    closeModal(openedModal);
  }
}

export function closeImageModal() {
  const imageModal = document.querySelector("#image-modal");
  closeModal(imageModal);
}
