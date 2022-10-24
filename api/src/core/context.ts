export enum JWT_ROLE {
  investor,
  admin,
  platformAdmin,
  api,
  // role used to verify 2FA
  twoFA,
  digishares,
}

export interface User {
  ID: number;
  stoID: number;
  role: JWT_ROLE;
}

export type Context = {
  user: User;
};
