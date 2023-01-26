const divGenerator = (...classes) => {
  const element = document.createElement("div");

  element.classList.add(...classes);

  return element;
};

export default divGenerator;
