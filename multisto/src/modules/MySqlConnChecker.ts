import * as db from "./db";
import logger from "../logger";

const SQL = `SHOW TABLES`;
/** Hard limit on maximum attempts must be present to avoid a potential infinite loop */
// const MAX_ATTEMPTS = 30;
/** Default timeout of the connection checker if not provided (5 min) */
const MAX_TIMEOUT_DEFAULT = 5 * 60 * 1000;
const RETRY_DELAY_ENV = parseInt(process.env.MYSQL_PROBE_RETRY_DELAY ?? "", 10);
const RETRY_DELAY = Number.isNaN(RETRY_DELAY_ENV) ? 5000 : RETRY_DELAY_ENV;

type AttemptState = {
  startedAt: number;
  timeout: number;
  msElapsed: number;
  attempts: number;
  waiting: boolean;
  succeeded: boolean;
};

const probeServer = async () => db.execute(SQL, []);

const attempt = async (
  state: AttemptState,
  job: NodeJS.Timeout | null,
  resolve?: () => void,
  reject?: (reason: Error) => void
): Promise<AttemptState> => {
  const s = state;
  try {
    logger.info(
      `⟳ Checking MySQL connection${
        state.attempts === 0
          ? ``
          : `[ Attempt ${s.attempts + 1} at ${s.msElapsed}ms ]`
      }`
    );
    s.attempts += 1;
    if (s.waiting) {
      throw new Error(`Still waiting on previous MySQL probe to time out.`);
    }
    s.waiting = true;
    // eslint-disable-next-line no-await-in-loop
    await probeServer();
    s.waiting = false;
    logger.info(`✔ MySQL connection`);
    if (job) clearInterval(job);
    s.succeeded = true;
    if (resolve) resolve();
  } catch (e) {
    s.waiting = false;
    logger.error(`${e}`);
    const nowAt = Date.now();
    s.msElapsed = nowAt - s.startedAt;

    if ((e as Error).message.toLowerCase().includes("access denied")) {
      logger.error(
        `MySqlConnChecker Critical Error: Bad credentials. Aborting without retrying.`
      );
      process.exit(1);
    }
    if (s.msElapsed >= s.timeout) {
      if (job) clearInterval(job);
      logger.error(
        `MySqlConnChecker Critical Error: Could not establish connection to MySQL server. Aborting.`
      );
      if (reject) reject(new Error(`MySqlConnChecker: Timed out`));
      process.exit(1);
    }
  }
  return s;
};
/**
 * Try multiple times to connect with credentials to the MySQL server
 * @param options.timeout in milliseconds. Default 5 minutes
 */
const attemptConnectionOrExit = async (options?: { timeout: number }) => {
  let state: AttemptState = {
    attempts: 0,
    msElapsed: 0,
    timeout: options?.timeout ?? MAX_TIMEOUT_DEFAULT,
    startedAt: Date.now(),
    waiting: false,
    succeeded: false,
  };

  // Have to manually invoke once because the interval will do it only after the delay
  state = await attempt(state, null);
  return new Promise<void>((resolve, reject) => {
    if (state.succeeded) {
      // If connection already established
      resolve();
    } else {
      const job = setInterval(async () => {
        state = await attempt(state, job, resolve, reject);
      }, RETRY_DELAY);
    }
  });
};

export default {
  attemptConnectionOrExit,
};
