import { Arg, Authorized, Ctx, Float, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Stos } from 'entities';
import { Context, JWT_ROLE } from 'core/context';
import { getMercuryParam } from 'services/mercury/defs';
import setMercuryRecipient from 'services/mercury/setMercuryRecipient';
import createACHPayment from 'services/mercury/createACHPayment';
import syncMercuryTransactions from 'services/mercury/syncMercuryTransactions';
import getMercuryRecipient from 'services/mercury/getMercuryRecipient';
import getMercuryAccountInfo from 'services/mercury/getMercuryAccountInfo';
import Email from 'services/email/index';
import { MercuryInfo, MercuryRecipient } from './mercury.types';

@Resolver()
class MercuryResolver {
  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean)
  async setMercuryRecipient(
    @Ctx() { user }: Context,
    @Arg('accountNumber', () => String) accountNumber: string,
    @Arg('routingNumber', () => String) routingNumber: string,
  ): Promise<boolean> {
    const param = await getMercuryParam();
    if (!param.enabled) throw new Error('enableMercuryFirst');
    await setMercuryRecipient(param, user.ID, accountNumber, routingNumber);
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean)
  async createACHPayment(
    @Ctx() { user }: Context,
    @Arg('stoID', () => Int) stoID: number,
    @Arg('amount', () => Float) amount: number,
    @Arg('idempotencyKey', () => String) idempotencyKey: string,
  ): Promise<boolean> {
    const param = await getMercuryParam();
    if (!param.enabled) throw new Error('enableMercuryFirst');
    await createACHPayment(param, user.ID, stoID, amount, idempotencyKey);
    return true;
  }

  @Authorized(JWT_ROLE.api)
  @Mutation(() => Boolean)
  async syncMercuryTransactions(): Promise<boolean> {
    const param = await getMercuryParam();
    if (!param.enabled) throw new Error('enableMercuryFirst');
    await syncMercuryTransactions(param);
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean)
  async sendMercuryInstructionalEmail(
    @Arg('accountNumber', () => String) accountNumber: string,
    @Arg('routingNumber', () => String) routingNumber: string,
    @Arg('note', () => String) note: string,
    @Arg('stoID', () => Int) stoID: number,
    @Ctx() { user }: Context,
  ): Promise<boolean> {
    const sto = await Stos.findOneOrFail(stoID);
    const mail = new Email(sto);
    await mail.mercuryDepositInstructionEmail(user.ID, accountNumber, routingNumber, note);
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => MercuryRecipient, { nullable: true })
  async getMercuryRecipient(@Ctx() { user }: Context): Promise<MercuryRecipient | null> {
    const param = await getMercuryParam();
    if (!param.enabled) throw new Error('enableMercuryFirst');

    return getMercuryRecipient(param, user.ID);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => MercuryInfo, { nullable: true })
  async getMercuryAccountInfo(): Promise<MercuryInfo | null> {
    const param = await getMercuryParam();
    if (!param.enabled) return null;
    return getMercuryAccountInfo(param);
  }
}

export default MercuryResolver;
