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
export interface InvestorStoFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"InvestorSto", T, TVariables> {
  on<
    XName extends ImplementationType<"InvestorSto">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InvestorStoFetcher<
    XName extends "InvestorSto"
      ? T & X
      : WithTypeName<T, ImplementationType<"InvestorSto">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"InvestorSto">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): InvestorStoFetcher<T, TVariables>;

  readonly __typename: InvestorStoFetcher<
    T & { __typename: ImplementationType<"InvestorSto"> },
    TVariables
  >;

  readonly ID: InvestorStoFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": InvestorStoFetcher<Omit<T, "ID">, TVariables>;

  readonly isAccountClosed: InvestorStoFetcher<
    T & { readonly isAccountClosed: number },
    TVariables
  >;

  "isAccountClosed+"<
    XAlias extends string = "isAccountClosed",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isAccountClosed", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isAccountClosed": InvestorStoFetcher<
    Omit<T, "isAccountClosed">,
    TVariables
  >;

  readonly investorID: InvestorStoFetcher<
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
  ): InvestorStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": InvestorStoFetcher<Omit<T, "investorID">, TVariables>;

  readonly stoID: InvestorStoFetcher<
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
  ): InvestorStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": InvestorStoFetcher<Omit<T, "stoID">, TVariables>;

  readonly expectedShares: InvestorStoFetcher<
    T & { readonly expectedShares: number },
    TVariables
  >;

  "expectedShares+"<
    XAlias extends string = "expectedShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"expectedShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~expectedShares": InvestorStoFetcher<
    Omit<T, "expectedShares">,
    TVariables
  >;

  readonly expectedInvestment: InvestorStoFetcher<
    T & { readonly expectedInvestment: number },
    TVariables
  >;

  "expectedInvestment+"<
    XAlias extends string = "expectedInvestment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"expectedInvestment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~expectedInvestment": InvestorStoFetcher<
    Omit<T, "expectedInvestment">,
    TVariables
  >;

  readonly isKYC: InvestorStoFetcher<
    T & { readonly isKYC: number },
    TVariables
  >;

  "isKYC+"<
    XAlias extends string = "isKYC",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isKYC", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isKYC": InvestorStoFetcher<Omit<T, "isKYC">, TVariables>;

  readonly applied: InvestorStoFetcher<
    T & { readonly applied: boolean },
    TVariables
  >;

  "applied+"<
    XAlias extends string = "applied",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"applied", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~applied": InvestorStoFetcher<Omit<T, "applied">, TVariables>;

  readonly updateDate: InvestorStoFetcher<
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
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~updateDate": InvestorStoFetcher<Omit<T, "updateDate">, TVariables>;

  readonly status: InvestorStoFetcher<
    T & { readonly status: number },
    TVariables
  >;

  "status+"<
    XAlias extends string = "status",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"status", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~status": InvestorStoFetcher<Omit<T, "status">, TVariables>;

  readonly inviteFriendEmailText: InvestorStoFetcher<
    T & { readonly inviteFriendEmailText?: string },
    TVariables
  >;

  "inviteFriendEmailText+"<
    XAlias extends string = "inviteFriendEmailText",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"inviteFriendEmailText", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~inviteFriendEmailText": InvestorStoFetcher<
    Omit<T, "inviteFriendEmailText">,
    TVariables
  >;

  readonly usufructuaryFirstName: InvestorStoFetcher<
    T & { readonly usufructuaryFirstName?: string },
    TVariables
  >;

  "usufructuaryFirstName+"<
    XAlias extends string = "usufructuaryFirstName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"usufructuaryFirstName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~usufructuaryFirstName": InvestorStoFetcher<
    Omit<T, "usufructuaryFirstName">,
    TVariables
  >;

  readonly usufructuaryLastName: InvestorStoFetcher<
    T & { readonly usufructuaryLastName?: string },
    TVariables
  >;

  "usufructuaryLastName+"<
    XAlias extends string = "usufructuaryLastName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"usufructuaryLastName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~usufructuaryLastName": InvestorStoFetcher<
    Omit<T, "usufructuaryLastName">,
    TVariables
  >;

  readonly usufructuaryAddress: InvestorStoFetcher<
    T & { readonly usufructuaryAddress?: string },
    TVariables
  >;

  "usufructuaryAddress+"<
    XAlias extends string = "usufructuaryAddress",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"usufructuaryAddress", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~usufructuaryAddress": InvestorStoFetcher<
    Omit<T, "usufructuaryAddress">,
    TVariables
  >;

  readonly usufructuaryCity: InvestorStoFetcher<
    T & { readonly usufructuaryCity?: string },
    TVariables
  >;

  "usufructuaryCity+"<
    XAlias extends string = "usufructuaryCity",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"usufructuaryCity", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~usufructuaryCity": InvestorStoFetcher<
    Omit<T, "usufructuaryCity">,
    TVariables
  >;

  readonly usufructuaryCountry: InvestorStoFetcher<
    T & { readonly usufructuaryCountry?: string },
    TVariables
  >;

  "usufructuaryCountry+"<
    XAlias extends string = "usufructuaryCountry",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"usufructuaryCountry", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~usufructuaryCountry": InvestorStoFetcher<
    Omit<T, "usufructuaryCountry">,
    TVariables
  >;

  readonly usufructuaryEmail: InvestorStoFetcher<
    T & { readonly usufructuaryEmail?: string },
    TVariables
  >;

  "usufructuaryEmail+"<
    XAlias extends string = "usufructuaryEmail",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"usufructuaryEmail", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~usufructuaryEmail": InvestorStoFetcher<
    Omit<T, "usufructuaryEmail">,
    TVariables
  >;

  readonly beneficialFirstName: InvestorStoFetcher<
    T & { readonly beneficialFirstName?: string },
    TVariables
  >;

  "beneficialFirstName+"<
    XAlias extends string = "beneficialFirstName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"beneficialFirstName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~beneficialFirstName": InvestorStoFetcher<
    Omit<T, "beneficialFirstName">,
    TVariables
  >;

  readonly beneficialLastName: InvestorStoFetcher<
    T & { readonly beneficialLastName?: string },
    TVariables
  >;

  "beneficialLastName+"<
    XAlias extends string = "beneficialLastName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"beneficialLastName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~beneficialLastName": InvestorStoFetcher<
    Omit<T, "beneficialLastName">,
    TVariables
  >;

  readonly beneficialAddress: InvestorStoFetcher<
    T & { readonly beneficialAddress?: string },
    TVariables
  >;

  "beneficialAddress+"<
    XAlias extends string = "beneficialAddress",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"beneficialAddress", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~beneficialAddress": InvestorStoFetcher<
    Omit<T, "beneficialAddress">,
    TVariables
  >;

  readonly beneficialCity: InvestorStoFetcher<
    T & { readonly beneficialCity?: string },
    TVariables
  >;

  "beneficialCity+"<
    XAlias extends string = "beneficialCity",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"beneficialCity", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~beneficialCity": InvestorStoFetcher<
    Omit<T, "beneficialCity">,
    TVariables
  >;

  readonly beneficialCountry: InvestorStoFetcher<
    T & { readonly beneficialCountry?: string },
    TVariables
  >;

  "beneficialCountry+"<
    XAlias extends string = "beneficialCountry",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"beneficialCountry", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~beneficialCountry": InvestorStoFetcher<
    Omit<T, "beneficialCountry">,
    TVariables
  >;

  readonly beneficialEmail: InvestorStoFetcher<
    T & { readonly beneficialEmail?: string },
    TVariables
  >;

  "beneficialEmail+"<
    XAlias extends string = "beneficialEmail",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"beneficialEmail", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~beneficialEmail": InvestorStoFetcher<
    Omit<T, "beneficialEmail">,
    TVariables
  >;

  readonly beneficialBirth: InvestorStoFetcher<
    T & { readonly beneficialBirth?: string },
    TVariables
  >;

  "beneficialBirth+"<
    XAlias extends string = "beneficialBirth",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"beneficialBirth", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~beneficialBirth": InvestorStoFetcher<
    Omit<T, "beneficialBirth">,
    TVariables
  >;

  readonly beneficialNationality: InvestorStoFetcher<
    T & { readonly beneficialNationality?: string },
    TVariables
  >;

  "beneficialNationality+"<
    XAlias extends string = "beneficialNationality",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"beneficialNationality", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~beneficialNationality": InvestorStoFetcher<
    Omit<T, "beneficialNationality">,
    TVariables
  >;

  readonly isUsufructuary: InvestorStoFetcher<
    T & { readonly isUsufructuary: number },
    TVariables
  >;

  "isUsufructuary+"<
    XAlias extends string = "isUsufructuary",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isUsufructuary", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isUsufructuary": InvestorStoFetcher<
    Omit<T, "isUsufructuary">,
    TVariables
  >;

  readonly isActive: InvestorStoFetcher<
    T & { readonly isActive: number },
    TVariables
  >;

  "isActive+"<
    XAlias extends string = "isActive",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isActive", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isActive": InvestorStoFetcher<Omit<T, "isActive">, TVariables>;

  readonly notes: InvestorStoFetcher<
    T & { readonly notes?: string },
    TVariables
  >;

  "notes+"<
    XAlias extends string = "notes",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"notes", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~notes": InvestorStoFetcher<Omit<T, "notes">, TVariables>;

  readonly KycExpiryDate: InvestorStoFetcher<
    T & { readonly KycExpiryDate?: string },
    TVariables
  >;

  "KycExpiryDate+"<
    XAlias extends string = "KycExpiryDate",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"KycExpiryDate", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~KycExpiryDate": InvestorStoFetcher<
    Omit<T, "KycExpiryDate">,
    TVariables
  >;
}

export const investorSto$: InvestorStoFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "InvestorSto",
    "EMBEDDED",
    [],
    [
      "ID",
      "isAccountClosed",
      "investorID",
      "stoID",
      "expectedShares",
      "expectedInvestment",
      "isKYC",
      "applied",
      {
        category: "SCALAR",
        name: "updateDate",
        undefinable: true,
      },
      "status",
      {
        category: "SCALAR",
        name: "inviteFriendEmailText",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "usufructuaryFirstName",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "usufructuaryLastName",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "usufructuaryAddress",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "usufructuaryCity",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "usufructuaryCountry",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "usufructuaryEmail",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "beneficialFirstName",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "beneficialLastName",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "beneficialAddress",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "beneficialCity",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "beneficialCountry",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "beneficialEmail",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "beneficialBirth",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "beneficialNationality",
        undefinable: true,
      },
      "isUsufructuary",
      "isActive",
      {
        category: "SCALAR",
        name: "notes",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "KycExpiryDate",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const investorSto$$ =
  investorSto$.ID.isAccountClosed.investorID.stoID.expectedShares
    .expectedInvestment.isKYC.applied.updateDate.status.inviteFriendEmailText
    .usufructuaryFirstName.usufructuaryLastName.usufructuaryAddress
    .usufructuaryCity.usufructuaryCountry.usufructuaryEmail.beneficialFirstName
    .beneficialLastName.beneficialAddress.beneficialCity.beneficialCountry
    .beneficialEmail.beneficialBirth.beneficialNationality.isUsufructuary
    .isActive.notes.KycExpiryDate;
