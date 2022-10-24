import { Request, Response } from 'express';

export default interface IVerifyInvestorComService {
    /**
     * fetches a temporary token for the investor to use for sumsub services
     * @returns The corresponding client's temporary access token
     * @throws ApiAuthError on invalid authentication
     */
    getSumSubAccessTokenForInvestor(req: Request, res: Response): Promise<string>;
}
