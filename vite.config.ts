import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { manifest } from "./manifest";
import { copyFileSync, writeFileSync } from "fs";
import path from "path";
import { zipDirectory } from "./scripts/zip";

const { mode, browser } = process.env as {
  mode: string;
  browser: "firefox" | "chrome";
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    react(),
    {
      name: "copy-service-worker",
      closeBundle() {
        copyFileSync(
          path.resolve(
            __dirname,
            `src/background/service-worker.${browser}.js`,
          ),
          path.resolve(__dirname, `dist_${browser}/src/service-worker.js`),
        );
      },
    },
    {
      name: "create-manifest",
      closeBundle() {
        writeFileSync(
          path.resolve(__dirname, `dist_${browser}/manifest.json`),
          JSON.stringify({ ...manifest.shared, ...manifest[browser] }, null, 2),
        );
      },
    },
    {
      name: "zip-bundle",
      closeBundle() {
        if (mode === "development") {
          return;
        }

        zipDirectory(`dist_${browser}`, `dist_${browser}/dist_${browser}.zip`)
          .then(() => console.log(`[SUCCESS] Zipped successfully.`))
          .catch((err) =>
            console.error(`[ERROR] Error zipping directory: ${err}`),
          );
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/popup/index.html"),
      },
    },
    sourcemap: mode === "development",
    emptyOutDir: true,
    outDir: resolve(__dirname, `dist_${browser}`),
  },
});
