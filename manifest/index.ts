import manifestChrome from "./manifest.chrome";
import manifestFirefox from "./manifest.firefox";
import manifestShared from "./manifest.shared";

export const manifest = {
  shared: manifestShared,
  chrome: manifestChrome,
  firefox: manifestFirefox,
};
