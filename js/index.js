import { setupModal, openModal, closeModal } from "./helpers/modalHandler";
import { setupFab } from "./helpers/fabHandler";

// Setting up modals
setupModal("occupy-room-modal");
setupModal("freeup-room-modal");
setupModal("add-room-modal");
setupModal("edit-room-modal");

document.getElementById("freeup-test").addEventListener("click", (e) => {
  openModal(e.target, "freeup-room-modal");
});

document
  .getElementById("cancel-freeup-button")
  .addEventListener("click", () => {
    closeModal("freeup-room-modal");
  });

document.getElementById("occupy-test").addEventListener("click", (e) => {
  openModal(e.target, "occupy-room-modal");
});

// Setting up fab
setupFab("main-fab");

document.getElementById("add-room-button").addEventListener("click", (e) => {
  openModal(e.target, "add-room-modal");
});

document.getElementById("edit-room-button").addEventListener("click", (e) => {
  openModal(e.target, "edit-room-modal");
});
