import generateIcon from "./iconGenerator";
import generateDiv from "./divGenerator";
import { openModal } from "../helpers/modalHandler";

const generateActiveRoom = (
  name,
  id,
  capacity,
  timeLimit,
  link,
  occupiedUntil
) => {
  const parentDiv = generateDiv("room", "active-room");

  // Room details
  const detailsDiv = generateDiv("room-details");

  const roomName = document.createElement("h1");
  roomName.innerHTML = name;

  // Room id div
  const idDiv = generateDiv("room-id");

  const roomId = document.createElement("h4");
  roomId.innerHTML = id;

  const divider = document.createElement("p");
  divider.innerHTML = ".";

  const copyIcon = generateIcon("content_copy");

  // Room metadata div
  const metadataDiv = generateDiv("room-metadata");

  const capacityIcon = generateIcon("group");

  const roomCapacity = document.createElement("p");
  roomCapacity.innerHTML = capacity;

  const limitIcon = generateIcon("timer");

  const roomLimit = document.createElement("p");
  roomLimit.innerHTML = `${timeLimit} mins`;

  // Room status div
  const statusDiv = generateDiv("room-status");

  const status = document.createElement("p");
  status.innerHTML = "Occupied unti:";

  const occupiedUntilNode = document.createElement("h4");
  occupiedUntilNode.innerHTML = occupiedUntil;

  // Room actions div
  const actionsDiv = generateDiv("room-actions");

  const joinButton = document.createElement("button");
  const joinIcon = generateIcon("open_in_new");
  joinButton.classList.add("secondary-button");
  joinButton.innerHTML = `Join`;
  joinButton.appendChild(joinIcon);
  joinButton.addEventListener("click", () => {
    window.open(link);
  });

  const freeUpButton = document.createElement("button");
  const freeUpIcon = generateIcon("exit_to_app");
  freeUpButton.classList.add("alert-button");
  freeUpButton.innerHTML = `Free up`;
  freeUpButton.appendChild(freeUpIcon);
  freeUpButton.addEventListener("click", (e) => {
    openModal(e.target, "freeup-room-modal");
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
  actionsDiv.appendChild(freeUpButton);

  parentDiv.appendChild(detailsDiv);
  parentDiv.appendChild(actionsDiv);

  return parentDiv;
};

export default generateActiveRoom;
