import * as joblist from '../jobs/index';

/**
 * The class is required to be a singleton as it runs cron jobs
 */
export class MoonpayJobService {
  private static _instance: MoonpayJobService;

  protected cjobs: NodeJS.Timer[] = [];

  private constructor() {
    MoonpayJobService._instance = this;
  }

  run = joblist;

  static getInstance(): MoonpayJobService {
    if (!this._instance) this._instance = new MoonpayJobService();
    return this._instance;
  }

  registerJob(job: NodeJS.Timer): void {
    if (!this.cjobs.includes(job)) {
      this.cjobs.push(job);
    }
  }

  stopJobs(): void {
    this.cjobs.forEach((job) => clearTimeout(job));
    this.cjobs = [];
  }

  stopJob(job: NodeJS.Timer): void {
    const id = this.cjobs.indexOf(job);
    if (id) {
      clearTimeout(job);
    }
  }
}

const instance = MoonpayJobService.getInstance();
export default instance;
