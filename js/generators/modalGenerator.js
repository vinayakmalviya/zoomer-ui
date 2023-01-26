import { divGenerator, buttonGenerator } from "./elementGenerator";
import { closeModal } from "../helpers/modalHandler";

const populateFreeupRoomModal = (
  id,
  name,
  roomId,
  occupiedUntil,
  meetingTitle
) => {
  const freeUpRoomModal = document.getElementById("freeup-room-modal");
  const modalContent = freeUpRoomModal.querySelector(".modal-content");

  // Removing existing divs if any
  const exisitingDetailsDiv = modalContent.querySelector(
    ".freeup-room-details"
  );
  const existingActionsDiv = modalContent.querySelector(".freeup-room-actions");

  if (exisitingDetailsDiv && existingActionsDiv) {
    modalContent.removeChild(exisitingDetailsDiv);
    modalContent.removeChild(existingActionsDiv);
  }

  const detailsDiv = divGenerator("freeup-room-details");

  const roomName = document.createElement("h1");
  roomName.innerHTML = name;

  const roomIdNode = document.createElement("h4");
  roomIdNode.innerHTML = roomId;

  const meetingTitleNode = document.createElement("p");
  meetingTitleNode.innerHTML = "Current meeting: ";

  const meetingTitleSpan = document.createElement("span");
  meetingTitleSpan.innerHTML = meetingTitle;

  meetingTitleNode.appendChild(meetingTitleSpan);

  const occupiedUntilNode = document.createElement("p");
  occupiedUntilNode.innerHTML = "Occupied until: ";

  const occupiedUntilSpan = document.createElement("span");
  occupiedUntilSpan.innerHTML = occupiedUntil;

  occupiedUntilNode.appendChild(occupiedUntilSpan);

  const actionsDiv = divGenerator("freeup-room-actions");

  const cancelButton = buttonGenerator("Cancel", null, "close");
  cancelButton.addEventListener("click", () => {
    closeModal("freeup-room-modal");
    modalContent.removeChild(detailsDiv);
    modalContent.removeChild(actionsDiv);
  });

  const freeUpRoomButton = buttonGenerator(
    "Free up",
    "alert-button",
    "exit_to_app"
  );
  freeUpRoomButton.addEventListener("click", () => {
    // TODO: Send API request to freeup room
    console.log("Freeing up room: ", name, id);

    closeModal("freeup-room-modal");
    modalContent.removeChild(detailsDiv);
    modalContent.removeChild(actionsDiv);
  });

  actionsDiv.appendChild(cancelButton);
  actionsDiv.appendChild(freeUpRoomButton);

  detailsDiv.appendChild(roomName);
  detailsDiv.appendChild(roomIdNode);
  detailsDiv.appendChild(meetingTitleNode);
  detailsDiv.appendChild(occupiedUntilNode);

  modalContent.appendChild(detailsDiv);
  modalContent.appendChild(actionsDiv);
};

export default populateFreeupRoomModal;
