import { setupModal, openModal } from "./helpers/modalHandler";
import { setupFab } from "./helpers/fabHandler";

// Setting up modals
setupModal("add-room-modal");

document.getElementById("test-modal").addEventListener("click", (e) => {
  openModal(e.target, "add-room-modal");
});

// Setting up fab
setupFab("main-fab");
