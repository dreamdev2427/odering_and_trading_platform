import type { FieldOptions, DirectiveArgs } from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { WithTypeName, ImplementationType } from "../CommonTypes";
import type { FEE_BENEFICIARY } from "../enums";
import type { FEE_TYPE } from "../enums";
import type { COMMISSION_TYPE } from "../enums";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface FeeFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Fee", T, TVariables> {
  on<
    XName extends ImplementationType<"Fee">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): FeeFetcher<
    XName extends "Fee"
      ? T & X
      : WithTypeName<T, ImplementationType<"Fee">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Fee">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): FeeFetcher<T, TVariables>;

  readonly __typename: FeeFetcher<
    T & { __typename: ImplementationType<"Fee"> },
    TVariables
  >;

  readonly ID: FeeFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FeeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": FeeFetcher<Omit<T, "ID">, TVariables>;

  readonly stoID: FeeFetcher<T & { readonly stoID: number }, TVariables>;

  "stoID+"<
    XAlias extends string = "stoID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FeeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": FeeFetcher<Omit<T, "stoID">, TVariables>;

  readonly beneficiary: FeeFetcher<
    T & { readonly beneficiary: FEE_BENEFICIARY },
    TVariables
  >;

  "beneficiary+"<
    XAlias extends string = "beneficiary",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"beneficiary", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FeeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: FEE_BENEFICIARY }
        : { readonly [key in XAlias]: FEE_BENEFICIARY }),
    TVariables & XDirectiveVariables
  >;

  readonly "~beneficiary": FeeFetcher<Omit<T, "beneficiary">, TVariables>;

  readonly type: FeeFetcher<T & { readonly type: FEE_TYPE }, TVariables>;

  "type+"<
    XAlias extends string = "type",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"type", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FeeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: FEE_TYPE }
        : { readonly [key in XAlias]: FEE_TYPE }),
    TVariables & XDirectiveVariables
  >;

  readonly "~type": FeeFetcher<Omit<T, "type">, TVariables>;

  readonly amount: FeeFetcher<T & { readonly amount: number }, TVariables>;

  "amount+"<
    XAlias extends string = "amount",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"amount", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FeeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~amount": FeeFetcher<Omit<T, "amount">, TVariables>;

  readonly status: FeeFetcher<
    T & { readonly status: COMMISSION_TYPE },
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
  ): FeeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: COMMISSION_TYPE }
        : { readonly [key in XAlias]: COMMISSION_TYPE }),
    TVariables & XDirectiveVariables
  >;

  readonly "~status": FeeFetcher<Omit<T, "status">, TVariables>;
}

export const fee$: FeeFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Fee",
    "EMBEDDED",
    [],
    ["ID", "stoID", "beneficiary", "type", "amount", "status"]
  ),
  undefined
);

export const fee$$ = fee$.ID.stoID.beneficiary.type.amount.status;
