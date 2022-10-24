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
export interface DocumentCommentReplyFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"DocumentCommentReply", T, TVariables> {
  on<
    XName extends ImplementationType<"DocumentCommentReply">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): DocumentCommentReplyFetcher<
    XName extends "DocumentCommentReply"
      ? T & X
      : WithTypeName<T, ImplementationType<"DocumentCommentReply">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"DocumentCommentReply">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): DocumentCommentReplyFetcher<T, TVariables>;

  readonly __typename: DocumentCommentReplyFetcher<
    T & { __typename: ImplementationType<"DocumentCommentReply"> },
    TVariables
  >;

  readonly investorID: DocumentCommentReplyFetcher<
    T & { readonly investorID: number },
    TVariables
  >;

  "investorID+"<
    XAlias extends string = "investorID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentCommentReplyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": DocumentCommentReplyFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly text: DocumentCommentReplyFetcher<
    T & { readonly text: string },
    TVariables
  >;

  "text+"<
    XAlias extends string = "text",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"text", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentCommentReplyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~text": DocumentCommentReplyFetcher<Omit<T, "text">, TVariables>;

  readonly modified: DocumentCommentReplyFetcher<
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
  ): DocumentCommentReplyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~modified": DocumentCommentReplyFetcher<
    Omit<T, "modified">,
    TVariables
  >;
}

export const documentCommentReply$: DocumentCommentReplyFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "DocumentCommentReply",
      "EMBEDDED",
      [],
      ["investorID", "text", "modified"]
    ),
    undefined
  );

export const documentCommentReply$$ =
  documentCommentReply$.investorID.text.modified;
