import { displayInputError, resetInput } from "./displayError";
import showSnackbar from "../helpers/showSnackbar";
import { closeModal } from "../helpers/modalHandler";
import requestAPI from "../helpers/requestAPI";
import { defaultAPIHeaders } from "../constants";
import updateHomePage from "../generators/updateHomePage";

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

  if (formValid) {
    const [hours, minutes] = formValues.occupiedUntil.split(":");

    const occupiedUntil = new Date();
    occupiedUntil.setHours(parseInt(hours, 10));
    occupiedUntil.setMinutes(parseInt(minutes, 10));

    const payload = {
      occupied_room_id: formValues.occupyRoomId,
      occupied_until: occupiedUntil,
      meeting_title: formValues.meetingTitle,
      comments: formValues.occupiedComments,
    };

    requestAPI("/rooms/occupy", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: defaultAPIHeaders,
    })
      .then(() => {
        showSnackbar("Room occupied successfully", "success");

        updateHomePage();

        closeModal("occupy-room-modal");
      })
      .catch((err) => {
        showSnackbar(err.message, "error");
      });
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
