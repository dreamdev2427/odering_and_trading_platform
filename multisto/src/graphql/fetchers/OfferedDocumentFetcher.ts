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
export interface OfferedDocumentFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"OfferedDocument", T, TVariables> {
  on<
    XName extends ImplementationType<"OfferedDocument">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): OfferedDocumentFetcher<
    XName extends "OfferedDocument"
      ? T & X
      : WithTypeName<T, ImplementationType<"OfferedDocument">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"OfferedDocument">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): OfferedDocumentFetcher<T, TVariables>;

  readonly __typename: OfferedDocumentFetcher<
    T & { __typename: ImplementationType<"OfferedDocument"> },
    TVariables
  >;

  readonly ID: OfferedDocumentFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): OfferedDocumentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": OfferedDocumentFetcher<Omit<T, "ID">, TVariables>;

  readonly title: OfferedDocumentFetcher<
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
  ): OfferedDocumentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": OfferedDocumentFetcher<Omit<T, "title">, TVariables>;

  readonly documentID: OfferedDocumentFetcher<
    T & { readonly documentID: number },
    TVariables
  >;

  "documentID+"<
    XAlias extends string = "documentID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"documentID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): OfferedDocumentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~documentID": OfferedDocumentFetcher<
    Omit<T, "documentID">,
    TVariables
  >;

  readonly from: OfferedDocumentFetcher<
    T & { readonly from?: string },
    TVariables
  >;

  "from+"<
    XAlias extends string = "from",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"from", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): OfferedDocumentFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~from": OfferedDocumentFetcher<Omit<T, "from">, TVariables>;

  readonly to: OfferedDocumentFetcher<T & { readonly to?: string }, TVariables>;

  "to+"<XAlias extends string = "to", XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<"to", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): OfferedDocumentFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~to": OfferedDocumentFetcher<Omit<T, "to">, TVariables>;

  readonly description: OfferedDocumentFetcher<
    T & { readonly description: string },
    TVariables
  >;

  "description+"<
    XAlias extends string = "description",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"description", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): OfferedDocumentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~description": OfferedDocumentFetcher<
    Omit<T, "description">,
    TVariables
  >;

  document<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Document", X, XVariables>
  ): OfferedDocumentFetcher<
    T & { readonly document?: X },
    TVariables & XVariables
  >;

  document<
    X extends object,
    XVariables extends object,
    XAlias extends string = "document",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Document", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"document", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): OfferedDocumentFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const offeredDocument$: OfferedDocumentFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "OfferedDocument",
    "EMBEDDED",
    [],
    [
      "ID",
      "title",
      "documentID",
      {
        category: "SCALAR",
        name: "from",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "to",
        undefinable: true,
      },
      "description",
      {
        category: "SCALAR",
        name: "document",
        targetTypeName: "Document",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const offeredDocument$$ =
  offeredDocument$.ID.title.documentID.from.to.description;
