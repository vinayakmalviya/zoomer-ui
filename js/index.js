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

// Setting up data store
const activeRooms = [
  {
    id: 1,
    name: "Vinayak's Zoom Room",
    room_id: "123 456 7890",
    capacity: "100",
    time_limit: "40",
    link: "https://google.com",
    password: "why",
    comments: "None",
  },
];

const availableRooms = [
  {
    id: 2,
    name: "Zoom Room 1",
    room_id: "123 456 7890",
    capacity: "100",
    time_limit: "40",
    link: "https://google.com",
    password: "why",
    comments: "None",
  },
  {
    id: 3,
    name: "Zoom Room 2",
    room_id: "123 456 7890",
    capacity: "100",
    time_limit: "40",
    link: "https://google.com",
    password: "why",
    comments: "None",
  },
];

const occupancies = [
  {
    id: 1,
    occupied_until: "12:45PM IST",
    meetingTitle: "Daily standup call",
  },
];

// TODO: Fetch and update store from API

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
updateHomePage(activeRooms, availableRooms, occupancies);

// Setting up forms
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

setTimeout(() => {
  finishPageLoading();
}, 2000);
