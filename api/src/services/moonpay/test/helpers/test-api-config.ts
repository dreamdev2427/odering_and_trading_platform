import { MoonpayApiConfig } from 'services/moonpay/moonpay.api.config';
import { MoonpayService } from 'services/moonpay/moonpay.service';

export class MoonpayTestService extends MoonpayService {
  public apiCfg: MoonpayApiConfig = new MoonpayApiConfig();
}

const svc = new MoonpayTestService();

export default svc;
