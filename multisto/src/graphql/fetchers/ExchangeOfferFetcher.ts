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
export interface ExchangeOfferFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"ExchangeOffer", T, TVariables> {
  on<
    XName extends ImplementationType<"ExchangeOffer">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ExchangeOfferFetcher<
    XName extends "ExchangeOffer"
      ? T & X
      : WithTypeName<T, ImplementationType<"ExchangeOffer">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"ExchangeOffer">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): ExchangeOfferFetcher<T, TVariables>;

  readonly __typename: ExchangeOfferFetcher<
    T & { __typename: ImplementationType<"ExchangeOffer"> },
    TVariables
  >;

  readonly ID: ExchangeOfferFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOfferFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": ExchangeOfferFetcher<Omit<T, "ID">, TVariables>;

  readonly exchangeOrderID: ExchangeOfferFetcher<
    T & { readonly exchangeOrderID: number },
    TVariables
  >;

  "exchangeOrderID+"<
    XAlias extends string = "exchangeOrderID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"exchangeOrderID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOfferFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~exchangeOrderID": ExchangeOfferFetcher<
    Omit<T, "exchangeOrderID">,
    TVariables
  >;

  exchangeOrder<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>
  ): ExchangeOfferFetcher<
    T & { readonly exchangeOrder: X },
    TVariables & XVariables
  >;

  exchangeOrder<
    X extends object,
    XVariables extends object,
    XAlias extends string = "exchangeOrder",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"exchangeOrder", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOfferFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly investorID: ExchangeOfferFetcher<
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
  ): ExchangeOfferFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": ExchangeOfferFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly stoID: ExchangeOfferFetcher<
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
  ): ExchangeOfferFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": ExchangeOfferFetcher<Omit<T, "stoID">, TVariables>;

  readonly sharesPartial: ExchangeOfferFetcher<
    T & { readonly sharesPartial: number },
    TVariables
  >;

  "sharesPartial+"<
    XAlias extends string = "sharesPartial",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sharesPartial", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ExchangeOfferFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~sharesPartial": ExchangeOfferFetcher<
    Omit<T, "sharesPartial">,
    TVariables
  >;

  readonly rateFrom: ExchangeOfferFetcher<
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
  ): ExchangeOfferFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~rateFrom": ExchangeOfferFetcher<Omit<T, "rateFrom">, TVariables>;

  readonly rateTo: ExchangeOfferFetcher<
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
  ): ExchangeOfferFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~rateTo": ExchangeOfferFetcher<Omit<T, "rateTo">, TVariables>;

  readonly description: ExchangeOfferFetcher<
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
  ): ExchangeOfferFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~description": ExchangeOfferFetcher<
    Omit<T, "description">,
    TVariables
  >;

  readonly atomicSwapAccepted: ExchangeOfferFetcher<
    T & { readonly atomicSwapAccepted?: boolean },
    TVariables
  >;

  "atomicSwapAccepted+"<
    XAlias extends string = "atomicSwapAccepted",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"atomicSwapAccepted", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ExchangeOfferFetcher<
    T & { readonly [key in XAlias]?: boolean },
    TVariables & XDirectiveVariables
  >;

  readonly "~atomicSwapAccepted": ExchangeOfferFetcher<
    Omit<T, "atomicSwapAccepted">,
    TVariables
  >;

  readonly atomicSwapSecret: ExchangeOfferFetcher<
    T & { readonly atomicSwapSecret?: string },
    TVariables
  >;

  "atomicSwapSecret+"<
    XAlias extends string = "atomicSwapSecret",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"atomicSwapSecret", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ExchangeOfferFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~atomicSwapSecret": ExchangeOfferFetcher<
    Omit<T, "atomicSwapSecret">,
    TVariables
  >;

  readonly atomicBuyerPublicKey: ExchangeOfferFetcher<
    T & { readonly atomicBuyerPublicKey?: string },
    TVariables
  >;

  "atomicBuyerPublicKey+"<
    XAlias extends string = "atomicBuyerPublicKey",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"atomicBuyerPublicKey", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ExchangeOfferFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~atomicBuyerPublicKey": ExchangeOfferFetcher<
    Omit<T, "atomicBuyerPublicKey">,
    TVariables
  >;

  readonly atomicSwapExpireDate: ExchangeOfferFetcher<
    T & { readonly atomicSwapExpireDate?: number },
    TVariables
  >;

  "atomicSwapExpireDate+"<
    XAlias extends string = "atomicSwapExpireDate",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"atomicSwapExpireDate", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ExchangeOfferFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~atomicSwapExpireDate": ExchangeOfferFetcher<
    Omit<T, "atomicSwapExpireDate">,
    TVariables
  >;
}

export const exchangeOffer$: ExchangeOfferFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "ExchangeOffer",
    "EMBEDDED",
    [],
    [
      "ID",
      "exchangeOrderID",
      {
        category: "SCALAR",
        name: "exchangeOrder",
        targetTypeName: "ExchangeOrder",
      },
      "investorID",
      "stoID",
      "sharesPartial",
      "rateFrom",
      "rateTo",
      {
        category: "SCALAR",
        name: "description",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "atomicSwapAccepted",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "atomicSwapSecret",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "atomicBuyerPublicKey",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "atomicSwapExpireDate",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const exchangeOffer$$ =
  exchangeOffer$.ID.exchangeOrderID.investorID.stoID.sharesPartial.rateFrom
    .rateTo.description.atomicSwapAccepted.atomicSwapSecret.atomicBuyerPublicKey
    .atomicSwapExpireDate;
