import type { FieldOptions, DirectiveArgs } from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { WithTypeName, ImplementationType } from "../CommonTypes";
import type { KycProviders } from "../enums";
import type { KycRequirementStep } from "../enums";
import type { AccreditationProviderEnum } from "../enums";
import type { AccreditationRequirementEnum } from "../enums";
import type { SharePurchaseModeEnum } from "../enums";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface AppParametersFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"AppParameters", T, TVariables> {
  on<
    XName extends ImplementationType<"AppParameters">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): AppParametersFetcher<
    XName extends "AppParameters"
      ? T & X
      : WithTypeName<T, ImplementationType<"AppParameters">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"AppParameters">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): AppParametersFetcher<T, TVariables>;

  readonly __typename: AppParametersFetcher<
    T & { __typename: ImplementationType<"AppParameters"> },
    TVariables
  >;

  readonly IsMarketSpace: AppParametersFetcher<
    T & { readonly IsMarketSpace: boolean },
    TVariables
  >;

  "IsMarketSpace+"<
    XAlias extends string = "IsMarketSpace",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"IsMarketSpace", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~IsMarketSpace": AppParametersFetcher<
    Omit<T, "IsMarketSpace">,
    TVariables
  >;

  readonly investorDashboardTheme: AppParametersFetcher<
    T & { readonly investorDashboardTheme: string },
    TVariables
  >;

  "investorDashboardTheme+"<
    XAlias extends string = "investorDashboardTheme",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorDashboardTheme", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorDashboardTheme": AppParametersFetcher<
    Omit<T, "investorDashboardTheme">,
    TVariables
  >;

  readonly IsDocuSignActive: AppParametersFetcher<
    T & { readonly IsDocuSignActive: boolean },
    TVariables
  >;

  "IsDocuSignActive+"<
    XAlias extends string = "IsDocuSignActive",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"IsDocuSignActive", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~IsDocuSignActive": AppParametersFetcher<
    Omit<T, "IsDocuSignActive">,
    TVariables
  >;

  readonly IsHelloSignActive: AppParametersFetcher<
    T & { readonly IsHelloSignActive: boolean },
    TVariables
  >;

  "IsHelloSignActive+"<
    XAlias extends string = "IsHelloSignActive",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"IsHelloSignActive", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~IsHelloSignActive": AppParametersFetcher<
    Omit<T, "IsHelloSignActive">,
    TVariables
  >;

  readonly doAutomaticPurchase: AppParametersFetcher<
    T & { readonly doAutomaticPurchase: boolean },
    TVariables
  >;

  "doAutomaticPurchase+"<
    XAlias extends string = "doAutomaticPurchase",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"doAutomaticPurchase", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~doAutomaticPurchase": AppParametersFetcher<
    Omit<T, "doAutomaticPurchase">,
    TVariables
  >;

  readonly isSSOModeEnabled: AppParametersFetcher<
    T & { readonly isSSOModeEnabled: boolean },
    TVariables
  >;

  "isSSOModeEnabled+"<
    XAlias extends string = "isSSOModeEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isSSOModeEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isSSOModeEnabled": AppParametersFetcher<
    Omit<T, "isSSOModeEnabled">,
    TVariables
  >;

  readonly doAutomaticSellBack: AppParametersFetcher<
    T & { readonly doAutomaticSellBack: boolean },
    TVariables
  >;

  "doAutomaticSellBack+"<
    XAlias extends string = "doAutomaticSellBack",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"doAutomaticSellBack", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~doAutomaticSellBack": AppParametersFetcher<
    Omit<T, "doAutomaticSellBack">,
    TVariables
  >;

  readonly areSTOHostnamesEnabled: AppParametersFetcher<
    T & { readonly areSTOHostnamesEnabled: boolean },
    TVariables
  >;

  "areSTOHostnamesEnabled+"<
    XAlias extends string = "areSTOHostnamesEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"areSTOHostnamesEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~areSTOHostnamesEnabled": AppParametersFetcher<
    Omit<T, "areSTOHostnamesEnabled">,
    TVariables
  >;

  readonly KycProvider: AppParametersFetcher<
    T & { readonly KycProvider: KycProviders },
    TVariables
  >;

  "KycProvider+"<
    XAlias extends string = "KycProvider",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"KycProvider", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: KycProviders }
        : { readonly [key in XAlias]: KycProviders }),
    TVariables & XDirectiveVariables
  >;

  readonly "~KycProvider": AppParametersFetcher<
    Omit<T, "KycProvider">,
    TVariables
  >;

  readonly IsDarwSignatureActive: AppParametersFetcher<
    T & { readonly IsDarwSignatureActive: boolean },
    TVariables
  >;

  "IsDarwSignatureActive+"<
    XAlias extends string = "IsDarwSignatureActive",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"IsDarwSignatureActive", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~IsDarwSignatureActive": AppParametersFetcher<
    Omit<T, "IsDarwSignatureActive">,
    TVariables
  >;

  readonly IsCheckMarkSignatureActive: AppParametersFetcher<
    T & { readonly IsCheckMarkSignatureActive: boolean },
    TVariables
  >;

  "IsCheckMarkSignatureActive+"<
    XAlias extends string = "IsCheckMarkSignatureActive",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"IsCheckMarkSignatureActive", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~IsCheckMarkSignatureActive": AppParametersFetcher<
    Omit<T, "IsCheckMarkSignatureActive">,
    TVariables
  >;

  readonly drawSignaturePrefillFonts: AppParametersFetcher<
    T & { readonly drawSignaturePrefillFonts: readonly string[] },
    TVariables
  >;

  "drawSignaturePrefillFonts+"<
    XAlias extends string = "drawSignaturePrefillFonts",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"drawSignaturePrefillFonts", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly string[] }
        : { readonly [key in XAlias]: readonly string[] }),
    TVariables & XDirectiveVariables
  >;

  readonly "~drawSignaturePrefillFonts": AppParametersFetcher<
    Omit<T, "drawSignaturePrefillFonts">,
    TVariables
  >;

  readonly web3Address: AppParametersFetcher<
    T & { readonly web3Address: string },
    TVariables
  >;

  "web3Address+"<
    XAlias extends string = "web3Address",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"web3Address", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~web3Address": AppParametersFetcher<
    Omit<T, "web3Address">,
    TVariables
  >;

  readonly binanceWeb3Address: AppParametersFetcher<
    T & { readonly binanceWeb3Address: string },
    TVariables
  >;

  "binanceWeb3Address+"<
    XAlias extends string = "binanceWeb3Address",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"binanceWeb3Address", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~binanceWeb3Address": AppParametersFetcher<
    Omit<T, "binanceWeb3Address">,
    TVariables
  >;

  readonly polygonWeb3Address: AppParametersFetcher<
    T & { readonly polygonWeb3Address: string },
    TVariables
  >;

  "polygonWeb3Address+"<
    XAlias extends string = "polygonWeb3Address",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"polygonWeb3Address", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~polygonWeb3Address": AppParametersFetcher<
    Omit<T, "polygonWeb3Address">,
    TVariables
  >;

  readonly IsInternalWalletStoSpecific: AppParametersFetcher<
    T & { readonly IsInternalWalletStoSpecific: boolean },
    TVariables
  >;

  "IsInternalWalletStoSpecific+"<
    XAlias extends string = "IsInternalWalletStoSpecific",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"IsInternalWalletStoSpecific", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~IsInternalWalletStoSpecific": AppParametersFetcher<
    Omit<T, "IsInternalWalletStoSpecific">,
    TVariables
  >;

  readonly IsInternalWalletGlobal: AppParametersFetcher<
    T & { readonly IsInternalWalletGlobal: boolean },
    TVariables
  >;

  "IsInternalWalletGlobal+"<
    XAlias extends string = "IsInternalWalletGlobal",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"IsInternalWalletGlobal", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~IsInternalWalletGlobal": AppParametersFetcher<
    Omit<T, "IsInternalWalletGlobal">,
    TVariables
  >;

  readonly IsInternalWalletDisabled: AppParametersFetcher<
    T & { readonly IsInternalWalletDisabled: boolean },
    TVariables
  >;

  "IsInternalWalletDisabled+"<
    XAlias extends string = "IsInternalWalletDisabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"IsInternalWalletDisabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~IsInternalWalletDisabled": AppParametersFetcher<
    Omit<T, "IsInternalWalletDisabled">,
    TVariables
  >;

  readonly leftSideMenuFont: AppParametersFetcher<
    T & { readonly leftSideMenuFont: string },
    TVariables
  >;

  "leftSideMenuFont+"<
    XAlias extends string = "leftSideMenuFont",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"leftSideMenuFont", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~leftSideMenuFont": AppParametersFetcher<
    Omit<T, "leftSideMenuFont">,
    TVariables
  >;

  readonly poweredByLabel: AppParametersFetcher<
    T & { readonly poweredByLabel: string },
    TVariables
  >;

  "poweredByLabel+"<
    XAlias extends string = "poweredByLabel",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"poweredByLabel", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~poweredByLabel": AppParametersFetcher<
    Omit<T, "poweredByLabel">,
    TVariables
  >;

  readonly clientKYC: AppParametersFetcher<
    T & { readonly clientKYC: string },
    TVariables
  >;

  "clientKYC+"<
    XAlias extends string = "clientKYC",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"clientKYC", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~clientKYC": AppParametersFetcher<Omit<T, "clientKYC">, TVariables>;

  readonly SSORedirectFrontEnd: AppParametersFetcher<
    T & { readonly SSORedirectFrontEnd: string },
    TVariables
  >;

  "SSORedirectFrontEnd+"<
    XAlias extends string = "SSORedirectFrontEnd",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"SSORedirectFrontEnd", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~SSORedirectFrontEnd": AppParametersFetcher<
    Omit<T, "SSORedirectFrontEnd">,
    TVariables
  >;

  readonly IsMoonpayEnabled: AppParametersFetcher<
    T & { readonly IsMoonpayEnabled: boolean },
    TVariables
  >;

  "IsMoonpayEnabled+"<
    XAlias extends string = "IsMoonpayEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"IsMoonpayEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~IsMoonpayEnabled": AppParametersFetcher<
    Omit<T, "IsMoonpayEnabled">,
    TVariables
  >;

  readonly KycRequirementStep: AppParametersFetcher<
    T & { readonly KycRequirementStep: KycRequirementStep },
    TVariables
  >;

  "KycRequirementStep+"<
    XAlias extends string = "KycRequirementStep",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"KycRequirementStep", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: KycRequirementStep }
        : { readonly [key in XAlias]: KycRequirementStep }),
    TVariables & XDirectiveVariables
  >;

  readonly "~KycRequirementStep": AppParametersFetcher<
    Omit<T, "KycRequirementStep">,
    TVariables
  >;

  readonly is2FAEnabledByDefault: AppParametersFetcher<
    T & { readonly is2FAEnabledByDefault: boolean },
    TVariables
  >;

  "is2FAEnabledByDefault+"<
    XAlias extends string = "is2FAEnabledByDefault",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"is2FAEnabledByDefault", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~is2FAEnabledByDefault": AppParametersFetcher<
    Omit<T, "is2FAEnabledByDefault">,
    TVariables
  >;

  readonly doAutomaticBlockchainTransactionChecks: AppParametersFetcher<
    T & { readonly doAutomaticBlockchainTransactionChecks: boolean },
    TVariables
  >;

  "doAutomaticBlockchainTransactionChecks+"<
    XAlias extends string = "doAutomaticBlockchainTransactionChecks",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"doAutomaticBlockchainTransactionChecks", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~doAutomaticBlockchainTransactionChecks": AppParametersFetcher<
    Omit<T, "doAutomaticBlockchainTransactionChecks">,
    TVariables
  >;

  readonly isInvoicingEnabled: AppParametersFetcher<
    T & { readonly isInvoicingEnabled: boolean },
    TVariables
  >;

  "isInvoicingEnabled+"<
    XAlias extends string = "isInvoicingEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isInvoicingEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isInvoicingEnabled": AppParametersFetcher<
    Omit<T, "isInvoicingEnabled">,
    TVariables
  >;

  readonly atomicSwapContractAddress: AppParametersFetcher<
    T & { readonly atomicSwapContractAddress: string },
    TVariables
  >;

  "atomicSwapContractAddress+"<
    XAlias extends string = "atomicSwapContractAddress",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"atomicSwapContractAddress", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~atomicSwapContractAddress": AppParametersFetcher<
    Omit<T, "atomicSwapContractAddress">,
    TVariables
  >;

  readonly isAccreditationEnabled: AppParametersFetcher<
    T & { readonly isAccreditationEnabled: boolean },
    TVariables
  >;

  "isAccreditationEnabled+"<
    XAlias extends string = "isAccreditationEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isAccreditationEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isAccreditationEnabled": AppParametersFetcher<
    Omit<T, "isAccreditationEnabled">,
    TVariables
  >;

  readonly AccreditationProvider: AppParametersFetcher<
    T & { readonly AccreditationProvider: AccreditationProviderEnum },
    TVariables
  >;

  "AccreditationProvider+"<
    XAlias extends string = "AccreditationProvider",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"AccreditationProvider", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: AccreditationProviderEnum }
        : { readonly [key in XAlias]: AccreditationProviderEnum }),
    TVariables & XDirectiveVariables
  >;

  readonly "~AccreditationProvider": AppParametersFetcher<
    Omit<T, "AccreditationProvider">,
    TVariables
  >;

  readonly AccreddRedirectLink: AppParametersFetcher<
    T & { readonly AccreddRedirectLink: string },
    TVariables
  >;

  "AccreddRedirectLink+"<
    XAlias extends string = "AccreddRedirectLink",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"AccreddRedirectLink", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~AccreddRedirectLink": AppParametersFetcher<
    Omit<T, "AccreddRedirectLink">,
    TVariables
  >;

  readonly isCloudStorageEnabled: AppParametersFetcher<
    T & { readonly isCloudStorageEnabled: boolean },
    TVariables
  >;

  "isCloudStorageEnabled+"<
    XAlias extends string = "isCloudStorageEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isCloudStorageEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isCloudStorageEnabled": AppParametersFetcher<
    Omit<T, "isCloudStorageEnabled">,
    TVariables
  >;

  readonly is2FAForcedForAll: AppParametersFetcher<
    T & { readonly is2FAForcedForAll: boolean },
    TVariables
  >;

  "is2FAForcedForAll+"<
    XAlias extends string = "is2FAForcedForAll",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"is2FAForcedForAll", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~is2FAForcedForAll": AppParametersFetcher<
    Omit<T, "is2FAForcedForAll">,
    TVariables
  >;

  readonly isPropertySortingEnabled: AppParametersFetcher<
    T & { readonly isPropertySortingEnabled: boolean },
    TVariables
  >;

  "isPropertySortingEnabled+"<
    XAlias extends string = "isPropertySortingEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isPropertySortingEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isPropertySortingEnabled": AppParametersFetcher<
    Omit<T, "isPropertySortingEnabled">,
    TVariables
  >;

  readonly isWalletManagementModuleEnabled: AppParametersFetcher<
    T & { readonly isWalletManagementModuleEnabled: boolean },
    TVariables
  >;

  "isWalletManagementModuleEnabled+"<
    XAlias extends string = "isWalletManagementModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isWalletManagementModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isWalletManagementModuleEnabled": AppParametersFetcher<
    Omit<T, "isWalletManagementModuleEnabled">,
    TVariables
  >;

  readonly isMyPortfolioModuleEnabled: AppParametersFetcher<
    T & { readonly isMyPortfolioModuleEnabled: boolean },
    TVariables
  >;

  "isMyPortfolioModuleEnabled+"<
    XAlias extends string = "isMyPortfolioModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isMyPortfolioModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isMyPortfolioModuleEnabled": AppParametersFetcher<
    Omit<T, "isMyPortfolioModuleEnabled">,
    TVariables
  >;

  readonly isActiveOfferingsModuleEnabled: AppParametersFetcher<
    T & { readonly isActiveOfferingsModuleEnabled: boolean },
    TVariables
  >;

  "isActiveOfferingsModuleEnabled+"<
    XAlias extends string = "isActiveOfferingsModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isActiveOfferingsModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isActiveOfferingsModuleEnabled": AppParametersFetcher<
    Omit<T, "isActiveOfferingsModuleEnabled">,
    TVariables
  >;

  readonly isNewsModuleEnabled: AppParametersFetcher<
    T & { readonly isNewsModuleEnabled: boolean },
    TVariables
  >;

  "isNewsModuleEnabled+"<
    XAlias extends string = "isNewsModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isNewsModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isNewsModuleEnabled": AppParametersFetcher<
    Omit<T, "isNewsModuleEnabled">,
    TVariables
  >;

  readonly isContractsModuleEnabled: AppParametersFetcher<
    T & { readonly isContractsModuleEnabled: boolean },
    TVariables
  >;

  "isContractsModuleEnabled+"<
    XAlias extends string = "isContractsModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isContractsModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isContractsModuleEnabled": AppParametersFetcher<
    Omit<T, "isContractsModuleEnabled">,
    TVariables
  >;

  readonly isCorporateActionsModuleEnabled: AppParametersFetcher<
    T & { readonly isCorporateActionsModuleEnabled: boolean },
    TVariables
  >;

  "isCorporateActionsModuleEnabled+"<
    XAlias extends string = "isCorporateActionsModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isCorporateActionsModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isCorporateActionsModuleEnabled": AppParametersFetcher<
    Omit<T, "isCorporateActionsModuleEnabled">,
    TVariables
  >;

  readonly isTradingModuleEnabled: AppParametersFetcher<
    T & { readonly isTradingModuleEnabled: boolean },
    TVariables
  >;

  "isTradingModuleEnabled+"<
    XAlias extends string = "isTradingModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isTradingModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isTradingModuleEnabled": AppParametersFetcher<
    Omit<T, "isTradingModuleEnabled">,
    TVariables
  >;

  readonly isChatModuleEnabled: AppParametersFetcher<
    T & { readonly isChatModuleEnabled: boolean },
    TVariables
  >;

  "isChatModuleEnabled+"<
    XAlias extends string = "isChatModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isChatModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isChatModuleEnabled": AppParametersFetcher<
    Omit<T, "isChatModuleEnabled">,
    TVariables
  >;

  readonly isSupportModuleEnabled: AppParametersFetcher<
    T & { readonly isSupportModuleEnabled: boolean },
    TVariables
  >;

  "isSupportModuleEnabled+"<
    XAlias extends string = "isSupportModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isSupportModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isSupportModuleEnabled": AppParametersFetcher<
    Omit<T, "isSupportModuleEnabled">,
    TVariables
  >;

  readonly isInvestorOwnershipModuleEnabled: AppParametersFetcher<
    T & { readonly isInvestorOwnershipModuleEnabled: boolean },
    TVariables
  >;

  "isInvestorOwnershipModuleEnabled+"<
    XAlias extends string = "isInvestorOwnershipModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isInvestorOwnershipModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isInvestorOwnershipModuleEnabled": AppParametersFetcher<
    Omit<T, "isInvestorOwnershipModuleEnabled">,
    TVariables
  >;

  readonly isSettingsModuleEnabled: AppParametersFetcher<
    T & { readonly isSettingsModuleEnabled: boolean },
    TVariables
  >;

  "isSettingsModuleEnabled+"<
    XAlias extends string = "isSettingsModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isSettingsModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isSettingsModuleEnabled": AppParametersFetcher<
    Omit<T, "isSettingsModuleEnabled">,
    TVariables
  >;

  readonly isTellAFriendModuleEnabled: AppParametersFetcher<
    T & { readonly isTellAFriendModuleEnabled: boolean },
    TVariables
  >;

  "isTellAFriendModuleEnabled+"<
    XAlias extends string = "isTellAFriendModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isTellAFriendModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isTellAFriendModuleEnabled": AppParametersFetcher<
    Omit<T, "isTellAFriendModuleEnabled">,
    TVariables
  >;

  readonly isAccreditationModuleEnabled: AppParametersFetcher<
    T & { readonly isAccreditationModuleEnabled: boolean },
    TVariables
  >;

  "isAccreditationModuleEnabled+"<
    XAlias extends string = "isAccreditationModuleEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isAccreditationModuleEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isAccreditationModuleEnabled": AppParametersFetcher<
    Omit<T, "isAccreditationModuleEnabled">,
    TVariables
  >;

  readonly isContactTheSponsorFontSwitchEnabled: AppParametersFetcher<
    T & { readonly isContactTheSponsorFontSwitchEnabled: boolean },
    TVariables
  >;

  "isContactTheSponsorFontSwitchEnabled+"<
    XAlias extends string = "isContactTheSponsorFontSwitchEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isContactTheSponsorFontSwitchEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isContactTheSponsorFontSwitchEnabled": AppParametersFetcher<
    Omit<T, "isContactTheSponsorFontSwitchEnabled">,
    TVariables
  >;

  readonly isSellBackEnabled: AppParametersFetcher<
    T & { readonly isSellBackEnabled: boolean },
    TVariables
  >;

  "isSellBackEnabled+"<
    XAlias extends string = "isSellBackEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isSellBackEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isSellBackEnabled": AppParametersFetcher<
    Omit<T, "isSellBackEnabled">,
    TVariables
  >;

  readonly isBankDetailsSwitchEnabled: AppParametersFetcher<
    T & { readonly isBankDetailsSwitchEnabled: boolean },
    TVariables
  >;

  "isBankDetailsSwitchEnabled+"<
    XAlias extends string = "isBankDetailsSwitchEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBankDetailsSwitchEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isBankDetailsSwitchEnabled": AppParametersFetcher<
    Omit<T, "isBankDetailsSwitchEnabled">,
    TVariables
  >;

  readonly isBlockchainAddressSwitchEnabled: AppParametersFetcher<
    T & { readonly isBlockchainAddressSwitchEnabled: boolean },
    TVariables
  >;

  "isBlockchainAddressSwitchEnabled+"<
    XAlias extends string = "isBlockchainAddressSwitchEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isBlockchainAddressSwitchEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isBlockchainAddressSwitchEnabled": AppParametersFetcher<
    Omit<T, "isBlockchainAddressSwitchEnabled">,
    TVariables
  >;

  readonly toggleThemeEditor: AppParametersFetcher<
    T & { readonly toggleThemeEditor: boolean },
    TVariables
  >;

  "toggleThemeEditor+"<
    XAlias extends string = "toggleThemeEditor",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"toggleThemeEditor", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~toggleThemeEditor": AppParametersFetcher<
    Omit<T, "toggleThemeEditor">,
    TVariables
  >;

  readonly accreditationRequirementStep: AppParametersFetcher<
    T & { readonly accreditationRequirementStep: AccreditationRequirementEnum },
    TVariables
  >;

  "accreditationRequirementStep+"<
    XAlias extends string = "accreditationRequirementStep",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"accreditationRequirementStep", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: AccreditationRequirementEnum }
        : { readonly [key in XAlias]: AccreditationRequirementEnum }),
    TVariables & XDirectiveVariables
  >;

  readonly "~accreditationRequirementStep": AppParametersFetcher<
    Omit<T, "accreditationRequirementStep">,
    TVariables
  >;

  readonly accreditationRequiringCountries: AppParametersFetcher<
    T & { readonly accreditationRequiringCountries: readonly string[] },
    TVariables
  >;

  "accreditationRequiringCountries+"<
    XAlias extends string = "accreditationRequiringCountries",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"accreditationRequiringCountries", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly string[] }
        : { readonly [key in XAlias]: readonly string[] }),
    TVariables & XDirectiveVariables
  >;

  readonly "~accreditationRequiringCountries": AppParametersFetcher<
    Omit<T, "accreditationRequiringCountries">,
    TVariables
  >;

  readonly scheduledEmailNotificationTimer: AppParametersFetcher<
    T & { readonly scheduledEmailNotificationTimer: number },
    TVariables
  >;

  "scheduledEmailNotificationTimer+"<
    XAlias extends string = "scheduledEmailNotificationTimer",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"scheduledEmailNotificationTimer", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~scheduledEmailNotificationTimer": AppParametersFetcher<
    Omit<T, "scheduledEmailNotificationTimer">,
    TVariables
  >;

  readonly sharePurchaseDocumentsMode: AppParametersFetcher<
    T & { readonly sharePurchaseDocumentsMode: SharePurchaseModeEnum },
    TVariables
  >;

  "sharePurchaseDocumentsMode+"<
    XAlias extends string = "sharePurchaseDocumentsMode",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sharePurchaseDocumentsMode", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: SharePurchaseModeEnum }
        : { readonly [key in XAlias]: SharePurchaseModeEnum }),
    TVariables & XDirectiveVariables
  >;

  readonly "~sharePurchaseDocumentsMode": AppParametersFetcher<
    Omit<T, "sharePurchaseDocumentsMode">,
    TVariables
  >;

  readonly skipDocumentSignScreen: AppParametersFetcher<
    T & { readonly skipDocumentSignScreen: boolean },
    TVariables
  >;

  "skipDocumentSignScreen+"<
    XAlias extends string = "skipDocumentSignScreen",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"skipDocumentSignScreen", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~skipDocumentSignScreen": AppParametersFetcher<
    Omit<T, "skipDocumentSignScreen">,
    TVariables
  >;

  readonly allowInvestorsToRegister: AppParametersFetcher<
    T & { readonly allowInvestorsToRegister: boolean },
    TVariables
  >;

  "allowInvestorsToRegister+"<
    XAlias extends string = "allowInvestorsToRegister",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"allowInvestorsToRegister", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~allowInvestorsToRegister": AppParametersFetcher<
    Omit<T, "allowInvestorsToRegister">,
    TVariables
  >;

  readonly hideContractsTilPostPurchase: AppParametersFetcher<
    T & { readonly hideContractsTilPostPurchase: boolean },
    TVariables
  >;

  "hideContractsTilPostPurchase+"<
    XAlias extends string = "hideContractsTilPostPurchase",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"hideContractsTilPostPurchase", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~hideContractsTilPostPurchase": AppParametersFetcher<
    Omit<T, "hideContractsTilPostPurchase">,
    TVariables
  >;

  readonly isInvestmentReturnCalculationEnabled: AppParametersFetcher<
    T & { readonly isInvestmentReturnCalculationEnabled: boolean },
    TVariables
  >;

  "isInvestmentReturnCalculationEnabled+"<
    XAlias extends string = "isInvestmentReturnCalculationEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isInvestmentReturnCalculationEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isInvestmentReturnCalculationEnabled": AppParametersFetcher<
    Omit<T, "isInvestmentReturnCalculationEnabled">,
    TVariables
  >;

  readonly isInternalTokenizedPurchaseEnabled: AppParametersFetcher<
    T & { readonly isInternalTokenizedPurchaseEnabled: boolean },
    TVariables
  >;

  "isInternalTokenizedPurchaseEnabled+"<
    XAlias extends string = "isInternalTokenizedPurchaseEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isInternalTokenizedPurchaseEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isInternalTokenizedPurchaseEnabled": AppParametersFetcher<
    Omit<T, "isInternalTokenizedPurchaseEnabled">,
    TVariables
  >;

  readonly isDriversLicenseEnabled: AppParametersFetcher<
    T & { readonly isDriversLicenseEnabled: boolean },
    TVariables
  >;

  "isDriversLicenseEnabled+"<
    XAlias extends string = "isDriversLicenseEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isDriversLicenseEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isDriversLicenseEnabled": AppParametersFetcher<
    Omit<T, "isDriversLicenseEnabled">,
    TVariables
  >;

  termsAndConditionsConfig<X extends object, XVariables extends object>(
    child: ObjectFetcher<"TermsAndConditionsConfig", X, XVariables>
  ): AppParametersFetcher<
    T & { readonly termsAndConditionsConfig: X },
    TVariables & XVariables
  >;

  termsAndConditionsConfig<
    X extends object,
    XVariables extends object,
    XAlias extends string = "termsAndConditionsConfig",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"TermsAndConditionsConfig", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"termsAndConditionsConfig", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly isAllDocumentsSignedPopUpEnabled: AppParametersFetcher<
    T & { readonly isAllDocumentsSignedPopUpEnabled: boolean },
    TVariables
  >;

  "isAllDocumentsSignedPopUpEnabled+"<
    XAlias extends string = "isAllDocumentsSignedPopUpEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isAllDocumentsSignedPopUpEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isAllDocumentsSignedPopUpEnabled": AppParametersFetcher<
    Omit<T, "isAllDocumentsSignedPopUpEnabled">,
    TVariables
  >;

  readonly isMergingPaymentsSharesRequestsEnabled: AppParametersFetcher<
    T & { readonly isMergingPaymentsSharesRequestsEnabled: boolean },
    TVariables
  >;

  "isMergingPaymentsSharesRequestsEnabled+"<
    XAlias extends string = "isMergingPaymentsSharesRequestsEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isMergingPaymentsSharesRequestsEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isMergingPaymentsSharesRequestsEnabled": AppParametersFetcher<
    Omit<T, "isMergingPaymentsSharesRequestsEnabled">,
    TVariables
  >;

  readonly isShareTransferEmailEnabled: AppParametersFetcher<
    T & { readonly isShareTransferEmailEnabled: boolean },
    TVariables
  >;

  "isShareTransferEmailEnabled+"<
    XAlias extends string = "isShareTransferEmailEnabled",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isShareTransferEmailEnabled", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AppParametersFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isShareTransferEmailEnabled": AppParametersFetcher<
    Omit<T, "isShareTransferEmailEnabled">,
    TVariables
  >;
}

export const appParameters$: AppParametersFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "AppParameters",
    "EMBEDDED",
    [],
    [
      "IsMarketSpace",
      "investorDashboardTheme",
      "IsDocuSignActive",
      "IsHelloSignActive",
      "doAutomaticPurchase",
      "isSSOModeEnabled",
      "doAutomaticSellBack",
      "areSTOHostnamesEnabled",
      "KycProvider",
      "IsDarwSignatureActive",
      "IsCheckMarkSignatureActive",
      "drawSignaturePrefillFonts",
      "web3Address",
      "binanceWeb3Address",
      "polygonWeb3Address",
      "IsInternalWalletStoSpecific",
      "IsInternalWalletGlobal",
      "IsInternalWalletDisabled",
      "leftSideMenuFont",
      "poweredByLabel",
      "clientKYC",
      "SSORedirectFrontEnd",
      "IsMoonpayEnabled",
      "KycRequirementStep",
      "is2FAEnabledByDefault",
      "doAutomaticBlockchainTransactionChecks",
      "isInvoicingEnabled",
      "atomicSwapContractAddress",
      "isAccreditationEnabled",
      "AccreditationProvider",
      "AccreddRedirectLink",
      "isCloudStorageEnabled",
      "is2FAForcedForAll",
      "isPropertySortingEnabled",
      "isWalletManagementModuleEnabled",
      "isMyPortfolioModuleEnabled",
      "isActiveOfferingsModuleEnabled",
      "isNewsModuleEnabled",
      "isContractsModuleEnabled",
      "isCorporateActionsModuleEnabled",
      "isTradingModuleEnabled",
      "isChatModuleEnabled",
      "isSupportModuleEnabled",
      "isInvestorOwnershipModuleEnabled",
      "isSettingsModuleEnabled",
      "isTellAFriendModuleEnabled",
      "isAccreditationModuleEnabled",
      "isContactTheSponsorFontSwitchEnabled",
      "isSellBackEnabled",
      "isBankDetailsSwitchEnabled",
      "isBlockchainAddressSwitchEnabled",
      "toggleThemeEditor",
      "accreditationRequirementStep",
      "accreditationRequiringCountries",
      "scheduledEmailNotificationTimer",
      "sharePurchaseDocumentsMode",
      "skipDocumentSignScreen",
      "allowInvestorsToRegister",
      "hideContractsTilPostPurchase",
      "isInvestmentReturnCalculationEnabled",
      "isInternalTokenizedPurchaseEnabled",
      "isDriversLicenseEnabled",
      {
        category: "SCALAR",
        name: "termsAndConditionsConfig",
        targetTypeName: "TermsAndConditionsConfig",
      },
      "isAllDocumentsSignedPopUpEnabled",
      "isMergingPaymentsSharesRequestsEnabled",
      "isShareTransferEmailEnabled",
    ]
  ),
  undefined
);

export const appParameters$$ =
  appParameters$.IsMarketSpace.investorDashboardTheme.IsDocuSignActive
    .IsHelloSignActive.doAutomaticPurchase.isSSOModeEnabled.doAutomaticSellBack
    .areSTOHostnamesEnabled.KycProvider.IsDarwSignatureActive
    .IsCheckMarkSignatureActive.drawSignaturePrefillFonts.web3Address
    .binanceWeb3Address.polygonWeb3Address.IsInternalWalletStoSpecific
    .IsInternalWalletGlobal.IsInternalWalletDisabled.leftSideMenuFont
    .poweredByLabel.clientKYC.SSORedirectFrontEnd.IsMoonpayEnabled
    .KycRequirementStep.is2FAEnabledByDefault
    .doAutomaticBlockchainTransactionChecks.isInvoicingEnabled
    .atomicSwapContractAddress.isAccreditationEnabled.AccreditationProvider
    .AccreddRedirectLink.isCloudStorageEnabled.is2FAForcedForAll
    .isPropertySortingEnabled.isWalletManagementModuleEnabled
    .isMyPortfolioModuleEnabled.isActiveOfferingsModuleEnabled
    .isNewsModuleEnabled.isContractsModuleEnabled
    .isCorporateActionsModuleEnabled.isTradingModuleEnabled.isChatModuleEnabled
    .isSupportModuleEnabled.isInvestorOwnershipModuleEnabled
    .isSettingsModuleEnabled.isTellAFriendModuleEnabled
    .isAccreditationModuleEnabled.isContactTheSponsorFontSwitchEnabled
    .isSellBackEnabled.isBankDetailsSwitchEnabled
    .isBlockchainAddressSwitchEnabled.toggleThemeEditor
    .accreditationRequirementStep.accreditationRequiringCountries
    .scheduledEmailNotificationTimer.sharePurchaseDocumentsMode
    .skipDocumentSignScreen.allowInvestorsToRegister
    .hideContractsTilPostPurchase.isInvestmentReturnCalculationEnabled
    .isInternalTokenizedPurchaseEnabled.isDriversLicenseEnabled
    .isAllDocumentsSignedPopUpEnabled.isMergingPaymentsSharesRequestsEnabled
    .isShareTransferEmailEnabled;
