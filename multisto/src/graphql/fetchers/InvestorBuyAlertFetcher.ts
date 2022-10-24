import type { FieldOptions, DirectiveArgs } from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { WithTypeName, ImplementationType } from "../CommonTypes";
import type { BuyAlertStatus } from "../enums";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface InvestorBuyAlertFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"InvestorBuyAlert", T, TVariables> {
  on<
    XName extends ImplementationType<"InvestorBuyAlert">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InvestorBuyAlertFetcher<
    XName extends "InvestorBuyAlert"
      ? T & X
      : WithTypeName<T, ImplementationType<"InvestorBuyAlert">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"InvestorBuyAlert">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): InvestorBuyAlertFetcher<T, TVariables>;

  readonly __typename: InvestorBuyAlertFetcher<
    T & { __typename: ImplementationType<"InvestorBuyAlert"> },
    TVariables
  >;

  readonly ID: InvestorBuyAlertFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBuyAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": InvestorBuyAlertFetcher<Omit<T, "ID">, TVariables>;

  readonly stoID: InvestorBuyAlertFetcher<
    T & { readonly stoID: number },
    TVariables
  >;

  "stoID+"<
    XAlias extends string = "stoID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBuyAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": InvestorBuyAlertFetcher<Omit<T, "stoID">, TVariables>;

  readonly entityID: InvestorBuyAlertFetcher<
    T & { readonly entityID?: number },
    TVariables
  >;

  "entityID+"<
    XAlias extends string = "entityID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"entityID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorBuyAlertFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~entityID": InvestorBuyAlertFetcher<
    Omit<T, "entityID">,
    TVariables
  >;

  readonly shares: InvestorBuyAlertFetcher<
    T & { readonly shares: number },
    TVariables
  >;

  "shares+"<
    XAlias extends string = "shares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"shares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBuyAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~shares": InvestorBuyAlertFetcher<Omit<T, "shares">, TVariables>;

  readonly shareTypeID: InvestorBuyAlertFetcher<
    T & { readonly shareTypeID: number },
    TVariables
  >;

  "shareTypeID+"<
    XAlias extends string = "shareTypeID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"shareTypeID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBuyAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~shareTypeID": InvestorBuyAlertFetcher<
    Omit<T, "shareTypeID">,
    TVariables
  >;

  shareType<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ShareType", X, XVariables>
  ): InvestorBuyAlertFetcher<
    T & { readonly shareType: X },
    TVariables & XVariables
  >;

  shareType<
    X extends object,
    XVariables extends object,
    XAlias extends string = "shareType",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ShareType", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"shareType", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBuyAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly status: InvestorBuyAlertFetcher<
    T & { readonly status: BuyAlertStatus },
    TVariables
  >;

  "status+"<
    XAlias extends string = "status",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"status", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBuyAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: BuyAlertStatus }
        : { readonly [key in XAlias]: BuyAlertStatus }),
    TVariables & XDirectiveVariables
  >;

  readonly "~status": InvestorBuyAlertFetcher<Omit<T, "status">, TVariables>;

  readonly date: InvestorBuyAlertFetcher<
    T & { readonly date: string },
    TVariables
  >;

  "date+"<
    XAlias extends string = "date",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"date", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBuyAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~date": InvestorBuyAlertFetcher<Omit<T, "date">, TVariables>;

  readonly isBuySharesSigned: InvestorBuyAlertFetcher<
    T & { readonly isBuySharesSigned: number },
    TVariables
  >;

  "isBuySharesSigned+"<
    XAlias extends string = "isBuySharesSigned",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBuySharesSigned", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBuyAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isBuySharesSigned": InvestorBuyAlertFetcher<
    Omit<T, "isBuySharesSigned">,
    TVariables
  >;

  readonly purchasePriceOffered: InvestorBuyAlertFetcher<
    T & { readonly purchasePriceOffered?: number },
    TVariables
  >;

  "purchasePriceOffered+"<
    XAlias extends string = "purchasePriceOffered",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"purchasePriceOffered", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorBuyAlertFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~purchasePriceOffered": InvestorBuyAlertFetcher<
    Omit<T, "purchasePriceOffered">,
    TVariables
  >;

  readonly fromCurrencyID: InvestorBuyAlertFetcher<
    T & { readonly fromCurrencyID?: number },
    TVariables
  >;

  "fromCurrencyID+"<
    XAlias extends string = "fromCurrencyID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"fromCurrencyID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorBuyAlertFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~fromCurrencyID": InvestorBuyAlertFetcher<
    Omit<T, "fromCurrencyID">,
    TVariables
  >;

  readonly isSellRequest: InvestorBuyAlertFetcher<
    T & { readonly isSellRequest: boolean },
    TVariables
  >;

  "isSellRequest+"<
    XAlias extends string = "isSellRequest",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isSellRequest", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBuyAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isSellRequest": InvestorBuyAlertFetcher<
    Omit<T, "isSellRequest">,
    TVariables
  >;

  readonly isHiddenForInvestor: InvestorBuyAlertFetcher<
    T & { readonly isHiddenForInvestor: boolean },
    TVariables
  >;

  "isHiddenForInvestor+"<
    XAlias extends string = "isHiddenForInvestor",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isHiddenForInvestor", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBuyAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isHiddenForInvestor": InvestorBuyAlertFetcher<
    Omit<T, "isHiddenForInvestor">,
    TVariables
  >;
}

export const investorBuyAlert$: InvestorBuyAlertFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "InvestorBuyAlert",
    "EMBEDDED",
    [],
    [
      "ID",
      "stoID",
      {
        category: "SCALAR",
        name: "entityID",
        undefinable: true,
      },
      "shares",
      "shareTypeID",
      {
        category: "SCALAR",
        name: "shareType",
        targetTypeName: "ShareType",
      },
      "status",
      "date",
      "isBuySharesSigned",
      {
        category: "SCALAR",
        name: "purchasePriceOffered",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "fromCurrencyID",
        undefinable: true,
      },
      "isSellRequest",
      "isHiddenForInvestor",
    ]
  ),
  undefined
);

export const investorBuyAlert$$ =
  investorBuyAlert$.ID.stoID.entityID.shares.shareTypeID.status.date
    .isBuySharesSigned.purchasePriceOffered.fromCurrencyID.isSellRequest
    .isHiddenForInvestor;
