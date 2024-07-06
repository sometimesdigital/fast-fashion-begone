const urls = [
  "https://www.vinted.pl/api/v2/catalog/items*",
  "https://www.vinted.pl/api/v2/promoted_closets*",
  "https://www.vinted.at/api/v2/catalog/items*",
  "https://www.vinted.at/api/v2/promoted_closets*",
  "https://www.vinted.be/api/v2/catalog/items*",
  "https://www.vinted.be/api/v2/promoted_closets*",
  "https://www.vinted.ca/api/v2/catalog/items*",
  "https://www.vinted.ca/api/v2/promoted_closets*",
  "https://www.vinted.cz/api/v2/catalog/items*",
  "https://www.vinted.cz/api/v2/promoted_closets*",
  "https://www.vinted.de/api/v2/catalog/items*",
  "https://www.vinted.de/api/v2/promoted_closets*",
  "https://www.vinted.es/api/v2/catalog/items*",
  "https://www.vinted.es/api/v2/promoted_closets*",
  "https://www.vinted.fr/api/v2/catalog/items*",
  "https://www.vinted.fr/api/v2/promoted_closets*",
  "https://www.vinted.hu/api/v2/catalog/items*",
  "https://www.vinted.hu/api/v2/promoted_closets*",
  "https://www.vinted.it/api/v2/catalog/items*",
  "https://www.vinted.it/api/v2/promoted_closets*",
  "https://www.vinted.lt/api/v2/catalog/items*",
  "https://www.vinted.lt/api/v2/promoted_closets*",
  "https://www.vinted.ro/api/v2/catalog/items*",
  "https://www.vinted.ro/api/v2/promoted_closets*",
  "https://www.vinted.lu/api/v2/catalog/items*",
  "https://www.vinted.lu/api/v2/promoted_closets*",
  "https://www.vinted.se/api/v2/catalog/items*",
  "https://www.vinted.se/api/v2/promoted_closets*",
  "https://www.vinted.nl/api/v2/catalog/items*",
  "https://www.vinted.nl/api/v2/promoted_closets*",
  "https://www.vinted.sk/api/v2/catalog/items*",
  "https://www.vinted.sk/api/v2/promoted_closets*",
  "https://www.vinted.co.uk/api/v2/catalog/items*",
  "https://www.vinted.co.uk/api/v2/promoted_closets*",
  "https://www.vinted.com/api/v2/catalog/items*",
  "https://www.vinted.com/api/v2/promoted_closets*",
];

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
