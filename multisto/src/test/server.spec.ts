/** Running the server in test mode is not possible yet */

/* eslint-disable import/no-mutable-exports */
/*
import { assert } from "chai";
import { Application } from "express";
import request from "supertest";
import mysql from "../modules/mysql";

// eslint-disable-next-line no-var
export var app: request.SuperAgentTest;
const expressApp: Application = require("../server");

before((done) => {
  expressApp.on("app_started", () => {
    done();
  });
});

describe("Testing infrastructure", () => {
  it("should be able to use MySQL", async () => {
    const row = await mysql.executeSQLStatement(`SELECT 1 as value`);
    assert.equal(row[0].value, 1, "Query should return 1 as value");
  });
});
export default {
    describe
}
*/