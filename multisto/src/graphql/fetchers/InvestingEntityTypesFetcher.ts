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
export interface InvestingEntityTypesFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"InvestingEntityTypes", T, TVariables> {
  on<
    XName extends ImplementationType<"InvestingEntityTypes">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InvestingEntityTypesFetcher<
    XName extends "InvestingEntityTypes"
      ? T & X
      : WithTypeName<T, ImplementationType<"InvestingEntityTypes">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"InvestingEntityTypes">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): InvestingEntityTypesFetcher<T, TVariables>;

  readonly __typename: InvestingEntityTypesFetcher<
    T & { __typename: ImplementationType<"InvestingEntityTypes"> },
    TVariables
  >;

  readonly ID: InvestingEntityTypesFetcher<
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
  ): InvestingEntityTypesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": InvestingEntityTypesFetcher<Omit<T, "ID">, TVariables>;

  readonly title: InvestingEntityTypesFetcher<
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
  ): InvestingEntityTypesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": InvestingEntityTypesFetcher<Omit<T, "title">, TVariables>;

  readonly countries: InvestingEntityTypesFetcher<
    T & { readonly countries: readonly string[] },
    TVariables
  >;

  "countries+"<
    XAlias extends string = "countries",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"countries", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityTypesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly string[] }
        : { readonly [key in XAlias]: readonly string[] }),
    TVariables & XDirectiveVariables
  >;

  readonly "~countries": InvestingEntityTypesFetcher<
    Omit<T, "countries">,
    TVariables
  >;
}

export const investingEntityTypes$: InvestingEntityTypesFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "InvestingEntityTypes",
      "EMBEDDED",
      [],
      ["ID", "title", "countries"]
    ),
    undefined
  );

export const investingEntityTypes$$ = investingEntityTypes$.ID.title.countries;
