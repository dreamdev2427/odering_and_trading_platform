import { Affiliateplans } from '../../../../Schema';

export default interface IAffiliatePlanService {
    fetch(planId: number): Promise<Affiliateplans>;
    fetchAll(): Promise<Affiliateplans[]>;
    create(plan: Affiliateplans): Promise<void>;
    update(plan: Affiliateplans): Promise<void>;
    delete(planId: number): Promise<void>;
}