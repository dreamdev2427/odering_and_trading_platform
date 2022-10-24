import ValidationError from '../../../../modules/ValidationError';
import { Investor } from '../../../../Schema';

/**
 * Data used only for affiliate module.
 */
export default interface InvestorKycDto {
    id: string;
    kyc_status: number,
}

/**
 * Validate investor details before accepting them for transfer.
 * These will be sent to a remote API, but our database allows nullable fields.
 * @param investor
 */
export const validateInvestor = (investor: Investor) => {
    if (
        !investor.ID
    ) {
        throw new ValidationError(`Invalid investor details: Missing mandatory fields for dto:${JSON.stringify({
            id: investor.ID
        })}`);
    }
}

/**
 * Maps investor to InvestorKycDTO, takes
 * @param investor 
 * @param kycApproved 
 * @param validate 
 * @returns 
 */
export const mapInvestor = (investor: Investor, kycApproved: number, validate?: boolean): InvestorKycDto => {
    if (validate) {
        validateInvestor(investor);
    }
    return {
        id: investor.ID as any as string,
        kyc_status: kycApproved,
    };
}
