import { Worker } from "./lib/worker";
import { resolve } from "path";

// ------------------------- //

const filePath = resolve(__dirname, "temp.ts");

new Worker(filePath);
new Worker(filePath);
new Worker(filePath);
new Worker(filePath);
