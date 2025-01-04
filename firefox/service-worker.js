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

const urls = domains.flatMap((domain) => [
  `https://www.vinted.${domain}/api/v2/catalog/items*`,
  `https://www.vinted.${domain}/api/v2/promoted_closets*`,
  `https://www.vinted.${domain}/api/v2/feed/events*`,
]);

const begone = async () => {
  const { brands } = await browser.storage.local.get("brands");
  const { exactMatching } = await browser.storage.local.get("exactMatching");
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
    .map((item) =>
      item.closest("article") ||
      item.closest(".closet__item") ||
      item.closest(".closet__item--collage") ||
      item.closest(".feed-grid__item") ||
      item.closest(".item-view-items__item")
    )
    .forEach(item => {
      item.innerHTML = "";
      item.style.display = "contents";
    });
};

browser.webRequest.onCompleted.addListener(({ tabId }) => {
  browser.scripting.executeScript({
    target: { tabId },
    func: begone,
  });
}, { urls: urls });
