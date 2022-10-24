import { createContext } from 'react';
import client, {
  InvestorActiveStoDocument,
  InvestorActiveStoQuery,
  InvestorActiveStoQueryVariables,
  InvestorVerifyDocument,
  InvestorVerifyMutation,
  InvestorVerifyMutationVariables,
  SignInDocument,
  SignInMutation,
  SignInMutationVariables,
  MeQuery,
  MeDocument,
  InvestorAppDataQuery,
  InvestorAppDataDocument,
} from 'services/apollo';
import { environment } from 'services/core/helpers';

interface IStoContext {
  sto: number;
  setSto: ({ sto }: { sto: number }) => void;
}

export const StoContext = createContext<IStoContext>({
  sto: 0,
  setSto: () => {
    // nothing
  },
});

export enum JWT_ROLE {
  investor,
  admin,
  platformAdmin,
  api,
  // role used to verify 2FA
  twoFA,
}

export interface User {
  ID: number;
  stoID: number;
  role: JWT_ROLE;
}

export const StoProvider = StoContext.Provider;

class AuthService {
  STO: number = Number(environment.REACT_APP_STO) || 0;

  async signIn(email: string, password: string) {
    try {
      const { data } = await client.mutate<SignInMutation, SignInMutationVariables>({
        mutation: SignInDocument,
        variables: {
          email,
          password,
          sto: Number(this.STO),
        },
      });

      this.token = data?.signIn || '';

      const { data: dataActive } = await client.query<InvestorActiveStoQuery, InvestorActiveStoQueryVariables>({
        query: InvestorActiveStoDocument,
      });

      this.sto = Number(dataActive?.investorSto?.stoID) || this.STO;
      await client.resetStore();
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async verify(secret: string) {
    try {
      const { errors } = await client.mutate<InvestorVerifyMutation, InvestorVerifyMutationVariables>({
        mutation: InvestorVerifyDocument,
        variables: {
          secret,
        },
      });

      if (errors?.length) {
        throw new Error(errors[0].message);
      }
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('sto');
    return client.cache.reset();
  }

  async signInSSO(token: string) {
    this.token = token;
    this.sto = this.STO;

    try {
      const { data } = await client.query<MeQuery>({ query: MeDocument });
      const { data: appParams } = await client.query<InvestorAppDataQuery>({ query: InvestorAppDataDocument });
      this.checkSSOMode(appParams);
      await client.resetStore();
      return data.investorUser?.investor.isTwoFactorEnabled;
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('sto');
      await client.cache.reset();
      throw new Error('Invalid token');
    }
  }

  async checkSSOMode(user: InvestorAppDataQuery) {
    if (!user.investorAppParameters.isSSOModeEnabled) {
      localStorage.removeItem('token');
      localStorage.removeItem('sto');
      await client.cache.reset();
    }
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get payload(): User {
    const { token } = this;
    return JSON.parse(atob(token.split('.')[1])) as User;
  }

  need2FA(): boolean {
    const { role } = this.payload;
    return role === JWT_ROLE.twoFA;
  }

  get sto(): number {
    return Number(localStorage.getItem('sto')) || 0;
  }

  set sto(sto: number) {
    localStorage.setItem('sto', String(sto));
  }
}

export default new AuthService();
