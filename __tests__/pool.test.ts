import { Worker } from "../src/lib/worker";
import { Pool } from "../src/lib/pool";

import { resolve } from "path";
import clearTmp from "../src/utils/clear-tmp";

describe("Pool tests: ", () => {
  const filepath = resolve(__dirname, "sample", "helloWorld.sample.ts");

  beforeAll(() => {
    clearTmp();
  });

  afterAll(() => {
    clearTmp();
  });

  test("Create a pool with 4 threads to print 'Hello World'", () => {
    console.log = jest.fn();

    new Pool({
      workers: [
        new Worker({ filepath }),
        new Worker({ filepath }),
        new Worker({ filepath }),
        new Worker({ filepath }),
      ],
    });
  });
});
