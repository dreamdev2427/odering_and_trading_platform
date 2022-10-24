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
export interface InvestorInvitationFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"InvestorInvitation", T, TVariables> {
  on<
    XName extends ImplementationType<"InvestorInvitation">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InvestorInvitationFetcher<
    XName extends "InvestorInvitation"
      ? T & X
      : WithTypeName<T, ImplementationType<"InvestorInvitation">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"InvestorInvitation">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): InvestorInvitationFetcher<T, TVariables>;

  readonly __typename: InvestorInvitationFetcher<
    T & { __typename: ImplementationType<"InvestorInvitation"> },
    TVariables
  >;

  readonly ID: InvestorInvitationFetcher<
    T & { readonly ID: number },
    TVariables
  >;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorInvitationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": InvestorInvitationFetcher<Omit<T, "ID">, TVariables>;

  readonly stoID: InvestorInvitationFetcher<
    T & { readonly stoID: number },
    TVariables
  >;

  "stoID+"<
    XAlias extends string = "stoID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorInvitationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": InvestorInvitationFetcher<Omit<T, "stoID">, TVariables>;

  readonly investorID: InvestorInvitationFetcher<
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
  ): InvestorInvitationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": InvestorInvitationFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly firstName: InvestorInvitationFetcher<
    T & { readonly firstName?: string },
    TVariables
  >;

  "firstName+"<
    XAlias extends string = "firstName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"firstName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorInvitationFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~firstName": InvestorInvitationFetcher<
    Omit<T, "firstName">,
    TVariables
  >;

  readonly lastName: InvestorInvitationFetcher<
    T & { readonly lastName?: string },
    TVariables
  >;

  "lastName+"<
    XAlias extends string = "lastName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"lastName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorInvitationFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~lastName": InvestorInvitationFetcher<
    Omit<T, "lastName">,
    TVariables
  >;

  readonly email: InvestorInvitationFetcher<
    T & { readonly email?: string },
    TVariables
  >;

  "email+"<
    XAlias extends string = "email",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"email", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorInvitationFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~email": InvestorInvitationFetcher<Omit<T, "email">, TVariables>;

  readonly emailText: InvestorInvitationFetcher<
    T & { readonly emailText?: string },
    TVariables
  >;

  "emailText+"<
    XAlias extends string = "emailText",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"emailText", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorInvitationFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~emailText": InvestorInvitationFetcher<
    Omit<T, "emailText">,
    TVariables
  >;

  readonly city: InvestorInvitationFetcher<
    T & { readonly city?: string },
    TVariables
  >;

  "city+"<
    XAlias extends string = "city",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"city", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorInvitationFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~city": InvestorInvitationFetcher<Omit<T, "city">, TVariables>;

  readonly country: InvestorInvitationFetcher<
    T & { readonly country?: string },
    TVariables
  >;

  "country+"<
    XAlias extends string = "country",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"country", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorInvitationFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~country": InvestorInvitationFetcher<
    Omit<T, "country">,
    TVariables
  >;

  readonly status: InvestorInvitationFetcher<
    T & { readonly status?: number },
    TVariables
  >;

  "status+"<
    XAlias extends string = "status",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"status", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorInvitationFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~status": InvestorInvitationFetcher<Omit<T, "status">, TVariables>;
}

export const investorInvitation$: InvestorInvitationFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "InvestorInvitation",
      "EMBEDDED",
      [],
      [
        "ID",
        "stoID",
        "investorID",
        {
          category: "SCALAR",
          name: "firstName",
          undefinable: true,
        },
        {
          category: "SCALAR",
          name: "lastName",
          undefinable: true,
        },
        {
          category: "SCALAR",
          name: "email",
          undefinable: true,
        },
        {
          category: "SCALAR",
          name: "emailText",
          undefinable: true,
        },
        {
          category: "SCALAR",
          name: "city",
          undefinable: true,
        },
        {
          category: "SCALAR",
          name: "country",
          undefinable: true,
        },
        {
          category: "SCALAR",
          name: "status",
          undefinable: true,
        },
      ]
    ),
    undefined
  );

export const investorInvitation$$ =
  investorInvitation$.ID.stoID.investorID.firstName.lastName.email.emailText
    .city.country.status;
