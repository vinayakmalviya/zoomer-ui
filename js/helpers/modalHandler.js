let lastActiveElement = null;

const openModal = (lastPressingElement, modalId) => {
  const modalNode = document.getElementById(modalId);
  const modalCloseButton = modalNode.querySelector(".modal-close");

  lastActiveElement = lastPressingElement;

  modalNode.classList.replace("modal-hidden", "modal-visible");
  modalCloseButton.focus();
};

const closeModal = (modalId) => {
  const modalNode = document.getElementById(modalId);

  modalNode.classList.replace("modal-visible", "modal-hidden");

  if (lastActiveElement) {
    lastActiveElement.focus();
  }
};

const setupModal = (modalId) => {
  const modalNode = document.getElementById(modalId);
  const modalCloseButton = modalNode.querySelector(".modal-close");

  modalCloseButton.addEventListener("click", () => {
    closeModal(modalId);
  });

  modalNode.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalNode.style.display === "flex") {
      closeModal(modalId);
    }
  });
};

export { setupModal, openModal, closeModal };
