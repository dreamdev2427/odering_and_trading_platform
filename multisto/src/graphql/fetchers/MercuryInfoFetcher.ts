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
export interface MercuryInfoFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"MercuryInfo", T, TVariables> {
  on<
    XName extends ImplementationType<"MercuryInfo">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): MercuryInfoFetcher<
    XName extends "MercuryInfo"
      ? T & X
      : WithTypeName<T, ImplementationType<"MercuryInfo">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"MercuryInfo">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): MercuryInfoFetcher<T, TVariables>;

  readonly __typename: MercuryInfoFetcher<
    T & { __typename: ImplementationType<"MercuryInfo"> },
    TVariables
  >;

  readonly accountNumber: MercuryInfoFetcher<
    T & { readonly accountNumber: string },
    TVariables
  >;

  "accountNumber+"<
    XAlias extends string = "accountNumber",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"accountNumber", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryInfoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~accountNumber": MercuryInfoFetcher<
    Omit<T, "accountNumber">,
    TVariables
  >;

  readonly routingNumber: MercuryInfoFetcher<
    T & { readonly routingNumber: string },
    TVariables
  >;

  "routingNumber+"<
    XAlias extends string = "routingNumber",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"routingNumber", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryInfoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~routingNumber": MercuryInfoFetcher<
    Omit<T, "routingNumber">,
    TVariables
  >;
}

export const mercuryInfo$: MercuryInfoFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "MercuryInfo",
    "EMBEDDED",
    [],
    ["accountNumber", "routingNumber"]
  ),
  undefined
);

export const mercuryInfo$$ = mercuryInfo$.accountNumber.routingNumber;
