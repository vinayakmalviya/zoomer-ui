import { displayInputError, resetInput } from "./displayError";

import isValidUrl from "../helpers/validationHelpers";
import showSnackbar from "../helpers/showSnackbar";
import { closeModal } from "../helpers/modalHandler";
import requestAPI from "../helpers/requestAPI";

import { defaultAPIHeaders } from "../constants";
import updateHomePage from "../generators/updateHomePage";

const validateAddRoomForm = (values) => {
  let isFormValid = true;

  // 1. Room name
  if (values.roomName === "") {
    isFormValid = false;
    displayInputError("roomName", "Room name cannot be empty");
  }

  // 2. Room ID
  if (values.roomId === "") {
    isFormValid = false;
    displayInputError("roomId", "Pleae enter a valid room ID");
  }

  // 3. Room capacity
  if (values.roomCapacity === "") {
    isFormValid = false;
    displayInputError(
      "roomCapacity",
      "Why does it exist if no one can use it?"
    );
  }

  // 5. Room link
  if (values.roomLink === "") {
    isFormValid = false;
    displayInputError("roomLink", "Please enter a valid link");
  }

  if (!isValidUrl(values.roomLink)) {
    isFormValid = false;
    displayInputError("roomLink", "Please enter a valid link");
  }

  // 6. Time limit
  if (values.timeLimit === "") {
    isFormValid = false;
    displayInputError("timeLimit", "Really? An empty time limit?");
  }

  return isFormValid;
};

const submitAddRoomForm = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formValues = Object.fromEntries(formData.entries());

  ["roomName", "roomId", "roomCapacity", "roomLink", "timeLimit"].forEach(
    (v) => {
      resetInput(v);
    }
  );

  const formValid = validateAddRoomForm(formValues);

  if (formValid) {
    const payload = {
      name: formValues.roomName,
      room_id: formValues.roomId,
      capacity: parseInt(formValues.roomCapacity, 10),
      time_limit: parseInt(formValues.timeLimit, 10),
      link: formValues.roomLink,
      comments: formValues.comments,
    };

    requestAPI("/rooms/new", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: defaultAPIHeaders,
    })
      .then(() => {
        showSnackbar("Room added successfully", "success");

        updateHomePage();

        closeModal("add-room-modal");
      })
      .catch((err) => {
        showSnackbar(err.message, "error");
      });
  } else {
    console.log("Form invalid, check inputs");
  }
};

export default submitAddRoomForm;
