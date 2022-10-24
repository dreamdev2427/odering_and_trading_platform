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
export interface KycDataFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"KycData", T, TVariables> {
  on<
    XName extends ImplementationType<"KycData">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): KycDataFetcher<
    XName extends "KycData"
      ? T & X
      : WithTypeName<T, ImplementationType<"KycData">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"KycData">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): KycDataFetcher<T, TVariables>;

  readonly __typename: KycDataFetcher<
    T & { __typename: ImplementationType<"KycData"> },
    TVariables
  >;

  readonly ID: KycDataFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): KycDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": KycDataFetcher<Omit<T, "ID">, TVariables>;

  readonly isKYC: KycDataFetcher<T & { readonly isKYC: boolean }, TVariables>;

  "isKYC+"<
    XAlias extends string = "isKYC",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isKYC", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): KycDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isKYC": KycDataFetcher<Omit<T, "isKYC">, TVariables>;

  readonly isActive: KycDataFetcher<
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
  ): KycDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isActive": KycDataFetcher<Omit<T, "isActive">, TVariables>;

  readonly status: KycDataFetcher<T & { readonly status: number }, TVariables>;

  "status+"<
    XAlias extends string = "status",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"status", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): KycDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~status": KycDataFetcher<Omit<T, "status">, TVariables>;
}

export const kycData$: KycDataFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "KycData",
    "EMBEDDED",
    [],
    ["ID", "isKYC", "isActive", "status"]
  ),
  undefined
);

export const kycData$$ = kycData$.ID.isKYC.isActive.status;
