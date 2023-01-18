import { setupModal, openModal } from "./helpers/modalHandler";

// Setting up modals
setupModal("add-room-modal");

document.getElementById("test-modal").addEventListener("click", (e) => {
  openModal(e.target, "add-room-modal");
});
