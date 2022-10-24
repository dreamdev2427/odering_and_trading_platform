import { Context, JWT_ROLE } from 'core/context';
import { Arg, Authorized, Ctx, Float, Int, Mutation, Query, Resolver } from 'type-graphql';
import moonpay from 'services/moonpay/moonpay.service';
import { InvestorBuyPropertyAlert, Log } from 'entities';
import { LOG_ACTION } from 'entities/logs';
import { GraphQLJSON } from 'graphql-scalars';
import { ValidationError } from 'apollo-server-core';
import { MoonpayTransaction, REMOTE_STATUS } from '../moonpay.types';
import { loadConfig, loadConfigOrFail, setConfig } from '../moonpay.config';
import { MoonpayConfigGql, MoonpayTransactionJSON } from './moonpay.types';

@Resolver()
class MoonpayResolvers {
  @Authorized(JWT_ROLE.investor, JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Query(() => String, {
    description:
      'Get URL for Moonpay widget with configuration. Optionally match to buy alert immediately. (Reserves a transaction)',
  })
  async moonpayWidgetUrl(
    @Ctx() { user }: Context,
    @Arg('shareTypeID', () => Int) shareTypeID: number,
    @Arg('shares', () => Float) shares: number,
    @Arg('alertID', () => Int, { nullable: true }) alertID?: number,
  ): Promise<string> {
    try {
      return await moonpay.getPurchaseUrl(user.ID, shareTypeID, shares, {
        matchBuyAlertID: alertID,
      });
    } catch (e) {
      console.error(`MoonPay widget url error:\n${(e as Error).stack}`);
      throw new Error(`Internal server error`);
    }
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Query(() => String, {
    description:
      'Get URL for Moonpay widget with configuration, as admin or API. Optionally match to buy alert immediately. (Reserves a transaction)',
  })
  async moonpayWidgetUrlAdmin(
    @Arg('shareTypeID', () => Int) shareTypeID: number,
    @Arg('shares', () => Float) shares: number,
    @Arg('investorID', () => Int) investorID: number,
    @Arg('alertID', () => Int, { nullable: true }) alertID: number,
  ): Promise<string> {
    return moonpay.getPurchaseUrl(investorID, shareTypeID, shares, { matchBuyAlertID: alertID });
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [GraphQLJSON], {
    nullable: true,
    description:
      'Get all accessible transactions, re-fetch them from MoonPay. Limit for refreshed data is top 50 newest transactions.',
  })
  async moonpayAllTransactionsJSON(
    @Ctx() { user }: Context,
  ): Promise<Partial<MoonpayTransaction>[]> {
    return this.moonpayAllTransactionsJSONAdmin(user.ID);
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Query(() => [GraphQLJSON], {
    nullable: true,
    description:
      'Get all accessible transactions as admin or API, re-fetch them from MoonPay. Limit for refreshed data is top 50 newest transactions.',
  })
  async moonpayAllTransactionsJSONAdmin(
    @Arg('investorID', () => Int) investorID: number,
  ): Promise<Partial<MoonpayTransaction>[]> {
    const records = await moonpay.getAllTransactionsMetadata(true, { investorID });
    return records.filter((r) => r.object !== undefined).map((r) => r.object as MoonpayTransaction);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => MoonpayTransactionJSON, {
    nullable: true,
    description:
      'Get last transaction for investor (where he has interacted with Moonpay, so not just an empty reserved transaction), re-fetch from MoonPay.',
  })
  async moonpayLastTransactionJSON(@Ctx() { user }: Context): Promise<MoonpayTransactionJSON> {
    return this.moonpayLastTransactionJSONAdmin(user.ID);
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Query(() => MoonpayTransactionJSON, {
    nullable: true,
    description:
      'NB: If you want to match a buy alert, use another endpoint. Get last transaction for investor as admin or API (where he has interacted with Moonpay, so not just an empty reserved transaction), re-fetch from MoonPay.',
  })
  async moonpayLastTransactionJSONAdmin(
    @Arg('investorID', () => Int) investorID: number,
    @Arg('limit', () => Int, {
      nullable: true,
      description: `Set this if you want to get more than one transaction. There may be a hard limit on MoonPay's end`,
    })
    limit: number = 1,
  ): Promise<MoonpayTransactionJSON> {
    const all = await moonpay.getAllTransactionsMetadata(true, {
      investorID,
      limit,
    });
    return all.map(
      (record): MoonpayTransactionJSON => ({
        localData: record,
        transactionJSON: record.object,
      }),
    )[0];
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => String, {
    nullable: true,
    description: 'Get transaction receipt for buy alert, as investor.',
  })
  async moonpayBuyAlertTransactionReceiptUrl(
    @Arg('alertID', () => Int) alertID: number,
  ): Promise<string | undefined> {
    const transaction = await moonpay.matchAlertID(alertID);
    return transaction?.object && (await moonpay.getTransactionReceiptUrl(transaction?.object));
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => MoonpayTransactionJSON, {
    nullable: true,
    description:
      'Get transaction for buy alert as investor (who has interacted with Moonpay, so not just an empty reserved transaction), re-fetch from MoonPay.',
  })
  async moonpayBuyAlertTransactionJSON(
    @Ctx() { user }: Context,
    @Arg('alertID', () => Int) alertID: number,
  ): Promise<MoonpayTransactionJSON | undefined> {
    let alert;
    try {
      alert = await InvestorBuyPropertyAlert.findOneOrFail({
        where: {
          ID: alertID,
          investorID: user.ID,
        },
      });
      const localData = await moonpay.getAlertTransactionMetadata(alertID, true);
      return (
        localData && {
          localData,
          transactionJSON: localData?.object,
        }
      );
    } catch (e) {
      if (!alert)
        throw new ValidationError(`Alert ID ${alertID} not found for investor ID ${user.ID}`);
      console.error(`MoonPay get transaction JSON resolver error:\n${(e as Error).stack}`);
      throw new Error(`Internal server error`);
    }
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Query(() => MoonpayTransactionJSON, {
    nullable: true,
    description:
      'Get transaction for buy alert as admin or API (where investor has interacted with Moonpay, so not just an empty reserved transaction), re-fetch from MoonPay.',
  })
  async moonpayBuyAlertTransactionJSONAdmin(
    @Arg('alertID', () => Int) alertID: number,
  ): Promise<MoonpayTransactionJSON | undefined> {
    const localData = await moonpay.getAlertTransactionMetadata(alertID, true);
    return (
      localData && {
        localData,
        transactionJSON: localData?.object,
      }
    );
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Query(() => MoonpayTransactionJSON, {
    nullable: true,
    description:
      'Get transaction by its local ID (externalTransactionId on MoonPay) if accessible, re-fetch from MoonPay.',
  })
  async moonpayGetTransactionJSONAdmin(
    @Arg('investorID', () => Int) investorID: number,
    @Arg('transactionID', () => Int) transactionID: number,
  ): Promise<MoonpayTransactionJSON | undefined> {
    const all = await moonpay.getAllTransactionsMetadata(true, {
      investorID: investorID,
      transactionID,
    });
    return all.map(
      (record): MoonpayTransactionJSON => ({
        localData: record,
        transactionJSON: record.object,
      }),
    )[0];
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => MoonpayTransactionJSON, {
    nullable: true,
    description:
      'Get transaction by its local ID (externalTransactionId) if accessible, re-fetch from MoonPay.',
  })
  async moonpayGetTransactionJSON(
    @Ctx() { user }: Context,
    @Arg('transactionID', () => Int) transactionID: number,
  ): Promise<MoonpayTransactionJSON | undefined> {
    return this.moonpayGetTransactionJSONAdmin(user.ID, transactionID);
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.investor, JWT_ROLE.api)
  @Mutation(() => Boolean, {
    description:
      'Registers a payment sent from MoonPay, after the investor has initiated it. Both admin and investor role possible.',
  })
  async moonpayAddTransactionDefault(
    @Arg('moonpayID', () => String, {
      description:
        '`transactionID` is a programmatic value, as received at your `redirectURL` webhook',
    })
    moonpayID: string,
    @Arg('status', () => String, {
      description:
        '`transactionStatus` is a programmatic value, as received at your `redirectURL` webhook',
    })
    status: REMOTE_STATUS,
  ): Promise<boolean> {
    const statuses = Object.keys(REMOTE_STATUS);
    if (!statuses.includes(status))
      throw new ValidationError(
        `Unexpected value for 'status': ${status}. Value must be as MoonPay provied it! Possible values: [${statuses.join()}]`,
      );
    await moonpay.receiveTransactionRemotely(moonpayID, status);
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Query(() => MoonpayConfigGql, {
    description:
      'Get the platform configuration for Moonpay. Warning: Contains sensitive information.',
  })
  async moonpayConfig(@Ctx() { user }: Context): Promise<MoonpayConfigGql> {
    const cfg = await loadConfigOrFail();
    await Log.createLog({
      activityType: LOG_ACTION.PlatformAdminApiAction,
      description: 'Access to Moonpay config and SECRET KEYS',
      userID: user.ID,
    });
    return cfg;
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Mutation(() => String, {
    description:
      'Modify the platform configuration for Moonpay. Returns a status message on success.',
  })
  async moonpayConfigUpdate(
    @Ctx() { user }: Context,
    @Arg('config', () => MoonpayConfigGql) config: MoonpayConfigGql,
  ): Promise<string> {
    await Log.createLog({
      activityType: LOG_ACTION.PlatformAdminApiAction,
      description: 'Modify Moonpay config and SECRET KEYS',
      userID: user.ID,
    });
    // config.defaultCurrency = 'usdc'; // ENFORCE (BUSINESS REQUIREMENT)
    const previousCfg = await loadConfig();
    const previousCurrency = previousCfg?.defaultCurrency;

    const currencyID = await moonpay.ensureCurrency(
      config.defaultCurrency ?? previousCurrency ?? 'usdc',
    );
    config.defaultCurrencyID = currencyID;

    const status = await setConfig(config);
    return `Moonpay config successful operation: "${status}"`;
  }
}

export default MoonpayResolvers;
