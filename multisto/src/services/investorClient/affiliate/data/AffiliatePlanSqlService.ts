import { Affiliateplans } from '../../../../Schema';
import AbstractSqlService from '../../../generic/AbstractSqlService';
import IAffiliatePlanService from './IAffiliatePlanService';

export default class AffiliatePlanSqlService extends AbstractSqlService implements IAffiliatePlanService {
    fetch(planId: number): Promise<Affiliateplans> {
        return this.runSql(`select * from affiliateplans where id = ?`, planId);
    }

    fetchAll(): Promise<Affiliateplans[]> {
        return this.runSql(`select * from affiliateplans;`, []);
    }

    create(plan: Affiliateplans): Promise<void> {
        return this.runSql(`insert into affiliateplans (id, name) values (?, ?)`, [plan.id, plan.name]);
    }

    update(plan: Affiliateplans): Promise<void> {
        return this.runSql(`update affiliateplans set name = ? where id = ?`, [plan.name, plan.id]);
    }

    delete(planId: number): Promise<void> {
        return this.runSql(`delete from affiliateplans where id = ?`, planId);
    }
}
