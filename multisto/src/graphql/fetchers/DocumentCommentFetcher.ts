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
export interface DocumentCommentFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"DocumentComment", T, TVariables> {
  on<
    XName extends ImplementationType<"DocumentComment">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): DocumentCommentFetcher<
    XName extends "DocumentComment"
      ? T & X
      : WithTypeName<T, ImplementationType<"DocumentComment">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"DocumentComment">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): DocumentCommentFetcher<T, TVariables>;

  readonly __typename: DocumentCommentFetcher<
    T & { __typename: ImplementationType<"DocumentComment"> },
    TVariables
  >;

  readonly ID: DocumentCommentFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentCommentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": DocumentCommentFetcher<Omit<T, "ID">, TVariables>;

  readonly stoID: DocumentCommentFetcher<
    T & { readonly stoID?: number },
    TVariables
  >;

  "stoID+"<
    XAlias extends string = "stoID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentCommentFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": DocumentCommentFetcher<Omit<T, "stoID">, TVariables>;

  readonly documentID: DocumentCommentFetcher<
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
  ): DocumentCommentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~documentID": DocumentCommentFetcher<
    Omit<T, "documentID">,
    TVariables
  >;

  readonly text: DocumentCommentFetcher<
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
  ): DocumentCommentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~text": DocumentCommentFetcher<Omit<T, "text">, TVariables>;

  readonly investorID: DocumentCommentFetcher<
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
  ): DocumentCommentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": DocumentCommentFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly modified: DocumentCommentFetcher<
    T & { readonly modified?: string },
    TVariables
  >;

  "modified+"<
    XAlias extends string = "modified",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"modified", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentCommentFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~modified": DocumentCommentFetcher<Omit<T, "modified">, TVariables>;

  readonly replyText: DocumentCommentFetcher<
    T & { readonly replyText: string },
    TVariables
  >;

  "replyText+"<
    XAlias extends string = "replyText",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"replyText", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentCommentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~replyText": DocumentCommentFetcher<
    Omit<T, "replyText">,
    TVariables
  >;

  readonly replyByID: DocumentCommentFetcher<
    T & { readonly replyByID: number },
    TVariables
  >;

  "replyByID+"<
    XAlias extends string = "replyByID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"replyByID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentCommentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~replyByID": DocumentCommentFetcher<
    Omit<T, "replyByID">,
    TVariables
  >;

  readonly dateReplyComment: DocumentCommentFetcher<
    T & { readonly dateReplyComment?: string },
    TVariables
  >;

  "dateReplyComment+"<
    XAlias extends string = "dateReplyComment",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateReplyComment", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentCommentFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~dateReplyComment": DocumentCommentFetcher<
    Omit<T, "dateReplyComment">,
    TVariables
  >;

  readonly isAccepted: DocumentCommentFetcher<
    T & { readonly isAccepted: number },
    TVariables
  >;

  "isAccepted+"<
    XAlias extends string = "isAccepted",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isAccepted", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentCommentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isAccepted": DocumentCommentFetcher<
    Omit<T, "isAccepted">,
    TVariables
  >;

  readonly isNew: DocumentCommentFetcher<
    T & { readonly isNew: number },
    TVariables
  >;

  "isNew+"<
    XAlias extends string = "isNew",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isNew", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentCommentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isNew": DocumentCommentFetcher<Omit<T, "isNew">, TVariables>;

  reply<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DocumentCommentReply", X, XVariables>
  ): DocumentCommentFetcher<T & { readonly reply: X }, TVariables & XVariables>;

  reply<
    X extends object,
    XVariables extends object,
    XAlias extends string = "reply",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DocumentCommentReply", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"reply", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentCommentFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const documentComment$: DocumentCommentFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "DocumentComment",
    "EMBEDDED",
    [],
    [
      "ID",
      {
        category: "SCALAR",
        name: "stoID",
        undefinable: true,
      },
      "documentID",
      "text",
      "investorID",
      {
        category: "SCALAR",
        name: "modified",
        undefinable: true,
      },
      "replyText",
      "replyByID",
      {
        category: "SCALAR",
        name: "dateReplyComment",
        undefinable: true,
      },
      "isAccepted",
      "isNew",
      {
        category: "SCALAR",
        name: "reply",
        targetTypeName: "DocumentCommentReply",
      },
    ]
  ),
  undefined
);

export const documentComment$$ =
  documentComment$.ID.stoID.documentID.text.investorID.modified.replyText
    .replyByID.dateReplyComment.isAccepted.isNew;
