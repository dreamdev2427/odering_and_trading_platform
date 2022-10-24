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
export interface NetkiSignUpDataFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"NetkiSignUpData", T, TVariables> {
  on<
    XName extends ImplementationType<"NetkiSignUpData">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): NetkiSignUpDataFetcher<
    XName extends "NetkiSignUpData"
      ? T & X
      : WithTypeName<T, ImplementationType<"NetkiSignUpData">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"NetkiSignUpData">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): NetkiSignUpDataFetcher<T, TVariables>;

  readonly __typename: NetkiSignUpDataFetcher<
    T & { __typename: ImplementationType<"NetkiSignUpData"> },
    TVariables
  >;

  readonly accessCode: NetkiSignUpDataFetcher<
    T & { readonly accessCode: string },
    TVariables
  >;

  "accessCode+"<
    XAlias extends string = "accessCode",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"accessCode", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): NetkiSignUpDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~accessCode": NetkiSignUpDataFetcher<
    Omit<T, "accessCode">,
    TVariables
  >;

  readonly mobileAppPanel: NetkiSignUpDataFetcher<
    T & { readonly mobileAppPanel: string },
    TVariables
  >;

  "mobileAppPanel+"<
    XAlias extends string = "mobileAppPanel",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"mobileAppPanel", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): NetkiSignUpDataFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~mobileAppPanel": NetkiSignUpDataFetcher<
    Omit<T, "mobileAppPanel">,
    TVariables
  >;
}

export const netkiSignUpData$: NetkiSignUpDataFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "NetkiSignUpData",
    "EMBEDDED",
    [],
    ["accessCode", "mobileAppPanel"]
  ),
  undefined
);

export const netkiSignUpData$$ = netkiSignUpData$.accessCode.mobileAppPanel;
