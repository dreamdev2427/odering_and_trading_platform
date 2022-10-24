import { Stos } from '../../../../Schema';
import ISharesService from '../data/ISharesService';
import SharesSqlService from '../data/SharesSqlService';

/** Needed because of bad MLM api */
export enum DtoOperation {
    INSERT = 1,
    UPDATE = 2,
    DELETE = 3
}

export default interface AffiliateProjectDto {
    project_id: number,
    project_name: string,
    project_cost: number,
    quantity: number,
    /* This field is misspelled because of the people we are integrating with. Sigh. */
    affilate_plan_id: number,
    Category: string,
    operation: DtoOperation, // 1: insert, 2: update, 3: delete
}

export const validateSto = (sto: Stos) => {
    if (
       !sto.ID ||
       !sto.title ||
       !sto.affiliatePlanId // id === 0 is not supposed to happen anyway
    ) {
        throw new Error("Invalid investor details: Missing fields");
    }
}

/**
 * Maps STO object to DTO needed for remote service
 * @param sto Sto object
 * @param operation Operation type, needed due to bad endpoint with MLM (should be HTTP method)
 * @returns
 */
export const mapSto = (sto: Stos, operation: DtoOperation = 0): AffiliateProjectDto => {
    validateSto(sto);
    return {
        project_id: sto.ID,
        project_name: sto.title,
        project_cost: 1,
        quantity: 1,
        affilate_plan_id: sto.affiliatePlanId as number,
        Category: "Commercial", // TODO Add categories
        operation,
    }
}

/**
 * Calculate cost and store them in dto
 * @param projectDto VALIDATED dto
 * @returns project dto with actual shares and cost
 */
export const calculateCost = async (projectDto: AffiliateProjectDto): Promise<AffiliateProjectDto> => {
    const svc: ISharesService = new SharesSqlService();
    let cost = await svc.getTotalCost(projectDto.project_id);
    if (!cost) {
        cost = 1;
    }

    const updatedProject = projectDto;

    updatedProject.project_cost = cost;

    return updatedProject;
}
/**
 * Calculate N of shares and store them in dto
 */
export const calculateQuantity = async (projectDto: AffiliateProjectDto): Promise<AffiliateProjectDto> => {
    const svc: ISharesService = new SharesSqlService();
    let quantity = await svc.getTotalShares(projectDto.project_id);
    if (!quantity) {
        quantity = 1;
    }

    const updatedProject = projectDto;

    updatedProject.quantity = quantity;

    return updatedProject;
}
