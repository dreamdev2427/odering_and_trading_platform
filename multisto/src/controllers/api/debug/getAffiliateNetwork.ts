import { Request, Response } from 'express';
import logger from '../../../logger';
import getNetworkData from '../../investorClient/affiliateCtl/getAffiliateProgram/getNetworkData';
import debugWrapper from './common/debugWrapper';

export default async (req: Request, res: Response) => {
    debugWrapper(req, res, async ()=> {
        const investorId = +(req.params.investorId);
        const stoId = +(req.params.stoId);
        if (Number.isNaN(investorId) || Number.isNaN(stoId)) {
            logger.error(`debug API getAffiliateNetwork - invalid investorId:${investorId} or stoId:${stoId}`);
            res.send(404);
        } else {
            const data = await getNetworkData(investorId, stoId);

            // Optionally reformatting the data
            switch(req.query.v) {
                case "id-level": {
                        type IdLevel = { id: number, level: number | null }
                        const customView = data.network.map((node): IdLevel => ({
                            id: node.ID,
                            level: node.level,
                        }));
                        logger.info(`Debug API: Fetched affiliate network investor id:[${investorId}], sto:${stoId}`);
                        res.send(customView);
                        break;
                    }

                case "id": {
                        const customView = data.network.map((node) => node.ID);
                        logger.info(`Debug API: Fetched affiliate network investor id:[${investorId}], sto:${stoId}`);
                        res.send(customView);
                        break;
                    }

                case "id-per-level": {
                        const nodeLevels = data.network.map((node) => node.level);

                        // Get unique levels (normally the numbers 0-7 but we can't be absolutely sure)
                        const levels = new Set(nodeLevels);

                        type LevelVm = { level: number | null; ids: number[]; };
                        const levelVms: LevelVm[] = [];
                        levels.forEach(level => {
                            levelVms.push({
                                level,
                                ids: data.network.filter(node => node.level === level).map((node) => node.ID),
                            });
                        });

                        logger.info(`Debug API: Fetched affiliate network investor id:[${investorId}], sto:${stoId}`);
                        res.send(levelVms);
                        break;
                    }
                default:
                        logger.info(`Debug API: Fetched affiliate network investor id:[${investorId}], sto:${stoId}`);
                    res.send(data);
                    break;
            }
        }
    });
}
