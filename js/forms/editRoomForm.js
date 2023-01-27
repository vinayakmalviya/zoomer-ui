const populateEditRoomDropdown = (rooms = []) => {
  const editRoomForm = document.getElementById("edit-room-form");
  const selectRoomDropdown = editRoomForm.querySelector("#selectedRoom");

  const optionsFragment = document.createDocumentFragment();

  const placeholderOption = document.createElement("option");
  placeholderOption.innerHTML = "Select room";
  placeholderOption.value = "none";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;

  optionsFragment.appendChild(placeholderOption);

  rooms.forEach((r) => {
    const option = document.createElement("option");

    option.innerHTML = r.name;
    option.value = r.id;

    optionsFragment.appendChild(option);
  });

  selectRoomDropdown.innerHTML = "";
  selectRoomDropdown.appendChild(optionsFragment);
};

const populateEditRoomForm = (
  id,
  name,
  roomId,
  link,
  capacity,
  limit,
  comments
) => {
  const idField = document.getElementById("editId");
  const roomNameField = document.getElementById("editRoomName");
  const roomIdField = document.getElementById("editRoomId");
  const roomLinkField = document.getElementById("editRoomLink");
  const roomCapacityField = document.getElementById("editRoomCapacity");
  const roomTimeLimitField = document.getElementById("editTimeLimit");
  const roomCommentsField = document.getElementById("editComments");

  idField.value = id;
  roomNameField.value = name;
  roomIdField.value = roomId;
  roomLinkField.value = link;
  roomCapacityField.value = capacity;
  roomTimeLimitField.value = limit;
  roomCommentsField.value = comments;
};

const submitEditRoomForm = (event) => {
  event.preventDefault();

  const formValues = new FormData(event.target);

  // TODO: Validate form values
  // TODO: Send API request

  console.log(Object.fromEntries(formValues.entries()));
};

export { populateEditRoomDropdown, populateEditRoomForm, submitEditRoomForm };
