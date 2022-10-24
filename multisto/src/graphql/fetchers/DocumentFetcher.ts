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
export interface DocumentFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Document", T, TVariables> {
  on<
    XName extends ImplementationType<"Document">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): DocumentFetcher<
    XName extends "Document"
      ? T & X
      : WithTypeName<T, ImplementationType<"Document">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Document">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): DocumentFetcher<T, TVariables>;

  readonly __typename: DocumentFetcher<
    T & { __typename: ImplementationType<"Document"> },
    TVariables
  >;

  readonly ID: DocumentFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": DocumentFetcher<Omit<T, "ID">, TVariables>;

  readonly title: DocumentFetcher<T & { readonly title: string }, TVariables>;

  "title+"<
    XAlias extends string = "title",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"title", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": DocumentFetcher<Omit<T, "title">, TVariables>;

  readonly contents: DocumentFetcher<
    T & { readonly contents?: string },
    TVariables
  >;

  "contents+"<
    XAlias extends string = "contents",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"contents", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~contents": DocumentFetcher<Omit<T, "contents">, TVariables>;

  readonly directoryID: DocumentFetcher<
    T & { readonly directoryID: number },
    TVariables
  >;

  "directoryID+"<
    XAlias extends string = "directoryID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"directoryID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~directoryID": DocumentFetcher<Omit<T, "directoryID">, TVariables>;

  readonly filetype: DocumentFetcher<
    T & { readonly filetype: number },
    TVariables
  >;

  "filetype+"<
    XAlias extends string = "filetype",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"filetype", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~filetype": DocumentFetcher<Omit<T, "filetype">, TVariables>;

  readonly docusignDocumentID: DocumentFetcher<
    T & { readonly docusignDocumentID?: string },
    TVariables
  >;

  "docusignDocumentID+"<
    XAlias extends string = "docusignDocumentID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"docusignDocumentID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~docusignDocumentID": DocumentFetcher<
    Omit<T, "docusignDocumentID">,
    TVariables
  >;

  readonly helloSignDocumentID: DocumentFetcher<
    T & { readonly helloSignDocumentID?: string },
    TVariables
  >;

  "helloSignDocumentID+"<
    XAlias extends string = "helloSignDocumentID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"helloSignDocumentID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~helloSignDocumentID": DocumentFetcher<
    Omit<T, "helloSignDocumentID">,
    TVariables
  >;

  offer<X extends object, XVariables extends object>(
    child: ObjectFetcher<"OfferedDocument", X, XVariables>
  ): DocumentFetcher<T & { readonly offer?: X }, TVariables & XVariables>;

  offer<
    X extends object,
    XVariables extends object,
    XAlias extends string = "offer",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"OfferedDocument", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"offer", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;

  submittedDocument<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DocumentUser", X, XVariables>
  ): DocumentFetcher<
    T & { readonly submittedDocument?: X },
    TVariables & XVariables
  >;

  submittedDocument<
    X extends object,
    XVariables extends object,
    XAlias extends string = "submittedDocument",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DocumentUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"submittedDocument", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;

  sharePurchaseDocument<X extends object, XVariables extends object>(
    child: ObjectFetcher<"SharePurchaseDocument", X, XVariables>
  ): DocumentFetcher<
    T & { readonly sharePurchaseDocument?: X },
    TVariables & XVariables
  >;

  sharePurchaseDocument<
    X extends object,
    XVariables extends object,
    XAlias extends string = "sharePurchaseDocument",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"SharePurchaseDocument", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"sharePurchaseDocument", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const document$: DocumentFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Document",
    "EMBEDDED",
    [],
    [
      "ID",
      "title",
      {
        category: "SCALAR",
        name: "contents",
        undefinable: true,
      },
      "directoryID",
      "filetype",
      {
        category: "SCALAR",
        name: "docusignDocumentID",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "helloSignDocumentID",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "offer",
        targetTypeName: "OfferedDocument",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "submittedDocument",
        targetTypeName: "DocumentUser",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "sharePurchaseDocument",
        targetTypeName: "SharePurchaseDocument",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const document$$ =
  document$.ID.title.contents.directoryID.filetype.docusignDocumentID
    .helloSignDocumentID;
