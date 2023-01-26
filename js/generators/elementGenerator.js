const iconGenerator = (icon) => {
  const element = document.createElement("span");

  element.classList.add("material-symbols-rounded");

  element.innerHTML = icon;

  return element;
};

const divGenerator = (...classes) => {
  const element = document.createElement("div");

  element.classList.add(...classes);

  return element;
};

const buttonGenerator = (text, type = null, icon = null) => {
  const buttonElement = document.createElement("button");

  buttonElement.innerHTML = text;

  if (type) {
    buttonElement.classList.add(type);
  }

  if (icon) {
    const iconElement = iconGenerator(icon);

    buttonElement.appendChild(iconElement);
  }

  return buttonElement;
};

export { iconGenerator, divGenerator, buttonGenerator };
