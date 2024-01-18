const toggleFab = (fabId: string) => {
  const fabNode = document.getElementById(fabId);

  if (fabNode) {
    if (fabNode.classList.contains("fab-visible")) {
      fabNode.classList.replace("fab-visible", "fab-hidden");
    } else {
      fabNode.classList.replace("fab-hidden", "fab-visible");
    }
  }
};

const setupFab = (fabId: string) => {
  const fabNode = document.getElementById(fabId);
  if (fabNode) {
    const fabButton = fabNode.querySelector<HTMLButtonElement>(".fab-button");

    if (fabButton) {
      fabButton.addEventListener("click", () => {
        toggleFab(fabId);
      });
    }
  }
};

export { setupFab, toggleFab };
