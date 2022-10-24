import ValidationError from '../../../../modules/ValidationError';
import { Investor } from '../../../../Schema';

/**
 * Data used only for affiliate module.
 */
export default interface AffiliateInvestorDto {
    id: string;
    sponsor: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    address_1: string;
    city: string;
    zipcode: string;
    email_confirmation_status: 1,
    kyc_status: number,
}

/**
 * Validate investor details before accepting them for transfer.
 * These will be sent to a remote API, but our database allows nullable fields.
 * @param investor
 */
export const validateInvestor = (investor: Investor) => {
    if (
        !investor.phone ||
        !investor.country ||
        !investor.state ||
        !investor.Address ||
        !investor.zip
    ) {
        throw new ValidationError(`Invalid investor details: Missing mandatory fields for dto:${JSON.stringify({
            phone: investor.phone,
            country: investor.country,
            state: investor.state,
            address: investor.Address,
            zip: investor.zip,
        })}`);
    }
}

export const mapInvestor = (investor: Investor, validate?: boolean, kycStatus: number = 0): AffiliateInvestorDto => {
    if (validate) {
        validateInvestor(investor);
    }
    return {
        id: investor.ID as any as string,
        sponsor: investor.referByInvestorID as any as string,
        name: `${investor.FirstName} ${investor.LastName}`.trim(),
        email: investor.email,
        phone: investor.phone || "null",
        country: investor.country || "null",
        state: investor.state || "null",
        address_1: investor.Address || "null",
        city: investor.town || "null",
        zipcode: investor.zip || "null",
        email_confirmation_status: 1,
        kyc_status: kycStatus,
    };
}
