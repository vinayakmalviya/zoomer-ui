const iconGenerator = (icon) => {
  const element = document.createElement("span");

  element.classList.add("material-symbols-rounded");

  element.innerHTML = icon;

  return element;
};

export default iconGenerator;
