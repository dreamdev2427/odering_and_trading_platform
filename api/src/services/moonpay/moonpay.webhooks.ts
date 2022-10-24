import { createHmac } from 'crypto';
import { RequestHandler } from 'express';
import { MoonpaySignedHeader } from './moonpay.types';
import { loadConfigOrFail } from './moonpay.config';
import moonpay from './moonpay.service';

/**
 * Verify Moonpay signature header in webhook
 *
 * `Moonpay-Signature-V2: t=timestamp,s=signature`
 *
 * where t is a number and s is a hash.
 *
 * @returns
 * 404 on request error
 *
 * 500 on internal error
 *
 * See Moonpay docs for more info
 * https://dashboard.moonpay.com/webhooks#signature
 */
export const verifyMoonpaySignature: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const headers = req.headers as MoonpaySignedHeader;
    if (!headers['Moonpay-Signature-V2']) {
      console.warn(`Illegal access to Moonpay webhook without signature`);
      // I use 404 so as to not prove the existence of the secured endpoint
      res.sendStatus(404);
    } else {
      const config = await loadConfigOrFail();

      const header = headers['Moonpay-Signature-V2'];
      const timeRE = /(?<=t=)[0-9]+/;
      const signRE = /(?<=s=)[0-9a-z]+/;
      const timestamp = (header.match(timeRE) ?? [``])[0];
      const signature = (header.match(signRE) ?? [``])[0];

      // Entire query string with ? is considered paylaod on GET
      const payload = req.method === 'GET' ? req.url.substring(req.url.lastIndexOf('?')) : req.body;

      const stampedPayload = `${timestamp}.${payload}`;

      const hmac = createHmac(`sha256`, config.publishableKey);
      const signedPayload = hmac.update(stampedPayload);
      const derivedSignature = signedPayload.digest('hex');

      if (signature === derivedSignature) {
        next();
      } else {
        console.warn(`Illegal access to Moonpay webhook with bad signature`);
        console.warn(`URL:${req.originalUrl}\nquery:${req.query}`);
        console.warn(req.body);
        res.sendStatus(404);
      }
    }
  } catch (e) {
    console.error(`Moonpay webhook error in signature validation:\n${(e as Error).stack}`);
    res.sendStatus(500);
  }
};

export const getKyc: RequestHandler = async (req, res): Promise<void> => {
  try {
    const investorID = +(req.query.externalCustomerId as string);
    if (Number.isNaN(investorID)) {
      console.log(
        `MoonPay tried to grab KYC for investor ID:${investorID}, but it was a malformed request.`,
      );
      res.sendStatus(400);
    } else {
      const kyc = await moonpay.getKyc(investorID);
      // Print only the keys, not the data obviously
      console.log(
        `MoonPay webhook grabbed KYC for investor ID:${investorID}.\nWe provided these keys: [${JSON.stringify(
          Object.keys(kyc),
        )}]`,
      );
      res.send(kyc);
    }
  } catch (e) {
    console.error(`Moonpay webhook error (kyc)\n${(e as Error).stack}`);
    res.sendStatus(500);
  }
};

export const debug: RequestHandler = async (req, res): Promise<void> => {
  try {
    const investorID = +(req.query.externalCustomerId as string);
    if (Number.isNaN(investorID)) {
      res.sendStatus(400);
    } else {
      const kyc = await moonpay.getKyc(investorID);
      res.send(kyc);
    }
  } catch (e) {
    console.error(`Moonpay webhook error\n${(e as Error).stack}`);
    res.sendStatus(500);
  }
};

export default {
  verifyMoonpaySignature,
  getKyc,
  debug,
};
