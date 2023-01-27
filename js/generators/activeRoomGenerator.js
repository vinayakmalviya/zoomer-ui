import {
  iconGenerator,
  divGenerator,
  buttonGenerator,
} from "./elementGenerator";
import { populateFreeupRoomModal } from "./modalGenerator";
import { openModal } from "../helpers/modalHandler";

const generateActiveRoom = (
  id,
  name,
  roomId,
  capacity,
  timeLimit,
  link,
  occupiedUntil,
  meetingTitle
) => {
  const parentDiv = divGenerator("room", "active-room");

  // Room details
  const detailsDiv = divGenerator("room-details");

  const roomName = document.createElement("h1");
  roomName.innerHTML = name;

  // Room id div
  const idDiv = divGenerator("room-id");

  const roomIdNode = document.createElement("h4");
  roomIdNode.innerHTML = roomId;

  const divider = document.createElement("p");
  divider.innerHTML = ".";

  const copyIcon = iconGenerator("content_copy");

  // Room metadata div
  const metadataDiv = divGenerator("room-metadata");

  const capacityIcon = iconGenerator("group");

  const roomCapacity = document.createElement("p");
  roomCapacity.innerHTML = capacity;

  const limitIcon = iconGenerator("timer");

  const roomLimit = document.createElement("p");
  roomLimit.innerHTML = `${timeLimit} mins`;

  // Room status div
  const statusDiv = divGenerator("room-status");

  const status = document.createElement("p");
  status.innerHTML = "Occupied until:";

  const occupiedUntilNode = document.createElement("h4");
  occupiedUntilNode.innerHTML = occupiedUntil;

  // Room actions div
  const actionsDiv = divGenerator("room-actions");

  const joinButton = buttonGenerator("Join", "secondary-button", "open_in_new");
  joinButton.addEventListener("click", () => {
    window.open(link);
  });

  const freeUpButton = buttonGenerator(
    "Free up",
    "alert-button",
    "exit_to_app"
  );
  freeUpButton.addEventListener("click", (e) => {
    populateFreeupRoomModal(id, name, roomId, occupiedUntil, meetingTitle);
    openModal(e.target, "freeup-room-modal");
  });

  // Appending elements
  idDiv.appendChild(roomIdNode);
  idDiv.appendChild(divider);
  idDiv.appendChild(copyIcon);

  metadataDiv.appendChild(capacityIcon);
  metadataDiv.appendChild(roomCapacity);
  metadataDiv.appendChild(limitIcon);
  metadataDiv.appendChild(roomLimit);

  statusDiv.appendChild(status);
  statusDiv.appendChild(occupiedUntilNode);

  detailsDiv.appendChild(roomName);
  detailsDiv.appendChild(idDiv);
  detailsDiv.appendChild(metadataDiv);
  detailsDiv.appendChild(statusDiv);

  actionsDiv.appendChild(joinButton);
  actionsDiv.appendChild(freeUpButton);

  parentDiv.appendChild(detailsDiv);
  parentDiv.appendChild(actionsDiv);

  return parentDiv;
};

export default generateActiveRoom;
