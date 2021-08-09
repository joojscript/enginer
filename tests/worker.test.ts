import { Worker } from "../src/lib/worker";

import { resolve } from "path";
import clearTmp from "../src/utils/clear-tmp";

describe("Worker tests: ", () => {
  const filepath = resolve(__dirname, "sample", "helloWorld.sample.ts");
  const JSFilePath = resolve(__dirname, "sample", "helloWorld.sample.js");
  const wrongFilePath = resolve(__dirname, "sample", "wrong.sample.ts");

  beforeAll(() => {
    clearTmp();
  });

  test("Create a worker to print 'Hello World'", () => {
    new Worker({
      filepath,
      onWorkerMessage: (msg: string) => expect(msg).toBe("Hello World"),
      onWorkerExit: (code: number) => expect(code).toBe(0),
    });
  });

  test("Create a worker to print 'Hello World' in vanilla JavaScript", () => {
    new Worker({
      filepath: JSFilePath,
      onWorkerMessage: (msg: string) => expect(msg).toBe("Hello World"),
      onWorkerExit: (code: number) => expect(code).toBe(0),
    });
  });

  test("Create a worker with nonexistent file", () => {
    new Worker({
      filepath: wrongFilePath,
      onWorkerExit: (code: number) => expect(code).toBe(1),
      onWorkerError: (error: Error) =>
        expect(error.message).toBe(
          `Could not compile ${wrongFilePath}, file do not exists.`
        ),
    });
  });
});
