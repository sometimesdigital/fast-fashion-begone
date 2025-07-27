import { version } from "../package.json";

export default {
  name: "Fast Fashion Begone",
  description: "Remove selected fast fashion brands from Vinted",
  version,
  options_ui: {
    page: "src/popup/index.html",
    open_in_tab: false,
  },
  icons: {
    "16": "icons/16.png",
    "32": "icons/32.png",
    "48": "icons/48.png",
    "128": "icons/128.png",
  },
};
