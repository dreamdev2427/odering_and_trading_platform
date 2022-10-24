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
export interface VotingOptionFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"VotingOption", T, TVariables> {
  on<
    XName extends ImplementationType<"VotingOption">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): VotingOptionFetcher<
    XName extends "VotingOption"
      ? T & X
      : WithTypeName<T, ImplementationType<"VotingOption">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"VotingOption">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): VotingOptionFetcher<T, TVariables>;

  readonly __typename: VotingOptionFetcher<
    T & { __typename: ImplementationType<"VotingOption"> },
    TVariables
  >;

  readonly ID: VotingOptionFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingOptionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": VotingOptionFetcher<Omit<T, "ID">, TVariables>;

  readonly votingID: VotingOptionFetcher<
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
  ): VotingOptionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~votingID": VotingOptionFetcher<Omit<T, "votingID">, TVariables>;

  readonly optionTxt: VotingOptionFetcher<
    T & { readonly optionTxt: string },
    TVariables
  >;

  "optionTxt+"<
    XAlias extends string = "optionTxt",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"optionTxt", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingOptionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~optionTxt": VotingOptionFetcher<Omit<T, "optionTxt">, TVariables>;

  readonly description: VotingOptionFetcher<
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
  ): VotingOptionFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~description": VotingOptionFetcher<
    Omit<T, "description">,
    TVariables
  >;

  readonly companyComments: VotingOptionFetcher<
    T & { readonly companyComments: string },
    TVariables
  >;

  "companyComments+"<
    XAlias extends string = "companyComments",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"companyComments", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingOptionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~companyComments": VotingOptionFetcher<
    Omit<T, "companyComments">,
    TVariables
  >;

  readonly isActiveByAdmin: VotingOptionFetcher<
    T & { readonly isActiveByAdmin: number },
    TVariables
  >;

  "isActiveByAdmin+"<
    XAlias extends string = "isActiveByAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isActiveByAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingOptionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isActiveByAdmin": VotingOptionFetcher<
    Omit<T, "isActiveByAdmin">,
    TVariables
  >;

  documents<X extends object, XVariables extends object>(
    child: ObjectFetcher<"VotingDocuments", X, XVariables>
  ): VotingOptionFetcher<
    T & { readonly documents: readonly X[] },
    TVariables & XVariables
  >;

  documents<
    X extends object,
    XVariables extends object,
    XAlias extends string = "documents",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"VotingDocuments", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"documents", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingOptionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  userVotedOption<X extends object, XVariables extends object>(
    child: ObjectFetcher<"VotingUser", X, XVariables>
  ): VotingOptionFetcher<
    T & { readonly userVotedOption?: X },
    TVariables & XVariables
  >;

  userVotedOption<
    X extends object,
    XVariables extends object,
    XAlias extends string = "userVotedOption",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"VotingUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"userVotedOption", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): VotingOptionFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;

  votingUserStatistic<X extends object, XVariables extends object>(
    child: ObjectFetcher<"VotingUserStatistic", X, XVariables>
  ): VotingOptionFetcher<
    T & { readonly votingUserStatistic: X },
    TVariables & XVariables
  >;

  votingUserStatistic<
    X extends object,
    XVariables extends object,
    XAlias extends string = "votingUserStatistic",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"VotingUserStatistic", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"votingUserStatistic", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingOptionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const votingOption$: VotingOptionFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "VotingOption",
    "EMBEDDED",
    [],
    [
      "ID",
      "votingID",
      "optionTxt",
      {
        category: "SCALAR",
        name: "description",
        undefinable: true,
      },
      "companyComments",
      "isActiveByAdmin",
      {
        category: "LIST",
        name: "documents",
        targetTypeName: "VotingDocuments",
      },
      {
        category: "SCALAR",
        name: "userVotedOption",
        targetTypeName: "VotingUser",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "votingUserStatistic",
        targetTypeName: "VotingUserStatistic",
      },
    ]
  ),
  undefined
);

export const votingOption$$ =
  votingOption$.ID.votingID.optionTxt.description.companyComments
    .isActiveByAdmin;
