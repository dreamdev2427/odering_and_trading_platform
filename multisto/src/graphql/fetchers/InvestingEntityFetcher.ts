import type { FieldOptions, DirectiveArgs } from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { WithTypeName, ImplementationType } from "../CommonTypes";
import type { InvestingEntityPaymentMethods } from "../enums";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface InvestingEntityFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"InvestingEntity", T, TVariables> {
  on<
    XName extends ImplementationType<"InvestingEntity">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InvestingEntityFetcher<
    XName extends "InvestingEntity"
      ? T & X
      : WithTypeName<T, ImplementationType<"InvestingEntity">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"InvestingEntity">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): InvestingEntityFetcher<T, TVariables>;

  readonly __typename: InvestingEntityFetcher<
    T & { __typename: ImplementationType<"InvestingEntity"> },
    TVariables
  >;

  readonly ID: InvestingEntityFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": InvestingEntityFetcher<Omit<T, "ID">, TVariables>;

  readonly investorID: InvestingEntityFetcher<
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
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": InvestingEntityFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  members<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestingEntityMember", X, XVariables>
  ): InvestingEntityFetcher<
    T & { readonly members: readonly X[] },
    TVariables & XVariables
  >;

  members<
    X extends object,
    XVariables extends object,
    XAlias extends string = "members",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestingEntityMember", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"members", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly typeID: InvestingEntityFetcher<
    T & { readonly typeID: number },
    TVariables
  >;

  "typeID+"<
    XAlias extends string = "typeID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"typeID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~typeID": InvestingEntityFetcher<Omit<T, "typeID">, TVariables>;

  type<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestingEntityTypes", X, XVariables>
  ): InvestingEntityFetcher<T & { readonly type: X }, TVariables & XVariables>;

  type<
    X extends object,
    XVariables extends object,
    XAlias extends string = "type",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestingEntityTypes", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"type", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly taxId: InvestingEntityFetcher<
    T & { readonly taxId: string },
    TVariables
  >;

  "taxId+"<
    XAlias extends string = "taxId",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"taxId", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~taxId": InvestingEntityFetcher<Omit<T, "taxId">, TVariables>;

  readonly name: InvestingEntityFetcher<
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
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~name": InvestingEntityFetcher<Omit<T, "name">, TVariables>;

  readonly nickname: InvestingEntityFetcher<
    T & { readonly nickname: string },
    TVariables
  >;

  "nickname+"<
    XAlias extends string = "nickname",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"nickname", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~nickname": InvestingEntityFetcher<Omit<T, "nickname">, TVariables>;

  readonly accredited: InvestingEntityFetcher<
    T & { readonly accredited: boolean },
    TVariables
  >;

  "accredited+"<
    XAlias extends string = "accredited",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"accredited", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~accredited": InvestingEntityFetcher<
    Omit<T, "accredited">,
    TVariables
  >;

  readonly paymentMethod: InvestingEntityFetcher<
    T & { readonly paymentMethod: InvestingEntityPaymentMethods },
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
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: InvestingEntityPaymentMethods }
        : { readonly [key in XAlias]: InvestingEntityPaymentMethods }),
    TVariables & XDirectiveVariables
  >;

  readonly "~paymentMethod": InvestingEntityFetcher<
    Omit<T, "paymentMethod">,
    TVariables
  >;

  readonly address: InvestingEntityFetcher<
    T & { readonly address: string },
    TVariables
  >;

  "address+"<
    XAlias extends string = "address",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"address", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~address": InvestingEntityFetcher<Omit<T, "address">, TVariables>;

  readonly city: InvestingEntityFetcher<
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
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~city": InvestingEntityFetcher<Omit<T, "city">, TVariables>;

  readonly postalCode: InvestingEntityFetcher<
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
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~postalCode": InvestingEntityFetcher<
    Omit<T, "postalCode">,
    TVariables
  >;

  readonly country: InvestingEntityFetcher<
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
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~country": InvestingEntityFetcher<Omit<T, "country">, TVariables>;

  readonly state: InvestingEntityFetcher<
    T & { readonly state: string },
    TVariables
  >;

  "state+"<
    XAlias extends string = "state",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"state", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~state": InvestingEntityFetcher<Omit<T, "state">, TVariables>;

  readonly isApprovedByAdmin: InvestingEntityFetcher<
    T & { readonly isApprovedByAdmin: number },
    TVariables
  >;

  "isApprovedByAdmin+"<
    XAlias extends string = "isApprovedByAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isApprovedByAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isApprovedByAdmin": InvestingEntityFetcher<
    Omit<T, "isApprovedByAdmin">,
    TVariables
  >;
}

export const investingEntity$: InvestingEntityFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "InvestingEntity",
    "EMBEDDED",
    [],
    [
      "ID",
      "investorID",
      {
        category: "LIST",
        name: "members",
        targetTypeName: "InvestingEntityMember",
      },
      "typeID",
      {
        category: "SCALAR",
        name: "type",
        targetTypeName: "InvestingEntityTypes",
      },
      "taxId",
      "name",
      "nickname",
      "accredited",
      "paymentMethod",
      "address",
      "city",
      "postalCode",
      "country",
      "state",
      "isApprovedByAdmin",
    ]
  ),
  undefined
);

export const investingEntity$$ =
  investingEntity$.ID.investorID.typeID.taxId.name.nickname.accredited
    .paymentMethod.address.city.postalCode.country.state.isApprovedByAdmin;
