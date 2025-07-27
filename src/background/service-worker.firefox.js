const urls = [
  "https://www.vinted.at/*",
  "https://www.vinted.be/*",
  "https://www.vinted.cz/*",
  "https://www.vinted.de/*",
  "https://www.vinted.dk/*",
  "https://www.vinted.es/*",
  "https://www.vinted.fi/*",
  "https://www.vinted.fr/*",
  "https://www.vinted.gr/*",
  "https://www.vinted.hr/*",
  "https://www.vinted.hu/*",
  "https://www.vinted.ie/*",
  "https://www.vinted.it/*",
  "https://www.vinted.lt/*",
  "https://www.vinted.lu/*",
  "https://www.vinted.nl/*",
  "https://www.vinted.pl/*",
  "https://www.vinted.pt/*",
  "https://www.vinted.ro/*",
  "https://www.vinted.se/*",
  "https://www.vinted.sk/*",
  "https://www.vinted.co.uk/*",
  "https://www.vinted.com/*",
];

const begone = async () => {
  const { brands } = await browser.storage.local.get("brands");
  const { exactMatching } = await browser.storage.local.get("exactMatching");

  const brandNodes = [
    ...document.querySelectorAll(
      ".new-item-box__description:first-of-type:first-child",
    ),
  ];

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
      item.closest(".item-view-items__item") ||
      item.closest('[data-testid="feed-item"]').parentElement;

    parent.innerHTML = "";
    parent.style.display = "none";
  });
};

browser.webRequest.onCompleted.addListener(
  ({ tabId }) => {
    browser.scripting.executeScript({
      target: { tabId },
      func: begone,
    });
  },
  { urls: urls },
);
