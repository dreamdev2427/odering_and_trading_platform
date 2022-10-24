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
export interface NonKycInvestorFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"NonKycInvestor", T, TVariables> {
  on<
    XName extends ImplementationType<"NonKycInvestor">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): NonKycInvestorFetcher<
    XName extends "NonKycInvestor"
      ? T & X
      : WithTypeName<T, ImplementationType<"NonKycInvestor">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"NonKycInvestor">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): NonKycInvestorFetcher<T, TVariables>;

  readonly __typename: NonKycInvestorFetcher<
    T & { __typename: ImplementationType<"NonKycInvestor"> },
    TVariables
  >;

  readonly ID: NonKycInvestorFetcher<T & { readonly ID?: number }, TVariables>;

  "ID+"<XAlias extends string = "ID", XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): NonKycInvestorFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": NonKycInvestorFetcher<Omit<T, "ID">, TVariables>;

  readonly investorType: NonKycInvestorFetcher<
    T & { readonly investorType?: number },
    TVariables
  >;

  "investorType+"<
    XAlias extends string = "investorType",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorType", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): NonKycInvestorFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~investorType": NonKycInvestorFetcher<
    Omit<T, "investorType">,
    TVariables
  >;

  readonly firstName: NonKycInvestorFetcher<
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
  ): NonKycInvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~firstName": NonKycInvestorFetcher<
    Omit<T, "firstName">,
    TVariables
  >;

  readonly lastName: NonKycInvestorFetcher<
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
  ): NonKycInvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~lastName": NonKycInvestorFetcher<Omit<T, "lastName">, TVariables>;

  readonly country: NonKycInvestorFetcher<
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
  ): NonKycInvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~country": NonKycInvestorFetcher<Omit<T, "country">, TVariables>;

  readonly phone: NonKycInvestorFetcher<
    T & { readonly phone?: string },
    TVariables
  >;

  "phone+"<
    XAlias extends string = "phone",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"phone", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): NonKycInvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~phone": NonKycInvestorFetcher<Omit<T, "phone">, TVariables>;

  readonly email: NonKycInvestorFetcher<
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
  ): NonKycInvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~email": NonKycInvestorFetcher<Omit<T, "email">, TVariables>;

  readonly updateDate: NonKycInvestorFetcher<
    T & { readonly updateDate?: string },
    TVariables
  >;

  "updateDate+"<
    XAlias extends string = "updateDate",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"updateDate", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): NonKycInvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~updateDate": NonKycInvestorFetcher<
    Omit<T, "updateDate">,
    TVariables
  >;
}

export const nonKycInvestor$: NonKycInvestorFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "NonKycInvestor",
    "EMBEDDED",
    [],
    [
      {
        category: "SCALAR",
        name: "ID",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "investorType",
        undefinable: true,
      },
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
        name: "country",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "phone",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "email",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "updateDate",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const nonKycInvestor$$ =
  nonKycInvestor$.ID.investorType.firstName.lastName.country.phone.email
    .updateDate;
