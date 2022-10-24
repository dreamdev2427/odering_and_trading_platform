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
export interface InvestorDepositAlertFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"InvestorDepositAlert", T, TVariables> {
  on<
    XName extends ImplementationType<"InvestorDepositAlert">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InvestorDepositAlertFetcher<
    XName extends "InvestorDepositAlert"
      ? T & X
      : WithTypeName<T, ImplementationType<"InvestorDepositAlert">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"InvestorDepositAlert">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): InvestorDepositAlertFetcher<T, TVariables>;

  readonly __typename: InvestorDepositAlertFetcher<
    T & { __typename: ImplementationType<"InvestorDepositAlert"> },
    TVariables
  >;

  readonly ID: InvestorDepositAlertFetcher<
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
  ): InvestorDepositAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": InvestorDepositAlertFetcher<Omit<T, "ID">, TVariables>;

  readonly isApproved: InvestorDepositAlertFetcher<
    T & { readonly isApproved: number },
    TVariables
  >;

  "isApproved+"<
    XAlias extends string = "isApproved",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isApproved", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorDepositAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isApproved": InvestorDepositAlertFetcher<
    Omit<T, "isApproved">,
    TVariables
  >;

  readonly dateReceived: InvestorDepositAlertFetcher<
    T & { readonly dateReceived: string },
    TVariables
  >;

  "dateReceived+"<
    XAlias extends string = "dateReceived",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateReceived", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorDepositAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~dateReceived": InvestorDepositAlertFetcher<
    Omit<T, "dateReceived">,
    TVariables
  >;

  readonly amount: InvestorDepositAlertFetcher<
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
  ): InvestorDepositAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~amount": InvestorDepositAlertFetcher<
    Omit<T, "amount">,
    TVariables
  >;

  readonly details: InvestorDepositAlertFetcher<
    T & { readonly details: string },
    TVariables
  >;

  "details+"<
    XAlias extends string = "details",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"details", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorDepositAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~details": InvestorDepositAlertFetcher<
    Omit<T, "details">,
    TVariables
  >;

  readonly dateApproved: InvestorDepositAlertFetcher<
    T & { readonly dateApproved: string },
    TVariables
  >;

  "dateApproved+"<
    XAlias extends string = "dateApproved",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateApproved", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorDepositAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~dateApproved": InvestorDepositAlertFetcher<
    Omit<T, "dateApproved">,
    TVariables
  >;

  readonly currencyID: InvestorDepositAlertFetcher<
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
  ): InvestorDepositAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~currencyID": InvestorDepositAlertFetcher<
    Omit<T, "currencyID">,
    TVariables
  >;

  currency<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Currency", X, XVariables>
  ): InvestorDepositAlertFetcher<
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
  ): InvestorDepositAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly isWithdrawFundsRequest: InvestorDepositAlertFetcher<
    T & { readonly isWithdrawFundsRequest: boolean },
    TVariables
  >;

  "isWithdrawFundsRequest+"<
    XAlias extends string = "isWithdrawFundsRequest",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isWithdrawFundsRequest", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorDepositAlertFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isWithdrawFundsRequest": InvestorDepositAlertFetcher<
    Omit<T, "isWithdrawFundsRequest">,
    TVariables
  >;

  readonly buyAlertID: InvestorDepositAlertFetcher<
    T & { readonly buyAlertID?: number },
    TVariables
  >;

  "buyAlertID+"<
    XAlias extends string = "buyAlertID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"buyAlertID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorDepositAlertFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~buyAlertID": InvestorDepositAlertFetcher<
    Omit<T, "buyAlertID">,
    TVariables
  >;
}

export const investorDepositAlert$: InvestorDepositAlertFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "InvestorDepositAlert",
      "EMBEDDED",
      [],
      [
        "ID",
        "isApproved",
        "dateReceived",
        "amount",
        "details",
        "dateApproved",
        "currencyID",
        {
          category: "SCALAR",
          name: "currency",
          targetTypeName: "Currency",
        },
        "isWithdrawFundsRequest",
        {
          category: "SCALAR",
          name: "buyAlertID",
          undefinable: true,
        },
      ]
    ),
    undefined
  );

export const investorDepositAlert$$ =
  investorDepositAlert$.ID.isApproved.dateReceived.amount.details.dateApproved
    .currencyID.isWithdrawFundsRequest.buyAlertID;
