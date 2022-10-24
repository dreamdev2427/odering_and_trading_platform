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
export interface VotingUserStatisticFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"VotingUserStatistic", T, TVariables> {
  on<
    XName extends ImplementationType<"VotingUserStatistic">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): VotingUserStatisticFetcher<
    XName extends "VotingUserStatistic"
      ? T & X
      : WithTypeName<T, ImplementationType<"VotingUserStatistic">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"VotingUserStatistic">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): VotingUserStatisticFetcher<T, TVariables>;

  readonly __typename: VotingUserStatisticFetcher<
    T & { __typename: ImplementationType<"VotingUserStatistic"> },
    TVariables
  >;

  readonly votesYes: VotingUserStatisticFetcher<
    T & { readonly votesYes: number },
    TVariables
  >;

  "votesYes+"<
    XAlias extends string = "votesYes",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"votesYes", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserStatisticFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~votesYes": VotingUserStatisticFetcher<
    Omit<T, "votesYes">,
    TVariables
  >;

  readonly votesNo: VotingUserStatisticFetcher<
    T & { readonly votesNo: number },
    TVariables
  >;

  "votesNo+"<
    XAlias extends string = "votesNo",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"votesNo", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserStatisticFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~votesNo": VotingUserStatisticFetcher<
    Omit<T, "votesNo">,
    TVariables
  >;

  readonly votesAbstention: VotingUserStatisticFetcher<
    T & { readonly votesAbstention: number },
    TVariables
  >;

  "votesAbstention+"<
    XAlias extends string = "votesAbstention",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"votesAbstention", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserStatisticFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~votesAbstention": VotingUserStatisticFetcher<
    Omit<T, "votesAbstention">,
    TVariables
  >;

  readonly count: VotingUserStatisticFetcher<
    T & { readonly count: number },
    TVariables
  >;

  "count+"<
    XAlias extends string = "count",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"count", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): VotingUserStatisticFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~count": VotingUserStatisticFetcher<Omit<T, "count">, TVariables>;
}

export const votingUserStatistic$: VotingUserStatisticFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "VotingUserStatistic",
      "EMBEDDED",
      [],
      ["votesYes", "votesNo", "votesAbstention", "count"]
    ),
    undefined
  );

export const votingUserStatistic$$ =
  votingUserStatistic$.votesYes.votesNo.votesAbstention.count;
