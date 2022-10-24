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
export interface InvestorBalanceFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"InvestorBalance", T, TVariables> {
  on<
    XName extends ImplementationType<"InvestorBalance">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InvestorBalanceFetcher<
    XName extends "InvestorBalance"
      ? T & X
      : WithTypeName<T, ImplementationType<"InvestorBalance">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"InvestorBalance">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): InvestorBalanceFetcher<T, TVariables>;

  readonly __typename: InvestorBalanceFetcher<
    T & { __typename: ImplementationType<"InvestorBalance"> },
    TVariables
  >;

  readonly ID: InvestorBalanceFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBalanceFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": InvestorBalanceFetcher<Omit<T, "ID">, TVariables>;

  readonly stoID: InvestorBalanceFetcher<
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
  ): InvestorBalanceFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": InvestorBalanceFetcher<Omit<T, "stoID">, TVariables>;

  readonly investorID: InvestorBalanceFetcher<
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
  ): InvestorBalanceFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": InvestorBalanceFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly currencyID: InvestorBalanceFetcher<
    T & { readonly currencyID: number },
    TVariables
  >;

  "currencyID+"<
    XAlias extends string = "currencyID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"currencyID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBalanceFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~currencyID": InvestorBalanceFetcher<
    Omit<T, "currencyID">,
    TVariables
  >;

  currency<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Currency", X, XVariables>
  ): InvestorBalanceFetcher<
    T & { readonly currency: X },
    TVariables & XVariables
  >;

  currency<
    X extends object,
    XVariables extends object,
    XAlias extends string = "currency",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Currency", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"currency", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBalanceFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly amount: InvestorBalanceFetcher<
    T & { readonly amount: number },
    TVariables
  >;

  "amount+"<
    XAlias extends string = "amount",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"amount", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorBalanceFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~amount": InvestorBalanceFetcher<Omit<T, "amount">, TVariables>;
}

export const investorBalance$: InvestorBalanceFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "InvestorBalance",
    "EMBEDDED",
    [],
    [
      "ID",
      "stoID",
      "investorID",
      "currencyID",
      {
        category: "SCALAR",
        name: "currency",
        targetTypeName: "Currency",
      },
      "amount",
    ]
  ),
  undefined
);

export const investorBalance$$ =
  investorBalance$.ID.stoID.investorID.currencyID.amount;
