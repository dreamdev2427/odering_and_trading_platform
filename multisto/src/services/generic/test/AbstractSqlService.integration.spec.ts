import { describe, it } from "mocha";
import { assert } from "chai";
import AbstractSqlService from "../AbstractSqlService";
import { Logs } from "../../../Schema";

class SqlService extends AbstractSqlService {
  protected tableName = `logs`;
}
const NEW_DESCR = `Integration Test ###`;

describe(`Abstract SQL Service`, async () => {
  const svc = new SqlService();
  let logID = -1;
  const log: Partial<Logs> = {
    ActivityType: 0,
    recid: 0,
    Description: `Integration Test`,
    LogDate: new Date(),
  };

  before(async () => {
    await svc.clearTable();
  });

  it(`Should insert correctly`, async () => {
    logID = await svc.insert<Partial<Logs>>(log);
    assert.isAbove(logID, -1);
  });

  it(`Should find correctly by multiple records`, async () => {
    const [logFound] = await svc.findByRecords<Logs>([
      {
        Description: log.Description,
      },
      {
        Description: `not existing`,
      },
    ]);
    assert.deepEqual(logFound.ID, logID);
  });

  it(`Should upsert correctly`, async () => {
    const logUpdate: Partial<Logs> = {
      ID: logID,
      ActivityType: 0,
      recid: 0,
      Description: NEW_DESCR,
      LogDate: new Date(),
    };
    await svc.upsertMany<Partial<Logs>>([logUpdate]);

    const [logFound] = await svc.findByRecords<Logs>([{ ID: logID }]);
    assert.deepEqual(logFound.Description, NEW_DESCR);
  });

  it(`Should find one correctly`, async () => {
    const logFound = await svc.findOne<Logs>({ ID: logID });
    assert.deepEqual(logFound.Description, NEW_DESCR);
  });
});
