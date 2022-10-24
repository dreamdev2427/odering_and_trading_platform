// import { EventEmitter } from 'events';
import { ShareTypes } from 'entities';
import { IMoneriumAuthService, MONERIUM_ACTION_SCOPE, MoneriumAuthService } from '../auth';
import { apiRequest } from '../communication';
import { OrderDto, validateRequestOrderDto } from '../data/orders';
import { MoneriumClientConfig, MoneriumConfig } from './config';

export default class MoneriumService {
  public readonly cfg: MoneriumConfig;

  private readonly auth: IMoneriumAuthService;

  // private static purchaseEvent: EventEmitter = InvestorBuy.emitter;

  constructor(cfg: MoneriumConfig) {
    this.cfg = cfg;
    this.auth = new MoneriumAuthService(cfg);
  }

  /**
   * Retrieves an authentication token and saves it in the config headers.
   * When the config gets reused, the authentication token is used.
   */
  private async authenticate(scope?: MONERIUM_ACTION_SCOPE): Promise<void> {
    const token = await this.auth.getAuthToken(scope);
    this.cfg.headers.Authentication = `Bearer ${token}`;
  }

  private async getClientCfg(clientId: string): Promise<MoneriumClientConfig> {
    if (this.cfg.clients) {
      if (this.cfg.clients[clientId]) {
        return this.cfg.clients[clientId] as MoneriumClientConfig;
      }
    }
    throw new Error(`Monerium: Missing client configuration for id:${clientId}`);
  }

  /**
   * Notify Monerium of a deposit
   */
  async makePaymentOrder(
    options: Partial<OrderDto> & { shareTypeId: number; shares: string },
  ): Promise<void> {
    await this.authenticate(MONERIUM_ACTION_SCOPE.OrdersWrite);
    const clientCfg = await this.getClientCfg('0'); // TODO: Client IDs don't exist yet.
    const order: Partial<OrderDto> = options;
    // order.signature = clientCfg.signature;
    order.address = clientCfg.ethAddress;
    const shareType = ShareTypes.findOne({ ID: options.shareTypeId }); // TODO: ShareType from options

    validateRequestOrderDto(order);

    return apiRequest<void, Partial<OrderDto>>(this.cfg, this.cfg.makeIssueOrder, order);
  }

  /**
   * Retreives the status of all orders and finalizes them when appropriate
   */
  async syncOrders(): Promise<void> {
    await this.authenticate(MONERIUM_ACTION_SCOPE.OrdersRead);
    const clientCfg = await this.getClientCfg('0'); // TODO: Client IDs don't exist yet.
    const orders = await apiRequest<OrderDto[]>(this.cfg, this.cfg.getAllOrders);
    console.log(orders);
  }

  async getProfile(id: string): Promise<void> {
    const profile = await apiRequest<any>(this.cfg, { ...this.cfg.getProfile, profile: id });
    console.log(profile);
  }
}
