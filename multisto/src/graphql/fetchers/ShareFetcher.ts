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
export interface ShareFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Share", T, TVariables> {
  on<
    XName extends ImplementationType<"Share">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ShareFetcher<
    XName extends "Share"
      ? T & X
      : WithTypeName<T, ImplementationType<"Share">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Share">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): ShareFetcher<T, TVariables>;

  readonly __typename: ShareFetcher<
    T & { __typename: ImplementationType<"Share"> },
    TVariables
  >;

  readonly ID: ShareFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": ShareFetcher<Omit<T, "ID">, TVariables>;

  readonly stoID: ShareFetcher<T & { readonly stoID: number }, TVariables>;

  "stoID+"<
    XAlias extends string = "stoID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": ShareFetcher<Omit<T, "stoID">, TVariables>;

  readonly shareTypeID: ShareFetcher<
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
  ): ShareFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~shareTypeID": ShareFetcher<Omit<T, "shareTypeID">, TVariables>;

  shareType<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ShareType", X, XVariables>
  ): ShareFetcher<T & { readonly shareType: X }, TVariables & XVariables>;

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
  ): ShareFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly publicKey: ShareFetcher<
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
  ): ShareFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~publicKey": ShareFetcher<Omit<T, "publicKey">, TVariables>;

  readonly isBlockchainFrozen: ShareFetcher<
    T & { readonly isBlockchainFrozen: number },
    TVariables
  >;

  "isBlockchainFrozen+"<
    XAlias extends string = "isBlockchainFrozen",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBlockchainFrozen", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isBlockchainFrozen": ShareFetcher<
    Omit<T, "isBlockchainFrozen">,
    TVariables
  >;

  readonly isBlockchainAuthorized: ShareFetcher<
    T & { readonly isBlockchainAuthorized: number },
    TVariables
  >;

  "isBlockchainAuthorized+"<
    XAlias extends string = "isBlockchainAuthorized",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBlockchainAuthorized", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isBlockchainAuthorized": ShareFetcher<
    Omit<T, "isBlockchainAuthorized">,
    TVariables
  >;

  readonly shares: ShareFetcher<T & { readonly shares: number }, TVariables>;

  "shares+"<
    XAlias extends string = "shares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"shares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~shares": ShareFetcher<Omit<T, "shares">, TVariables>;

  readonly investorID: ShareFetcher<
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
  ): ShareFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": ShareFetcher<Omit<T, "investorID">, TVariables>;

  readonly sharesHistoryID: ShareFetcher<
    T & { readonly sharesHistoryID: number },
    TVariables
  >;

  "sharesHistoryID+"<
    XAlias extends string = "sharesHistoryID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sharesHistoryID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~sharesHistoryID": ShareFetcher<
    Omit<T, "sharesHistoryID">,
    TVariables
  >;
}

export const share$: ShareFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Share",
    "EMBEDDED",
    [],
    [
      "ID",
      "stoID",
      "shareTypeID",
      {
        category: "SCALAR",
        name: "shareType",
        targetTypeName: "ShareType",
      },
      {
        category: "SCALAR",
        name: "publicKey",
        undefinable: true,
      },
      "isBlockchainFrozen",
      "isBlockchainAuthorized",
      "shares",
      "investorID",
      "sharesHistoryID",
    ]
  ),
  undefined
);

export const share$$ =
  share$.ID.stoID.shareTypeID.publicKey.isBlockchainFrozen
    .isBlockchainAuthorized.shares.investorID.sharesHistoryID;
