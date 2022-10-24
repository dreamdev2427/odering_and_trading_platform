import { Response } from 'express';
import common from '../../../modules/common';
import TradingDto from '../../../services/investorClient/trading/TradingIndexDto';
import TradingIndexService from '../../../services/investorClient/trading/TradingIndexService';

/**
 * GET: Trading index web controller
 */
export default async function getIndex(req: any, res: Response) {
    const tradingService = new TradingIndexService();
    const globalObj:any = global as any; // Fetch global object
    let tradingDto: TradingDto;

    tradingService.index(req.session.user.ID, globalObj.config.stos[req.hostname].stoid)
    .then((result: TradingDto) => {
        tradingDto = result;
        common.getCommonInvestorDashboardPageProperties(req, res);
    })
    .then((data) => {
        // TODO: Refactor: use viewmodels/DTO ?
        res.render('investors/exchange/trading', {
            myopenbuys: tradingDto.myOpenBuys,
            myopenbuysoffers: tradingDto.myOpenBuysOffers,
            buys: tradingDto.buys,
            sells: tradingDto.sells,
            tradingDtoRec: tradingDto.sharesRec,
            exchange: tradingDto.exchange,
            exchangeIsClose: tradingDto.exchangeIsClose,
            partials: common.getInvestorDashboardPartials(/* req */),
            Data: data,
        });
    })
    .catch((error) => {
        common.handleError(req, res,
            `${error.message} Error occured in trading index`);
    });
}
