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
export interface DividendInvestorPayoutFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"DividendInvestorPayout", T, TVariables> {
  on<
    XName extends ImplementationType<"DividendInvestorPayout">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): DividendInvestorPayoutFetcher<
    XName extends "DividendInvestorPayout"
      ? T & X
      : WithTypeName<T, ImplementationType<"DividendInvestorPayout">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"DividendInvestorPayout">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): DividendInvestorPayoutFetcher<T, TVariables>;

  readonly __typename: DividendInvestorPayoutFetcher<
    T & { __typename: ImplementationType<"DividendInvestorPayout"> },
    TVariables
  >;

  readonly ID: DividendInvestorPayoutFetcher<
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
  ): DividendInvestorPayoutFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": DividendInvestorPayoutFetcher<Omit<T, "ID">, TVariables>;

  readonly investorID: DividendInvestorPayoutFetcher<
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
  ): DividendInvestorPayoutFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": DividendInvestorPayoutFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly payoutID: DividendInvestorPayoutFetcher<
    T & { readonly payoutID: number },
    TVariables
  >;

  "payoutID+"<
    XAlias extends string = "payoutID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"payoutID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DividendInvestorPayoutFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~payoutID": DividendInvestorPayoutFetcher<
    Omit<T, "payoutID">,
    TVariables
  >;

  readonly amount: DividendInvestorPayoutFetcher<
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
  ): DividendInvestorPayoutFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~amount": DividendInvestorPayoutFetcher<
    Omit<T, "amount">,
    TVariables
  >;

  readonly investorShares: DividendInvestorPayoutFetcher<
    T & { readonly investorShares: number },
    TVariables
  >;

  "investorShares+"<
    XAlias extends string = "investorShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DividendInvestorPayoutFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorShares": DividendInvestorPayoutFetcher<
    Omit<T, "investorShares">,
    TVariables
  >;

  readonly lastUpdatedAt: DividendInvestorPayoutFetcher<
    T & { readonly lastUpdatedAt: number },
    TVariables
  >;

  "lastUpdatedAt+"<
    XAlias extends string = "lastUpdatedAt",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"lastUpdatedAt", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DividendInvestorPayoutFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~lastUpdatedAt": DividendInvestorPayoutFetcher<
    Omit<T, "lastUpdatedAt">,
    TVariables
  >;

  readonly status: DividendInvestorPayoutFetcher<
    T & { readonly status: string },
    TVariables
  >;

  "status+"<
    XAlias extends string = "status",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"status", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DividendInvestorPayoutFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~status": DividendInvestorPayoutFetcher<
    Omit<T, "status">,
    TVariables
  >;
}

export const dividendInvestorPayout$: DividendInvestorPayoutFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "DividendInvestorPayout",
      "EMBEDDED",
      [],
      [
        "ID",
        "investorID",
        "payoutID",
        "amount",
        "investorShares",
        "lastUpdatedAt",
        "status",
      ]
    ),
    undefined
  );

export const dividendInvestorPayout$$ =
  dividendInvestorPayout$.ID.investorID.payoutID.amount.investorShares
    .lastUpdatedAt.status;
