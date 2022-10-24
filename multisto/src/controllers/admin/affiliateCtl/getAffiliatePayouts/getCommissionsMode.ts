import { Request } from 'express';

export const getCommissionsMode = (req: Request): Boolean =>
    (req.query.v === "commissions")

export default getCommissionsMode;
