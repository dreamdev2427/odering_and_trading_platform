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
export interface ShareHistoricalDataFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"ShareHistoricalData", T, TVariables> {
  on<
    XName extends ImplementationType<"ShareHistoricalData">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ShareHistoricalDataFetcher<
    XName extends "ShareHistoricalData"
      ? T & X
      : WithTypeName<T, ImplementationType<"ShareHistoricalData">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"ShareHistoricalData">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): ShareHistoricalDataFetcher<T, TVariables>;

  readonly __typename: ShareHistoricalDataFetcher<
    T & { __typename: ImplementationType<"ShareHistoricalData"> },
    TVariables
  >;

  readonly ID: ShareHistoricalDataFetcher<
    T & { readonly ID: number },
    TVariables
  >;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ShareHistoricalDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": ShareHistoricalDataFetcher<Omit<T, "ID">, TVariables>;

  readonly shareTypeID: ShareHistoricalDataFetcher<
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
  ): ShareHistoricalDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~shareTypeID": ShareHistoricalDataFetcher<
    Omit<T, "shareTypeID">,
    TVariables
  >;

  readonly stoID: ShareHistoricalDataFetcher<
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
  ): ShareHistoricalDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": ShareHistoricalDataFetcher<Omit<T, "stoID">, TVariables>;

  readonly premiumValue: ShareHistoricalDataFetcher<
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
  ): ShareHistoricalDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~premiumValue": ShareHistoricalDataFetcher<
    Omit<T, "premiumValue">,
    TVariables
  >;

  readonly dateOfChange: ShareHistoricalDataFetcher<
    T & { readonly dateOfChange?: number },
    TVariables
  >;

  "dateOfChange+"<
    XAlias extends string = "dateOfChange",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateOfChange", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ShareHistoricalDataFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~dateOfChange": ShareHistoricalDataFetcher<
    Omit<T, "dateOfChange">,
    TVariables
  >;
}

export const shareHistoricalData$: ShareHistoricalDataFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "ShareHistoricalData",
      "EMBEDDED",
      [],
      [
        "ID",
        "shareTypeID",
        "stoID",
        "premiumValue",
        {
          category: "SCALAR",
          name: "dateOfChange",
          undefinable: true,
        },
      ]
    ),
    undefined
  );

export const shareHistoricalData$$ =
  shareHistoricalData$.ID.shareTypeID.stoID.premiumValue.dateOfChange;
