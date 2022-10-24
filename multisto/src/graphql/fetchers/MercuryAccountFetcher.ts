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
export interface MercuryAccountFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"MercuryAccount", T, TVariables> {
  on<
    XName extends ImplementationType<"MercuryAccount">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): MercuryAccountFetcher<
    XName extends "MercuryAccount"
      ? T & X
      : WithTypeName<T, ImplementationType<"MercuryAccount">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"MercuryAccount">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): MercuryAccountFetcher<T, TVariables>;

  readonly __typename: MercuryAccountFetcher<
    T & { __typename: ImplementationType<"MercuryAccount"> },
    TVariables
  >;

  readonly accountNumber: MercuryAccountFetcher<
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
  ): MercuryAccountFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~accountNumber": MercuryAccountFetcher<
    Omit<T, "accountNumber">,
    TVariables
  >;

  readonly routingNumber: MercuryAccountFetcher<
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
  ): MercuryAccountFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~routingNumber": MercuryAccountFetcher<
    Omit<T, "routingNumber">,
    TVariables
  >;

  readonly electronicAccountType: MercuryAccountFetcher<
    T & { readonly electronicAccountType: string },
    TVariables
  >;

  "electronicAccountType+"<
    XAlias extends string = "electronicAccountType",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"electronicAccountType", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryAccountFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~electronicAccountType": MercuryAccountFetcher<
    Omit<T, "electronicAccountType">,
    TVariables
  >;

  address<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MercuryAddress", X, XVariables>
  ): MercuryAccountFetcher<
    T & { readonly address: X },
    TVariables & XVariables
  >;

  address<
    X extends object,
    XVariables extends object,
    XAlias extends string = "address",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MercuryAddress", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"address", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryAccountFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const mercuryAccount$: MercuryAccountFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "MercuryAccount",
    "EMBEDDED",
    [],
    [
      "accountNumber",
      "routingNumber",
      "electronicAccountType",
      {
        category: "SCALAR",
        name: "address",
        targetTypeName: "MercuryAddress",
      },
    ]
  ),
  undefined
);

export const mercuryAccount$$ =
  mercuryAccount$.accountNumber.routingNumber.electronicAccountType;
