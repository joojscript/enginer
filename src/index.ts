import { Worker } from "./lib/worker";
import { resolve } from "path";

import clearTmpSync from "./utils/clear-tmp";

// ------------------------- //

clearTmpSync();

const filePath = resolve(__dirname, "temp.ts");

new Worker(filePath);
new Worker(filePath);
new Worker(filePath);
new Worker(filePath);
