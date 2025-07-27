import fs from "fs";
import archiver from "archiver";

export const zipDirectory = async (sourceDir: string, outPath: string) => {
  const output = fs.createWriteStream(outPath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  return new Promise<void>((resolve, reject) => {
    output.on("close", () => {
      resolve();
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
};
