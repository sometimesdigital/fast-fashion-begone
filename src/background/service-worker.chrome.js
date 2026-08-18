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

const begone = () => {
  chrome.storage.local.get(
    { brands: [], exactMatching: false },
    ({ brands, exactMatching }) => {
      const items = [...document.querySelectorAll('[data-testid="grid-item"]')];

      const compare = (itemContent, inputText) => {
        return exactMatching
          ? itemContent.trim().toLowerCase() === inputText.trim().toLowerCase()
          : itemContent.toLowerCase().includes(inputText.toLowerCase());
      };

      items.forEach((item) => {
        const textNodes = [...item.querySelectorAll("span, p")].map(
          (element) => element.innerText,
        );

        const shouldHide = textNodes.some((text) =>
          brands.some((brand) => compare(text, brand)),
        );

        if (!shouldHide) {
          return;
        }

        item.innerHTML = "";
        item.style.display = "none";
      });
    },
  );
};

chrome.webRequest.onCompleted.addListener(
  async ({ tabId }) => {
    chrome.scripting.executeScript({
      target: { tabId },
      func: begone,
    });
  },
  { urls: urls },
);
