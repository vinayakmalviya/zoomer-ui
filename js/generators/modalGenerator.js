import generateDiv from "./divGenerator";
import generateIcon from "./iconGenerator";
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

  const detailsDiv = generateDiv("freeup-room-details");

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

  const actionsDiv = generateDiv("freeup-room-actions");

  const cancelButton = document.createElement("button");
  const cancelIcon = generateIcon("close");
  cancelButton.innerHTML = `Cancel`;
  cancelButton.appendChild(cancelIcon);
  cancelButton.addEventListener("click", () => {
    closeModal("freeup-room-modal");
    modalContent.removeChild(detailsDiv);
    modalContent.removeChild(actionsDiv);
  });

  const freeUpRoomButton = document.createElement("button");
  const freeUpRoomIcon = generateIcon("exit_to_app");
  freeUpRoomButton.classList.add("alert-button");
  freeUpRoomButton.innerHTML = `Free up`;
  freeUpRoomButton.appendChild(freeUpRoomIcon);
  freeUpRoomButton.addEventListener("click", () => {
    // TODO: Send API request to freeup room
    console.log("Freeing up room: ", name);

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
