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
export interface SettingsFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Settings", T, TVariables> {
  on<
    XName extends ImplementationType<"Settings">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): SettingsFetcher<
    XName extends "Settings"
      ? T & X
      : WithTypeName<T, ImplementationType<"Settings">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Settings">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): SettingsFetcher<T, TVariables>;

  readonly __typename: SettingsFetcher<
    T & { __typename: ImplementationType<"Settings"> },
    TVariables
  >;

  investorCategories<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorCategory", X, XVariables>
  ): SettingsFetcher<
    T & { readonly investorCategories: readonly X[] },
    TVariables & XVariables
  >;

  investorCategories<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorCategories",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorCategory", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorCategories", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SettingsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly isInternalExchangeEnabled: SettingsFetcher<
    T & { readonly isInternalExchangeEnabled: number },
    TVariables
  >;

  "isInternalExchangeEnabled+"<
    XAlias extends string = "isInternalExchangeEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isInternalExchangeEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SettingsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isInternalExchangeEnabled": SettingsFetcher<
    Omit<T, "isInternalExchangeEnabled">,
    TVariables
  >;

  readonly favicon: SettingsFetcher<
    T & { readonly favicon?: string },
    TVariables
  >;

  "favicon+"<
    XAlias extends string = "favicon",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"favicon", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): SettingsFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~favicon": SettingsFetcher<Omit<T, "favicon">, TVariables>;

  readonly tabTitle: SettingsFetcher<
    T & { readonly tabTitle?: string },
    TVariables
  >;

  "tabTitle+"<
    XAlias extends string = "tabTitle",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"tabTitle", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): SettingsFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~tabTitle": SettingsFetcher<Omit<T, "tabTitle">, TVariables>;
}

export const settings$: SettingsFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Settings",
    "EMBEDDED",
    [],
    [
      {
        category: "LIST",
        name: "investorCategories",
        targetTypeName: "InvestorCategory",
      },
      "isInternalExchangeEnabled",
      {
        category: "SCALAR",
        name: "favicon",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "tabTitle",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const settings$$ = settings$.isInternalExchangeEnabled.favicon.tabTitle;
