import { NextFunction, Request, Response } from 'express';

/**
 * Handle API client authentication
 */
export default interface IApiAuthService {
    /**
     * Register an API user. Generate a key (token) if none is provided.
     * @param name API client name
     * @param token optional pre-existing key
     */
    registerClient(name: string, token?: string): Promise<void>;
    /**
     * Authenticate if an incoming express request contains a registered API access token.
     * @returns The corresponding client's ID
     * @throws ApiAuthError on invalid authentication
     */
    authenticateApiRequest(req: Request, res: Response, next: NextFunction): void;
    /**
     * Get client's token
     * @param clientId
     */
    getToken(clientId: number): Promise<string>;
    getClientName(clientId: number): Promise<string>;
}
