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
export interface InvestorInvoicesFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"InvestorInvoices", T, TVariables> {
  on<
    XName extends ImplementationType<"InvestorInvoices">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InvestorInvoicesFetcher<
    XName extends "InvestorInvoices"
      ? T & X
      : WithTypeName<T, ImplementationType<"InvestorInvoices">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"InvestorInvoices">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): InvestorInvoicesFetcher<T, TVariables>;

  readonly __typename: InvestorInvoicesFetcher<
    T & { __typename: ImplementationType<"InvestorInvoices"> },
    TVariables
  >;

  readonly ID: InvestorInvoicesFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": InvestorInvoicesFetcher<Omit<T, "ID">, TVariables>;

  readonly stoID: InvestorInvoicesFetcher<
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
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": InvestorInvoicesFetcher<Omit<T, "stoID">, TVariables>;

  readonly buyAlertID: InvestorInvoicesFetcher<
    T & { readonly buyAlertID: number },
    TVariables
  >;

  "buyAlertID+"<
    XAlias extends string = "buyAlertID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"buyAlertID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~buyAlertID": InvestorInvoicesFetcher<
    Omit<T, "buyAlertID">,
    TVariables
  >;

  readonly investorID: InvestorInvoicesFetcher<
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
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": InvestorInvoicesFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly shareTypeID: InvestorInvoicesFetcher<
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
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~shareTypeID": InvestorInvoicesFetcher<
    Omit<T, "shareTypeID">,
    TVariables
  >;

  shareType<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ShareType", X, XVariables>
  ): InvestorInvoicesFetcher<
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
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly paymentChannelID: InvestorInvoicesFetcher<
    T & { readonly paymentChannelID: number },
    TVariables
  >;

  "paymentChannelID+"<
    XAlias extends string = "paymentChannelID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"paymentChannelID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~paymentChannelID": InvestorInvoicesFetcher<
    Omit<T, "paymentChannelID">,
    TVariables
  >;

  paymentChannel<X extends object, XVariables extends object>(
    child: ObjectFetcher<"PaymentChannel", X, XVariables>
  ): InvestorInvoicesFetcher<
    T & { readonly paymentChannel?: X },
    TVariables & XVariables
  >;

  paymentChannel<
    X extends object,
    XVariables extends object,
    XAlias extends string = "paymentChannel",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"PaymentChannel", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"paymentChannel", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorInvoicesFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;

  buyAlert<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>
  ): InvestorInvoicesFetcher<
    T & { readonly buyAlert: X },
    TVariables & XVariables
  >;

  buyAlert<
    X extends object,
    XVariables extends object,
    XAlias extends string = "buyAlert",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"buyAlert", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly shares: InvestorInvoicesFetcher<
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
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~shares": InvestorInvoicesFetcher<Omit<T, "shares">, TVariables>;

  readonly amountToPay: InvestorInvoicesFetcher<
    T & { readonly amountToPay: number },
    TVariables
  >;

  "amountToPay+"<
    XAlias extends string = "amountToPay",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"amountToPay", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~amountToPay": InvestorInvoicesFetcher<
    Omit<T, "amountToPay">,
    TVariables
  >;

  readonly status: InvestorInvoicesFetcher<
    T & { readonly status: number },
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
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~status": InvestorInvoicesFetcher<Omit<T, "status">, TVariables>;

  readonly isBlockchain: InvestorInvoicesFetcher<
    T & { readonly isBlockchain: boolean },
    TVariables
  >;

  "isBlockchain+"<
    XAlias extends string = "isBlockchain",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBlockchain", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isBlockchain": InvestorInvoicesFetcher<
    Omit<T, "isBlockchain">,
    TVariables
  >;

  readonly dateCreated: InvestorInvoicesFetcher<
    T & { readonly dateCreated: number },
    TVariables
  >;

  "dateCreated+"<
    XAlias extends string = "dateCreated",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateCreated", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorInvoicesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~dateCreated": InvestorInvoicesFetcher<
    Omit<T, "dateCreated">,
    TVariables
  >;

  readonly dateUpdated: InvestorInvoicesFetcher<
    T & { readonly dateUpdated?: number },
    TVariables
  >;

  "dateUpdated+"<
    XAlias extends string = "dateUpdated",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateUpdated", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorInvoicesFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~dateUpdated": InvestorInvoicesFetcher<
    Omit<T, "dateUpdated">,
    TVariables
  >;

  readonly invoiceDescription: InvestorInvoicesFetcher<
    T & { readonly invoiceDescription?: string },
    TVariables
  >;

  "invoiceDescription+"<
    XAlias extends string = "invoiceDescription",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"invoiceDescription", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorInvoicesFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~invoiceDescription": InvestorInvoicesFetcher<
    Omit<T, "invoiceDescription">,
    TVariables
  >;

  readonly investorWallet: InvestorInvoicesFetcher<
    T & { readonly investorWallet?: string },
    TVariables
  >;

  "investorWallet+"<
    XAlias extends string = "investorWallet",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorWallet", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorInvoicesFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~investorWallet": InvestorInvoicesFetcher<
    Omit<T, "investorWallet">,
    TVariables
  >;
}

export const investorInvoices$: InvestorInvoicesFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "InvestorInvoices",
    "EMBEDDED",
    [],
    [
      "ID",
      "stoID",
      "buyAlertID",
      "investorID",
      "shareTypeID",
      {
        category: "SCALAR",
        name: "shareType",
        targetTypeName: "ShareType",
      },
      "paymentChannelID",
      {
        category: "SCALAR",
        name: "paymentChannel",
        targetTypeName: "PaymentChannel",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "buyAlert",
        targetTypeName: "InvestorBuyAlert",
      },
      "shares",
      "amountToPay",
      "status",
      "isBlockchain",
      "dateCreated",
      {
        category: "SCALAR",
        name: "dateUpdated",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "invoiceDescription",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "investorWallet",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const investorInvoices$$ =
  investorInvoices$.ID.stoID.buyAlertID.investorID.shareTypeID.paymentChannelID
    .shares.amountToPay.status.isBlockchain.dateCreated.dateUpdated
    .invoiceDescription.investorWallet;
