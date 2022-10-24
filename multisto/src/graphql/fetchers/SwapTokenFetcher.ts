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
export interface SwapTokenFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"SwapToken", T, TVariables> {
  on<
    XName extends ImplementationType<"SwapToken">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): SwapTokenFetcher<
    XName extends "SwapToken"
      ? T & X
      : WithTypeName<T, ImplementationType<"SwapToken">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"SwapToken">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): SwapTokenFetcher<T, TVariables>;

  readonly __typename: SwapTokenFetcher<
    T & { __typename: ImplementationType<"SwapToken"> },
    TVariables
  >;

  readonly ID: SwapTokenFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SwapTokenFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": SwapTokenFetcher<Omit<T, "ID">, TVariables>;

  readonly address: SwapTokenFetcher<
    T & { readonly address?: string },
    TVariables
  >;

  "address+"<
    XAlias extends string = "address",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"address", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): SwapTokenFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~address": SwapTokenFetcher<Omit<T, "address">, TVariables>;

  readonly name: SwapTokenFetcher<T & { readonly name?: string }, TVariables>;

  "name+"<
    XAlias extends string = "name",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"name", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): SwapTokenFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~name": SwapTokenFetcher<Omit<T, "name">, TVariables>;

  readonly symbol: SwapTokenFetcher<
    T & { readonly symbol?: string },
    TVariables
  >;

  "symbol+"<
    XAlias extends string = "symbol",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"symbol", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): SwapTokenFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~symbol": SwapTokenFetcher<Omit<T, "symbol">, TVariables>;
}

export const swapToken$: SwapTokenFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "SwapToken",
    "EMBEDDED",
    [],
    [
      "ID",
      {
        category: "SCALAR",
        name: "address",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "name",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "symbol",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const swapToken$$ = swapToken$.ID.address.name.symbol;
