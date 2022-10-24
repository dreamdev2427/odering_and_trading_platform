export default interface AffiliatePurchaseDto {
    user_id: number,
    project_id: number,
    plan_id: number,
    purchase_cost: any, // decimal
    order_status: number, // we only send completed orders, set to 1
    tokens_issued: any, // decimal (probably)
}

export const validatePurchaseDto = (dto: AffiliatePurchaseDto) => {
    if (
        !dto.user_id ||
        !dto.project_id ||
        !dto.purchase_cost ||
        !dto.tokens_issued
    ) {
        throw new Error(`Invalid purchase details`);
    }
}
