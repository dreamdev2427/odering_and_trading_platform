import { NextFunction, Request, Response } from 'express';

export default interface IBlockPassService {
    /**
     * Middleware that calls updateBlockPassData
     * @returns The corresponding client's ID
     * @throws ApiAuthError on invalid authentication
     */
    updateBlockPassDataMiddleWare(req: Request, res: Response, next: NextFunction): void;
}
