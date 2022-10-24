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
export interface PollFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Poll", T, TVariables> {
  on<
    XName extends ImplementationType<"Poll">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): PollFetcher<
    XName extends "Poll"
      ? T & X
      : WithTypeName<T, ImplementationType<"Poll">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Poll">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): PollFetcher<T, TVariables>;

  readonly __typename: PollFetcher<
    T & { __typename: ImplementationType<"Poll"> },
    TVariables
  >;

  readonly notVoted: PollFetcher<T & { readonly notVoted: number }, TVariables>;

  "notVoted+"<
    XAlias extends string = "notVoted",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"notVoted", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PollFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~notVoted": PollFetcher<Omit<T, "notVoted">, TVariables>;

  readonly totalInvestors: PollFetcher<
    T & { readonly totalInvestors: number },
    TVariables
  >;

  "totalInvestors+"<
    XAlias extends string = "totalInvestors",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"totalInvestors", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PollFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~totalInvestors": PollFetcher<
    Omit<T, "totalInvestors">,
    TVariables
  >;

  readonly totalShares: PollFetcher<
    T & { readonly totalShares: number },
    TVariables
  >;

  "totalShares+"<
    XAlias extends string = "totalShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"totalShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PollFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~totalShares": PollFetcher<Omit<T, "totalShares">, TVariables>;

  readonly totalInvestment: PollFetcher<
    T & { readonly totalInvestment: number },
    TVariables
  >;

  "totalInvestment+"<
    XAlias extends string = "totalInvestment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"totalInvestment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PollFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~totalInvestment": PollFetcher<
    Omit<T, "totalInvestment">,
    TVariables
  >;
}

export const poll$: PollFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Poll",
    "EMBEDDED",
    [],
    ["notVoted", "totalInvestors", "totalShares", "totalInvestment"]
  ),
  undefined
);

export const poll$$ = poll$.notVoted.totalInvestors.totalShares.totalInvestment;
