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
export interface CloudFilesFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"CloudFiles", T, TVariables> {
  on<
    XName extends ImplementationType<"CloudFiles">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): CloudFilesFetcher<
    XName extends "CloudFiles"
      ? T & X
      : WithTypeName<T, ImplementationType<"CloudFiles">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"CloudFiles">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): CloudFilesFetcher<T, TVariables>;

  readonly __typename: CloudFilesFetcher<
    T & { __typename: ImplementationType<"CloudFiles"> },
    TVariables
  >;

  readonly ID: CloudFilesFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CloudFilesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": CloudFilesFetcher<Omit<T, "ID">, TVariables>;

  readonly fileName: CloudFilesFetcher<
    T & { readonly fileName: string },
    TVariables
  >;

  "fileName+"<
    XAlias extends string = "fileName",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"fileName", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CloudFilesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~fileName": CloudFilesFetcher<Omit<T, "fileName">, TVariables>;

  readonly url: CloudFilesFetcher<T & { readonly url?: string }, TVariables>;

  "url+"<
    XAlias extends string = "url",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"url", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): CloudFilesFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~url": CloudFilesFetcher<Omit<T, "url">, TVariables>;

  readonly modified: CloudFilesFetcher<
    T & { readonly modified: string },
    TVariables
  >;

  "modified+"<
    XAlias extends string = "modified",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"modified", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): CloudFilesFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~modified": CloudFilesFetcher<Omit<T, "modified">, TVariables>;
}

export const cloudFiles$: CloudFilesFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "CloudFiles",
    "EMBEDDED",
    [],
    [
      "ID",
      "fileName",
      {
        category: "SCALAR",
        name: "url",
        undefinable: true,
      },
      "modified",
    ]
  ),
  undefined
);

export const cloudFiles$$ = cloudFiles$.ID.fileName.url.modified;
