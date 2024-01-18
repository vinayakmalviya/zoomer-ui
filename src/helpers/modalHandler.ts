let lastActiveElement: HTMLElement | null = null;

const openModal = (lastPressingElement: any, modalId: string) => {
  const modalNode = document.getElementById(modalId);

  if (modalNode) {
    const modalCloseButton =
      modalNode.querySelector<HTMLButtonElement>(".modal-close");

    lastActiveElement = lastPressingElement;

    modalNode.classList.replace("modal-hidden", "modal-visible");

    if (modalCloseButton) {
      modalCloseButton.focus();
    }
  }
};

const closeModal = (modalId: string) => {
  const modalNode = document.getElementById(modalId);

  if (modalNode) {
    modalNode.classList.replace("modal-visible", "modal-hidden");

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }
};

const setupModal = (modalId: string) => {
  const modalNode = document.getElementById(modalId);

  if (modalNode) {
    const modalCloseButton = modalNode.querySelector(".modal-close");

    if (modalCloseButton) {
      modalCloseButton.addEventListener("click", () => {
        closeModal(modalId);
      });
    }

    modalNode.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalNode.style.display === "flex") {
        closeModal(modalId);
      }
    });
  }
};

export { setupModal, openModal, closeModal };
