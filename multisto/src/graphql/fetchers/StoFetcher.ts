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
export interface StoFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Sto", T, TVariables> {
  on<
    XName extends ImplementationType<"Sto">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): StoFetcher<
    XName extends "Sto"
      ? T & X
      : WithTypeName<T, ImplementationType<"Sto">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Sto">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): StoFetcher<T, TVariables>;

  readonly __typename: StoFetcher<
    T & { __typename: ImplementationType<"Sto"> },
    TVariables
  >;

  readonly ID: StoFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": StoFetcher<Omit<T, "ID">, TVariables>;

  readonly title: StoFetcher<T & { readonly title: string }, TVariables>;

  "title+"<
    XAlias extends string = "title",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"title", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": StoFetcher<Omit<T, "title">, TVariables>;

  readonly details: StoFetcher<T & { readonly details: string }, TVariables>;

  "details+"<
    XAlias extends string = "details",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"details", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~details": StoFetcher<Omit<T, "details">, TVariables>;

  readonly isActive: StoFetcher<T & { readonly isActive: number }, TVariables>;

  "isActive+"<
    XAlias extends string = "isActive",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isActive", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isActive": StoFetcher<Omit<T, "isActive">, TVariables>;

  readonly logo: StoFetcher<T & { readonly logo: string }, TVariables>;

  "logo+"<
    XAlias extends string = "logo",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"logo", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~logo": StoFetcher<Omit<T, "logo">, TVariables>;

  readonly ethereumContractAddress: StoFetcher<
    T & { readonly ethereumContractAddress: string },
    TVariables
  >;

  "ethereumContractAddress+"<
    XAlias extends string = "ethereumContractAddress",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ethereumContractAddress", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ethereumContractAddress": StoFetcher<
    Omit<T, "ethereumContractAddress">,
    TVariables
  >;

  readonly ethereumWhitelistAddress: StoFetcher<
    T & { readonly ethereumWhitelistAddress: string },
    TVariables
  >;

  "ethereumWhitelistAddress+"<
    XAlias extends string = "ethereumWhitelistAddress",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ethereumWhitelistAddress", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ethereumWhitelistAddress": StoFetcher<
    Omit<T, "ethereumWhitelistAddress">,
    TVariables
  >;

  readonly disclaimer: StoFetcher<
    T & { readonly disclaimer: string },
    TVariables
  >;

  "disclaimer+"<
    XAlias extends string = "disclaimer",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"disclaimer", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~disclaimer": StoFetcher<Omit<T, "disclaimer">, TVariables>;

  readonly stolink: StoFetcher<T & { readonly stolink: string }, TVariables>;

  "stolink+"<
    XAlias extends string = "stolink",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stolink", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stolink": StoFetcher<Omit<T, "stolink">, TVariables>;

  readonly stolinkfull: StoFetcher<
    T & { readonly stolinkfull: string },
    TVariables
  >;

  "stolinkfull+"<
    XAlias extends string = "stolinkfull",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stolinkfull", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stolinkfull": StoFetcher<Omit<T, "stolinkfull">, TVariables>;

  readonly stoType: StoFetcher<T & { readonly stoType: number }, TVariables>;

  "stoType+"<
    XAlias extends string = "stoType",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoType", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoType": StoFetcher<Omit<T, "stoType">, TVariables>;

  readonly stoInvestorTypes: StoFetcher<
    T & { readonly stoInvestorTypes: readonly number[] },
    TVariables
  >;

  "stoInvestorTypes+"<
    XAlias extends string = "stoInvestorTypes",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoInvestorTypes", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly number[] }
        : { readonly [key in XAlias]: readonly number[] }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoInvestorTypes": StoFetcher<
    Omit<T, "stoInvestorTypes">,
    TVariables
  >;

  readonly emailFooter: StoFetcher<
    T & { readonly emailFooter: string },
    TVariables
  >;

  "emailFooter+"<
    XAlias extends string = "emailFooter",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"emailFooter", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~emailFooter": StoFetcher<Omit<T, "emailFooter">, TVariables>;

  readonly registrationText: StoFetcher<
    T & { readonly registrationText?: string },
    TVariables
  >;

  "registrationText+"<
    XAlias extends string = "registrationText",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"registrationText", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): StoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~registrationText": StoFetcher<
    Omit<T, "registrationText">,
    TVariables
  >;

  readonly website: StoFetcher<T & { readonly website: string }, TVariables>;

  "website+"<
    XAlias extends string = "website",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"website", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~website": StoFetcher<Omit<T, "website">, TVariables>;

  readonly stoInvestorTypesNotOnShareRegister: StoFetcher<
    T & { readonly stoInvestorTypesNotOnShareRegister: readonly number[] },
    TVariables
  >;

  "stoInvestorTypesNotOnShareRegister+"<
    XAlias extends string = "stoInvestorTypesNotOnShareRegister",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoInvestorTypesNotOnShareRegister", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly number[] }
        : { readonly [key in XAlias]: readonly number[] }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoInvestorTypesNotOnShareRegister": StoFetcher<
    Omit<T, "stoInvestorTypesNotOnShareRegister">,
    TVariables
  >;

  readonly companyType: StoFetcher<
    T & { readonly companyType: number },
    TVariables
  >;

  "companyType+"<
    XAlias extends string = "companyType",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"companyType", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~companyType": StoFetcher<Omit<T, "companyType">, TVariables>;

  readonly registrationSuccessText: StoFetcher<
    T & { readonly registrationSuccessText: string },
    TVariables
  >;

  "registrationSuccessText+"<
    XAlias extends string = "registrationSuccessText",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"registrationSuccessText", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~registrationSuccessText": StoFetcher<
    Omit<T, "registrationSuccessText">,
    TVariables
  >;

  readonly tellAFriendText: StoFetcher<
    T & { readonly tellAFriendText: string },
    TVariables
  >;

  "tellAFriendText+"<
    XAlias extends string = "tellAFriendText",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"tellAFriendText", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~tellAFriendText": StoFetcher<
    Omit<T, "tellAFriendText">,
    TVariables
  >;

  readonly inviteFriendEmailText: StoFetcher<
    T & { readonly inviteFriendEmailText: string },
    TVariables
  >;

  "inviteFriendEmailText+"<
    XAlias extends string = "inviteFriendEmailText",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"inviteFriendEmailText", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~inviteFriendEmailText": StoFetcher<
    Omit<T, "inviteFriendEmailText">,
    TVariables
  >;

  readonly fullDetails: StoFetcher<
    T & { readonly fullDetails: string },
    TVariables
  >;

  "fullDetails+"<
    XAlias extends string = "fullDetails",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"fullDetails", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~fullDetails": StoFetcher<Omit<T, "fullDetails">, TVariables>;

  readonly exchangeOpenDate: StoFetcher<
    T & { readonly exchangeOpenDate: string },
    TVariables
  >;

  "exchangeOpenDate+"<
    XAlias extends string = "exchangeOpenDate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"exchangeOpenDate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~exchangeOpenDate": StoFetcher<
    Omit<T, "exchangeOpenDate">,
    TVariables
  >;

  readonly propertyPicture: StoFetcher<
    T & { readonly propertyPicture: string },
    TVariables
  >;

  "propertyPicture+"<
    XAlias extends string = "propertyPicture",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"propertyPicture", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~propertyPicture": StoFetcher<
    Omit<T, "propertyPicture">,
    TVariables
  >;

  readonly docusign_sto_contract: StoFetcher<
    T & { readonly docusign_sto_contract: string },
    TVariables
  >;

  "docusign_sto_contract+"<
    XAlias extends string = "docusign_sto_contract",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"docusign_sto_contract", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~docusign_sto_contract": StoFetcher<
    Omit<T, "docusign_sto_contract">,
    TVariables
  >;

  readonly docusign_sto_purchase: StoFetcher<
    T & { readonly docusign_sto_purchase: string },
    TVariables
  >;

  "docusign_sto_purchase+"<
    XAlias extends string = "docusign_sto_purchase",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"docusign_sto_purchase", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~docusign_sto_purchase": StoFetcher<
    Omit<T, "docusign_sto_purchase">,
    TVariables
  >;

  readonly externalSystemID: StoFetcher<
    T & { readonly externalSystemID: number },
    TVariables
  >;

  "externalSystemID+"<
    XAlias extends string = "externalSystemID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"externalSystemID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~externalSystemID": StoFetcher<
    Omit<T, "externalSystemID">,
    TVariables
  >;

  readonly projectAddress: StoFetcher<
    T & { readonly projectAddress: string },
    TVariables
  >;

  "projectAddress+"<
    XAlias extends string = "projectAddress",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"projectAddress", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~projectAddress": StoFetcher<Omit<T, "projectAddress">, TVariables>;

  readonly legalDetails: StoFetcher<
    T & { readonly legalDetails: string },
    TVariables
  >;

  "legalDetails+"<
    XAlias extends string = "legalDetails",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"legalDetails", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~legalDetails": StoFetcher<Omit<T, "legalDetails">, TVariables>;

  readonly isBuyButtonEnabled: StoFetcher<
    T & { readonly isBuyButtonEnabled: boolean },
    TVariables
  >;

  "isBuyButtonEnabled+"<
    XAlias extends string = "isBuyButtonEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBuyButtonEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isBuyButtonEnabled": StoFetcher<
    Omit<T, "isBuyButtonEnabled">,
    TVariables
  >;

  readonly isBimountEnabled: StoFetcher<
    T & { readonly isBimountEnabled?: number },
    TVariables
  >;

  "isBimountEnabled+"<
    XAlias extends string = "isBimountEnabled",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBimountEnabled", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): StoFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~isBimountEnabled": StoFetcher<
    Omit<T, "isBimountEnabled">,
    TVariables
  >;

  readonly projectCost: StoFetcher<
    T & { readonly projectCost?: number },
    TVariables
  >;

  "projectCost+"<
    XAlias extends string = "projectCost",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"projectCost", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): StoFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~projectCost": StoFetcher<Omit<T, "projectCost">, TVariables>;

  readonly createdAt: StoFetcher<
    T & { readonly createdAt: number },
    TVariables
  >;

  "createdAt+"<
    XAlias extends string = "createdAt",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"createdAt", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~createdAt": StoFetcher<Omit<T, "createdAt">, TVariables>;

  readonly verifyInvestorComHostToken: StoFetcher<
    T & { readonly verifyInvestorComHostToken?: string },
    TVariables
  >;

  "verifyInvestorComHostToken+"<
    XAlias extends string = "verifyInvestorComHostToken",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"verifyInvestorComHostToken", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): StoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~verifyInvestorComHostToken": StoFetcher<
    Omit<T, "verifyInvestorComHostToken">,
    TVariables
  >;

  readonly helloSignClientID: StoFetcher<
    T & { readonly helloSignClientID?: string },
    TVariables
  >;

  "helloSignClientID+"<
    XAlias extends string = "helloSignClientID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"helloSignClientID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): StoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~helloSignClientID": StoFetcher<
    Omit<T, "helloSignClientID">,
    TVariables
  >;

  readonly investmentReturn: StoFetcher<
    T & { readonly investmentReturn: number },
    TVariables
  >;

  "investmentReturn+"<
    XAlias extends string = "investmentReturn",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investmentReturn", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investmentReturn": StoFetcher<
    Omit<T, "investmentReturn">,
    TVariables
  >;

  readonly picture: StoFetcher<T & { readonly picture: string }, TVariables>;

  "picture+"<
    XAlias extends string = "picture",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"picture", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~picture": StoFetcher<Omit<T, "picture">, TVariables>;

  readonly logoUrl: StoFetcher<T & { readonly logoUrl: string }, TVariables>;

  "logoUrl+"<
    XAlias extends string = "logoUrl",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"logoUrl", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~logoUrl": StoFetcher<Omit<T, "logoUrl">, TVariables>;

  parsedSettings<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Settings", X, XVariables>
  ): StoFetcher<T & { readonly parsedSettings: X }, TVariables & XVariables>;

  parsedSettings<
    X extends object,
    XVariables extends object,
    XAlias extends string = "parsedSettings",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Settings", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"parsedSettings", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  images<X extends object, XVariables extends object>(
    child: ObjectFetcher<"PropertyFile", X, XVariables>
  ): StoFetcher<T & { readonly images: readonly X[] }, TVariables & XVariables>;

  images<
    X extends object,
    XVariables extends object,
    XAlias extends string = "images",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"PropertyFile", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"images", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  documents<X extends object, XVariables extends object>(
    child: ObjectFetcher<"PropertyFile", X, XVariables>
  ): StoFetcher<
    T & { readonly documents: readonly X[] },
    TVariables & XVariables
  >;

  documents<
    X extends object,
    XVariables extends object,
    XAlias extends string = "documents",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"PropertyFile", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"documents", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly baseCurrencyID: StoFetcher<
    T & { readonly baseCurrencyID: number },
    TVariables
  >;

  "baseCurrencyID+"<
    XAlias extends string = "baseCurrencyID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"baseCurrencyID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~baseCurrencyID": StoFetcher<Omit<T, "baseCurrencyID">, TVariables>;

  meta<X extends object, XVariables extends object>(
    child: ObjectFetcher<"StoMetaValue", X, XVariables>
  ): StoFetcher<T & { readonly meta: readonly X[] }, TVariables & XVariables>;

  meta<
    X extends object,
    XVariables extends object,
    XAlias extends string = "meta",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"StoMetaValue", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"meta", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly popularity: StoFetcher<
    T & { readonly popularity: number },
    TVariables
  >;

  "popularity+"<
    XAlias extends string = "popularity",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"popularity", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~popularity": StoFetcher<Omit<T, "popularity">, TVariables>;
}

export const sto$: StoFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Sto",
    "EMBEDDED",
    [],
    [
      "ID",
      "title",
      "details",
      "isActive",
      "logo",
      "ethereumContractAddress",
      "ethereumWhitelistAddress",
      "disclaimer",
      "stolink",
      "stolinkfull",
      "stoType",
      "stoInvestorTypes",
      "emailFooter",
      {
        category: "SCALAR",
        name: "registrationText",
        undefinable: true,
      },
      "website",
      "stoInvestorTypesNotOnShareRegister",
      "companyType",
      "registrationSuccessText",
      "tellAFriendText",
      "inviteFriendEmailText",
      "fullDetails",
      "exchangeOpenDate",
      "propertyPicture",
      "docusign_sto_contract",
      "docusign_sto_purchase",
      "externalSystemID",
      "projectAddress",
      "legalDetails",
      "isBuyButtonEnabled",
      {
        category: "SCALAR",
        name: "isBimountEnabled",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "projectCost",
        undefinable: true,
      },
      "createdAt",
      {
        category: "SCALAR",
        name: "verifyInvestorComHostToken",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "helloSignClientID",
        undefinable: true,
      },
      "investmentReturn",
      "picture",
      "logoUrl",
      {
        category: "SCALAR",
        name: "parsedSettings",
        targetTypeName: "Settings",
      },
      {
        category: "LIST",
        name: "images",
        targetTypeName: "PropertyFile",
      },
      {
        category: "LIST",
        name: "documents",
        targetTypeName: "PropertyFile",
      },
      "baseCurrencyID",
      {
        category: "LIST",
        name: "meta",
        targetTypeName: "StoMetaValue",
      },
      "popularity",
    ]
  ),
  undefined
);

export const sto$$ =
  sto$.ID.title.details.isActive.logo.ethereumContractAddress
    .ethereumWhitelistAddress.disclaimer.stolink.stolinkfull.stoType
    .stoInvestorTypes.emailFooter.registrationText.website
    .stoInvestorTypesNotOnShareRegister.companyType.registrationSuccessText
    .tellAFriendText.inviteFriendEmailText.fullDetails.exchangeOpenDate
    .propertyPicture.docusign_sto_contract.docusign_sto_purchase
    .externalSystemID.projectAddress.legalDetails.isBuyButtonEnabled
    .isBimountEnabled.projectCost.createdAt.verifyInvestorComHostToken
    .helloSignClientID.investmentReturn.picture.logoUrl.baseCurrencyID
    .popularity;
