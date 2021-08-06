import { isMainThread, parentPort, workerData } from "worker_threads";
import WTPool from "worker-threads-pool";
import { cpus } from "os";
import { Worker } from "./worker";
const availableCPUs = cpus().length;

type PoolOptions = {
  workers: Worker[];
  max?: number;
};

export class Pool {
  workers: Worker[] = [];
  private instance: WTPool;

  constructor(options: PoolOptions) {
    this.instance = new WTPool({
      max:
        options.max && options.max < availableCPUs
          ? options.max
          : availableCPUs,
    });

    this.workers = options.workers;

    this.workers = this.workers.map((worker) => {
      worker.inThread = true;
      return worker;
    });

    for (const worker of this.workers) {
      this.instance.acquire(
        worker.__tmpFilePath,
        worker.workerData,
        (err, wk) => {
          if (err) {
            throw new Error(`An error occurred while trying to build Pool`);
          }
          wk.on("message", (msg: any) => worker.onWorkerMessage(msg));
          wk.on("error", (err: Error) => worker.onWorkerError(err));
          wk.on("exit", (code: number) => worker.onWorkerExit(code));
        }
      );

      console.log(
        `Started worker ${worker} (pool size: ${this.instance.size})`
      );
    }
  }
}
