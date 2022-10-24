import common from "../../../modules/common";

export default async (req: any, res: any) => {
    try {
        const globalObj = global as any;
        const investorPageDataP = common.getCommonInvestorDashboardPageProperties(
            req,
            res
        );
        res.render("investors/accreditationMainView", {
            csrfToken: encodeURI(req.csrfToken()),
            partials: common.getInvestorDashboardPartials(),
            Data: await investorPageDataP,
            authType: common.getAuthorizationType(req.session.context),
            stoId: globalObj.config.stos[req.hostname].stoid,
            investorId: req.session.user.ID,
            verifyInvestorComToken: globalObj.config.stos[req.hostname]?.VerifyInvestorComHostToken,
            verifyInvestorComUrl: globalObj.config.verifyInvestorComUrl?.frontendURL
        });
    } catch (err) {
        common.handleError(
            req,
            res,
            `${err} - Error occurred in getAccreditationView`
        );
    }
};
