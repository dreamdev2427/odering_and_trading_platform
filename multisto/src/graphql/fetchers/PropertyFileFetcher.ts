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
export interface PropertyFileFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"PropertyFile", T, TVariables> {
  on<
    XName extends ImplementationType<"PropertyFile">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): PropertyFileFetcher<
    XName extends "PropertyFile"
      ? T & X
      : WithTypeName<T, ImplementationType<"PropertyFile">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"PropertyFile">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): PropertyFileFetcher<T, TVariables>;

  readonly __typename: PropertyFileFetcher<
    T & { __typename: ImplementationType<"PropertyFile"> },
    TVariables
  >;

  readonly ID: PropertyFileFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PropertyFileFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": PropertyFileFetcher<Omit<T, "ID">, TVariables>;

  readonly title: PropertyFileFetcher<
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
  ): PropertyFileFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": PropertyFileFetcher<Omit<T, "title">, TVariables>;

  readonly url: PropertyFileFetcher<T & { readonly url: string }, TVariables>;

  "url+"<
    XAlias extends string = "url",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"url", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PropertyFileFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~url": PropertyFileFetcher<Omit<T, "url">, TVariables>;
}

export const propertyFile$: PropertyFileFetcher<{}, {}> = createFetcher(
  createFetchableType("PropertyFile", "EMBEDDED", [], ["ID", "title", "url"]),
  undefined
);

export const propertyFile$$ = propertyFile$.ID.title.url;
