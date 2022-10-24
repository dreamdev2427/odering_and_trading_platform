import got from 'got';
import {MercuryConfig, MercuryRecipient} from './types';
import {mercuryEndpoint} from './defs';
import {fetchInvestorById} from "./multistoHelpers";

export default async (
    config: MercuryConfig,
    investorID: number,
): Promise<MercuryRecipient | null> =>
    fetchInvestorById(investorID).then((investor) =>
        investor?.mercuryID
            ? got<MercuryRecipient>(`${mercuryEndpoint}/recipient/${investor.mercuryID}`, {
                method: "GET",
                responseType: "json",
                headers: {
                    Authorization: `Bearer ${config.APIKey}`
                }
            }).then((response) => response.body).catch((e: any) => {
                console.log(`${e} ${JSON.stringify(e?.response?.body)} - error occurred in getMercuryRecipient`)
                return null
            })
            : null
    );


// 60*60*1000);// 1x per hour
