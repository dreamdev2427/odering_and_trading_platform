import mysql from "../../../../modules/mysql";
import { findOne } from "../../../../modules/db";
import QueryObjectDto from "../../investor/dto/QueryObjectDto";
import IRegisterService from "./IRegisterService";

export default class RegisterSqlService implements IRegisterService {
  countUnfinishedRegisters = async (
    searchQueryObjects: QueryObjectDto[]
  ): Promise<number> => {
    const queryDictionary: any = {
      searchName: ` CONCAT(FirstName, ' ', LastName) LIKE ? `,
      searchEmail: ` email LIKE ?`,
      searchDateFrom: ` dateregister > ? `,
      searchDateTo: ` dateregister < ? `,
      orderName: ` CONCAT(FirstName, ' ', LastName) `,
      orderEmail: ` email `,
      orderDate: ` dateregister `,
    };

    let sql = `SELECT count(*) as count FROM register WHERE ID > 0 `;
    const data: any = [];
    if (searchQueryObjects && searchQueryObjects?.length > 0) {
      searchQueryObjects.forEach((query: QueryObjectDto) => {
        if (queryDictionary[query.name]) {
          sql += ` AND ${queryDictionary[query.name]} `;
          if (query.name.includes("Date")) {
            const dateString = new Date(query.data)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
            data.push(`${dateString}`);
          } else {
            data.push(`%${query.data}%`);
          }
        }
      });
    }
    const result = await findOne<{ count: number }>(sql, data);
    return result?.count || 0;
  };
  getUnfinishedRegisters = (
    recordsPage?: number,
    searchQueryObjects?: QueryObjectDto[],
    orderQueryObjects?: QueryObjectDto[]
  ): Promise<any> => {
    const queryDictionary: any = {
      searchName: ` CONCAT(FirstName, ' ', LastName) LIKE ? `,
      searchEmail: ` email LIKE ?`,
      searchDateFrom: ` dateregister > ? `,
      searchDateTo: ` dateregister < ? `,
      orderName: ` CONCAT(FirstName, ' ', LastName) `,
      orderEmail: ` email `,
      orderDate: ` dateregister `,
    };

    let sql = `SELECT *, DATE_FORMAT(dateregister,'%M %d %Y %H:%m') AS dateregister FROM register WHERE ID > 0  `;
    const data = [];
    if (searchQueryObjects && searchQueryObjects?.length > 0) {
      searchQueryObjects.forEach((query: QueryObjectDto) => {
        if (queryDictionary[query.name]) {
          sql += ` AND ${queryDictionary[query.name]} `;
          if (query.name.includes("Date")) {
            const dateString = new Date(query.data)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
            data.push(`${dateString}`);
          } else {
            data.push(`%${query.data}%`);
          }
        }
      });
    }
    if (orderQueryObjects && orderQueryObjects?.length > 0) {
      sql += ` ORDER BY true`;
      orderQueryObjects.forEach((query: QueryObjectDto) => {
        if (queryDictionary[query.name]) {
          sql += `, ${queryDictionary[query.name]} ${query.data}`;
        }
      });
    }

    if (recordsPage !== undefined) {
      const globalObj: any = global as any; // Fetch global object
      const offset = globalObj.config.RecordsPerPaging;
      sql += ` LIMIT ?, ?`;
      data.push((recordsPage - 1) * offset);
      data.push(offset);
    }
    return mysql.executeSQLStatement(sql, data);
  };
}
