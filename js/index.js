import { setupModal, openModal } from "./helpers/modalHandler";
import { setupFab } from "./helpers/fabHandler";
import { finishPageLoading } from "./helpers/loadingHandler";

import updateHomePage from "./generators/updateHomePage";

import { submitEditRoomForm } from "./forms/editRoomForm";
import submitAddRoomForm from "./forms/addRoomForm";
import { submitOccupyRoomForm } from "./forms/occupyRoomForm";

// Setting up modals
setupModal("occupy-room-modal");
setupModal("freeup-room-modal");
setupModal("add-room-modal");
setupModal("edit-room-modal");

// Setting up fab
setupFab("main-fab");

document.getElementById("add-room-button").addEventListener("click", (e) => {
  // Clear form before opening modal
  document.getElementById("add-room-form").reset();

  openModal(e.target, "add-room-modal");
});

document.getElementById("edit-room-button").addEventListener("click", (e) => {
  // Clear form before opening modal
  document.getElementById("edit-room-form").reset();

  openModal(e.target, "edit-room-modal");
});

// Setting up forms
// 1. Edit room form
document.getElementById("edit-room-form").addEventListener("submit", (e) => {
  submitEditRoomForm(e);
});

// 2. Add room form
document.getElementById("add-room-form").addEventListener("submit", (e) => {
  submitAddRoomForm(e);
});

// 3. Occupy room form
document.getElementById("occupy-room-form").addEventListener("submit", (e) => {
  submitOccupyRoomForm(e);
});

// Fetch data and render home page
updateHomePage().finally(() => {
  finishPageLoading();
});
