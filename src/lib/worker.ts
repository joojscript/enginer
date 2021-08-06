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
  filepath: string;
  inThread?: boolean;
  workerData?: any;
  onWorkerMessage?: (value: any) => void;
  onWorkerError?: (error: Error) => void;
  onWorkerExit?: (code: number) => void;
};

export class Worker {
  __tmpFilePath: string;
  inThread = true;
  worker?: NodeWorker;
  originalFilePath: string;
  workerData: any = {};

  onWorkerMessage: (value: any) => void;
  onWorkerError: (error: Error) => void;
  onWorkerExit: (code: number) => void;

  constructor(options: WorkerOptions) {
    this.originalFilePath = options.filepath;
    this.workerData = options.workerData;

    if (options.inThread !== undefined && options.inThread !== null) {
      this.inThread = options.inThread;
    }

    const tmpFileIdentifier = `${randomBytes(4).readUInt32LE(0)}`;
    const tmpFilePath = this._buildTempFile(
      options.filepath,
      tmpFileIdentifier
    );
    this.__tmpFilePath = tmpFilePath;

    this.onWorkerMessage = options?.onWorkerMessage || defaultMessage;
    this.onWorkerError = (err: Error) => {
      (options?.onWorkerError || defaultError)(err);
      hookDeleteFile(tmpFilePath);
    };
    this.onWorkerExit = (code: number) => {
      (options?.onWorkerExit || defaultExit)(code);
      hookDeleteFile(tmpFilePath);
    };

    if (!this.inThread) {
      this.worker = new NodeWorker(tmpFilePath, {
        ...workerData,
        ...options?.workerData,
      });

      this.worker.on("message", this.onWorkerMessage);
      this.worker.on("error", this.onWorkerError);
      this.worker.on("exit", this.onWorkerExit);
    }
  }

  run() {
    if (this.inThread === false) {
      console.warn(
        `This Worker has 'inThread' set to true, which means it automatically runs when it is initialized. Calling '.run()' will probably make it execute twice.`
      );
    }
    this.worker = new NodeWorker(this.__tmpFilePath, {
      ...workerData,
      ...this.workerData,
    });

    this.worker.on("message", this.onWorkerMessage);
    this.worker.on("error", this.onWorkerError);
    this.worker.on("exit", this.onWorkerExit);
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
