import type { FieldOptions, DirectiveArgs } from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { WithTypeName, ImplementationType } from "../CommonTypes";
import type { PAYMENT_STATUS } from "../enums";
import type { BROKER_TYPE } from "../enums";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface FeeCommissionFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"FeeCommission", T, TVariables> {
  on<
    XName extends ImplementationType<"FeeCommission">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): FeeCommissionFetcher<
    XName extends "FeeCommission"
      ? T & X
      : WithTypeName<T, ImplementationType<"FeeCommission">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"FeeCommission">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): FeeCommissionFetcher<T, TVariables>;

  readonly __typename: FeeCommissionFetcher<
    T & { __typename: ImplementationType<"FeeCommission"> },
    TVariables
  >;

  readonly ID: FeeCommissionFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FeeCommissionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": FeeCommissionFetcher<Omit<T, "ID">, TVariables>;

  readonly feeID: FeeCommissionFetcher<
    T & { readonly feeID: number },
    TVariables
  >;

  "feeID+"<
    XAlias extends string = "feeID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"feeID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FeeCommissionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~feeID": FeeCommissionFetcher<Omit<T, "feeID">, TVariables>;

  readonly amount: FeeCommissionFetcher<
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
  ): FeeCommissionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~amount": FeeCommissionFetcher<Omit<T, "amount">, TVariables>;

  readonly transactionID: FeeCommissionFetcher<
    T & { readonly transactionID: number },
    TVariables
  >;

  "transactionID+"<
    XAlias extends string = "transactionID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"transactionID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FeeCommissionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~transactionID": FeeCommissionFetcher<
    Omit<T, "transactionID">,
    TVariables
  >;

  readonly beneficiaryID: FeeCommissionFetcher<
    T & { readonly beneficiaryID: number },
    TVariables
  >;

  "beneficiaryID+"<
    XAlias extends string = "beneficiaryID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"beneficiaryID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FeeCommissionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~beneficiaryID": FeeCommissionFetcher<
    Omit<T, "beneficiaryID">,
    TVariables
  >;

  readonly dateEarned: FeeCommissionFetcher<
    T & { readonly dateEarned: number },
    TVariables
  >;

  "dateEarned+"<
    XAlias extends string = "dateEarned",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateEarned", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FeeCommissionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~dateEarned": FeeCommissionFetcher<
    Omit<T, "dateEarned">,
    TVariables
  >;

  readonly status: FeeCommissionFetcher<
    T & { readonly status: PAYMENT_STATUS },
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
  ): FeeCommissionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: PAYMENT_STATUS }
        : { readonly [key in XAlias]: PAYMENT_STATUS }),
    TVariables & XDirectiveVariables
  >;

  readonly "~status": FeeCommissionFetcher<Omit<T, "status">, TVariables>;

  readonly beneficiaryType: FeeCommissionFetcher<
    T & { readonly beneficiaryType?: BROKER_TYPE },
    TVariables
  >;

  "beneficiaryType+"<
    XAlias extends string = "beneficiaryType",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"beneficiaryType", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): FeeCommissionFetcher<
    T & { readonly [key in XAlias]?: BROKER_TYPE },
    TVariables & XDirectiveVariables
  >;

  readonly "~beneficiaryType": FeeCommissionFetcher<
    Omit<T, "beneficiaryType">,
    TVariables
  >;
}

export const feeCommission$: FeeCommissionFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "FeeCommission",
    "EMBEDDED",
    [],
    [
      "ID",
      "feeID",
      "amount",
      "transactionID",
      "beneficiaryID",
      "dateEarned",
      "status",
      {
        category: "SCALAR",
        name: "beneficiaryType",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const feeCommission$$ =
  feeCommission$.ID.feeID.amount.transactionID.beneficiaryID.dateEarned.status
    .beneficiaryType;
