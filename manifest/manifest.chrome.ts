import { host_permissions } from "../config";

export default {
  manifest_version: 3,
  action: {
    default_popup: "src/popup/index.html",
    default_icon: {
      "32": "icons/32.png",
    },
  },
  background: {
    service_worker: "src/service-worker.js",
    type: "module",
  },
  host_permissions,
  permissions: ["scripting", "webRequest", "storage"],
};
