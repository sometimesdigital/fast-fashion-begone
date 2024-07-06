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
  const exactMatching = document.querySelector('#exactMatching').checked;
  chrome.storage.local.set({ brands, exactMatching }, saveConfirmed);
};

const restoreOptions = () => {
  chrome.storage.local.get({ brands: [], exactMatching: false }, ({ brands, exactMatching }) => {
    document.querySelector("#exactMatching").checked = exactMatching;
    document.querySelector("#brands").value = brands.join(", ");
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);
