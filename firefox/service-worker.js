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

const begone = async () => {
  const { brands } = await browser.storage.local.get("brands");
  const brandTags = Array.from(document.querySelectorAll(".new-item-box__container"));

  brandTags
    .filter(item => brands.some(brand => item.innerText.toLowerCase().includes(brand.toLowerCase())))
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
