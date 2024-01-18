const displayInputError = (inputId: string, errorMessage = "") => {
  const inputElement = document.getElementById(inputId);

  if (inputElement) {
    const inputDiv = inputElement.parentElement!;

    const captionElement = inputDiv.querySelector("p")!;

    inputDiv.classList.add("error");

    captionElement.innerHTML = errorMessage;
  }
};

const resetInput = (inputId: string) => {
  const inputElement = document.getElementById(inputId);

  if (inputElement) {
    const inputDiv = inputElement.parentElement!;

    const captionElement = inputDiv.querySelector("p")!;

    inputDiv.classList.remove("error");

    captionElement.innerHTML = inputElement.dataset.caption
      ? inputElement.dataset.caption
      : "";
  }
};

export { displayInputError, resetInput };
