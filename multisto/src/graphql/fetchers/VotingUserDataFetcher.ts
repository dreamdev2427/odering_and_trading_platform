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
export interface VotingUserDataFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"VotingUserData", T, TVariables> {
  on<
    XName extends ImplementationType<"VotingUserData">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): VotingUserDataFetcher<
    XName extends "VotingUserData"
      ? T & X
      : WithTypeName<T, ImplementationType<"VotingUserData">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"VotingUserData">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): VotingUserDataFetcher<T, TVariables>;

  readonly __typename: VotingUserDataFetcher<
    T & { __typename: ImplementationType<"VotingUserData"> },
    TVariables
  >;

  readonly ID: VotingUserDataFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": VotingUserDataFetcher<Omit<T, "ID">, TVariables>;

  readonly investorID: VotingUserDataFetcher<
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
  ): VotingUserDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": VotingUserDataFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly votingID: VotingUserDataFetcher<
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
  ): VotingUserDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~votingID": VotingUserDataFetcher<Omit<T, "votingID">, TVariables>;

  readonly attendMeeting: VotingUserDataFetcher<
    T & { readonly attendMeeting: number },
    TVariables
  >;

  "attendMeeting+"<
    XAlias extends string = "attendMeeting",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"attendMeeting", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~attendMeeting": VotingUserDataFetcher<
    Omit<T, "attendMeeting">,
    TVariables
  >;

  readonly unannouncedDecision: VotingUserDataFetcher<
    T & { readonly unannouncedDecision: number },
    TVariables
  >;

  "unannouncedDecision+"<
    XAlias extends string = "unannouncedDecision",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"unannouncedDecision", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~unannouncedDecision": VotingUserDataFetcher<
    Omit<T, "unannouncedDecision">,
    TVariables
  >;
}

export const votingUserData$: VotingUserDataFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "VotingUserData",
    "EMBEDDED",
    [],
    ["ID", "investorID", "votingID", "attendMeeting", "unannouncedDecision"]
  ),
  undefined
);

export const votingUserData$$ =
  votingUserData$.ID.investorID.votingID.attendMeeting.unannouncedDecision;
