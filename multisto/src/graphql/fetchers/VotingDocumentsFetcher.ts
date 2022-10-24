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
export interface VotingDocumentsFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"VotingDocuments", T, TVariables> {
  on<
    XName extends ImplementationType<"VotingDocuments">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): VotingDocumentsFetcher<
    XName extends "VotingDocuments"
      ? T & X
      : WithTypeName<T, ImplementationType<"VotingDocuments">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"VotingDocuments">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): VotingDocumentsFetcher<T, TVariables>;

  readonly __typename: VotingDocumentsFetcher<
    T & { __typename: ImplementationType<"VotingDocuments"> },
    TVariables
  >;

  readonly ID: VotingDocumentsFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingDocumentsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": VotingDocumentsFetcher<Omit<T, "ID">, TVariables>;

  readonly votingID: VotingDocumentsFetcher<
    T & { readonly votingID: number },
    TVariables
  >;

  "votingID+"<
    XAlias extends string = "votingID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"votingID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingDocumentsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~votingID": VotingDocumentsFetcher<Omit<T, "votingID">, TVariables>;

  readonly votingOptionID: VotingDocumentsFetcher<
    T & { readonly votingOptionID: number },
    TVariables
  >;

  "votingOptionID+"<
    XAlias extends string = "votingOptionID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"votingOptionID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingDocumentsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~votingOptionID": VotingDocumentsFetcher<
    Omit<T, "votingOptionID">,
    TVariables
  >;

  votingOption<X extends object, XVariables extends object>(
    child: ObjectFetcher<"VotingOption", X, XVariables>
  ): VotingDocumentsFetcher<
    T & { readonly votingOption: X },
    TVariables & XVariables
  >;

  votingOption<
    X extends object,
    XVariables extends object,
    XAlias extends string = "votingOption",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"VotingOption", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"votingOption", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingDocumentsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly documentLink: VotingDocumentsFetcher<
    T & { readonly documentLink: string },
    TVariables
  >;

  "documentLink+"<
    XAlias extends string = "documentLink",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"documentLink", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingDocumentsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~documentLink": VotingDocumentsFetcher<
    Omit<T, "documentLink">,
    TVariables
  >;

  readonly title: VotingDocumentsFetcher<
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
  ): VotingDocumentsFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": VotingDocumentsFetcher<Omit<T, "title">, TVariables>;

  readonly description: VotingDocumentsFetcher<
    T & { readonly description?: string },
    TVariables
  >;

  "description+"<
    XAlias extends string = "description",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"description", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): VotingDocumentsFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~description": VotingDocumentsFetcher<
    Omit<T, "description">,
    TVariables
  >;
}

export const votingDocuments$: VotingDocumentsFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "VotingDocuments",
    "EMBEDDED",
    [],
    [
      "ID",
      "votingID",
      "votingOptionID",
      {
        category: "SCALAR",
        name: "votingOption",
        targetTypeName: "VotingOption",
      },
      "documentLink",
      "title",
      {
        category: "SCALAR",
        name: "description",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const votingDocuments$$ =
  votingDocuments$.ID.votingID.votingOptionID.documentLink.title.description;
