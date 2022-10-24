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
export interface MoonpayTransactionDataFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"MoonpayTransactionData", T, TVariables> {
  on<
    XName extends ImplementationType<"MoonpayTransactionData">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): MoonpayTransactionDataFetcher<
    XName extends "MoonpayTransactionData"
      ? T & X
      : WithTypeName<T, ImplementationType<"MoonpayTransactionData">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"MoonpayTransactionData">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): MoonpayTransactionDataFetcher<T, TVariables>;

  readonly __typename: MoonpayTransactionDataFetcher<
    T & { __typename: ImplementationType<"MoonpayTransactionData"> },
    TVariables
  >;

  readonly ID: MoonpayTransactionDataFetcher<
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
  ): MoonpayTransactionDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": MoonpayTransactionDataFetcher<Omit<T, "ID">, TVariables>;

  readonly object: MoonpayTransactionDataFetcher<
    T & { readonly object?: object },
    TVariables
  >;

  "object+"<
    XAlias extends string = "object",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"object", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayTransactionDataFetcher<
    T & { readonly [key in XAlias]?: object },
    TVariables & XDirectiveVariables
  >;

  readonly "~object": MoonpayTransactionDataFetcher<
    Omit<T, "object">,
    TVariables
  >;

  readonly objectType: MoonpayTransactionDataFetcher<
    T & { readonly objectType: string },
    TVariables
  >;

  "objectType+"<
    XAlias extends string = "objectType",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"objectType", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MoonpayTransactionDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~objectType": MoonpayTransactionDataFetcher<
    Omit<T, "objectType">,
    TVariables
  >;

  readonly dateUpdated: MoonpayTransactionDataFetcher<
    T & { readonly dateUpdated: string },
    TVariables
  >;

  "dateUpdated+"<
    XAlias extends string = "dateUpdated",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateUpdated", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MoonpayTransactionDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~dateUpdated": MoonpayTransactionDataFetcher<
    Omit<T, "dateUpdated">,
    TVariables
  >;

  readonly localStatus: MoonpayTransactionDataFetcher<
    T & { readonly localStatus: string },
    TVariables
  >;

  "localStatus+"<
    XAlias extends string = "localStatus",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"localStatus", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MoonpayTransactionDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~localStatus": MoonpayTransactionDataFetcher<
    Omit<T, "localStatus">,
    TVariables
  >;

  readonly referenceID: MoonpayTransactionDataFetcher<
    T & { readonly referenceID?: number },
    TVariables
  >;

  "referenceID+"<
    XAlias extends string = "referenceID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"referenceID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayTransactionDataFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~referenceID": MoonpayTransactionDataFetcher<
    Omit<T, "referenceID">,
    TVariables
  >;

  readonly investorID: MoonpayTransactionDataFetcher<
    T & { readonly investorID?: number },
    TVariables
  >;

  "investorID+"<
    XAlias extends string = "investorID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayTransactionDataFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": MoonpayTransactionDataFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly shareTypeID: MoonpayTransactionDataFetcher<
    T & { readonly shareTypeID?: number },
    TVariables
  >;

  "shareTypeID+"<
    XAlias extends string = "shareTypeID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"shareTypeID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayTransactionDataFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~shareTypeID": MoonpayTransactionDataFetcher<
    Omit<T, "shareTypeID">,
    TVariables
  >;
}

export const moonpayTransactionData$: MoonpayTransactionDataFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "MoonpayTransactionData",
      "EMBEDDED",
      [],
      [
        "ID",
        {
          category: "SCALAR",
          name: "object",
          undefinable: true,
        },
        "objectType",
        "dateUpdated",
        "localStatus",
        {
          category: "SCALAR",
          name: "referenceID",
          undefinable: true,
        },
        {
          category: "SCALAR",
          name: "investorID",
          undefinable: true,
        },
        {
          category: "SCALAR",
          name: "shareTypeID",
          undefinable: true,
        },
      ]
    ),
    undefined
  );

export const moonpayTransactionData$$ =
  moonpayTransactionData$.ID.object.objectType.dateUpdated.localStatus
    .referenceID.investorID.shareTypeID;
