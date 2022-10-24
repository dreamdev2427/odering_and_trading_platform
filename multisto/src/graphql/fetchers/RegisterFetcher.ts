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
export interface RegisterFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Register", T, TVariables> {
  on<
    XName extends ImplementationType<"Register">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): RegisterFetcher<
    XName extends "Register"
      ? T & X
      : WithTypeName<T, ImplementationType<"Register">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Register">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): RegisterFetcher<T, TVariables>;

  readonly __typename: RegisterFetcher<
    T & { __typename: ImplementationType<"Register"> },
    TVariables
  >;

  readonly ID: RegisterFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): RegisterFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": RegisterFetcher<Omit<T, "ID">, TVariables>;

  readonly stoID: RegisterFetcher<T & { readonly stoID: number }, TVariables>;

  "stoID+"<
    XAlias extends string = "stoID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): RegisterFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": RegisterFetcher<Omit<T, "stoID">, TVariables>;

  readonly firstName: RegisterFetcher<
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
  ): RegisterFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~firstName": RegisterFetcher<Omit<T, "firstName">, TVariables>;

  readonly lastName: RegisterFetcher<
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
  ): RegisterFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~lastName": RegisterFetcher<Omit<T, "lastName">, TVariables>;

  readonly email: RegisterFetcher<T & { readonly email: string }, TVariables>;

  "email+"<
    XAlias extends string = "email",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"email", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): RegisterFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~email": RegisterFetcher<Omit<T, "email">, TVariables>;

  readonly secret: RegisterFetcher<
    T & { readonly secret?: string },
    TVariables
  >;

  "secret+"<
    XAlias extends string = "secret",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"secret", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): RegisterFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~secret": RegisterFetcher<Omit<T, "secret">, TVariables>;

  readonly investorType: RegisterFetcher<
    T & { readonly investorType: number },
    TVariables
  >;

  "investorType+"<
    XAlias extends string = "investorType",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorType", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): RegisterFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorType": RegisterFetcher<
    Omit<T, "investorType">,
    TVariables
  >;

  readonly companyName: RegisterFetcher<
    T & { readonly companyName?: string },
    TVariables
  >;

  "companyName+"<
    XAlias extends string = "companyName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"companyName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): RegisterFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~companyName": RegisterFetcher<Omit<T, "companyName">, TVariables>;

  readonly date: RegisterFetcher<T & { readonly date?: string }, TVariables>;

  "date+"<
    XAlias extends string = "date",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"date", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): RegisterFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~date": RegisterFetcher<Omit<T, "date">, TVariables>;

  readonly referByInvestorID: RegisterFetcher<
    T & { readonly referByInvestorID: number },
    TVariables
  >;

  "referByInvestorID+"<
    XAlias extends string = "referByInvestorID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"referByInvestorID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): RegisterFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~referByInvestorID": RegisterFetcher<
    Omit<T, "referByInvestorID">,
    TVariables
  >;

  readonly brokerID: RegisterFetcher<
    T & { readonly brokerID?: string },
    TVariables
  >;

  "brokerID+"<
    XAlias extends string = "brokerID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"brokerID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): RegisterFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~brokerID": RegisterFetcher<Omit<T, "brokerID">, TVariables>;
}

export const register$: RegisterFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Register",
    "EMBEDDED",
    [],
    [
      "ID",
      "stoID",
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
      "email",
      {
        category: "SCALAR",
        name: "secret",
        undefinable: true,
      },
      "investorType",
      {
        category: "SCALAR",
        name: "companyName",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "date",
        undefinable: true,
      },
      "referByInvestorID",
      {
        category: "SCALAR",
        name: "brokerID",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const register$$ =
  register$.ID.stoID.firstName.lastName.email.secret.investorType.companyName
    .date.referByInvestorID.brokerID;
