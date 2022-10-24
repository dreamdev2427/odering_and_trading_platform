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
export interface AllMeetingFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"AllMeeting", T, TVariables> {
  on<
    XName extends ImplementationType<"AllMeeting">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): AllMeetingFetcher<
    XName extends "AllMeeting"
      ? T & X
      : WithTypeName<T, ImplementationType<"AllMeeting">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"AllMeeting">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): AllMeetingFetcher<T, TVariables>;

  readonly __typename: AllMeetingFetcher<
    T & { __typename: ImplementationType<"AllMeeting"> },
    TVariables
  >;

  past<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Meeting", X, XVariables>
  ): AllMeetingFetcher<
    T & { readonly past: readonly X[] },
    TVariables & XVariables
  >;

  past<
    X extends object,
    XVariables extends object,
    XAlias extends string = "past",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Meeting", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"past", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AllMeetingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  current<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Meeting", X, XVariables>
  ): AllMeetingFetcher<
    T & { readonly current: readonly X[] },
    TVariables & XVariables
  >;

  current<
    X extends object,
    XVariables extends object,
    XAlias extends string = "current",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Meeting", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"current", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AllMeetingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  future<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Meeting", X, XVariables>
  ): AllMeetingFetcher<
    T & { readonly future: readonly X[] },
    TVariables & XVariables
  >;

  future<
    X extends object,
    XVariables extends object,
    XAlias extends string = "future",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Meeting", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"future", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AllMeetingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const allMeeting$: AllMeetingFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "AllMeeting",
    "EMBEDDED",
    [],
    [
      {
        category: "LIST",
        name: "past",
        targetTypeName: "Meeting",
      },
      {
        category: "LIST",
        name: "current",
        targetTypeName: "Meeting",
      },
      {
        category: "LIST",
        name: "future",
        targetTypeName: "Meeting",
      },
    ]
  ),
  undefined
);
