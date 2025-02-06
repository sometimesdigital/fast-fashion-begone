const domains = [
  "at",
  "be",
  "cz",
  "de",
  "dk",
  "es",
  "fi",
  "fr",
  "gr",
  "hr",
  "hu",
  "ie",
  "it",
  "lt",
  "lu",
  "nl",
  "pl",
  "pt",
  "ro",
  "se",
  "sk",
  "co.uk",
  "com",
];

const urls = domains.map((domain) => `https://www.vinted.${domain}/api/v2/*`);

const begone = async () => {
  const { brands } = await browser.storage.local.get("brands");
  const { exactMatching } = await browser.storage.local.get("exactMatching");

  const brandNodes = [...document.querySelectorAll(".new-item-box__description:first-of-type:first-child")];

  const compare = (itemContent, inputText) => {
    return exactMatching
      ? itemContent.trim().toLowerCase() === inputText.trim().toLowerCase()
      : itemContent.toLowerCase().includes(inputText.toLowerCase());
  };

  brandNodes.forEach((item) => {
    const shouldHide = brands.some((brand) => compare(item.textContent, brand));

    if (!shouldHide) {
      return;
    }

    const parent =
      item.closest("article") ||
      item.closest(".closet__item") ||
      item.closest(".closet__item--collage") ||
      item.closest(".feed-grid__item") ||
      item.closest(".item-view-items__item");

    parent.innerHTML = "";
    parent.style.display = "none";
  });
};

browser.webRequest.onCompleted.addListener(({ tabId }) => {
  browser.scripting.executeScript({
    target: { tabId },
    func: begone,
  });
}, { urls: urls });
