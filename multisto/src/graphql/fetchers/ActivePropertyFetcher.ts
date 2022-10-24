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
export interface ActivePropertyFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"ActiveProperty", T, TVariables> {
  on<
    XName extends ImplementationType<"ActiveProperty">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ActivePropertyFetcher<
    XName extends "ActiveProperty"
      ? T & X
      : WithTypeName<T, ImplementationType<"ActiveProperty">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"ActiveProperty">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): ActivePropertyFetcher<T, TVariables>;

  readonly __typename: ActivePropertyFetcher<
    T & { __typename: ImplementationType<"ActiveProperty"> },
    TVariables
  >;

  readonly ID: ActivePropertyFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ActivePropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": ActivePropertyFetcher<Omit<T, "ID">, TVariables>;

  readonly title: ActivePropertyFetcher<
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
  ): ActivePropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": ActivePropertyFetcher<Omit<T, "title">, TVariables>;

  readonly details: ActivePropertyFetcher<
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
  ): ActivePropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~details": ActivePropertyFetcher<Omit<T, "details">, TVariables>;

  readonly picture: ActivePropertyFetcher<
    T & { readonly picture: string },
    TVariables
  >;

  "picture+"<
    XAlias extends string = "picture",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"picture", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ActivePropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~picture": ActivePropertyFetcher<Omit<T, "picture">, TVariables>;

  readonly projectCost: ActivePropertyFetcher<
    T & { readonly projectCost: number },
    TVariables
  >;

  "projectCost+"<
    XAlias extends string = "projectCost",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"projectCost", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ActivePropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~projectCost": ActivePropertyFetcher<
    Omit<T, "projectCost">,
    TVariables
  >;

  readonly createdAt: ActivePropertyFetcher<
    T & { readonly createdAt: string },
    TVariables
  >;

  "createdAt+"<
    XAlias extends string = "createdAt",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"createdAt", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ActivePropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~createdAt": ActivePropertyFetcher<
    Omit<T, "createdAt">,
    TVariables
  >;

  readonly popularity: ActivePropertyFetcher<
    T & { readonly popularity: number },
    TVariables
  >;

  "popularity+"<
    XAlias extends string = "popularity",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"popularity", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ActivePropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~popularity": ActivePropertyFetcher<
    Omit<T, "popularity">,
    TVariables
  >;

  readonly isBuyButtonEnabled: ActivePropertyFetcher<
    T & { readonly isBuyButtonEnabled: boolean },
    TVariables
  >;

  "isBuyButtonEnabled+"<
    XAlias extends string = "isBuyButtonEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBuyButtonEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ActivePropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isBuyButtonEnabled": ActivePropertyFetcher<
    Omit<T, "isBuyButtonEnabled">,
    TVariables
  >;
}

export const activeProperty$: ActivePropertyFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "ActiveProperty",
    "EMBEDDED",
    [],
    [
      "ID",
      "title",
      "details",
      "picture",
      "projectCost",
      "createdAt",
      "popularity",
      "isBuyButtonEnabled",
    ]
  ),
  undefined
);

export const activeProperty$$ =
  activeProperty$.ID.title.details.picture.projectCost.createdAt.popularity
    .isBuyButtonEnabled;
