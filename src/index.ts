import { resolve } from "path";

import { Worker } from "./lib/worker";
import { Pool } from "./lib/pool";

import clearTmpSync from "./utils/clear-tmp";

// ------------------------- //

clearTmpSync();

const filepath = resolve(__dirname, "temp.ts");

// new Worker({ filepath });
// new Worker({ filepath });
// new Worker({ filepath });
// new Worker({ filepath });

new Pool({
  workers: [new Worker({ filepath }), new Worker({ filepath })],
});
