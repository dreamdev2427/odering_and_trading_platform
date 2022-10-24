/* eslint-disable class-methods-use-this */
import { Rolessto } from "../../../Schema";
import { findMany, insert } from "../../../modules/db";
import IStoRolesService, { RolePair } from "./IStoRolesService";

export default class StoRolesSqlService implements IStoRolesService {
  getStoRolesForUsers(userIds: number[]): Promise<any[]> {
    const stmt = `SELECT  rs.*, u.Username, urss.* FROM rolessto rs
            INNER JOIN userssto urss ON rs.ID = urss.roleid
            INNER JOIN users u ON u.ID = urss.userid AND u.stoid = urss.stoid
            WHERE urss.userid IN (?)`;
    return findMany(stmt, [userIds]);
  }
  getStoRolesByName(roles: any[], stoId: number): Promise<Rolessto[]> {
    const stmt = "SELECT * FROM rolessto WHERE Role IN (?) AND stoid = ?";
    return findMany<Rolessto>(stmt, [roles, stoId]);
  }
  async insertStoRoles(
    copyStoId: number,
    pasteStoId: number,
    roles: any[]
  ): Promise<void> {
    const stmt = `INSERT INTO rolessto (stoid, Role)
            select ?, Role
            from rolessto
            WHERE stoid = ? AND NOT EXISTS ( 
            SELECT * FROM rolessto WHERE Role IN (?) AND stoid = ?
            )`;
    return insert(stmt, [pasteStoId, copyStoId, roles, pasteStoId]);
  }
  insertUsersSto(usersSto: number[][]): Promise<null> {
    const stmt = `INSERT INTO userssto (roleid, userid, stoid)
                        VALUES ?`;
    return insert(stmt, [usersSto]);
  }
  insertUserRoles(usersSto: number[][]): Promise<null> {
    const stmt = `INSERT INTO userroles (RoleID, UserID)
                        VALUES ?`;
    return insert(stmt, [usersSto]);
  }
  insertRoleRights(roleIds: RolePair[]): Promise<null> {
    let stmt = `INSERT INTO rolesrightssto (RoleID, RightID) SELECT * FROM (`;
    roleIds.forEach((idPair, index) => {
      stmt += `select ${idPair.pasteRoleId}, RightID
                     from rolesrightssto
                     WHERE RoleID = ${idPair.copyRoleId} AND NOT EXISTS (
                        SELECT * FROM rolesrightssto WHERE RoleID = ${idPair.pasteRoleId}
                     ) `;

      if (index !== roleIds.length - 1) {
        stmt += ` UNION ALL `;
      }
    });
    stmt += ` ) as tmp`;
    return insert(stmt, []);
  }
}
