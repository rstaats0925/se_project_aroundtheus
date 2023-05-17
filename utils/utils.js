export function deleteCard (event) {
  event.target.closest(".card").remove();
}

//Functions for handling Modals
export function openModal (modal) {
  modal.classList.add("modal__open");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", closeModalByEscapeKey);
}

export function handleImageModalInfo(event, imageModal) {
  const imageElement = imageModal.querySelector(".modal__image");
  const imageCaption = imageModal.querySelector(".modal__image-caption");
  imageElement.src = event.target.src;
  imageElement.alt = event.target.alt;
  imageCaption.textContent = event.target.alt;
}

export function openImageModal(event) {
  const imageModal = document.querySelector("#image-modal");
  openModal(imageModal);
  handleImageModalInfo(event, imageModal);
}

function closeModal(modal) {
  modal.classList.remove("modal__open");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeModalByEscapeKey);
}

function closeModalOnRemoteClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

function closeModalByEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal__open");
    closeModal(openedModal);
  }
}