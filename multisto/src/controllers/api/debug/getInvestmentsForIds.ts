import { Request, Response } from 'express';
import logger from '../../../logger';
import { Investments, InvestorBuyPropertyAlert } from '../../../Schema';
import InvestmentsSqlService from '../../../services/generic/data/InvestmentsSqlService';
import InvestorBuyPropertyAlertSqlService from '../../../services/generic/data/InvestorBuyPropertyAlertSqlService';
import debugWrapper from './common/debugWrapper';

const transform = (
    nodes: {
        ids: number[],
        level?: number | string,
        investments: Investments[],
        requests: InvestorBuyPropertyAlert[],
    }[],
    returnCsv: boolean = false,
) => {
    const networkId = nodes.find(node => node.level === "-1")?.ids[0];
    const jsonResult = nodes.map(node => ({
        investments: node.investments.map(investment => ({
            networkId,
            downLineId: investment.InvestorID,
            level: node.level || "?",
            amount: investment.AmountInvested,
            tokens: investment.TokensTransferred,
            dateApproved: investment.DateTime,
            dateRequested: node.requests.find(req =>
                    req.investorID === investment.InvestorID &&
                    req.stoid === investment.stoid &&
                    req.Shares === investment.TokensTransferred
                )?.DateReceived,
            sto: investment.stoid,
        }))
    }));
    if (returnCsv) {
        const csv = jsonResult.map(node => node.investments.map(i =>
            `${i.networkId},${i.downLineId},${i.level},${i.amount},${i.tokens},${i.dateApproved?.toISOString()},${i.dateRequested?.toISOString() ?? "N/A"},${i.sto}`));

        const csvFlat = csv.reduce((acc, val) => acc.concat(val), []);
        return {
            columns: "Network ID,Investor ID,Level,Investment Amount,Tokens Transferred,Date Approved,Date Requested(?),Project ID",
            csvFlat,
        };
    }
    return jsonResult;
}

export default async (req: Request, res: Response) => {
    debugWrapper(req, res, async () => {
        const invSvc = new InvestmentsSqlService();
        const reqSvc = new InvestorBuyPropertyAlertSqlService();

        switch(req.query.v) {
            case "nested": {
                type BodyNode = { ids: number[] };
                const nested = req.body as BodyNode[];
                const p = nested.map(async (node) => ({
                    ...node,
                    // Add investments property to each object in the req body, keep other fields
                    investments: await invSvc.getForInvestorIds(node.ids),
                    requests: await reqSvc.getForInvestorIds(node.ids),
                }));
                const result = await Promise.all(p);

                let summaryIds: number[] = [];
                // eslint-disable-next-line no-return-assign
                nested.forEach(node => summaryIds = summaryIds.concat(node.ids));
                logger.info(`Debug API: Fetched investments for ids:[${summaryIds}]`);

                if (req.query.transform) { // query transform can be === csv or anything else for json
                    res.send(transform(result, (req.query.transform === "csv")));
                } else {
                    res.send(result);
                }
                break;
            }
            default: {
                try {
                    const ids = (req.body) as number[];
                    if (!ids.length) throw new Error(`Empty array in request body`);

                    const investments = await invSvc.getForInvestorIds(ids);
                    const requests = await reqSvc.getForInvestorIds(ids);
                    logger.info(`Debug API: Fetched investments for ids:[${ids}]`);
                    res.send({
                        investments,
                        requests,
                    });
                } catch(e: any) {
                    res.sendStatus(404);
                    logger.error(`${e.stack}`);
                }
                break;
            }
        }
    });
}
