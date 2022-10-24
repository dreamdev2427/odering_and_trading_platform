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
export interface MercuryAddressFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"MercuryAddress", T, TVariables> {
  on<
    XName extends ImplementationType<"MercuryAddress">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): MercuryAddressFetcher<
    XName extends "MercuryAddress"
      ? T & X
      : WithTypeName<T, ImplementationType<"MercuryAddress">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"MercuryAddress">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): MercuryAddressFetcher<T, TVariables>;

  readonly __typename: MercuryAddressFetcher<
    T & { __typename: ImplementationType<"MercuryAddress"> },
    TVariables
  >;

  readonly address1: MercuryAddressFetcher<
    T & { readonly address1: string },
    TVariables
  >;

  "address1+"<
    XAlias extends string = "address1",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"address1", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryAddressFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~address1": MercuryAddressFetcher<Omit<T, "address1">, TVariables>;

  readonly city: MercuryAddressFetcher<
    T & { readonly city: string },
    TVariables
  >;

  "city+"<
    XAlias extends string = "city",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"city", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryAddressFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~city": MercuryAddressFetcher<Omit<T, "city">, TVariables>;

  readonly region: MercuryAddressFetcher<
    T & { readonly region: string },
    TVariables
  >;

  "region+"<
    XAlias extends string = "region",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"region", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryAddressFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~region": MercuryAddressFetcher<Omit<T, "region">, TVariables>;

  readonly postalCode: MercuryAddressFetcher<
    T & { readonly postalCode: string },
    TVariables
  >;

  "postalCode+"<
    XAlias extends string = "postalCode",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"postalCode", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryAddressFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~postalCode": MercuryAddressFetcher<
    Omit<T, "postalCode">,
    TVariables
  >;

  readonly country: MercuryAddressFetcher<
    T & { readonly country: string },
    TVariables
  >;

  "country+"<
    XAlias extends string = "country",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"country", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryAddressFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~country": MercuryAddressFetcher<Omit<T, "country">, TVariables>;
}

export const mercuryAddress$: MercuryAddressFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "MercuryAddress",
    "EMBEDDED",
    [],
    ["address1", "city", "region", "postalCode", "country"]
  ),
  undefined
);

export const mercuryAddress$$ =
  mercuryAddress$.address1.city.region.postalCode.country;
