import { Affiliateplans } from '../../../../Schema';

export default interface AffiliatePlanDto {
    affiliate_plan_id: number,
    affiliate_plan_name: string,
}

export const mapAffiliateplans = (plan: Affiliateplans): AffiliatePlanDto => {
    return {        
        affiliate_plan_id: plan.id,
        affiliate_plan_name: plan.name,
    }
}
