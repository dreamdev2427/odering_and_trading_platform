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
export interface MercuryRecipientFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"MercuryRecipient", T, TVariables> {
  on<
    XName extends ImplementationType<"MercuryRecipient">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): MercuryRecipientFetcher<
    XName extends "MercuryRecipient"
      ? T & X
      : WithTypeName<T, ImplementationType<"MercuryRecipient">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"MercuryRecipient">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): MercuryRecipientFetcher<T, TVariables>;

  readonly __typename: MercuryRecipientFetcher<
    T & { __typename: ImplementationType<"MercuryRecipient"> },
    TVariables
  >;

  readonly id: MercuryRecipientFetcher<T & { readonly id: string }, TVariables>;

  "id+"<
    XAlias extends string = "id",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"id", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryRecipientFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~id": MercuryRecipientFetcher<Omit<T, "id">, TVariables>;

  readonly name: MercuryRecipientFetcher<
    T & { readonly name: string },
    TVariables
  >;

  "name+"<
    XAlias extends string = "name",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"name", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryRecipientFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~name": MercuryRecipientFetcher<Omit<T, "name">, TVariables>;

  readonly emails: MercuryRecipientFetcher<
    T & { readonly emails: readonly string[] },
    TVariables
  >;

  "emails+"<
    XAlias extends string = "emails",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"emails", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryRecipientFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly string[] }
        : { readonly [key in XAlias]: readonly string[] }),
    TVariables & XDirectiveVariables
  >;

  readonly "~emails": MercuryRecipientFetcher<Omit<T, "emails">, TVariables>;

  readonly paymentMethod: MercuryRecipientFetcher<
    T & { readonly paymentMethod: string },
    TVariables
  >;

  "paymentMethod+"<
    XAlias extends string = "paymentMethod",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"paymentMethod", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryRecipientFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~paymentMethod": MercuryRecipientFetcher<
    Omit<T, "paymentMethod">,
    TVariables
  >;

  electronicRoutingInfo<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MercuryAccount", X, XVariables>
  ): MercuryRecipientFetcher<
    T & { readonly electronicRoutingInfo: X },
    TVariables & XVariables
  >;

  electronicRoutingInfo<
    X extends object,
    XVariables extends object,
    XAlias extends string = "electronicRoutingInfo",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MercuryAccount", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"electronicRoutingInfo", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MercuryRecipientFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const mercuryRecipient$: MercuryRecipientFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "MercuryRecipient",
    "OBJECT",
    [],
    [
      {
        category: "ID",
        name: "id",
      },
      "name",
      "emails",
      "paymentMethod",
      {
        category: "SCALAR",
        name: "electronicRoutingInfo",
        targetTypeName: "MercuryAccount",
      },
    ]
  ),
  undefined
);

export const mercuryRecipient$$ =
  mercuryRecipient$.id.name.emails.paymentMethod;
