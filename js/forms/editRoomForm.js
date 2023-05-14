import { displayInputError, resetInput } from "./displayError";
import isValidUrl from "../helpers/validationHelpers";
import showSnackbar from "../helpers/showSnackbar";
import { closeModal } from "../helpers/modalHandler";
import requestAPI from "../helpers/requestAPI";

import updateHomePage from "../generators/updateHomePage";

import { defaultAPIHeaders } from "../constants";

const populateEditRoomDropdown = (rooms = []) => {
  const editRoomForm = document.getElementById("edit-room-form");
  const selectRoomDropdown = editRoomForm.querySelector("#selectedRoom");

  const optionsFragment = document.createDocumentFragment();

  const placeholderOption = document.createElement("option");
  placeholderOption.innerHTML = "Select room";
  placeholderOption.value = "none";
  placeholderOption.hidden = true;
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

  selectRoomDropdown.value = "none";
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

  const [hours, minutes, seconds] = limit
    .split(":")
    .map((t) => parseInt(t, 10));
  const calculatedTimeLimit = hours * 60 + minutes + seconds / 60;

  idField.value = id;
  roomNameField.value = name;
  roomIdField.value = roomId;
  roomLinkField.value = link;
  roomCapacityField.value = capacity;
  roomTimeLimitField.value = calculatedTimeLimit;
  roomCommentsField.value = comments;
};

const validateEditRoomForm = (values) => {
  let isFormValid = true;

  // 1. Check if room is selected
  // check eslint for this
  if (values.selectedRoom === "none") {
    isFormValid = false;
    displayInputError("selectedRoom", "Please select a room to edit");
  }

  // 2. Room name
  if (values.editRoomName === "") {
    isFormValid = false;
    displayInputError("editRoomName", "Room name cannot be empty");
  }

  // 3. Room ID
  if (values.editRoomId === "") {
    isFormValid = false;
    displayInputError("editRoomId", "Pleae enter a valid room ID");
  }

  // 4. Room capacity
  if (values.editRoomCapacity === "") {
    isFormValid = false;
    displayInputError(
      "editRoomCapacity",
      "Why does it exist if no one can use it?"
    );
  }

  // 5. Room link
  if (values.editRoomLink === "") {
    isFormValid = false;
    displayInputError("editRoomLink", "Please enter a valid link");
  }

  if (!isValidUrl(values.editRoomLink)) {
    isFormValid = false;
    displayInputError("editRoomLink", "Please enter a valid link");
  }

  // 6. Time limit
  if (values.editTimeLimit === "") {
    isFormValid = false;
    displayInputError("editTimeLimit", "Really? An empty time limit?");
  }

  return isFormValid;
};

const submitEditRoomForm = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formValues = Object.fromEntries(formData.entries());

  [
    "selectedRoom",
    "editRoomName",
    "editRoomId",
    "editRoomCapacity",
    "editRoomLink",
    "editTimeLimit",
  ].forEach((v) => {
    resetInput(v);
  });

  const formValid = validateEditRoomForm(formValues);

  console.log(formValues);

  if (formValid) {
    const payload = {
      name: formValues.editRoomName,
      room_id: formValues.editRoomId,
      capacity: parseInt(formValues.editRoomCapacity, 10),
      time_limit: parseInt(formValues.editTimeLimit, 10),
      link: formValues.editRoomLink,
      comments: formValues.editComments,
    };

    console.log(payload);

    requestAPI(`/rooms/edit/${formValues.editId}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: defaultAPIHeaders,
    })
      .then(() => {
        showSnackbar("Room updated successfully", "success");

        updateHomePage();

        closeModal("edit-room-modal");
      })
      .catch((err) => {
        showSnackbar(err.message, "error");
      });
  } else {
    console.log("Form invalid, check inputs");
  }
};

export { populateEditRoomDropdown, populateEditRoomForm, submitEditRoomForm };
