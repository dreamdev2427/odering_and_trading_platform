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
export interface KycPageFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"KycPage", T, TVariables> {
  on<
    XName extends ImplementationType<"KycPage">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): KycPageFetcher<
    XName extends "KycPage"
      ? T & X
      : WithTypeName<T, ImplementationType<"KycPage">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"KycPage">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): KycPageFetcher<T, TVariables>;

  readonly __typename: KycPageFetcher<
    T & { __typename: ImplementationType<"KycPage"> },
    TVariables
  >;

  fields<X extends object, XVariables extends object>(
    child: ObjectFetcher<"KycField", X, XVariables>
  ): KycPageFetcher<
    T & { readonly fields: readonly X[] },
    TVariables & XVariables
  >;

  fields<
    X extends object,
    XVariables extends object,
    XAlias extends string = "fields",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"KycField", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fields", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): KycPageFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  pages<X extends object, XVariables extends object>(
    child: ObjectFetcher<"KycPage", X, XVariables>
  ): KycPageFetcher<
    T & { readonly pages: readonly X[] },
    TVariables & XVariables
  >;

  pages<
    X extends object,
    XVariables extends object,
    XAlias extends string = "pages",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"KycPage", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"pages", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): KycPageFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly name: KycPageFetcher<T & { readonly name: string }, TVariables>;

  "name+"<
    XAlias extends string = "name",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"name", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): KycPageFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~name": KycPageFetcher<Omit<T, "name">, TVariables>;

  readonly title: KycPageFetcher<T & { readonly title: string }, TVariables>;

  "title+"<
    XAlias extends string = "title",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"title", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): KycPageFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": KycPageFetcher<Omit<T, "title">, TVariables>;

  readonly icon: KycPageFetcher<T & { readonly icon?: string }, TVariables>;

  "icon+"<
    XAlias extends string = "icon",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"icon", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): KycPageFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~icon": KycPageFetcher<Omit<T, "icon">, TVariables>;
}

export const kycPage$: KycPageFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "KycPage",
    "EMBEDDED",
    [],
    [
      {
        category: "LIST",
        name: "fields",
        targetTypeName: "KycField",
      },
      {
        category: "LIST",
        name: "pages",
        targetTypeName: "KycPage",
      },
      "name",
      "title",
      {
        category: "SCALAR",
        name: "icon",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const kycPage$$ = kycPage$.name.title.icon;
