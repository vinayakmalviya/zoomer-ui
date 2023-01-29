import { displayInputError, resetInput } from "./displayError";
import showSnackbar from "../helpers/showSnackbar";
import { closeModal } from "../helpers/modalHandler";

const validateOccupyRoomForm = (values) => {
  let isFormValid = true;

  // 1. Meeting title
  if (values.meetingTitle === "") {
    isFormValid = false;
    displayInputError("meetingTitle", "Why are you using the room then?");
  }

  // 2. Room ID
  if (values.occupiedUntil === "") {
    isFormValid = false;
    displayInputError("occupiedUntil", "Select a valid time");
  }

  return isFormValid;
};

const submitOccupyRoomForm = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formValues = Object.fromEntries(formData.entries());

  ["meetingTitle", "occupiedUntil"].forEach((v) => {
    resetInput(v);
  });

  const formValid = validateOccupyRoomForm(formValues);

  console.log(formValues);

  if (formValid) {
    // TODO: Send API request

    console.log("Sending request");
    showSnackbar("Room occupied successfully", "success");

    closeModal("occupy-room-modal");
  } else {
    console.log("Form invalid, check inputs");
  }
};

const resetOccupyRoomForm = () => {
  const formElement = document.getElementById("occupy-room-form");

  // Reset errors
  ["meetingTitle", "occupiedUntil"].forEach((v) => {
    resetInput(v);
  });

  // Reset form values
  formElement.reset();
};

export { submitOccupyRoomForm, resetOccupyRoomForm };
