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
export interface MoonpayTransactionJSONFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"MoonpayTransactionJSON", T, TVariables> {
  on<
    XName extends ImplementationType<"MoonpayTransactionJSON">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): MoonpayTransactionJSONFetcher<
    XName extends "MoonpayTransactionJSON"
      ? T & X
      : WithTypeName<T, ImplementationType<"MoonpayTransactionJSON">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"MoonpayTransactionJSON">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): MoonpayTransactionJSONFetcher<T, TVariables>;

  readonly __typename: MoonpayTransactionJSONFetcher<
    T & { __typename: ImplementationType<"MoonpayTransactionJSON"> },
    TVariables
  >;

  readonly transactionJSON: MoonpayTransactionJSONFetcher<
    T & { readonly transactionJSON?: object },
    TVariables
  >;

  "transactionJSON+"<
    XAlias extends string = "transactionJSON",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"transactionJSON", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayTransactionJSONFetcher<
    T & { readonly [key in XAlias]?: object },
    TVariables & XDirectiveVariables
  >;

  readonly "~transactionJSON": MoonpayTransactionJSONFetcher<
    Omit<T, "transactionJSON">,
    TVariables
  >;

  localData<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MoonpayTransactionData", X, XVariables>
  ): MoonpayTransactionJSONFetcher<
    T & { readonly localData: X },
    TVariables & XVariables
  >;

  localData<
    X extends object,
    XVariables extends object,
    XAlias extends string = "localData",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MoonpayTransactionData", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"localData", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MoonpayTransactionJSONFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const moonpayTransactionJSON$: MoonpayTransactionJSONFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "MoonpayTransactionJSON",
      "EMBEDDED",
      [],
      [
        {
          category: "SCALAR",
          name: "transactionJSON",
          undefinable: true,
        },
        {
          category: "SCALAR",
          name: "localData",
          targetTypeName: "MoonpayTransactionData",
        },
      ]
    ),
    undefined
  );

export const moonpayTransactionJSON$$ = moonpayTransactionJSON$.transactionJSON;
