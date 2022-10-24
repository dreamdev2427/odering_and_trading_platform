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
export interface CurrencyFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Currency", T, TVariables> {
  on<
    XName extends ImplementationType<"Currency">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): CurrencyFetcher<
    XName extends "Currency"
      ? T & X
      : WithTypeName<T, ImplementationType<"Currency">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Currency">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): CurrencyFetcher<T, TVariables>;

  readonly __typename: CurrencyFetcher<
    T & { __typename: ImplementationType<"Currency"> },
    TVariables
  >;

  readonly ID: CurrencyFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CurrencyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": CurrencyFetcher<Omit<T, "ID">, TVariables>;

  readonly currency: CurrencyFetcher<
    T & { readonly currency: string },
    TVariables
  >;

  "currency+"<
    XAlias extends string = "currency",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"currency", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CurrencyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~currency": CurrencyFetcher<Omit<T, "currency">, TVariables>;

  readonly abbreviation: CurrencyFetcher<
    T & { readonly abbreviation: string },
    TVariables
  >;

  "abbreviation+"<
    XAlias extends string = "abbreviation",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"abbreviation", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CurrencyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~abbreviation": CurrencyFetcher<
    Omit<T, "abbreviation">,
    TVariables
  >;

  readonly symbol: CurrencyFetcher<T & { readonly symbol: string }, TVariables>;

  "symbol+"<
    XAlias extends string = "symbol",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"symbol", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CurrencyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~symbol": CurrencyFetcher<Omit<T, "symbol">, TVariables>;

  readonly isBlockchainBased: CurrencyFetcher<
    T & { readonly isBlockchainBased: boolean },
    TVariables
  >;

  "isBlockchainBased+"<
    XAlias extends string = "isBlockchainBased",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBlockchainBased", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CurrencyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isBlockchainBased": CurrencyFetcher<
    Omit<T, "isBlockchainBased">,
    TVariables
  >;

  readonly blockchainID: CurrencyFetcher<
    T & { readonly blockchainID: number },
    TVariables
  >;

  "blockchainID+"<
    XAlias extends string = "blockchainID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"blockchainID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CurrencyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~blockchainID": CurrencyFetcher<
    Omit<T, "blockchainID">,
    TVariables
  >;

  readonly isNative: CurrencyFetcher<
    T & { readonly isNative: number },
    TVariables
  >;

  "isNative+"<
    XAlias extends string = "isNative",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isNative", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CurrencyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isNative": CurrencyFetcher<Omit<T, "isNative">, TVariables>;

  readonly cryptoReceivingAddress: CurrencyFetcher<
    T & { readonly cryptoReceivingAddress?: string },
    TVariables
  >;

  "cryptoReceivingAddress+"<
    XAlias extends string = "cryptoReceivingAddress",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"cryptoReceivingAddress", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): CurrencyFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~cryptoReceivingAddress": CurrencyFetcher<
    Omit<T, "cryptoReceivingAddress">,
    TVariables
  >;

  readonly Address: CurrencyFetcher<
    T & { readonly Address?: string },
    TVariables
  >;

  "Address+"<
    XAlias extends string = "Address",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"Address", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): CurrencyFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~Address": CurrencyFetcher<Omit<T, "Address">, TVariables>;
}

export const currency$: CurrencyFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Currency",
    "EMBEDDED",
    [],
    [
      "ID",
      "currency",
      "abbreviation",
      "symbol",
      "isBlockchainBased",
      "blockchainID",
      "isNative",
      {
        category: "SCALAR",
        name: "cryptoReceivingAddress",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "Address",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const currency$$ =
  currency$.ID.currency.abbreviation.symbol.isBlockchainBased.blockchainID
    .isNative.cryptoReceivingAddress.Address;
