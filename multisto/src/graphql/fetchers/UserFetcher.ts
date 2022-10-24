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
export interface UserFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"User", T, TVariables> {
  on<
    XName extends ImplementationType<"User">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): UserFetcher<
    XName extends "User"
      ? T & X
      : WithTypeName<T, ImplementationType<"User">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"User">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): UserFetcher<T, TVariables>;

  readonly __typename: UserFetcher<
    T & { __typename: ImplementationType<"User"> },
    TVariables
  >;

  investor<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Investor", X, XVariables>
  ): UserFetcher<T & { readonly investor: X }, TVariables & XVariables>;

  investor<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investor",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Investor", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investor", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): UserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  sto<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Sto", X, XVariables>
  ): UserFetcher<T & { readonly sto: X }, TVariables & XVariables>;

  sto<
    X extends object,
    XVariables extends object,
    XAlias extends string = "sto",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Sto", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"sto", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): UserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  investorSto<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorSto", X, XVariables>
  ): UserFetcher<T & { readonly investorSto: X }, TVariables & XVariables>;

  investorSto<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorSto",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorSto", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorSto", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): UserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const user$: UserFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "User",
    "EMBEDDED",
    [],
    [
      {
        category: "SCALAR",
        name: "investor",
        targetTypeName: "Investor",
      },
      {
        category: "SCALAR",
        name: "sto",
        targetTypeName: "Sto",
      },
      {
        category: "SCALAR",
        name: "investorSto",
        targetTypeName: "InvestorSto",
      },
    ]
  ),
  undefined
);
