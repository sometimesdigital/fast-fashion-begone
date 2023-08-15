const getBrands = () => {
  const input = document.querySelector("#brands")?.value;

  return input
    .split(",")
    .map((input) => input.trim())
    .filter(Boolean);
};

const saveConfirmed = () => {
  const button = document.querySelector("#save");
  button.innerText = "Saved!";
  setTimeout(() => {
    button.innerText = "Save";
  }, 750);
};

const saveOptions = () => {
  const brands = getBrands();
  chrome.storage.sync.set({ brands }, saveConfirmed);
};

const restoreOptions = () => {
  chrome.storage.sync.get({ brands: [] }, ({ brands }) => {
    document.querySelector("#brands").value = brands.join(", ");
  });
};

const handleInput = ({ target }) => {
  target.style.height = "0px";
  target.style.height = `${target.scrollHeight}px`;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);
document.querySelector("#brands").addEventListener("input", handleInput);
