import { MoneriumConfig } from './api/config';
import { apiRequest } from './communication';
import { AUTH_GRANT_TYPE, AuthRefreshRequestDto, AuthRequestDto, AuthTokenDto } from './data/auth';

export enum MONERIUM_ACTION_SCOPE {
  OrdersRead = 'orders:read',
  OrdersWrite = 'orders:write',
}
export interface IMoneriumAuthService {
  getAuthToken(scope?: MONERIUM_ACTION_SCOPE): Promise<string>;
}
export class MoneriumAuthService implements IMoneriumAuthService {
  private config: MoneriumConfig;

  private tokenDto: AuthTokenDto;

  /** Due to potential changes in scope while an old token is still valid,
   * requesting with a new scope will trigger a refresh token action. */
  private currentScope?: MONERIUM_ACTION_SCOPE;

  constructor(config: MoneriumConfig) {
    this.config = config;
  }

  private tokenIsExpired(): boolean {
    const now = Date.now();
    return now >= new Date(now + this.tokenDto.expires_in).valueOf();
  }

  private async getNewToken(scope?: MONERIUM_ACTION_SCOPE): Promise<AuthTokenDto> {
    const res = await apiRequest<AuthTokenDto, AuthRequestDto>(
      this.config,
      this.config.getAccessToken,
      {
        client_id: '0',
        client_secret: this.config.clients ? this.config.clients['0']?.clientSecret ?? '' : '',
        grant_type: AUTH_GRANT_TYPE.ClientCredentials,
        scope,
      },
    );
    this.currentScope = scope;
    return res;
  }

  private async getRefreshToken(
    token: AuthTokenDto,
    scope?: MONERIUM_ACTION_SCOPE,
  ): Promise<AuthTokenDto> {
    const res = await apiRequest<AuthTokenDto, AuthRefreshRequestDto>(
      this.config,
      this.config.getRefreshToken,
      {
        client_id: '0',
        refresh_token: token.refresh_token,
        grant_type: AUTH_GRANT_TYPE.RefreshToken,
        scope,
      },
    );
    this.currentScope = scope;
    return res;
  }

  /**
   * Get the action token
   * @param scope Optional: Grants only specific permissions (least priviledge principle)
   * @throws ApiError on failed authentication
   */
  async getAuthToken(scope?: MONERIUM_ACTION_SCOPE): Promise<string> {
    if (!this.tokenDto) {
      this.tokenDto = await this.getNewToken(scope);
    } else {
      if (this.tokenIsExpired() || scope !== this.currentScope) {
        // Requesting with an expired token or a new scope will trigger a refresh
        this.tokenDto = await this.getRefreshToken(this.tokenDto, scope);
      }
    }
    return this.tokenDto.access_token as string;
  }
}
