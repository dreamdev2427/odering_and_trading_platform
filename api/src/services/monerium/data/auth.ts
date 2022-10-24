export enum AUTH_GRANT_TYPE {
  ClientCredentials = 'client_credentials',
  RefreshToken = 'refresh_token',
}
export interface AuthRequestDto {
  client_id: string;
  client_secret: string;
  grant_type: 'client_credentials';
  scope?: string;
}
export interface AuthRefreshRequestDto {
  client_id: string;
  refresh_token: string;
  grant_type: 'refresh_token';
  scope?: string;
}
export interface AuthTokenDto {
  access_token: string;
  expires_in: number;
  profile: string;
  refresh_token: string;
  token_type: string;
  userId: string;
}
