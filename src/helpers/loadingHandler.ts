const triggerPageLoading = () => {
  document
    .getElementById("main-content")!
    .classList.replace("visible", "hidden");

  document
    .getElementById("main-loader")!
    .classList.replace("hidden", "visible");
};

const finishPageLoading = () => {
  document
    .getElementById("main-loader")!
    .classList.replace("visible", "hidden");

  document
    .getElementById("main-content")!
    .classList.replace("hidden", "visible");
};

export { triggerPageLoading, finishPageLoading };
