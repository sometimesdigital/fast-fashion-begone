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

  browser.tabs.reload();
};

const saveOptions = async () => {
  const brands = getBrands();
  const exactMatching = document.querySelector('#exactMatching').checked;
  await browser.storage.local.set({ brands, exactMatching });
  saveConfirmed();
};

const restoreOptions = async () => {
  const { brands } = await browser.storage.local.get("brands");
  const { exactMatching } = await browser.storage.local.get("exactMatching");

  if (!brands) {
    return;
  }

  document.querySelector("#brands").value = brands.join(", ");
  document.querySelector("#exactMatching").checked = exactMatching;
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);
