import { setupModal, openModal } from "./helpers/modalHandler";
import { setupFab } from "./helpers/fabHandler";
import { finishPageLoading } from "./helpers/loadingHandler";

import generateActiveRoom from "./generators/activeRoomGenerator";
import generateAvailableRoom from "./generators/availableRoomGenerator";

import {
  populateEditRoomDropdown,
  populateEditRoomForm,
  submitEditRoomForm,
} from "./forms/editRoomForm";

// Setting up modals
setupModal("occupy-room-modal");
setupModal("freeup-room-modal");
setupModal("add-room-modal");
setupModal("edit-room-modal");

// Setting up fab
setupFab("main-fab");

document.getElementById("add-room-button").addEventListener("click", (e) => {
  openModal(e.target, "add-room-modal");
});

document.getElementById("edit-room-button").addEventListener("click", (e) => {
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
const activeRoomsSection = document.getElementById("active-rooms");
const activeRoomsFragment = document.createDocumentFragment();

activeRooms.forEach((room) => {
  const roomOccupancyDetails = occupancies.filter((o) => o.id === room.id)[0];

  activeRoomsFragment.appendChild(
    generateActiveRoom(
      room.id,
      room.name,
      room.room_id,
      room.capacity,
      room.time_limit,
      room.link,
      roomOccupancyDetails.occupied_until,
      roomOccupancyDetails.meetingTitle
    )
  );
});

activeRoomsSection.appendChild(activeRoomsFragment);

const availableRoomsSection = document.getElementById("available-rooms");
const availableRoomsFragment = document.createDocumentFragment();

availableRooms.forEach((room) => {
  availableRoomsFragment.appendChild(
    generateAvailableRoom(
      room.id,
      room.name,
      room.room_id,
      room.capacity,
      room.time_limit,
      room.link
    )
  );
});

availableRoomsSection.appendChild(availableRoomsFragment);

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

setTimeout(() => {
  finishPageLoading();
}, 2000);
