import { existsSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import { resolve, join } from "path";

export default () => {
  const directory = resolve(__dirname, "..", "tmp");

  if (!existsSync(directory)) {
    mkdirSync(directory);
  }

  const files = readdirSync(directory);
  for (const file of files) {
    unlinkSync(join(directory, file));
  }
};
