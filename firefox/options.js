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

const saveOptions = async () => {
  const brands = getBrands();
  await browser.storage.local.set({ brands: brands });
  saveConfirmed();
};

const restoreOptions = async () => {
  const { brands } = await browser.storage.local.get("brands");

  if (!brands) {
    return;
  }

  document.querySelector("#brands").value = brands.join(", ");
  handleInput({ target: document.querySelector("#brands") });
};

const handleInput = ({ target }) => {
  target.style.height = "0px";
  target.style.height = `${target.scrollHeight}px`;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);
document.querySelector("#brands").addEventListener("input", handleInput);

