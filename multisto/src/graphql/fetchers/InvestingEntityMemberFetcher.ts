import type { FieldOptions, DirectiveArgs } from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { WithTypeName, ImplementationType } from "../CommonTypes";
import type { InvestingEntityMemberRoles } from "../enums";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface InvestingEntityMemberFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"InvestingEntityMember", T, TVariables> {
  on<
    XName extends ImplementationType<"InvestingEntityMember">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InvestingEntityMemberFetcher<
    XName extends "InvestingEntityMember"
      ? T & X
      : WithTypeName<T, ImplementationType<"InvestingEntityMember">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"InvestingEntityMember">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): InvestingEntityMemberFetcher<T, TVariables>;

  readonly __typename: InvestingEntityMemberFetcher<
    T & { __typename: ImplementationType<"InvestingEntityMember"> },
    TVariables
  >;

  readonly ID: InvestingEntityMemberFetcher<
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
  ): InvestingEntityMemberFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": InvestingEntityMemberFetcher<Omit<T, "ID">, TVariables>;

  readonly investorID: InvestingEntityMemberFetcher<
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
  ): InvestingEntityMemberFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": InvestingEntityMemberFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly entityID: InvestingEntityMemberFetcher<
    T & { readonly entityID: number },
    TVariables
  >;

  "entityID+"<
    XAlias extends string = "entityID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"entityID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityMemberFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~entityID": InvestingEntityMemberFetcher<
    Omit<T, "entityID">,
    TVariables
  >;

  readonly firstName: InvestingEntityMemberFetcher<
    T & { readonly firstName: string },
    TVariables
  >;

  "firstName+"<
    XAlias extends string = "firstName",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"firstName", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityMemberFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~firstName": InvestingEntityMemberFetcher<
    Omit<T, "firstName">,
    TVariables
  >;

  readonly lastName: InvestingEntityMemberFetcher<
    T & { readonly lastName: string },
    TVariables
  >;

  "lastName+"<
    XAlias extends string = "lastName",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"lastName", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityMemberFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~lastName": InvestingEntityMemberFetcher<
    Omit<T, "lastName">,
    TVariables
  >;

  readonly role: InvestingEntityMemberFetcher<
    T & { readonly role: InvestingEntityMemberRoles },
    TVariables
  >;

  "role+"<
    XAlias extends string = "role",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"role", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityMemberFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: InvestingEntityMemberRoles }
        : { readonly [key in XAlias]: InvestingEntityMemberRoles }),
    TVariables & XDirectiveVariables
  >;

  readonly "~role": InvestingEntityMemberFetcher<Omit<T, "role">, TVariables>;

  readonly signatory: InvestingEntityMemberFetcher<
    T & { readonly signatory: boolean },
    TVariables
  >;

  "signatory+"<
    XAlias extends string = "signatory",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"signatory", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityMemberFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~signatory": InvestingEntityMemberFetcher<
    Omit<T, "signatory">,
    TVariables
  >;

  readonly email: InvestingEntityMemberFetcher<
    T & { readonly email: string },
    TVariables
  >;

  "email+"<
    XAlias extends string = "email",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"email", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestingEntityMemberFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~email": InvestingEntityMemberFetcher<Omit<T, "email">, TVariables>;
}

export const investingEntityMember$: InvestingEntityMemberFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "InvestingEntityMember",
      "EMBEDDED",
      [],
      [
        "ID",
        "investorID",
        "entityID",
        "firstName",
        "lastName",
        "role",
        "signatory",
        "email",
      ]
    ),
    undefined
  );

export const investingEntityMember$$ =
  investingEntityMember$.ID.investorID.entityID.firstName.lastName.role
    .signatory.email;
