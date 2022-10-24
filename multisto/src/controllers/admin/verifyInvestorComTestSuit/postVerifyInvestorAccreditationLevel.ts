import { Request, Response } from "express";
import common from "../../../modules/common";

const request = require('request');

async function postRequestToVerifyInvestor(verifyID: string, accreditationLevel: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const json = {
                "status": `${accreditationLevel}`
            };
        request.post({
            url: `https://verifyinvestor-staging.herokuapp.com/api/v1/verification_requests/${verifyID}/review`,
            headers: {
                'Authorization': `Token ${(global as any).config.VerifyInvestorComApiToken}`,
                'Content-Type': `application/json`,
                'Accept': `application/json`
            },
            body: JSON.stringify(json)
        }, (err: any, httpResponse: any, body: any) => {
            if (!err && httpResponse.statusCode === 200) {
                resolve(body);
            } else {
                reject(body);
            }
        });
    });
}

export default async (req: Request, res: Response) => {
    try{
        const { verifyID, accreditationLevel } = req.body;
        await postRequestToVerifyInvestor(verifyID, accreditationLevel);

        (req as any).flash('verifyInvestorsListError', 'Done');
        res.redirect(`getVerifyInvestorComTestSuit`);
    } catch (error) {
        (req as any).flash('verifyInvestorsListError', error);
        res.redirect(`getVerifyInvestorComTestSuit`);
    }
}