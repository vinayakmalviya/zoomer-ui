import {
  buttonGenerator,
  divGenerator,
  iconGenerator,
} from "./elementGenerator";
import { openModal } from "../helpers/modalHandler";

const generateAvailableRoom = (name, id, capacity, timeLimit, link) => {
  const parentDiv = divGenerator("room");

  // Room details
  const detailsDiv = divGenerator("room-details");

  const roomName = document.createElement("h1");
  roomName.innerHTML = name;

  // Room id div
  const idDiv = divGenerator("room-id");

  const roomId = document.createElement("h4");
  roomId.innerHTML = id;

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
  status.innerHTML = "Unoccupied";

  // Room actions div
  const actionsDiv = divGenerator("room-actions");

  const joinButton = buttonGenerator("Join", "secondary-button", "open_in_new");
  joinButton.addEventListener("click", () => {
    window.open(link);
  });

  const occupyButton = buttonGenerator("Occupy", null, "group_add");
  occupyButton.addEventListener("click", (e) => {
    openModal(e.target, "occupy-room-modal");
  });

  // Appending elements
  idDiv.appendChild(roomId);
  idDiv.appendChild(divider);
  idDiv.appendChild(copyIcon);

  metadataDiv.appendChild(capacityIcon);
  metadataDiv.appendChild(roomCapacity);
  metadataDiv.appendChild(limitIcon);
  metadataDiv.appendChild(roomLimit);

  statusDiv.appendChild(status);

  detailsDiv.appendChild(roomName);
  detailsDiv.appendChild(idDiv);
  detailsDiv.appendChild(metadataDiv);
  detailsDiv.appendChild(statusDiv);

  actionsDiv.appendChild(joinButton);
  actionsDiv.appendChild(occupyButton);

  parentDiv.appendChild(detailsDiv);
  parentDiv.appendChild(actionsDiv);

  return parentDiv;
};

export default generateAvailableRoom;
