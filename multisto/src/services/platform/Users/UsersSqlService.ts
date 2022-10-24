/* eslint-disable class-methods-use-this */
import IUsersService from "./IUsersService";
import { Users } from "../../../Schema";
import { findMany, insert } from "../../../modules/db";

export default class UsersSqlService implements IUsersService {
  async getUsers(): Promise<Users[]> {
    return findMany<Users>(`SELECT * FROM users;`);
  }
  async getUsersById(userIds: number[]): Promise<Users[]> {
    return findMany<Users>(`SELECT * FROM users WHERE ID IN (?)`, [userIds]);
  }
  async getStoUsersByUsername(
    username: string[],
    stoId: number
  ): Promise<Users[]> {
    return findMany<Users>(
      "SELECT * FROM users WHERE Username IN (?) AND stoid = ?",
      [username, stoId]
    );
  }
  async copyUsersToSto(
    pasteStoId: number,
    userIds: number[],
    usernames: string[]
  ): Promise<void> {
    const stmt =
      "INSERT INTO users (stoid, FirstName, LastName, isActive, Username, Password, twofactorenable, email, isPlatformAdminLogin)" +
      " SELECT ?, FirstName, LastName, isActive, Username, Password, twofactorenable, email, isPlatformAdminLogin" +
      " FROM users" +
      " WHERE id IN (?) AND NOT EXISTS (" +
      " SELECT * FROM users WHERE Username IN (?) AND stoid = ?" +
      ")";
    return insert(stmt, [pasteStoId, userIds, usernames, pasteStoId]);
  }
}
