import {
  populateEditRoomDropdown,
  populateEditRoomForm,
} from "../forms/editRoomForm";
import requestAPI from "../helpers/requestAPI";
import showSnackbar from "../helpers/showSnackbar";

import generateActiveRoom from "./activeRoomGenerator";
import generateAvailableRoom from "./availableRoomGenerator";

const updateHomePage = async () => {
  const activeRoomsSection = document.getElementById("active-rooms");
  const availableRoomsSection = document.getElementById("available-rooms");

  // Storing rooms
  let availableRooms = [];
  let activeRooms = [];

  // Generating active rooms
  const activeRoomsFragment = document.createDocumentFragment();

  requestAPI("/rooms")
    .then((res) => {
      // Storing data from API
      activeRooms = res.active_rooms;
      availableRooms = res.available_rooms;

      // Handle forms that depend on API resp
      // 1. Edit room form
      populateEditRoomDropdown(availableRooms);

      document
        .getElementById("selectedRoom")
        .addEventListener("change", (e) => {
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
      } else {
        document
          .getElementById("active-empty-placeholder")
          .classList.replace("visible", "hidden");
      }

      if (availableRooms.length === 0) {
        document
          .getElementById("available-empty-placeholder")
          .classList.replace("hidden", "visible");
      } else {
        document
          .getElementById("available-empty-placeholder")
          .classList.replace("visible", "hidden");
      }

      // Rendering rooms
      activeRooms.forEach((room) => {
        activeRoomsFragment.appendChild(
          generateActiveRoom(
            room.id,
            room.name,
            room.room_id,
            room.capacity,
            room.time_limit,
            room.link,
            room.occupied_until,
            room.meeting_title
          )
        );
      });

      // Generating available rooms
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

      activeRoomsSection.replaceChildren(activeRoomsFragment);
      availableRoomsSection.replaceChildren(availableRoomsFragment);
    })
    .catch((err) => {
      document
        .getElementById("active-empty-placeholder")
        .classList.replace("hidden", "visible");

      document
        .getElementById("available-empty-placeholder")
        .classList.replace("hidden", "visible");

      showSnackbar(err.message, "error");
    });
};

export default updateHomePage;
