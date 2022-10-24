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
export interface DetailPropertyFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"DetailProperty", T, TVariables> {
  on<
    XName extends ImplementationType<"DetailProperty">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): DetailPropertyFetcher<
    XName extends "DetailProperty"
      ? T & X
      : WithTypeName<T, ImplementationType<"DetailProperty">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"DetailProperty">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): DetailPropertyFetcher<T, TVariables>;

  readonly __typename: DetailPropertyFetcher<
    T & { __typename: ImplementationType<"DetailProperty"> },
    TVariables
  >;

  readonly ID: DetailPropertyFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DetailPropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": DetailPropertyFetcher<Omit<T, "ID">, TVariables>;

  readonly title: DetailPropertyFetcher<
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
  ): DetailPropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": DetailPropertyFetcher<Omit<T, "title">, TVariables>;

  readonly details: DetailPropertyFetcher<
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
  ): DetailPropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~details": DetailPropertyFetcher<Omit<T, "details">, TVariables>;

  readonly picture: DetailPropertyFetcher<
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
  ): DetailPropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~picture": DetailPropertyFetcher<Omit<T, "picture">, TVariables>;

  readonly projectCost: DetailPropertyFetcher<
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
  ): DetailPropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~projectCost": DetailPropertyFetcher<
    Omit<T, "projectCost">,
    TVariables
  >;

  readonly createdAt: DetailPropertyFetcher<
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
  ): DetailPropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~createdAt": DetailPropertyFetcher<
    Omit<T, "createdAt">,
    TVariables
  >;

  readonly popularity: DetailPropertyFetcher<
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
  ): DetailPropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~popularity": DetailPropertyFetcher<
    Omit<T, "popularity">,
    TVariables
  >;

  readonly isBuyButtonEnabled: DetailPropertyFetcher<
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
  ): DetailPropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isBuyButtonEnabled": DetailPropertyFetcher<
    Omit<T, "isBuyButtonEnabled">,
    TVariables
  >;

  readonly fullDetails: DetailPropertyFetcher<
    T & { readonly fullDetails: string },
    TVariables
  >;

  "fullDetails+"<
    XAlias extends string = "fullDetails",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"fullDetails", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DetailPropertyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~fullDetails": DetailPropertyFetcher<
    Omit<T, "fullDetails">,
    TVariables
  >;

  images<X extends object, XVariables extends object>(
    child: ObjectFetcher<"PropertyFile", X, XVariables>
  ): DetailPropertyFetcher<
    T & { readonly images?: readonly X[] },
    TVariables & XVariables
  >;

  images<
    X extends object,
    XVariables extends object,
    XAlias extends string = "images",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"PropertyFile", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"images", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DetailPropertyFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >;

  documents<X extends object, XVariables extends object>(
    child: ObjectFetcher<"PropertyFile", X, XVariables>
  ): DetailPropertyFetcher<
    T & { readonly documents?: readonly X[] },
    TVariables & XVariables
  >;

  documents<
    X extends object,
    XVariables extends object,
    XAlias extends string = "documents",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"PropertyFile", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"documents", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DetailPropertyFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const detailProperty$: DetailPropertyFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "DetailProperty",
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
      "fullDetails",
      {
        category: "LIST",
        name: "images",
        targetTypeName: "PropertyFile",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "documents",
        targetTypeName: "PropertyFile",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const detailProperty$$ =
  detailProperty$.ID.title.details.picture.projectCost.createdAt.popularity
    .isBuyButtonEnabled.fullDetails;
