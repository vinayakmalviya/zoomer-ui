const toggleFab = (fabId) => {
  const fabNode = document.getElementById(fabId);

  if (fabNode.classList.contains("fab-visible")) {
    fabNode.classList.replace("fab-visible", "fab-hidden");
  } else {
    fabNode.classList.replace("fab-hidden", "fab-visible");
  }
};

const setupFab = (fabId) => {
  const fabNode = document.getElementById(fabId);
  const fabButton = fabNode.querySelector(".fab-button");

  fabButton.addEventListener("click", () => {
    toggleFab(fabId);
  });
};

export { setupFab, toggleFab };
