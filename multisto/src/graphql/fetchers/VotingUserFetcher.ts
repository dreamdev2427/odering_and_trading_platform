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
export interface VotingUserFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"VotingUser", T, TVariables> {
  on<
    XName extends ImplementationType<"VotingUser">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): VotingUserFetcher<
    XName extends "VotingUser"
      ? T & X
      : WithTypeName<T, ImplementationType<"VotingUser">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"VotingUser">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): VotingUserFetcher<T, TVariables>;

  readonly __typename: VotingUserFetcher<
    T & { __typename: ImplementationType<"VotingUser"> },
    TVariables
  >;

  readonly ID: VotingUserFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": VotingUserFetcher<Omit<T, "ID">, TVariables>;

  readonly votingID: VotingUserFetcher<
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
  ): VotingUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~votingID": VotingUserFetcher<Omit<T, "votingID">, TVariables>;

  readonly userID: VotingUserFetcher<
    T & { readonly userID: number },
    TVariables
  >;

  "userID+"<
    XAlias extends string = "userID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"userID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~userID": VotingUserFetcher<Omit<T, "userID">, TVariables>;

  readonly votingOptionID: VotingUserFetcher<
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
  ): VotingUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~votingOptionID": VotingUserFetcher<
    Omit<T, "votingOptionID">,
    TVariables
  >;

  votingOption<X extends object, XVariables extends object>(
    child: ObjectFetcher<"VotingOption", X, XVariables>
  ): VotingUserFetcher<
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
  ): VotingUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly votingOptionValue: VotingUserFetcher<
    T & { readonly votingOptionValue: number },
    TVariables
  >;

  "votingOptionValue+"<
    XAlias extends string = "votingOptionValue",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"votingOptionValue", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~votingOptionValue": VotingUserFetcher<
    Omit<T, "votingOptionValue">,
    TVariables
  >;

  readonly votesContributed: VotingUserFetcher<
    T & { readonly votesContributed: number },
    TVariables
  >;

  "votesContributed+"<
    XAlias extends string = "votesContributed",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"votesContributed", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~votesContributed": VotingUserFetcher<
    Omit<T, "votesContributed">,
    TVariables
  >;

  readonly isCastedByInvestor: VotingUserFetcher<
    T & { readonly isCastedByInvestor: number },
    TVariables
  >;

  "isCastedByInvestor+"<
    XAlias extends string = "isCastedByInvestor",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isCastedByInvestor", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isCastedByInvestor": VotingUserFetcher<
    Omit<T, "isCastedByInvestor">,
    TVariables
  >;

  readonly investmentContributed: VotingUserFetcher<
    T & { readonly investmentContributed: number },
    TVariables
  >;

  "investmentContributed+"<
    XAlias extends string = "investmentContributed",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investmentContributed", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investmentContributed": VotingUserFetcher<
    Omit<T, "investmentContributed">,
    TVariables
  >;

  readonly nominalInvestmentContributed: VotingUserFetcher<
    T & { readonly nominalInvestmentContributed: number },
    TVariables
  >;

  "nominalInvestmentContributed+"<
    XAlias extends string = "nominalInvestmentContributed",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"nominalInvestmentContributed", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~nominalInvestmentContributed": VotingUserFetcher<
    Omit<T, "nominalInvestmentContributed">,
    TVariables
  >;
}

export const votingUser$: VotingUserFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "VotingUser",
    "EMBEDDED",
    [],
    [
      "ID",
      "votingID",
      "userID",
      "votingOptionID",
      {
        category: "SCALAR",
        name: "votingOption",
        targetTypeName: "VotingOption",
      },
      "votingOptionValue",
      "votesContributed",
      "isCastedByInvestor",
      "investmentContributed",
      "nominalInvestmentContributed",
    ]
  ),
  undefined
);

export const votingUser$$ =
  votingUser$.ID.votingID.userID.votingOptionID.votingOptionValue
    .votesContributed.isCastedByInvestor.investmentContributed
    .nominalInvestmentContributed;
