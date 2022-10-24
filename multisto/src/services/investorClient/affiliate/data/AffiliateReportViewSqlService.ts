/* eslint-disable class-methods-use-this */
import mysql from "../../../../modules/mysql";
import IAffiliateReportViewService from "./IAffiliateReportViewService";
import AffiliateInvestmentVolumeDto from "../dto/AffiliateInvestmentVolumeDto";

export default class AffiliateReportViewSqlService
  implements IAffiliateReportViewService {
  async deleteTableData(): Promise<void> {
    const sql = `DELETE FROM AffiliateReportView WHERE ID > 0`;
    await mysql.executeSQLStatement(sql, []);
  }

  async insertAffiliateReports(
    rootInvestorId: number,
    stoId: number,
    investorLines: AffiliateInvestmentVolumeDto[],
    rootInvestorTotalShareValue: number
  ): Promise<void> {
    const sql = `insert into AffiliateReportView (lineInvestorId, lineName, armVolume, tokenVolume, rootInvestorId, stoid,
                        rootInvestorTotalPersonalInvestmentVolume)
                    values ?`;
    const values: any[] = [];
    if (!investorLines.length) {
      const line = [
        null,
        "",
        0,
        0,
        rootInvestorId,
        stoId,
        rootInvestorTotalShareValue,
      ];
      values.push(line);
    } else {
      investorLines.forEach((element) => {
        const line = [];
        line.push(element.lineId);
        line.push(element.lineName);
        line.push(element.volume);
        line.push(element.tokenVolume);
        line.push(rootInvestorId);
        line.push(stoId);
        line.push(rootInvestorTotalShareValue);
        values.push(line);
      });
    }
    await mysql.executeSQLStatement(sql, [values]);
  }
}
