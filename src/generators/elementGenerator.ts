const iconGenerator = (icon: string) => {
  const element = document.createElement("span");

  element.classList.add("material-symbols-rounded");

  element.innerHTML = icon;

  return element;
};

const divGenerator = (...classes: string[]) => {
  const element = document.createElement("div");

  element.classList.add(...classes);

  return element;
};

const buttonGenerator = (
  text: string,
  type: string | null = null,
  icon: string | null = null
) => {
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
