import GraphqlServer from 'core/graphql-server';
import multer from 'multer';

import moonpay from '../services/moonpay/moonpay.webhooks';
import verifyInvestorAccreditation from './verify-investor-accreditation';
import helloSign from './hello-sign';
import netki from './netki';
import ssoPost from './sso-post';
import sumSub from './sum-sub';
import blockPass from './block-pass';

const registerWebhooks = (server: GraphqlServer): void => {
  server.app.post('/api/investorVerifyInvestorComWebhookPost', verifyInvestorAccreditation);
  // multer is needed because the data is sent as multipart/form
  const upload = multer({ dest: 'uploads/' });
  server.app.post('/api/helloSignWebhookPost', upload.none(), helloSign);

  server.app.post('/api/netkiWebhookPost', netki);

  server.app.post('/api/sign-in-sso', ssoPost);
  server.app.post('/api/investorSumSubWebhookPost', sumSub);

  server.app.post('/api/moonpay/kyc', moonpay.verifyMoonpaySignature, moonpay.getKyc);
  server.app.post('/api/moonpay/all', moonpay.verifyMoonpaySignature, moonpay.debug);
  server.app.post('/api/investorBlockPassWebhookPost', blockPass);
};

export default registerWebhooks;
