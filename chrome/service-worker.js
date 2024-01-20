const urls = [
  "https://vinted.pl/*",
  "https://www.vinted.pl/*",
  "https://vinted.at/*",
  "https://www.vinted.at/*",
  "https://vinted.be/*",
  "https://www.vinted.be/*",
  "https://vinted.ca/*",
  "https://www.vinted.ca/*",
  "https://vinted.cz/*",
  "https://www.vinted.cz/*",
  "https://vinted.de/*",
  "https://www.vinted.de/*",
  "https://vinted.es/*",
  "https://www.vinted.es/*",
  "https://vinted.fr/*",
  "https://www.vinted.fr/*",
  "https://vinted.hu/*",
  "https://www.vinted.hu/*",
  "https://vinted.it/*",
  "https://www.vinted.it/*",
  "https://vinted.lt/*",
  "https://www.vinted.lt/*",
  "https://vinted.ro/*",
  "https://www.vinted.ro/*",
  "https://vinted.lu/*",
  "https://www.vinted.lu/*",
  "https://vinted.se/*",
  "https://www.vinted.se/*",
  "https://vinted.nl/*",
  "https://www.vinted.nl/*",
  "https://vinted.sk/*",
  "https://www.vinted.sk/*",
  "https://vinted.co.uk/*",
  "https://www.vinted.co.uk/*",
  "https://vinted.com/*",
  "https://www.vinted.com/*"
];

const begone = () => {
  chrome.storage.sync.get(
    { brands: [], hideUnbranded: false },
    ({ brands, hideUnbranded }) => {
      const brandTags = Array.from(document.querySelectorAll(".new-item-box__description:last-of-type p"));
      brandTags
        .filter(item => {
          if (hideUnbranded && !item.innerText) {
            return true;
          }

          return brands.some(brand => item.innerText.toLowerCase().includes(brand.toLowerCase()))
          })
        .map(item => item.closest('article') || item.closest('.feed-grid__item'))
        .forEach(item => {
          item.innerHTML = "";
          item.style.display = "contents";
        });
    })

};

chrome.webRequest.onCompleted.addListener(async ({ tabId }) => {
  chrome.scripting.executeScript({
    target: { tabId },
    func: begone,
  });
}, { urls: urls });
