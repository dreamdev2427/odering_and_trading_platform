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
export interface InvestorCategoryFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"InvestorCategory", T, TVariables> {
  on<
    XName extends ImplementationType<"InvestorCategory">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InvestorCategoryFetcher<
    XName extends "InvestorCategory"
      ? T & X
      : WithTypeName<T, ImplementationType<"InvestorCategory">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"InvestorCategory">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): InvestorCategoryFetcher<T, TVariables>;

  readonly __typename: InvestorCategoryFetcher<
    T & { __typename: ImplementationType<"InvestorCategory"> },
    TVariables
  >;

  readonly value: InvestorCategoryFetcher<
    T & { readonly value: number },
    TVariables
  >;

  "value+"<
    XAlias extends string = "value",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"value", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorCategoryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~value": InvestorCategoryFetcher<Omit<T, "value">, TVariables>;

  readonly label: InvestorCategoryFetcher<
    T & { readonly label: string },
    TVariables
  >;

  "label+"<
    XAlias extends string = "label",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"label", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorCategoryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~label": InvestorCategoryFetcher<Omit<T, "label">, TVariables>;
}

export const investorCategory$: InvestorCategoryFetcher<{}, {}> = createFetcher(
  createFetchableType("InvestorCategory", "EMBEDDED", [], ["value", "label"]),
  undefined
);

export const investorCategory$$ = investorCategory$.value.label;
