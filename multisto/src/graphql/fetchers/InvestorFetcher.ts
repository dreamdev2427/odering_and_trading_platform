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
export interface InvestorFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Investor", T, TVariables> {
  on<
    XName extends ImplementationType<"Investor">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): InvestorFetcher<
    XName extends "Investor"
      ? T & X
      : WithTypeName<T, ImplementationType<"Investor">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Investor">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): InvestorFetcher<T, TVariables>;

  readonly __typename: InvestorFetcher<
    T & { __typename: ImplementationType<"Investor"> },
    TVariables
  >;

  readonly ID: InvestorFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": InvestorFetcher<Omit<T, "ID">, TVariables>;

  readonly firstName: InvestorFetcher<
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
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~firstName": InvestorFetcher<Omit<T, "firstName">, TVariables>;

  readonly lastName: InvestorFetcher<
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
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~lastName": InvestorFetcher<Omit<T, "lastName">, TVariables>;

  readonly address: InvestorFetcher<
    T & { readonly address?: string },
    TVariables
  >;

  "address+"<
    XAlias extends string = "address",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"address", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~address": InvestorFetcher<Omit<T, "address">, TVariables>;

  readonly country: InvestorFetcher<
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
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~country": InvestorFetcher<Omit<T, "country">, TVariables>;

  readonly phone: InvestorFetcher<T & { readonly phone?: string }, TVariables>;

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
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~phone": InvestorFetcher<Omit<T, "phone">, TVariables>;

  readonly cell: InvestorFetcher<T & { readonly cell?: string }, TVariables>;

  "cell+"<
    XAlias extends string = "cell",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"cell", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~cell": InvestorFetcher<Omit<T, "cell">, TVariables>;

  readonly zip: InvestorFetcher<T & { readonly zip?: string }, TVariables>;

  "zip+"<
    XAlias extends string = "zip",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"zip", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~zip": InvestorFetcher<Omit<T, "zip">, TVariables>;

  readonly town: InvestorFetcher<T & { readonly town?: string }, TVariables>;

  "town+"<
    XAlias extends string = "town",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"town", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~town": InvestorFetcher<Omit<T, "town">, TVariables>;

  readonly state: InvestorFetcher<T & { readonly state?: string }, TVariables>;

  "state+"<
    XAlias extends string = "state",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"state", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~state": InvestorFetcher<Omit<T, "state">, TVariables>;

  readonly email: InvestorFetcher<T & { readonly email: string }, TVariables>;

  "email+"<
    XAlias extends string = "email",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"email", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~email": InvestorFetcher<Omit<T, "email">, TVariables>;

  readonly passportNumber: InvestorFetcher<
    T & { readonly passportNumber?: string },
    TVariables
  >;

  "passportNumber+"<
    XAlias extends string = "passportNumber",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"passportNumber", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~passportNumber": InvestorFetcher<
    Omit<T, "passportNumber">,
    TVariables
  >;

  readonly nationalID: InvestorFetcher<
    T & { readonly nationalID?: string },
    TVariables
  >;

  "nationalID+"<
    XAlias extends string = "nationalID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"nationalID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~nationalID": InvestorFetcher<Omit<T, "nationalID">, TVariables>;

  readonly kinname: InvestorFetcher<
    T & { readonly kinname?: string },
    TVariables
  >;

  "kinname+"<
    XAlias extends string = "kinname",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"kinname", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~kinname": InvestorFetcher<Omit<T, "kinname">, TVariables>;

  readonly kinphone: InvestorFetcher<
    T & { readonly kinphone?: string },
    TVariables
  >;

  "kinphone+"<
    XAlias extends string = "kinphone",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"kinphone", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~kinphone": InvestorFetcher<Omit<T, "kinphone">, TVariables>;

  readonly kinemail: InvestorFetcher<
    T & { readonly kinemail?: string },
    TVariables
  >;

  "kinemail+"<
    XAlias extends string = "kinemail",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"kinemail", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~kinemail": InvestorFetcher<Omit<T, "kinemail">, TVariables>;

  readonly investorType: InvestorFetcher<
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
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorType": InvestorFetcher<
    Omit<T, "investorType">,
    TVariables
  >;

  readonly companyName: InvestorFetcher<
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
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~companyName": InvestorFetcher<Omit<T, "companyName">, TVariables>;

  readonly titleWithinCompany: InvestorFetcher<
    T & { readonly titleWithinCompany?: string },
    TVariables
  >;

  "titleWithinCompany+"<
    XAlias extends string = "titleWithinCompany",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"titleWithinCompany", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~titleWithinCompany": InvestorFetcher<
    Omit<T, "titleWithinCompany">,
    TVariables
  >;

  readonly powerToBindCompany: InvestorFetcher<
    T & { readonly powerToBindCompany: number },
    TVariables
  >;

  "powerToBindCompany+"<
    XAlias extends string = "powerToBindCompany",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"powerToBindCompany", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~powerToBindCompany": InvestorFetcher<
    Omit<T, "powerToBindCompany">,
    TVariables
  >;

  readonly birthDate: InvestorFetcher<
    T & { readonly birthDate?: string },
    TVariables
  >;

  "birthDate+"<
    XAlias extends string = "birthDate",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"birthDate", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~birthDate": InvestorFetcher<Omit<T, "birthDate">, TVariables>;

  readonly isTwoFactorEnabled: InvestorFetcher<
    T & { readonly isTwoFactorEnabled: boolean },
    TVariables
  >;

  "isTwoFactorEnabled+"<
    XAlias extends string = "isTwoFactorEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isTwoFactorEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isTwoFactorEnabled": InvestorFetcher<
    Omit<T, "isTwoFactorEnabled">,
    TVariables
  >;

  readonly language: InvestorFetcher<
    T & { readonly language: string },
    TVariables
  >;

  "language+"<
    XAlias extends string = "language",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"language", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~language": InvestorFetcher<Omit<T, "language">, TVariables>;

  readonly middleName: InvestorFetcher<
    T & { readonly middleName?: string },
    TVariables
  >;

  "middleName+"<
    XAlias extends string = "middleName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"middleName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~middleName": InvestorFetcher<Omit<T, "middleName">, TVariables>;

  readonly socialSecurity: InvestorFetcher<
    T & { readonly socialSecurity?: string },
    TVariables
  >;

  "socialSecurity+"<
    XAlias extends string = "socialSecurity",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"socialSecurity", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~socialSecurity": InvestorFetcher<
    Omit<T, "socialSecurity">,
    TVariables
  >;

  readonly mailingAddress: InvestorFetcher<
    T & { readonly mailingAddress?: string },
    TVariables
  >;

  "mailingAddress+"<
    XAlias extends string = "mailingAddress",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"mailingAddress", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~mailingAddress": InvestorFetcher<
    Omit<T, "mailingAddress">,
    TVariables
  >;

  readonly faxNumber: InvestorFetcher<
    T & { readonly faxNumber?: string },
    TVariables
  >;

  "faxNumber+"<
    XAlias extends string = "faxNumber",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"faxNumber", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~faxNumber": InvestorFetcher<Omit<T, "faxNumber">, TVariables>;

  readonly maritalStatus: InvestorFetcher<
    T & { readonly maritalStatus: number },
    TVariables
  >;

  "maritalStatus+"<
    XAlias extends string = "maritalStatus",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"maritalStatus", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~maritalStatus": InvestorFetcher<
    Omit<T, "maritalStatus">,
    TVariables
  >;

  readonly occupation: InvestorFetcher<
    T & { readonly occupation?: string },
    TVariables
  >;

  "occupation+"<
    XAlias extends string = "occupation",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"occupation", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~occupation": InvestorFetcher<Omit<T, "occupation">, TVariables>;

  readonly employerName: InvestorFetcher<
    T & { readonly employerName?: string },
    TVariables
  >;

  "employerName+"<
    XAlias extends string = "employerName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"employerName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~employerName": InvestorFetcher<
    Omit<T, "employerName">,
    TVariables
  >;

  readonly employerAddress: InvestorFetcher<
    T & { readonly employerAddress?: string },
    TVariables
  >;

  "employerAddress+"<
    XAlias extends string = "employerAddress",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"employerAddress", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~employerAddress": InvestorFetcher<
    Omit<T, "employerAddress">,
    TVariables
  >;

  readonly retirementAccount: InvestorFetcher<
    T & { readonly retirementAccount: number },
    TVariables
  >;

  "retirementAccount+"<
    XAlias extends string = "retirementAccount",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"retirementAccount", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~retirementAccount": InvestorFetcher<
    Omit<T, "retirementAccount">,
    TVariables
  >;

  readonly trustOrBusinessEntity: InvestorFetcher<
    T & { readonly trustOrBusinessEntity: number },
    TVariables
  >;

  "trustOrBusinessEntity+"<
    XAlias extends string = "trustOrBusinessEntity",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"trustOrBusinessEntity", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~trustOrBusinessEntity": InvestorFetcher<
    Omit<T, "trustOrBusinessEntity">,
    TVariables
  >;

  readonly dateIncorporation: InvestorFetcher<
    T & { readonly dateIncorporation?: string },
    TVariables
  >;

  "dateIncorporation+"<
    XAlias extends string = "dateIncorporation",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateIncorporation", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~dateIncorporation": InvestorFetcher<
    Omit<T, "dateIncorporation">,
    TVariables
  >;

  readonly taxID: InvestorFetcher<T & { readonly taxID?: string }, TVariables>;

  "taxID+"<
    XAlias extends string = "taxID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"taxID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~taxID": InvestorFetcher<Omit<T, "taxID">, TVariables>;

  readonly govtID: InvestorFetcher<
    T & { readonly govtID?: string },
    TVariables
  >;

  "govtID+"<
    XAlias extends string = "govtID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"govtID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~govtID": InvestorFetcher<Omit<T, "govtID">, TVariables>;

  readonly isTax: InvestorFetcher<T & { readonly isTax: number }, TVariables>;

  "isTax+"<
    XAlias extends string = "isTax",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isTax", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isTax": InvestorFetcher<Omit<T, "isTax">, TVariables>;

  readonly secondaryContactName: InvestorFetcher<
    T & { readonly secondaryContactName?: string },
    TVariables
  >;

  "secondaryContactName+"<
    XAlias extends string = "secondaryContactName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"secondaryContactName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~secondaryContactName": InvestorFetcher<
    Omit<T, "secondaryContactName">,
    TVariables
  >;

  readonly secondaryContactPhone: InvestorFetcher<
    T & { readonly secondaryContactPhone?: string },
    TVariables
  >;

  "secondaryContactPhone+"<
    XAlias extends string = "secondaryContactPhone",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"secondaryContactPhone", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~secondaryContactPhone": InvestorFetcher<
    Omit<T, "secondaryContactPhone">,
    TVariables
  >;

  readonly secondaryContactEmail: InvestorFetcher<
    T & { readonly secondaryContactEmail?: string },
    TVariables
  >;

  "secondaryContactEmail+"<
    XAlias extends string = "secondaryContactEmail",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"secondaryContactEmail", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~secondaryContactEmail": InvestorFetcher<
    Omit<T, "secondaryContactEmail">,
    TVariables
  >;

  readonly primaryContactName: InvestorFetcher<
    T & { readonly primaryContactName?: string },
    TVariables
  >;

  "primaryContactName+"<
    XAlias extends string = "primaryContactName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"primaryContactName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~primaryContactName": InvestorFetcher<
    Omit<T, "primaryContactName">,
    TVariables
  >;

  readonly primaryContactPhone: InvestorFetcher<
    T & { readonly primaryContactPhone?: string },
    TVariables
  >;

  "primaryContactPhone+"<
    XAlias extends string = "primaryContactPhone",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"primaryContactPhone", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~primaryContactPhone": InvestorFetcher<
    Omit<T, "primaryContactPhone">,
    TVariables
  >;

  readonly primaryContactEmail: InvestorFetcher<
    T & { readonly primaryContactEmail?: string },
    TVariables
  >;

  "primaryContactEmail+"<
    XAlias extends string = "primaryContactEmail",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"primaryContactEmail", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~primaryContactEmail": InvestorFetcher<
    Omit<T, "primaryContactEmail">,
    TVariables
  >;

  readonly countryBusiness: InvestorFetcher<
    T & { readonly countryBusiness?: string },
    TVariables
  >;

  "countryBusiness+"<
    XAlias extends string = "countryBusiness",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"countryBusiness", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~countryBusiness": InvestorFetcher<
    Omit<T, "countryBusiness">,
    TVariables
  >;

  readonly countryCitizenship: InvestorFetcher<
    T & { readonly countryCitizenship?: string },
    TVariables
  >;

  "countryCitizenship+"<
    XAlias extends string = "countryCitizenship",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"countryCitizenship", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~countryCitizenship": InvestorFetcher<
    Omit<T, "countryCitizenship">,
    TVariables
  >;

  readonly taxCountry: InvestorFetcher<
    T & { readonly taxCountry?: string },
    TVariables
  >;

  "taxCountry+"<
    XAlias extends string = "taxCountry",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"taxCountry", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~taxCountry": InvestorFetcher<Omit<T, "taxCountry">, TVariables>;

  readonly brokerID: InvestorFetcher<
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
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~brokerID": InvestorFetcher<Omit<T, "brokerID">, TVariables>;

  readonly driversLicenseID: InvestorFetcher<
    T & { readonly driversLicenseID?: string },
    TVariables
  >;

  "driversLicenseID+"<
    XAlias extends string = "driversLicenseID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"driversLicenseID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): InvestorFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~driversLicenseID": InvestorFetcher<
    Omit<T, "driversLicenseID">,
    TVariables
  >;

  readonly investmentLimitUpdateDate: InvestorFetcher<
    T & { readonly investmentLimitUpdateDate: string },
    TVariables
  >;

  "investmentLimitUpdateDate+"<
    XAlias extends string = "investmentLimitUpdateDate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investmentLimitUpdateDate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investmentLimitUpdateDate": InvestorFetcher<
    Omit<T, "investmentLimitUpdateDate">,
    TVariables
  >;

  readonly allowedTotalInvestment: InvestorFetcher<
    T & { readonly allowedTotalInvestment: number },
    TVariables
  >;

  "allowedTotalInvestment+"<
    XAlias extends string = "allowedTotalInvestment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"allowedTotalInvestment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~allowedTotalInvestment": InvestorFetcher<
    Omit<T, "allowedTotalInvestment">,
    TVariables
  >;

  readonly yearlyTotalInvestment: InvestorFetcher<
    T & { readonly yearlyTotalInvestment: number },
    TVariables
  >;

  "yearlyTotalInvestment+"<
    XAlias extends string = "yearlyTotalInvestment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"yearlyTotalInvestment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~yearlyTotalInvestment": InvestorFetcher<
    Omit<T, "yearlyTotalInvestment">,
    TVariables
  >;

  readonly userName: InvestorFetcher<
    T & { readonly userName: string },
    TVariables
  >;

  "userName+"<
    XAlias extends string = "userName",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"userName", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): InvestorFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~userName": InvestorFetcher<Omit<T, "userName">, TVariables>;
}

export const investor$: InvestorFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Investor",
    "EMBEDDED",
    [],
    [
      "ID",
      "firstName",
      "lastName",
      {
        category: "SCALAR",
        name: "address",
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
        name: "cell",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "zip",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "town",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "state",
        undefinable: true,
      },
      "email",
      {
        category: "SCALAR",
        name: "passportNumber",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "nationalID",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "kinname",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "kinphone",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "kinemail",
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
        name: "titleWithinCompany",
        undefinable: true,
      },
      "powerToBindCompany",
      {
        category: "SCALAR",
        name: "birthDate",
        undefinable: true,
      },
      "isTwoFactorEnabled",
      "language",
      {
        category: "SCALAR",
        name: "middleName",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "socialSecurity",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "mailingAddress",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "faxNumber",
        undefinable: true,
      },
      "maritalStatus",
      {
        category: "SCALAR",
        name: "occupation",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "employerName",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "employerAddress",
        undefinable: true,
      },
      "retirementAccount",
      "trustOrBusinessEntity",
      {
        category: "SCALAR",
        name: "dateIncorporation",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "taxID",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "govtID",
        undefinable: true,
      },
      "isTax",
      {
        category: "SCALAR",
        name: "secondaryContactName",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "secondaryContactPhone",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "secondaryContactEmail",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "primaryContactName",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "primaryContactPhone",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "primaryContactEmail",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "countryBusiness",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "countryCitizenship",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "taxCountry",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "brokerID",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "driversLicenseID",
        undefinable: true,
      },
      "investmentLimitUpdateDate",
      "allowedTotalInvestment",
      "yearlyTotalInvestment",
      "userName",
    ]
  ),
  undefined
);

export const investor$$ =
  investor$.ID.firstName.lastName.address.country.phone.cell.zip.town.state
    .email.passportNumber.nationalID.kinname.kinphone.kinemail.investorType
    .companyName.titleWithinCompany.powerToBindCompany.birthDate
    .isTwoFactorEnabled.language.middleName.socialSecurity.mailingAddress
    .faxNumber.maritalStatus.occupation.employerName.employerAddress
    .retirementAccount.trustOrBusinessEntity.dateIncorporation.taxID.govtID
    .isTax.secondaryContactName.secondaryContactPhone.secondaryContactEmail
    .primaryContactName.primaryContactPhone.primaryContactEmail.countryBusiness
    .countryCitizenship.taxCountry.brokerID.driversLicenseID
    .investmentLimitUpdateDate.allowedTotalInvestment.yearlyTotalInvestment
    .userName;
