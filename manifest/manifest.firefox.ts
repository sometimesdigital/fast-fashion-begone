import { host_permissions } from "../config";

export default {
  manifest_version: 2,
  browser_action: {
    default_popup: "src/popup/index.html",
    default_icon: {
      "32": "icons/32.png",
    },
  },
  background: {
    scripts: ["src/service-worker.js"],
  },
  permissions: ["scripting", "webRequest", "storage", ...host_permissions],
};
