//Functions for handling Modals
// export function openModal (modal) {
//   modal.classList.add("modal__open");
//   modal.addEventListener("mousedown", closeModalOnRemoteClick);
//   document.addEventListener("keydown", closeModalByEscapeKey);
// }

// export function closeModal(modal) {
//   modal.classList.remove("modal__open");
//   modal.removeEventListener("mousedown", closeModalOnRemoteClick);
//   document.removeEventListener("keydown", closeModalByEscapeKey);
// }

export function closeModalOnRemoteClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

export function closeModalByEscapeKey(event) {
  console.log("fire");
  if (event.key === "Escape") {
    this.close();
  }
}
