import type { FieldOptions, DirectiveArgs } from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { WithTypeName, ImplementationType } from "../CommonTypes";
import type { ExchangeType } from "../enums";
import type { AtomicSwapStatus } from "../enums";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface ExchangeOrderFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"ExchangeOrder", T, TVariables> {
  on<
    XName extends ImplementationType<"ExchangeOrder">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ExchangeOrderFetcher<
    XName extends "ExchangeOrder"
      ? T & X
      : WithTypeName<T, ImplementationType<"ExchangeOrder">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"ExchangeOrder">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): ExchangeOrderFetcher<T, TVariables>;

  readonly __typename: ExchangeOrderFetcher<
    T & { __typename: ImplementationType<"ExchangeOrder"> },
    TVariables
  >;

  readonly ID: ExchangeOrderFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": ExchangeOrderFetcher<Omit<T, "ID">, TVariables>;

  readonly type: ExchangeOrderFetcher<
    T & { readonly type: ExchangeType },
    TVariables
  >;

  "type+"<
    XAlias extends string = "type",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"type", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: ExchangeType }
        : { readonly [key in XAlias]: ExchangeType }),
    TVariables & XDirectiveVariables
  >;

  readonly "~type": ExchangeOrderFetcher<Omit<T, "type">, TVariables>;

  readonly investorID: ExchangeOrderFetcher<
    T & { readonly investorID: number },
    TVariables
  >;

  "investorID+"<
    XAlias extends string = "investorID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": ExchangeOrderFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly stoID: ExchangeOrderFetcher<
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
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": ExchangeOrderFetcher<Omit<T, "stoID">, TVariables>;

  readonly dateFrom: ExchangeOrderFetcher<
    T & { readonly dateFrom: string },
    TVariables
  >;

  "dateFrom+"<
    XAlias extends string = "dateFrom",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateFrom", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~dateFrom": ExchangeOrderFetcher<Omit<T, "dateFrom">, TVariables>;

  readonly dateTo: ExchangeOrderFetcher<
    T & { readonly dateTo: string },
    TVariables
  >;

  "dateTo+"<
    XAlias extends string = "dateTo",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateTo", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~dateTo": ExchangeOrderFetcher<Omit<T, "dateTo">, TVariables>;

  readonly shareTypeID: ExchangeOrderFetcher<
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
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~shareTypeID": ExchangeOrderFetcher<
    Omit<T, "shareTypeID">,
    TVariables
  >;

  shareType<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ShareType", X, XVariables>
  ): ExchangeOrderFetcher<
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
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly shares: ExchangeOrderFetcher<
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
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~shares": ExchangeOrderFetcher<Omit<T, "shares">, TVariables>;

  readonly rateFrom: ExchangeOrderFetcher<
    T & { readonly rateFrom: number },
    TVariables
  >;

  "rateFrom+"<
    XAlias extends string = "rateFrom",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"rateFrom", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~rateFrom": ExchangeOrderFetcher<Omit<T, "rateFrom">, TVariables>;

  readonly rateTo: ExchangeOrderFetcher<
    T & { readonly rateTo: number },
    TVariables
  >;

  "rateTo+"<
    XAlias extends string = "rateTo",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"rateTo", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~rateTo": ExchangeOrderFetcher<Omit<T, "rateTo">, TVariables>;

  readonly description: ExchangeOrderFetcher<
    T & { readonly description?: string },
    TVariables
  >;

  "description+"<
    XAlias extends string = "description",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"description", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ExchangeOrderFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~description": ExchangeOrderFetcher<
    Omit<T, "description">,
    TVariables
  >;

  readonly atomicSwapCurrentStatus: ExchangeOrderFetcher<
    T & { readonly atomicSwapCurrentStatus: AtomicSwapStatus },
    TVariables
  >;

  "atomicSwapCurrentStatus+"<
    XAlias extends string = "atomicSwapCurrentStatus",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"atomicSwapCurrentStatus", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: AtomicSwapStatus }
        : { readonly [key in XAlias]: AtomicSwapStatus }),
    TVariables & XDirectiveVariables
  >;

  readonly "~atomicSwapCurrentStatus": ExchangeOrderFetcher<
    Omit<T, "atomicSwapCurrentStatus">,
    TVariables
  >;

  readonly atomicSwapExchangeOffersID: ExchangeOrderFetcher<
    T & { readonly atomicSwapExchangeOffersID?: number },
    TVariables
  >;

  "atomicSwapExchangeOffersID+"<
    XAlias extends string = "atomicSwapExchangeOffersID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"atomicSwapExchangeOffersID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ExchangeOrderFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~atomicSwapExchangeOffersID": ExchangeOrderFetcher<
    Omit<T, "atomicSwapExchangeOffersID">,
    TVariables
  >;

  readonly atomicSwapAcceptable: ExchangeOrderFetcher<
    T & { readonly atomicSwapAcceptable: boolean },
    TVariables
  >;

  "atomicSwapAcceptable+"<
    XAlias extends string = "atomicSwapAcceptable",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"atomicSwapAcceptable", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~atomicSwapAcceptable": ExchangeOrderFetcher<
    Omit<T, "atomicSwapAcceptable">,
    TVariables
  >;

  readonly atomicSwapTokenAddressAcceptable: ExchangeOrderFetcher<
    T & { readonly atomicSwapTokenAddressAcceptable?: string },
    TVariables
  >;

  "atomicSwapTokenAddressAcceptable+"<
    XAlias extends string = "atomicSwapTokenAddressAcceptable",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"atomicSwapTokenAddressAcceptable", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ExchangeOrderFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~atomicSwapTokenAddressAcceptable": ExchangeOrderFetcher<
    Omit<T, "atomicSwapTokenAddressAcceptable">,
    TVariables
  >;

  readonly atomicSwapSharesWalletID: ExchangeOrderFetcher<
    T & { readonly atomicSwapSharesWalletID: number },
    TVariables
  >;

  "atomicSwapSharesWalletID+"<
    XAlias extends string = "atomicSwapSharesWalletID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"atomicSwapSharesWalletID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOrderFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~atomicSwapSharesWalletID": ExchangeOrderFetcher<
    Omit<T, "atomicSwapSharesWalletID">,
    TVariables
  >;

  atomicSwapSharesWallet<X extends object, XVariables extends object>(
    child: ObjectFetcher<"SharesWallet", X, XVariables>
  ): ExchangeOrderFetcher<
    T & { readonly atomicSwapSharesWallet?: X },
    TVariables & XVariables
  >;

  atomicSwapSharesWallet<
    X extends object,
    XVariables extends object,
    XAlias extends string = "atomicSwapSharesWallet",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"SharesWallet", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"atomicSwapSharesWallet", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ExchangeOrderFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const exchangeOrder$: ExchangeOrderFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "ExchangeOrder",
    "EMBEDDED",
    [],
    [
      "ID",
      "type",
      "investorID",
      "stoID",
      "dateFrom",
      "dateTo",
      "shareTypeID",
      {
        category: "SCALAR",
        name: "shareType",
        targetTypeName: "ShareType",
      },
      "shares",
      "rateFrom",
      "rateTo",
      {
        category: "SCALAR",
        name: "description",
        undefinable: true,
      },
      "atomicSwapCurrentStatus",
      {
        category: "SCALAR",
        name: "atomicSwapExchangeOffersID",
        undefinable: true,
      },
      "atomicSwapAcceptable",
      {
        category: "SCALAR",
        name: "atomicSwapTokenAddressAcceptable",
        undefinable: true,
      },
      "atomicSwapSharesWalletID",
      {
        category: "SCALAR",
        name: "atomicSwapSharesWallet",
        targetTypeName: "SharesWallet",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const exchangeOrder$$ =
  exchangeOrder$.ID.type.investorID.stoID.dateFrom.dateTo.shareTypeID.shares
    .rateFrom.rateTo.description.atomicSwapCurrentStatus
    .atomicSwapExchangeOffersID.atomicSwapAcceptable
    .atomicSwapTokenAddressAcceptable.atomicSwapSharesWalletID;
