import { OkPacket } from 'mysql2';
import { DividendTemplates } from '../../../../Schema';
import AbstractSqlService from '../../../generic/AbstractSqlService';
import IDividendTemplatesService from './IDividendTemplatesService';

export default class DividendTemplatesSqlService extends AbstractSqlService implements IDividendTemplatesService {
    protected tableName = "DividendTemplates";

    async create(template: Omit<DividendTemplates, 'id'>): Promise<number> {
        const fields: typeof template = {
            awardStrategy: template.awardStrategy,
            awardValue: template.awardValue,
            isActive: template.isActive,
            period: template.period,
            periodUnit: template.periodUnit,
            status: template.status,
            stoId: template.stoId,
            channelId: template.channelId,
            currencyId: template.currencyId,
            shareTypeId: template.shareTypeId,
            title: template.title,
        };
        return this.insert<typeof template>(fields);
    }
    async list(stoId: number): Promise<DividendTemplates[]> {
        const sql = `SELECT * FROM DividendTemplates WHERE stoId = ? AND status <> "historical"`;
        return this.runSql(sql, stoId);
    }
    async update(template: DividendTemplates): Promise<void> {
        const sql = `UPDATE DvididendTemplates
            awardStrategy = ?
            awardValue = ?
            channelId = ?
            currencyId = ?
            isActive = ?
            periodUnit = ?
            period = ?
            shareTypeId = ?
            status = ?
            stoId = ?
            title = ?
        WHERE id = ?`;
        return this.runSql(sql, [
            template.awardStrategy,
            template.awardValue,
            template.channelId ?? "NULL",
            template.currencyId ?? "NULL",
            template.isActive,
            template.periodUnit,
            template.period,
            template.shareTypeId ?? "NULL",
            template.status,
            template.stoId,
            template.title ?? "NULL",
            template.id,
        ]);
    }
    async delete(template: Partial<DividendTemplates>): Promise<void> {
        const sql = `DELETE FROM DvididendTemplates WHERE id = ?`;
        return this.runSql(sql, template.id);
    }
    async updateIsActive(templateId: number, isActive: number): Promise<boolean> {
        const sql = `UPDATE DividendTemplates SET isActive = ? WHERE id = ?`;
        const res: OkPacket = await this.runSql(sql, [isActive, templateId]);
        return res.changedRows > 0;
    }
}
