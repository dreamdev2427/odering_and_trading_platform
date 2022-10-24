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
export interface SubscriptionFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"Subscription", T, TVariables> {
  on<
    XName extends ImplementationType<"Subscription">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): SubscriptionFetcher<
    XName extends "Subscription"
      ? T & X
      : WithTypeName<T, ImplementationType<"Subscription">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Subscription">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): SubscriptionFetcher<T, TVariables>;

  readonly __typename: SubscriptionFetcher<
    T & { __typename: ImplementationType<"Subscription"> },
    TVariables
  >;

  rootKyc<X extends object, XVariables extends object>(
    child: ObjectFetcher<"KycData", X, XVariables>
  ): SubscriptionFetcher<T & { readonly rootKyc: X }, TVariables & XVariables>;

  rootKyc<
    X extends object,
    XVariables extends object,
    XAlias extends string = "rootKyc",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"KycData", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"rootKyc", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SubscriptionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  getLastChatRecord<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Chat", X, XVariables>
  ): SubscriptionFetcher<
    T & { readonly getLastChatRecord: X },
    TVariables & XVariables
  >;

  getLastChatRecord<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getLastChatRecord",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Chat", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getLastChatRecord", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): SubscriptionFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const subscription$: SubscriptionFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Subscription",
    "EMBEDDED",
    [],
    [
      {
        category: "SCALAR",
        name: "rootKyc",
        targetTypeName: "KycData",
      },
      {
        category: "SCALAR",
        name: "getLastChatRecord",
        targetTypeName: "Chat",
      },
    ]
  ),
  undefined
);
