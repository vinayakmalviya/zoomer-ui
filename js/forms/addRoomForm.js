import { displayInputError, resetInput } from "./displayError";
import isValidUrl from "../helpers/validationHelpers";
import showSnackbar from "../helpers/showSnackbar";
import { closeModal } from "../helpers/modalHandler";

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

  console.log(formValues);

  if (formValid) {
    // TODO: Send API request

    console.log("Sending request");
    showSnackbar("Room added successfully", "success");

    // closeModal("add-room-modal");
  } else {
    console.log("Form invalid, check inputs");
  }
};

export default submitAddRoomForm;
