import { randomBytes } from "crypto";
import { writeFileSync, unlinkSync } from "fs";
import { resolve } from "path";
import { Worker as NodeWorker, workerData } from "worker_threads";
import { compileFromPath } from "../utils/compile";

const defaultMessage = (message: any) => {
  return message;
};

const defaultError = (err: Error) => {
  throw new Error(`Worker stopped with error ${err}`);
};

const defaultExit = (code: number) => {
  if (code !== 0) throw new Error(`Worker stopped with exit code ${code}`);
};

type WorkerOptions = {
  workerData?: any;
  onWorkerMessage?: (value: any) => void;
  onWorkerError?: (error: Error) => void;
  onWorkerExit?: (code: number) => void;
};

export class Worker {
  worker: NodeWorker;

  onWorkerMessage?: (value: any) => void;
  onWorkerError?: (error: Error) => void;
  onWorkerExit?: (code: number) => void;

  constructor(filepath: string, options?: WorkerOptions) {
    const tmpFileIdentifier = `${randomBytes(4).readUInt32LE(0)}`;
    const tmpFilePath = this._buildTempFile(filepath, tmpFileIdentifier);

    this.worker = new NodeWorker(tmpFilePath, {
      ...workerData,
      ...options?.workerData,
    });
    this.onWorkerMessage = options?.onWorkerMessage;
    this.onWorkerError = options?.onWorkerError;
    this.onWorkerExit = options?.onWorkerExit;

    this.worker.on("message", this.onWorkerMessage || defaultMessage);
    this.worker.on("error", (err) => {
      (this.onWorkerError || defaultError)(err);
      hookDeleteFile(tmpFilePath);
    });
    this.worker.on("exit", (code) => {
      (this.onWorkerExit || defaultExit)(code);
      hookDeleteFile(tmpFilePath);
    });
  }

  private _buildTempFile(filepath: string, fileId: string) {
    const result = compileFromPath(filepath);
    const tmpFilePath = resolve(__dirname, "..", "tmp", `${fileId}.js`);

    writeFileSync(tmpFilePath, result);

    return tmpFilePath;
  }
}

const hookDeleteFile = (fileId: string) => {
  unlinkSync(resolve(__dirname, "..", "tmp", `${fileId}`));
};
