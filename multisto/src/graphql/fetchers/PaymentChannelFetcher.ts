import type { FieldOptions, DirectiveArgs } from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { WithTypeName, ImplementationType } from "../CommonTypes";
import type { PAYMENT_CHANNEL_TYPE } from "../enums";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface PaymentChannelFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"PaymentChannel", T, TVariables> {
  on<
    XName extends ImplementationType<"PaymentChannel">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): PaymentChannelFetcher<
    XName extends "PaymentChannel"
      ? T & X
      : WithTypeName<T, ImplementationType<"PaymentChannel">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"PaymentChannel">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): PaymentChannelFetcher<T, TVariables>;

  readonly __typename: PaymentChannelFetcher<
    T & { __typename: ImplementationType<"PaymentChannel"> },
    TVariables
  >;

  readonly ID: PaymentChannelFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": PaymentChannelFetcher<Omit<T, "ID">, TVariables>;

  readonly stoID: PaymentChannelFetcher<
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
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": PaymentChannelFetcher<Omit<T, "stoID">, TVariables>;

  readonly channelType: PaymentChannelFetcher<
    T & { readonly channelType: PAYMENT_CHANNEL_TYPE },
    TVariables
  >;

  "channelType+"<
    XAlias extends string = "channelType",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"channelType", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: PAYMENT_CHANNEL_TYPE }
        : { readonly [key in XAlias]: PAYMENT_CHANNEL_TYPE }),
    TVariables & XDirectiveVariables
  >;

  readonly "~channelType": PaymentChannelFetcher<
    Omit<T, "channelType">,
    TVariables
  >;

  readonly title: PaymentChannelFetcher<
    T & { readonly title: string },
    TVariables
  >;

  "title+"<
    XAlias extends string = "title",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"title", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": PaymentChannelFetcher<Omit<T, "title">, TVariables>;

  readonly details: PaymentChannelFetcher<
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
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~details": PaymentChannelFetcher<Omit<T, "details">, TVariables>;

  readonly currencyID: PaymentChannelFetcher<
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
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~currencyID": PaymentChannelFetcher<
    Omit<T, "currencyID">,
    TVariables
  >;

  currency<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Currency", X, XVariables>
  ): PaymentChannelFetcher<
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
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly isActive: PaymentChannelFetcher<
    T & { readonly isActive: boolean },
    TVariables
  >;

  "isActive+"<
    XAlias extends string = "isActive",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isActive", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isActive": PaymentChannelFetcher<Omit<T, "isActive">, TVariables>;

  readonly canWithdrawFunds: PaymentChannelFetcher<
    T & { readonly canWithdrawFunds: boolean },
    TVariables
  >;

  "canWithdrawFunds+"<
    XAlias extends string = "canWithdrawFunds",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"canWithdrawFunds", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~canWithdrawFunds": PaymentChannelFetcher<
    Omit<T, "canWithdrawFunds">,
    TVariables
  >;

  readonly depositInstructionText: PaymentChannelFetcher<
    T & { readonly depositInstructionText: string },
    TVariables
  >;

  "depositInstructionText+"<
    XAlias extends string = "depositInstructionText",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"depositInstructionText", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~depositInstructionText": PaymentChannelFetcher<
    Omit<T, "depositInstructionText">,
    TVariables
  >;

  readonly depositInstructionEmailHeader: PaymentChannelFetcher<
    T & { readonly depositInstructionEmailHeader: string },
    TVariables
  >;

  "depositInstructionEmailHeader+"<
    XAlias extends string = "depositInstructionEmailHeader",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"depositInstructionEmailHeader", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~depositInstructionEmailHeader": PaymentChannelFetcher<
    Omit<T, "depositInstructionEmailHeader">,
    TVariables
  >;

  readonly sendInstructionalDepositEmail: PaymentChannelFetcher<
    T & { readonly sendInstructionalDepositEmail: boolean },
    TVariables
  >;

  "sendInstructionalDepositEmail+"<
    XAlias extends string = "sendInstructionalDepositEmail",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sendInstructionalDepositEmail", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~sendInstructionalDepositEmail": PaymentChannelFetcher<
    Omit<T, "sendInstructionalDepositEmail">,
    TVariables
  >;

  readonly adminEmailHeader: PaymentChannelFetcher<
    T & { readonly adminEmailHeader: string },
    TVariables
  >;

  "adminEmailHeader+"<
    XAlias extends string = "adminEmailHeader",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"adminEmailHeader", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~adminEmailHeader": PaymentChannelFetcher<
    Omit<T, "adminEmailHeader">,
    TVariables
  >;

  readonly adminEmailBody: PaymentChannelFetcher<
    T & { readonly adminEmailBody: string },
    TVariables
  >;

  "adminEmailBody+"<
    XAlias extends string = "adminEmailBody",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"adminEmailBody", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~adminEmailBody": PaymentChannelFetcher<
    Omit<T, "adminEmailBody">,
    TVariables
  >;

  readonly sendAdminEmail: PaymentChannelFetcher<
    T & { readonly sendAdminEmail: boolean },
    TVariables
  >;

  "sendAdminEmail+"<
    XAlias extends string = "sendAdminEmail",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sendAdminEmail", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PaymentChannelFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~sendAdminEmail": PaymentChannelFetcher<
    Omit<T, "sendAdminEmail">,
    TVariables
  >;
}

export const paymentChannel$: PaymentChannelFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "PaymentChannel",
    "EMBEDDED",
    [],
    [
      "ID",
      "stoID",
      "channelType",
      "title",
      "details",
      "currencyID",
      {
        category: "SCALAR",
        name: "currency",
        targetTypeName: "Currency",
      },
      "isActive",
      "canWithdrawFunds",
      "depositInstructionText",
      "depositInstructionEmailHeader",
      "sendInstructionalDepositEmail",
      "adminEmailHeader",
      "adminEmailBody",
      "sendAdminEmail",
    ]
  ),
  undefined
);

export const paymentChannel$$ =
  paymentChannel$.ID.stoID.channelType.title.details.currencyID.isActive
    .canWithdrawFunds.depositInstructionText.depositInstructionEmailHeader
    .sendInstructionalDepositEmail.adminEmailHeader.adminEmailBody
    .sendAdminEmail;
