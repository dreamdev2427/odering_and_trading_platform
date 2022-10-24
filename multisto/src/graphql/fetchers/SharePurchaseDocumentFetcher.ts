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
export interface SharePurchaseDocumentFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"SharePurchaseDocument", T, TVariables> {
  on<
    XName extends ImplementationType<"SharePurchaseDocument">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): SharePurchaseDocumentFetcher<
    XName extends "SharePurchaseDocument"
      ? T & X
      : WithTypeName<T, ImplementationType<"SharePurchaseDocument">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"SharePurchaseDocument">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): SharePurchaseDocumentFetcher<T, TVariables>;

  readonly __typename: SharePurchaseDocumentFetcher<
    T & { __typename: ImplementationType<"SharePurchaseDocument"> },
    TVariables
  >;

  readonly requireOnce: SharePurchaseDocumentFetcher<
    T & { readonly requireOnce: number },
    TVariables
  >;

  "requireOnce+"<
    XAlias extends string = "requireOnce",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"requireOnce", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SharePurchaseDocumentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~requireOnce": SharePurchaseDocumentFetcher<
    Omit<T, "requireOnce">,
    TVariables
  >;

  document<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Document", X, XVariables>
  ): SharePurchaseDocumentFetcher<
    T & { readonly document: X },
    TVariables & XVariables
  >;

  document<
    X extends object,
    XVariables extends object,
    XAlias extends string = "document",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Document", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"document", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SharePurchaseDocumentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly status: SharePurchaseDocumentFetcher<
    T & { readonly status: number },
    TVariables
  >;

  "status+"<
    XAlias extends string = "status",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"status", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SharePurchaseDocumentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~status": SharePurchaseDocumentFetcher<
    Omit<T, "status">,
    TVariables
  >;
}

export const sharePurchaseDocument$: SharePurchaseDocumentFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "SharePurchaseDocument",
      "EMBEDDED",
      [],
      [
        "requireOnce",
        {
          category: "SCALAR",
          name: "document",
          targetTypeName: "Document",
        },
        "status",
      ]
    ),
    undefined
  );

export const sharePurchaseDocument$$ =
  sharePurchaseDocument$.requireOnce.status;
