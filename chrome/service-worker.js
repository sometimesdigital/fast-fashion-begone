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

const begone = () => {
  chrome.storage.local.get(
    { brands: [], exactMatching: false },
    ({ brands, exactMatching }) => {
      const brandTags = [...document.querySelectorAll(".new-item-box__description:first-of-type")].map((node) => node.childNodes[0]);
      const compare = (itemContent, inputText) => {
        return exactMatching
          ? itemContent.trim().toLowerCase() === inputText.trim().toLowerCase()
          : itemContent.toLowerCase().includes(inputText.toLowerCase());
      };

      brandTags
        .filter((item) =>
          brands.some((brand) =>
            compare(
              item.textContent.trim().toLowerCase(),
              brand.trim().toLowerCase()
            )
          )
      )
      .map(
        (item) =>
          item.closest("article") ||
          item.closest(".closet__item") ||
          item.closest(".closet__item--collage") ||
          item.closest(".feed-grid__item") ||
          item.closest(".item-view-items__item")
      )
      .forEach((item) => {
        item.innerHTML = "";
        item.style.display = "contents";
      });
    }
  );
};

chrome.webRequest.onCompleted.addListener(
  async ({ tabId }) => {
    chrome.scripting.executeScript({
      target: { tabId },
      func: begone,
    });
  },
  { urls: urls }
);
