import type { FieldOptions, DirectiveArgs } from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { WithTypeName, ImplementationType } from "../CommonTypes";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface ShareTypeFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"ShareType", T, TVariables> {
  on<
    XName extends ImplementationType<"ShareType">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ShareTypeFetcher<
    XName extends "ShareType"
      ? T & X
      : WithTypeName<T, ImplementationType<"ShareType">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"ShareType">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): ShareTypeFetcher<T, TVariables>;

  readonly __typename: ShareTypeFetcher<
    T & { __typename: ImplementationType<"ShareType"> },
    TVariables
  >;

  readonly ID: ShareTypeFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": ShareTypeFetcher<Omit<T, "ID">, TVariables>;

  readonly title: ShareTypeFetcher<T & { readonly title: string }, TVariables>;

  "title+"<
    XAlias extends string = "title",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"title", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": ShareTypeFetcher<Omit<T, "title">, TVariables>;

  readonly stoID: ShareTypeFetcher<T & { readonly stoID: number }, TVariables>;

  "stoID+"<
    XAlias extends string = "stoID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": ShareTypeFetcher<Omit<T, "stoID">, TVariables>;

  readonly totalShares: ShareTypeFetcher<
    T & { readonly totalShares: number },
    TVariables
  >;

  "totalShares+"<
    XAlias extends string = "totalShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"totalShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~totalShares": ShareTypeFetcher<Omit<T, "totalShares">, TVariables>;

  readonly companyShares: ShareTypeFetcher<
    T & { readonly companyShares: number },
    TVariables
  >;

  "companyShares+"<
    XAlias extends string = "companyShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"companyShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~companyShares": ShareTypeFetcher<
    Omit<T, "companyShares">,
    TVariables
  >;

  readonly custodianShares: ShareTypeFetcher<
    T & { readonly custodianShares: number },
    TVariables
  >;

  "custodianShares+"<
    XAlias extends string = "custodianShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"custodianShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~custodianShares": ShareTypeFetcher<
    Omit<T, "custodianShares">,
    TVariables
  >;

  readonly nominalValue: ShareTypeFetcher<
    T & { readonly nominalValue: number },
    TVariables
  >;

  "nominalValue+"<
    XAlias extends string = "nominalValue",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"nominalValue", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~nominalValue": ShareTypeFetcher<
    Omit<T, "nominalValue">,
    TVariables
  >;

  readonly isBlockchain: ShareTypeFetcher<
    T & { readonly isBlockchain: boolean },
    TVariables
  >;

  "isBlockchain+"<
    XAlias extends string = "isBlockchain",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBlockchain", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isBlockchain": ShareTypeFetcher<
    Omit<T, "isBlockchain">,
    TVariables
  >;

  readonly ethereumContractAddress: ShareTypeFetcher<
    T & { readonly ethereumContractAddress?: string },
    TVariables
  >;

  "ethereumContractAddress+"<
    XAlias extends string = "ethereumContractAddress",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ethereumContractAddress", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ShareTypeFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~ethereumContractAddress": ShareTypeFetcher<
    Omit<T, "ethereumContractAddress">,
    TVariables
  >;

  readonly premiumValue: ShareTypeFetcher<
    T & { readonly premiumValue: number },
    TVariables
  >;

  "premiumValue+"<
    XAlias extends string = "premiumValue",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"premiumValue", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~premiumValue": ShareTypeFetcher<
    Omit<T, "premiumValue">,
    TVariables
  >;

  readonly currencyID: ShareTypeFetcher<
    T & { readonly currencyID: number },
    TVariables
  >;

  "currencyID+"<
    XAlias extends string = "currencyID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"currencyID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~currencyID": ShareTypeFetcher<Omit<T, "currencyID">, TVariables>;

  currency<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Currency", X, XVariables>
  ): ShareTypeFetcher<T & { readonly currency: X }, TVariables & XVariables>;

  currency<
    X extends object,
    XVariables extends object,
    XAlias extends string = "currency",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Currency", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"currency", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly ethereumBlockchainPublicAddress: ShareTypeFetcher<
    T & { readonly ethereumBlockchainPublicAddress?: string },
    TVariables
  >;

  "ethereumBlockchainPublicAddress+"<
    XAlias extends string = "ethereumBlockchainPublicAddress",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ethereumBlockchainPublicAddress", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ShareTypeFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~ethereumBlockchainPublicAddress": ShareTypeFetcher<
    Omit<T, "ethereumBlockchainPublicAddress">,
    TVariables
  >;

  readonly minimumSharesToBuyByInvestor: ShareTypeFetcher<
    T & { readonly minimumSharesToBuyByInvestor: number },
    TVariables
  >;

  "minimumSharesToBuyByInvestor+"<
    XAlias extends string = "minimumSharesToBuyByInvestor",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"minimumSharesToBuyByInvestor", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~minimumSharesToBuyByInvestor": ShareTypeFetcher<
    Omit<T, "minimumSharesToBuyByInvestor">,
    TVariables
  >;

  readonly blockchainProtocol: ShareTypeFetcher<
    T & { readonly blockchainProtocol: number },
    TVariables
  >;

  "blockchainProtocol+"<
    XAlias extends string = "blockchainProtocol",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"blockchainProtocol", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~blockchainProtocol": ShareTypeFetcher<
    Omit<T, "blockchainProtocol">,
    TVariables
  >;

  readonly reduceSharesForPurchase: ShareTypeFetcher<
    T & { readonly reduceSharesForPurchase: number },
    TVariables
  >;

  "reduceSharesForPurchase+"<
    XAlias extends string = "reduceSharesForPurchase",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"reduceSharesForPurchase", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~reduceSharesForPurchase": ShareTypeFetcher<
    Omit<T, "reduceSharesForPurchase">,
    TVariables
  >;

  readonly walletCustodyType: ShareTypeFetcher<
    T & { readonly walletCustodyType: number },
    TVariables
  >;

  "walletCustodyType+"<
    XAlias extends string = "walletCustodyType",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"walletCustodyType", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~walletCustodyType": ShareTypeFetcher<
    Omit<T, "walletCustodyType">,
    TVariables
  >;

  readonly sellToCompany: ShareTypeFetcher<
    T & { readonly sellToCompany: boolean },
    TVariables
  >;

  "sellToCompany+"<
    XAlias extends string = "sellToCompany",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sellToCompany", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~sellToCompany": ShareTypeFetcher<
    Omit<T, "sellToCompany">,
    TVariables
  >;

  readonly sellValue: ShareTypeFetcher<
    T & { readonly sellValue: number },
    TVariables
  >;

  "sellValue+"<
    XAlias extends string = "sellValue",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sellValue", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~sellValue": ShareTypeFetcher<Omit<T, "sellValue">, TVariables>;

  readonly isShareNosApplicable: ShareTypeFetcher<
    T & { readonly isShareNosApplicable: boolean },
    TVariables
  >;

  "isShareNosApplicable+"<
    XAlias extends string = "isShareNosApplicable",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isShareNosApplicable", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isShareNosApplicable": ShareTypeFetcher<
    Omit<T, "isShareNosApplicable">,
    TVariables
  >;

  readonly isCertificateNosApplicable: ShareTypeFetcher<
    T & { readonly isCertificateNosApplicable: boolean },
    TVariables
  >;

  "isCertificateNosApplicable+"<
    XAlias extends string = "isCertificateNosApplicable",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isCertificateNosApplicable", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isCertificateNosApplicable": ShareTypeFetcher<
    Omit<T, "isCertificateNosApplicable">,
    TVariables
  >;

  readonly channelIDForAutoPayments: ShareTypeFetcher<
    T & { readonly channelIDForAutoPayments?: number },
    TVariables
  >;

  "channelIDForAutoPayments+"<
    XAlias extends string = "channelIDForAutoPayments",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"channelIDForAutoPayments", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ShareTypeFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~channelIDForAutoPayments": ShareTypeFetcher<
    Omit<T, "channelIDForAutoPayments">,
    TVariables
  >;

  readonly availableShare: ShareTypeFetcher<
    T & { readonly availableShare: number },
    TVariables
  >;

  "availableShare+"<
    XAlias extends string = "availableShare",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"availableShare", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~availableShare": ShareTypeFetcher<
    Omit<T, "availableShare">,
    TVariables
  >;

  readonly totalPrice: ShareTypeFetcher<
    T & { readonly totalPrice: number },
    TVariables
  >;

  "totalPrice+"<
    XAlias extends string = "totalPrice",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"totalPrice", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~totalPrice": ShareTypeFetcher<Omit<T, "totalPrice">, TVariables>;

  readonly blockchaindecimals: ShareTypeFetcher<
    T & { readonly blockchaindecimals: number },
    TVariables
  >;

  "blockchaindecimals+"<
    XAlias extends string = "blockchaindecimals",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"blockchaindecimals", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~blockchaindecimals": ShareTypeFetcher<
    Omit<T, "blockchaindecimals">,
    TVariables
  >;
}

export const shareType$: ShareTypeFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "ShareType",
    "EMBEDDED",
    [],
    [
      "ID",
      "title",
      "stoID",
      "totalShares",
      "companyShares",
      "custodianShares",
      "nominalValue",
      "isBlockchain",
      {
        category: "SCALAR",
        name: "ethereumContractAddress",
        undefinable: true,
      },
      "premiumValue",
      "currencyID",
      {
        category: "SCALAR",
        name: "currency",
        targetTypeName: "Currency",
      },
      {
        category: "SCALAR",
        name: "ethereumBlockchainPublicAddress",
        undefinable: true,
      },
      "minimumSharesToBuyByInvestor",
      "blockchainProtocol",
      "reduceSharesForPurchase",
      "walletCustodyType",
      "sellToCompany",
      "sellValue",
      "isShareNosApplicable",
      "isCertificateNosApplicable",
      {
        category: "SCALAR",
        name: "channelIDForAutoPayments",
        undefinable: true,
      },
      "availableShare",
      "totalPrice",
      "blockchaindecimals",
    ]
  ),
  undefined
);

export const shareType$$ =
  shareType$.ID.title.stoID.totalShares.companyShares.custodianShares
    .nominalValue.isBlockchain.ethereumContractAddress.premiumValue.currencyID
    .ethereumBlockchainPublicAddress.minimumSharesToBuyByInvestor
    .blockchainProtocol.reduceSharesForPurchase.walletCustodyType.sellToCompany
    .sellValue.isShareNosApplicable.isCertificateNosApplicable
    .channelIDForAutoPayments.availableShare.totalPrice.blockchaindecimals;
