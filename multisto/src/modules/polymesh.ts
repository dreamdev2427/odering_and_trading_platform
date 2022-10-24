/* eslint-disable no-console */
import { BigNumber, Polymesh } from "@polymeshassociation/polymesh-sdk";
import { LocalSigningManager } from "@polymeshassociation/local-signing-manager";
import { Asset } from "@polymeshassociation/polymesh-sdk/api/entities/Asset";
import {
  KnownAssetType,
  TransactionQueue,
  ClaimType,
  ConditionTarget,
  ConditionType,
  ScopeType,
  Venue,
  VenueType,
  PortfolioBalance,
  NumberedPortfolio,
  // TrustedClaimIssuer,
} from "@polymeshassociation/polymesh-sdk/types";
import { Compliance } from "@polymeshassociation/polymesh-sdk/api/entities/Asset/Compliance";
import { Requirements } from "@polymeshassociation/polymesh-sdk/api/entities/Asset/Compliance/Requirements";
// import { bignumber } from "mathjs";

// import { AuthorizationRequest, ClaimType, ConditionTarget, ConditionType, CountryCode, Identity, KnownAssetType, ModuleName, PermissionType, ScopeType, TransactionQueue } from '@polymathnetwork/polymesh-sdk/types';
// import { Compliance } from '@polymathnetwork/polymesh-sdk/api/entities/Asset/Compliance';
// import { Requirements } from '@polymathnetwork/polymesh-sdk/api/entities/Asset/Compliance/Requirements';
// import { SecurityToken } from '@polymathnetwork/polymesh-sdk/polkadot';

async function setGlobalPolymeshConnection(mnemonic?: string) {
  const globalObj = global as any;

  if (
    globalObj.config.polymeshGlobalConnectionCount === null ||
    globalObj.config.polymeshGlobalConnectionCount === undefined
  )
    globalObj.config.polymeshGlobalConnectionCount = 0;

  if (globalObj.config.polymeshGlobalConnectionCount === 0) {
    const localSigningManager = await LocalSigningManager.create({
      accounts: [{ mnemonic: mnemonic || "//Alice" }],
    });

    const api: Polymesh = await Polymesh.connect({
      nodeUrl: "wss://testnet-rpc.polymesh.live",
      middleware: {
        link: "testnet-graphql.polymesh.live",
        key: "nBdcFXMFXLawqrh4STJG69IlVCp1Psve4qq0wfpe",
      },
      signingManager: localSigningManager,
    });

    globalObj.config.polymeshGlobalConnection = api;
    globalObj.config.polymeshGlobalConnectionCount = 1;
  } else globalObj.config.polymeshGlobalConnectionCount += 1;
}

async function closeGlobalPolymeshConnection(mnemonic?: string) {
  const globalObj = global as any;

  if (mnemonic !== "") {
    if (globalObj.config.polymeshGlobalConnectionCount == null)
      globalObj.config.polymeshGlobalConnectionCount = 0;
    else if (globalObj.config.polymeshGlobalConnectionCount > 0) {
      globalObj.config.polymeshGlobalConnectionCount -= 1;
      if (globalObj.config.polymeshGlobalConnectionCount <= 0) {
        await globalObj.config.polymeshGlobalConnection.disconnect();
      }
    }
  }
}

async function getConnection(mnemonic?: string): Promise<Polymesh> {
  const globalObj = global as any;

  await setGlobalPolymeshConnection(mnemonic);
  return globalObj.config.polymeshGlobalConnection;
}

async function registerTicker(
  tickerStr: string,
  amount: Number,
  tokenDivisibleEnabled: Number,
  TokenAssetType: string,
  mnemonic?: string
) {
  const api: Polymesh = await getConnection(mnemonic);

  const reservationQ = await api.assets.reserveTicker({
    ticker: tickerStr.toUpperCase(),
  });
  const reservation = await reservationQ.run();

  let tmpIsDivisible = false;
  if (tokenDivisibleEnabled > 0) tmpIsDivisible = true;

  let assetTypeTemp = KnownAssetType.Commodity;
  if (TokenAssetType === "Derivative")
    assetTypeTemp = KnownAssetType.Derivative;

  if (TokenAssetType === "EquityCommon")
    assetTypeTemp = KnownAssetType.EquityCommon;

  if (TokenAssetType === "EquityPreferred")
    assetTypeTemp = KnownAssetType.EquityPreferred;

  if (TokenAssetType === "FixedIncome")
    assetTypeTemp = KnownAssetType.FixedIncome;

  if (TokenAssetType === "Fund") assetTypeTemp = KnownAssetType.Fund;

  if (TokenAssetType === "Reit") assetTypeTemp = KnownAssetType.Reit;

  if (TokenAssetType === "RevenueShareAgreement")
    assetTypeTemp = KnownAssetType.RevenueShareAgreement;

  if (TokenAssetType === "StableCoin")
    assetTypeTemp = KnownAssetType.StableCoin;

  if (TokenAssetType === "StructuredProduct")
    assetTypeTemp = KnownAssetType.StructuredProduct;

  const creationQ = await reservation.createAsset({
    name: tickerStr.toUpperCase(),
    isDivisible: tmpIsDivisible,
    assetType: assetTypeTemp,
    initialSupply: new BigNumber(amount.toString()),
    requireInvestorUniqueness: false,
  });

  await creationQ.run();
  const identity = (await api.getSigningIdentity())!;
  const addTemp = identity.did;

  const venueQ = await api.settlements.createVenue({
    description: `${tickerStr.toUpperCase()}DistributionVenue`,
    type: VenueType.Distribution,
  });
  const venue = await venueQ.run();
  await closeGlobalPolymeshConnection(mnemonic);

  return { did: addTemp, venueID: venue.id.toNumber() };
}

async function getTotalSupplyOfTokens(tickerStr: string, mnemonic?: string) {
  const api: Polymesh = await getConnection(mnemonic);
  const asset: Asset = await api.assets.getAsset({ ticker: tickerStr });
  const tmp = await asset.details();
  await closeGlobalPolymeshConnection(mnemonic);

  return tmp.totalSupply.toNumber();
}

async function isTokenDivisible(tickerStr: string, mnemonic?: string) {
  const api: Polymesh = await getConnection(mnemonic);

  const asset: Asset = await api.assets.getAsset({ ticker: tickerStr });

  const tmp = await asset.details();

  await closeGlobalPolymeshConnection(mnemonic);

  if (tmp.isDivisible === false) return 0;
  return 1;
}

async function getAccountBalance(
  tickerStr: string,
  accAddress: string,
  mnemonic?: string
) {
  const api: Polymesh = await getConnection(mnemonic);

  const idds = await api.identities.getIdentity({ did: accAddress });

  const balance = await idds.getAssetBalance({ ticker: tickerStr });

  await closeGlobalPolymeshConnection(mnemonic);

  console.log(balance.toNumber());
  return balance.toNumber();
}

async function createPolymeshTokens(
  operation: Number,
  tickerStr: string,
  amount: Number,
  mnemonic: string
) {
  const api: Polymesh = await getConnection(mnemonic);

  const asset: Asset = await api.assets.getAsset({ ticker: tickerStr });

  if (operation === 1) {
    const record = await asset.issuance.issue({
      amount: new BigNumber(amount.toString()),
    });
    await record.run();
  } else if (operation === 2) {
    const record = await asset.redeem({
      amount: new BigNumber(amount.toString()),
    });
    await record.run();
  }

  await closeGlobalPolymeshConnection(mnemonic);
}

async function isPolymeshAccountWhitelisted(
  mnemonic: string,
  tickerString: string,
  address: string
) {
  const api: Polymesh = await getConnection(mnemonic);

  const asset: Asset = await api.assets.getAsset({ ticker: tickerString });

  const data = await asset.settlements.canTransfer({
    to: address,
    amount: new BigNumber("1".toString()),
  });

  await closeGlobalPolymeshConnection(mnemonic);
  return data.result;
}

async function whitelistInvestorCDDAddress(
  claims: any,
  authorize: string,
  mnemonic?: string
) {
  const api: Polymesh = await getConnection(mnemonic);
  try {
    if (authorize === "true") {
      const claimQueue: TransactionQueue<void> = await api.claims.addClaims(
        claims
      );
      await claimQueue.run();
    } else {
      const claimQueue: TransactionQueue<void> = await api.claims.revokeClaims(
        claims
      );
      await claimQueue.run();
    }

    await closeGlobalPolymeshConnection(mnemonic);
  } catch (e: any) {
    // await api.disconnect();
  }
}

async function setTokenRestrictions(data: any, mnemonic?: string) {
  const restrictions = [];

  const api: Polymesh = await getConnection(mnemonic);

  const token: Asset = await api.assets.getAsset({ ticker: data.AssetTag });

  const compliance: Compliance = token.compliance;
  const requirements: Requirements = compliance.requirements;
  const userIdentity = (await api.getSigningIdentity())!;

  if (data.Accredited === 1) {
    restrictions.push({
      target: ConditionTarget.Receiver,
      type: ConditionType.IsPresent,
      claim: {
        type: ClaimType.Accredited,
        scope: {
          type: ScopeType.Ticker,
          value: token.ticker,
        },
      },
      trustedClaimIssuers: [
        {
          identity: userIdentity.did,
          trustedFor: [ClaimType.Accredited],
        },
      ],
    });
  }

  if (data.Affiliate === 1) {
    restrictions.push({
      target: ConditionTarget.Receiver,
      type: ConditionType.IsPresent,
      claim: {
        type: ClaimType.Affiliate,
        scope: {
          type: ScopeType.Ticker,
          value: token.ticker,
        },
      },
      trustedClaimIssuers: [
        {
          identity: userIdentity.did,
          trustedFor: [ClaimType.Affiliate],
        },
      ],
    });
  }

  if (data.BuyLockup === 1) {
    restrictions.push({
      target: ConditionTarget.Receiver,
      type: ConditionType.IsPresent,
      claim: {
        type: ClaimType.BuyLockup,
        scope: {
          type: ScopeType.Ticker,
          value: token.ticker,
        },
      },
      trustedClaimIssuers: [
        {
          identity: userIdentity.did,
          trustedFor: [ClaimType.BuyLockup],
        },
      ],
    });
  }

  if (data.SellLockup === 1) {
    restrictions.push({
      target: ConditionTarget.Receiver,
      type: ConditionType.IsPresent,
      claim: {
        type: ClaimType.SellLockup,
        scope: {
          type: ScopeType.Ticker,
          value: token.ticker,
        },
      },
      trustedClaimIssuers: [
        {
          identity: userIdentity.did,
          trustedFor: [ClaimType.SellLockup],
        },
      ],
    });
  }

  if (data.KnowYourCustomer === 1) {
    restrictions.push({
      target: ConditionTarget.Receiver,
      type: ConditionType.IsPresent,
      claim: {
        type: ClaimType.KnowYourCustomer,
        scope: {
          type: ScopeType.Ticker,
          value: token.ticker,
        },
      },
      trustedClaimIssuers: [
        {
          identity: userIdentity.did,
          trustedFor: [ClaimType.KnowYourCustomer],
        },
      ],
    });
  }

  if (data.Jurisdiction === 1) {
    // data.JurisdictionPlace;
    restrictions.push({
      target: ConditionTarget.Receiver,
      type: ConditionType.IsPresent,
      claim: {
        type: ClaimType.Jurisdiction,
        // "code": CountryCode.Pk,
        code: data.JurisdictionPlace,
        scope: {
          type: ScopeType.Ticker,
          value: token.ticker,
        },
      },
      trustedClaimIssuers: [
        {
          identity: userIdentity.did,
          trustedFor: [ClaimType.Jurisdiction],
        },
      ],
    });
  }

  if (data.Exempted === 1) {
    restrictions.push({
      target: ConditionTarget.Receiver,
      type: ConditionType.IsPresent,
      claim: {
        type: ClaimType.Exempted,
        scope: {
          type: ScopeType.Ticker,
          value: token.ticker,
        },
      },
      trustedClaimIssuers: [
        {
          identity: userIdentity.did,
          trustedFor: [ClaimType.Exempted],
        },
      ],
    });
  }

  if (data.Blocked === 1) {
    restrictions.push({
      target: ConditionTarget.Receiver,
      type: ConditionType.IsPresent,
      claim: {
        type: ClaimType.Blocked,
        scope: {
          type: ScopeType.Ticker,
          value: token.ticker,
        },
      },
      trustedClaimIssuers: [
        {
          identity: userIdentity.did,
          trustedFor: [ClaimType.Blocked],
        },
      ],
    });
  }

  const cc = JSON.parse(`[${JSON.stringify(restrictions)}]`);
  try {
    const que = await requirements.set({
      requirements: cc,
    });
    await que.run();
  } catch (e: any) {
    // console.log( e.message );
  }

  await closeGlobalPolymeshConnection(mnemonic);
}

async function setAtestationProvider(data: any, mnemonic?: string) {
  const restrictions = [];

  const api: Polymesh = await getConnection(mnemonic);

  const asset: Asset = await api.assets.getAsset({ ticker: data.AssetTag });

  if (data.Accredited === 1) {
    restrictions.push(ClaimType.Accredited);
  }

  if (data.Affiliate === 1) {
    restrictions.push(ClaimType.Affiliate);
  }

  if (data.BuyLockup === 1) {
    restrictions.push(ClaimType.BuyLockup);
  }

  if (data.SellLockup === 1) {
    restrictions.push(ClaimType.SellLockup);
  }

  if (data.KnowYourCustomer === 1) {
    restrictions.push(ClaimType.KnowYourCustomer);
  }

  if (data.Jurisdiction === 1) {
    restrictions.push(ClaimType.Jurisdiction);
  }

  if (data.Exempted === 1) {
    restrictions.push(ClaimType.Exempted);
  }

  if (data.Blocked === 1) {
    restrictions.push(ClaimType.Blocked);
  }

  const t1 = {
    claimIssuers: [
      {
        identity: data.did,
        trustedFor: restrictions,
      },
    ],
  };

  const addClaimIssuerQueue = await asset.compliance.trustedClaimIssuers.add(
    t1
  );
  await addClaimIssuerQueue.run();
  await closeGlobalPolymeshConnection(mnemonic);
}

async function deleteAtestationProvider(
  did: string,
  ticker: string,
  mnemonic?: string
) {
  console.log(`${did} ${ticker} ${mnemonic}`);
  const api: Polymesh = await getConnection(mnemonic);

  const asset: Asset = await api.assets.getAsset({ ticker });

  const addClaimIssuerQueue = await asset.compliance.trustedClaimIssuers.remove(
    { claimIssuers: [did] }
  );

  try {
    await addClaimIssuerQueue.run();
  } catch (e: any) {
    console.log(e.toString());
  }

  await closeGlobalPolymeshConnection(mnemonic);
}

async function tansferTokensToAccountPolymesh(
  address: string,
  amount: Number,
  mnemonic: string,
  assetTicker: string,
  distributionVenueID: Number
) {
  const api: Polymesh = await getConnection(mnemonic);

  const identity = (await api.getSigningIdentity())!;

  // 468 Venue id
  const venue: Venue = await api.settlements.getVenue({
    id: new BigNumber(distributionVenueID.toString()),
  });

  // admin venue 468
  // investor's venur  503

  const instructionQ = await venue.addInstruction({
    legs: [
      {
        from: identity.did, // passing the Identity (or did) means the default portfolio will be used
        to: address, // or you can pass a Portfolio
        amount: new BigNumber(amount.toString()),
        asset: assetTicker,
      },
    ],
    // endBlock: new BigNumber(10000000),
    tradeDate: new Date("12/25/2023"),
  });

  const instruction = await instructionQ.run();

  await closeGlobalPolymeshConnection(mnemonic);

  return new BigNumber(instruction.id).toString();
}

async function getPolymeshPortfolioBalances(
  portfolioID: number,
  mnemonic: string,
  assetTicker: string
) {
  const api: Polymesh = await getConnection(mnemonic);
  const identity = (await api.getSigningIdentity())!;
  const defaultPortfolio = await identity?.portfolios.getPortfolio();

  const portfolioBalances: { ticker: string; balance: Number }[] = [];
  let defaultBalance = 0;

  const bb = await defaultPortfolio?.getAssetBalances({
    assets: [assetTicker],
  });
  bb?.forEach((obj: PortfolioBalance) => {
    defaultBalance = obj.total.toNumber();
  });

  const coldStore = await identity?.portfolios.getPortfolio({
    portfolioId: new BigNumber(new BigNumber(portfolioID)),
  });

  const bal = await coldStore?.getAssetBalances();
  bal?.forEach((obj: PortfolioBalance) => {
    portfolioBalances.push({
      ticker: obj.asset.ticker,
      balance: obj.total.toNumber(),
    });
  });

  return {
    defaultBalance,
    portfolioBalances,
  };
}

async function createPolymeshPortfolio(
  portfolioName: string,
  mnemonic: string
) {
  const api: Polymesh = await getConnection(mnemonic);

  const coldPortfolio: TransactionQueue<NumberedPortfolio> =
    await api.identities.createPortfolio({
      name: portfolioName,
    });

  const coldFolio: NumberedPortfolio = await coldPortfolio.run();

  await api.disconnect();

  console.log(coldFolio.id.toString());
  return coldFolio.id.toString();
}

async function transferTokenToPolymeshPortfolio(
  portfolioID: number,
  mnemonic: string,
  assetTag: string,
  amount: string
) {
  const api: Polymesh = await getConnection(mnemonic);

  const idds = await api.getSigningIdentity();

  const coldStore = await idds?.portfolios.getPortfolio({
    portfolioId: new BigNumber(portfolioID),
  });

  const defaultPortfolio = await idds?.portfolios.getPortfolio();

  const moveQueue = await defaultPortfolio?.moveFunds({
    items: [
      {
        asset: assetTag,
        amount: new BigNumber(amount),
      },
    ],
    to: coldStore,
  });
  await moveQueue?.run();

  await api.disconnect();
}

export {
  registerTicker,
  getTotalSupplyOfTokens,
  getAccountBalance,
  isTokenDivisible,
  createPolymeshTokens,
  setGlobalPolymeshConnection,
  closeGlobalPolymeshConnection,
  whitelistInvestorCDDAddress,
  setTokenRestrictions,
  setAtestationProvider,
  deleteAtestationProvider,
  isPolymeshAccountWhitelisted,
  tansferTokensToAccountPolymesh,
  getPolymeshPortfolioBalances,
  createPolymeshPortfolio,
  transferTokenToPolymeshPortfolio,
};
