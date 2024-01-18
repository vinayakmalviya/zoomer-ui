const showSnackbar = (message: string, type = "info") => {
  const snackbar = document.getElementById("snackbar")!;
  const messageElement = snackbar.querySelector("p")!;
  const icon = snackbar.querySelector("span.material-symbols-rounded")!;

  messageElement.innerHTML = message;

  switch (type) {
    case "info":
      snackbar.style.backgroundColor = "var(--text-primary)";
      icon.innerHTML = "info";
      break;
    case "error":
      snackbar.style.backgroundColor = "var(--error-color)";
      icon.innerHTML = "report";
      break;
    case "success":
      snackbar.style.backgroundColor = "var(--secondary-color)";
      icon.innerHTML = "check_circle";
      break;
    default:
      snackbar.style.backgroundColor = "var(--text-primary)";
      icon.innerHTML = "info";
      break;
  }

  snackbar.classList.replace("snackbar-hidden", "snackbar-visible");

  setTimeout(() => {
    snackbar.classList.replace("snackbar-visible", "snackbar-hidden");
  }, 5000);
};

export default showSnackbar;
