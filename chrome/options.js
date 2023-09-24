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

  chrome.tabs.reload();
};

const saveOptions = () => {
  const brands = getBrands();
  const hideUnbranded = document.querySelector('#hideUnbranded').checked;
  chrome.storage.sync.set({ brands, hideUnbranded }, saveConfirmed);
};

const restoreOptions = () => {
  chrome.storage.sync.get({ brands: [], hideUnbranded: false }, ({ brands, hideUnbranded }) => {
    document.querySelector("#hideUnbranded").checked = hideUnbranded;
    document.querySelector("#brands").value = brands.join(", ");
    handleInput({ target: document.querySelector("#brands") });
  });
};

const handleInput = ({ target }) => {
  target.style.height = "0px";
  target.style.height = `${target.scrollHeight}px`;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);
document.querySelector("#brands").addEventListener("input", handleInput);
