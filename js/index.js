import { setupModal, openModal } from "./helpers/modalHandler";
import { setupFab } from "./helpers/fabHandler";
import { finishPageLoading } from "./helpers/loadingHandler";

import updateHomePage from "./generators/updateHomePage";

import {
  populateEditRoomDropdown,
  populateEditRoomForm,
  submitEditRoomForm,
} from "./forms/editRoomForm";
import submitAddRoomForm from "./forms/addRoomForm";
import { submitOccupyRoomForm } from "./forms/occupyRoomForm";
import showSnackbar from "./helpers/showSnackbar";

import requestAPI from "./helpers/requestAPI";

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

// Setting up data store
let activeRooms = [];

let availableRooms = [];

requestAPI("/rooms")
  .then((res) => {
    // Storing data from API
    activeRooms = res.active_rooms;
    availableRooms = res.available_rooms;

    // Handle forms that depend on API resp
    // 1. Edit room form
    populateEditRoomDropdown(availableRooms);

    document.getElementById("selectedRoom").addEventListener("change", (e) => {
      const selectedId = e.target.value;

      if (selectedId !== "none") {
        const selectedRoomDetails = availableRooms.filter(
          (r) => selectedId === String(r.id)
        )[0];

        populateEditRoomForm(
          selectedId,
          selectedRoomDetails.name,
          selectedRoomDetails.room_id,
          selectedRoomDetails.link,
          selectedRoomDetails.capacity,
          selectedRoomDetails.time_limit,
          selectedRoomDetails.comments
        );
      }
    });

    // Checking for empty sections
    if (activeRooms.length === 0) {
      document
        .getElementById("active-empty-placeholder")
        .classList.replace("hidden", "visible");
    }

    if (availableRooms.length === 0) {
      document
        .getElementById("available-empty-placeholder")
        .classList.replace("hidden", "visible");
    }

    // Rendering rooms
    updateHomePage(activeRooms, availableRooms);
  })
  .catch((err) => {
    document
      .getElementById("active-empty-placeholder")
      .classList.replace("hidden", "visible");

    document
      .getElementById("available-empty-placeholder")
      .classList.replace("hidden", "visible");

    showSnackbar(err.message, "error");
  })
  .finally(() => {
    finishPageLoading();
  });
