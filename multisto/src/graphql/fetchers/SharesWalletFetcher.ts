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
export interface SharesWalletFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"SharesWallet", T, TVariables> {
  on<
    XName extends ImplementationType<"SharesWallet">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): SharesWalletFetcher<
    XName extends "SharesWallet"
      ? T & X
      : WithTypeName<T, ImplementationType<"SharesWallet">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"SharesWallet">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): SharesWalletFetcher<T, TVariables>;

  readonly __typename: SharesWalletFetcher<
    T & { __typename: ImplementationType<"SharesWallet"> },
    TVariables
  >;

  readonly ID: SharesWalletFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SharesWalletFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": SharesWalletFetcher<Omit<T, "ID">, TVariables>;

  readonly investorID: SharesWalletFetcher<
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
  ): SharesWalletFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": SharesWalletFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly shareTypeID: SharesWalletFetcher<
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
  ): SharesWalletFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~shareTypeID": SharesWalletFetcher<
    Omit<T, "shareTypeID">,
    TVariables
  >;

  shareType<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ShareType", X, XVariables>
  ): SharesWalletFetcher<
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
  ): SharesWalletFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly shares: SharesWalletFetcher<
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
  ): SharesWalletFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~shares": SharesWalletFetcher<Omit<T, "shares">, TVariables>;

  readonly publicKey: SharesWalletFetcher<
    T & { readonly publicKey?: string },
    TVariables
  >;

  "publicKey+"<
    XAlias extends string = "publicKey",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"publicKey", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): SharesWalletFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~publicKey": SharesWalletFetcher<Omit<T, "publicKey">, TVariables>;

  readonly isBlocked: SharesWalletFetcher<
    T & { readonly isBlocked?: boolean },
    TVariables
  >;

  "isBlocked+"<
    XAlias extends string = "isBlocked",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBlocked", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): SharesWalletFetcher<
    T & { readonly [key in XAlias]?: boolean },
    TVariables & XDirectiveVariables
  >;

  readonly "~isBlocked": SharesWalletFetcher<Omit<T, "isBlocked">, TVariables>;

  investor<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Investor", X, XVariables>
  ): SharesWalletFetcher<
    T & { readonly investor?: X },
    TVariables & XVariables
  >;

  investor<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investor",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Investor", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investor", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): SharesWalletFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const sharesWallet$: SharesWalletFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "SharesWallet",
    "EMBEDDED",
    [],
    [
      "ID",
      "investorID",
      "shareTypeID",
      {
        category: "SCALAR",
        name: "shareType",
        targetTypeName: "ShareType",
      },
      "shares",
      {
        category: "SCALAR",
        name: "publicKey",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "isBlocked",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "investor",
        targetTypeName: "Investor",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const sharesWallet$$ =
  sharesWallet$.ID.investorID.shareTypeID.shares.publicKey.isBlocked;
