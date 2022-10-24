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
export interface MoonpayConfigFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"MoonpayConfig", T, TVariables> {
  on<
    XName extends ImplementationType<"MoonpayConfig">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): MoonpayConfigFetcher<
    XName extends "MoonpayConfig"
      ? T & X
      : WithTypeName<T, ImplementationType<"MoonpayConfig">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"MoonpayConfig">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): MoonpayConfigFetcher<T, TVariables>;

  readonly __typename: MoonpayConfigFetcher<
    T & { __typename: ImplementationType<"MoonpayConfig"> },
    TVariables
  >;

  readonly enabled: MoonpayConfigFetcher<
    T & { readonly enabled?: boolean },
    TVariables
  >;

  "enabled+"<
    XAlias extends string = "enabled",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"enabled", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: boolean },
    TVariables & XDirectiveVariables
  >;

  readonly "~enabled": MoonpayConfigFetcher<Omit<T, "enabled">, TVariables>;

  readonly publishableKey: MoonpayConfigFetcher<
    T & { readonly publishableKey?: string },
    TVariables
  >;

  "publishableKey+"<
    XAlias extends string = "publishableKey",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"publishableKey", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~publishableKey": MoonpayConfigFetcher<
    Omit<T, "publishableKey">,
    TVariables
  >;

  readonly secretKey: MoonpayConfigFetcher<
    T & { readonly secretKey?: string },
    TVariables
  >;

  "secretKey+"<
    XAlias extends string = "secretKey",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"secretKey", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~secretKey": MoonpayConfigFetcher<Omit<T, "secretKey">, TVariables>;

  readonly webhookKey: MoonpayConfigFetcher<
    T & { readonly webhookKey?: string },
    TVariables
  >;

  "webhookKey+"<
    XAlias extends string = "webhookKey",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"webhookKey", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~webhookKey": MoonpayConfigFetcher<
    Omit<T, "webhookKey">,
    TVariables
  >;

  readonly redirectUrl: MoonpayConfigFetcher<
    T & { readonly redirectUrl?: string },
    TVariables
  >;

  "redirectUrl+"<
    XAlias extends string = "redirectUrl",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"redirectUrl", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~redirectUrl": MoonpayConfigFetcher<
    Omit<T, "redirectUrl">,
    TVariables
  >;

  readonly defaultCurrency: MoonpayConfigFetcher<
    T & { readonly defaultCurrency?: string },
    TVariables
  >;

  "defaultCurrency+"<
    XAlias extends string = "defaultCurrency",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"defaultCurrency", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~defaultCurrency": MoonpayConfigFetcher<
    Omit<T, "defaultCurrency">,
    TVariables
  >;

  readonly defaultCurrencyID: MoonpayConfigFetcher<
    T & { readonly defaultCurrencyID?: string },
    TVariables
  >;

  "defaultCurrencyID+"<
    XAlias extends string = "defaultCurrencyID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"defaultCurrencyID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~defaultCurrencyID": MoonpayConfigFetcher<
    Omit<T, "defaultCurrencyID">,
    TVariables
  >;

  stoWallets<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MoonpayStoWallet", X, XVariables>
  ): MoonpayConfigFetcher<
    T & { readonly stoWallets?: readonly X[] },
    TVariables & XVariables
  >;

  stoWallets<
    X extends object,
    XVariables extends object,
    XAlias extends string = "stoWallets",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MoonpayStoWallet", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"stoWallets", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly colorCode: MoonpayConfigFetcher<
    T & { readonly colorCode?: string },
    TVariables
  >;

  "colorCode+"<
    XAlias extends string = "colorCode",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"colorCode", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~colorCode": MoonpayConfigFetcher<Omit<T, "colorCode">, TVariables>;

  readonly lockAmount: MoonpayConfigFetcher<
    T & { readonly lockAmount?: boolean },
    TVariables
  >;

  "lockAmount+"<
    XAlias extends string = "lockAmount",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"lockAmount", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: boolean },
    TVariables & XDirectiveVariables
  >;

  readonly "~lockAmount": MoonpayConfigFetcher<
    Omit<T, "lockAmount">,
    TVariables
  >;

  readonly liveUrl: MoonpayConfigFetcher<
    T & { readonly liveUrl?: string },
    TVariables
  >;

  "liveUrl+"<
    XAlias extends string = "liveUrl",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"liveUrl", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~liveUrl": MoonpayConfigFetcher<Omit<T, "liveUrl">, TVariables>;

  readonly sandboxUrl: MoonpayConfigFetcher<
    T & { readonly sandboxUrl?: string },
    TVariables
  >;

  "sandboxUrl+"<
    XAlias extends string = "sandboxUrl",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sandboxUrl", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~sandboxUrl": MoonpayConfigFetcher<
    Omit<T, "sandboxUrl">,
    TVariables
  >;

  readonly liveMode: MoonpayConfigFetcher<
    T & { readonly liveMode?: boolean },
    TVariables
  >;

  "liveMode+"<
    XAlias extends string = "liveMode",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"liveMode", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: boolean },
    TVariables & XDirectiveVariables
  >;

  readonly "~liveMode": MoonpayConfigFetcher<Omit<T, "liveMode">, TVariables>;

  readonly doRoundUpOn: MoonpayConfigFetcher<
    T & { readonly doRoundUpOn?: number },
    TVariables
  >;

  "doRoundUpOn+"<
    XAlias extends string = "doRoundUpOn",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"doRoundUpOn", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~doRoundUpOn": MoonpayConfigFetcher<
    Omit<T, "doRoundUpOn">,
    TVariables
  >;

  readonly doRoundDownOn: MoonpayConfigFetcher<
    T & { readonly doRoundDownOn?: number },
    TVariables
  >;

  "doRoundDownOn+"<
    XAlias extends string = "doRoundDownOn",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"doRoundDownOn", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~doRoundDownOn": MoonpayConfigFetcher<
    Omit<T, "doRoundDownOn">,
    TVariables
  >;

  readonly language: MoonpayConfigFetcher<
    T & { readonly language?: string },
    TVariables
  >;

  "language+"<
    XAlias extends string = "language",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"language", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayConfigFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~language": MoonpayConfigFetcher<Omit<T, "language">, TVariables>;
}

export const moonpayConfig$: MoonpayConfigFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "MoonpayConfig",
    "EMBEDDED",
    [],
    [
      {
        category: "SCALAR",
        name: "enabled",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "publishableKey",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "secretKey",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "webhookKey",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "redirectUrl",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "defaultCurrency",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "defaultCurrencyID",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "stoWallets",
        targetTypeName: "MoonpayStoWallet",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "colorCode",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "lockAmount",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "liveUrl",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "sandboxUrl",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "liveMode",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "doRoundUpOn",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "doRoundDownOn",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "language",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const moonpayConfig$$ =
  moonpayConfig$.enabled.publishableKey.secretKey.webhookKey.redirectUrl
    .defaultCurrency.defaultCurrencyID.colorCode.lockAmount.liveUrl.sandboxUrl
    .liveMode.doRoundUpOn.doRoundDownOn.language;
