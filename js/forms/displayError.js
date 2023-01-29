const displayInputError = (inputId, errorMessage = "") => {
  const inputElement = document.getElementById(inputId);

  const inputDiv = inputElement.parentElement;

  const captionElement = inputDiv.querySelector("p");

  inputDiv.classList.add("error");

  captionElement.innerHTML = errorMessage;
};

const resetInput = (inputId) => {
  const inputElement = document.getElementById(inputId);

  const inputDiv = inputElement.parentElement;

  const captionElement = inputDiv.querySelector("p");

  inputDiv.classList.remove("error");

  captionElement.innerHTML = inputElement.dataset.caption;
};

export { displayInputError, resetInput };
