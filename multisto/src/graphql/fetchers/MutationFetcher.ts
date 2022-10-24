import type {
  AcceptableVariables,
  UnresolvedVariables,
  FieldOptions,
  DirectiveArgs,
} from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { MoonpayConfigInput } from "../inputs";
import type { InvestorBuyAlertInput } from "../inputs";
import type { InvestorBuyAlertOptions } from "../inputs";
import type { InvestorBuyAlertInputAdmin } from "../inputs";
import type { BuyAlertStatus } from "../enums";
import type { InvestorDepositWithdrawAlertInput } from "../inputs";
import type { InvestingEntityInput } from "../inputs";
import type { InvestingEntityMemberInput } from "../inputs";
import type { accreditionStatus } from "../enums";
import type { SignUpMarketSpaceInput } from "../inputs";
import type { InvestorBuyAlertMSInput } from "../inputs";
import type { InvestorMarketSpaceInput } from "../inputs";
import type { RegisterVoteInput } from "../inputs";
import type { DocumentFieldValueDTO } from "../inputs";
import type { InboxInput } from "../inputs";
import type { SignInSSOInput } from "../inputs";
import type { SignUpInput } from "../inputs";
import type { ChangePasswordInput } from "../inputs";
import type { SetPasswordInput } from "../inputs";
import type { InvestorUsufructuaryInput } from "../inputs";
import type { InvestorBeneficialInput } from "../inputs";
import type { InvestorProfileInput } from "../inputs";
import type { InvestorCompanyProfileInput } from "../inputs";
import type { TransferShareInput } from "../inputs";
import type { TransferEntity } from "../enums";
import type { InvestorKycInput } from "../inputs";
import type { UpdateMetadataValueInput } from "../inputs";
import type { VerifyCryptoReciepeInput } from "../inputs";
import type { FeeInput } from "../inputs";
import type { FeeCommissionInput } from "../inputs";
import type { ExchangeOfferInput } from "../inputs";
import type { ExchangeSellOrderInput } from "../inputs";
import type { ExchangeUpdateOrderInput } from "../inputs";
import type { ExchangeBuyOrderInput } from "../inputs";
import type { AtomicSwapStatus } from "../enums";
import type { BlockchainSharesTransferTransactionsInput } from "../inputs";
import type { ChatInput } from "../inputs";
import type { SENDER_TYPE } from "../enums";
import type { CHAT_CONTEXT } from "../enums";
import type { InvestorBankAccountInput } from "../inputs";
import type { ComponentCustomizationInput } from "../inputs";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface MutationFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Mutation", T, TVariables> {
  directive(name: string, args?: DirectiveArgs): MutationFetcher<T, TVariables>;

  moonpayAddTransactionDefault(): MutationFetcher<
    T & { readonly moonpayAddTransactionDefault: boolean },
    TVariables & MutationArgs["moonpayAddTransactionDefault"]
  >;

  moonpayAddTransactionDefault<
    XArgs extends AcceptableVariables<
      MutationArgs["moonpayAddTransactionDefault"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly moonpayAddTransactionDefault: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["moonpayAddTransactionDefault"]>
  >;

  moonpayAddTransactionDefault<
    XAlias extends string = "moonpayAddTransactionDefault",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"moonpayAddTransactionDefault", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["moonpayAddTransactionDefault"] &
      XDirectiveVariables
  >;

  moonpayAddTransactionDefault<
    XArgs extends AcceptableVariables<
      MutationArgs["moonpayAddTransactionDefault"]
    >,
    XAlias extends string = "moonpayAddTransactionDefault",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"moonpayAddTransactionDefault", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["moonpayAddTransactionDefault"]> &
      XDirectiveVariables
  >;

  moonpayConfigUpdate(): MutationFetcher<
    T & { readonly moonpayConfigUpdate: string },
    TVariables & MutationArgs["moonpayConfigUpdate"]
  >;

  moonpayConfigUpdate<
    XArgs extends AcceptableVariables<MutationArgs["moonpayConfigUpdate"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly moonpayConfigUpdate: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["moonpayConfigUpdate"]>
  >;

  moonpayConfigUpdate<
    XAlias extends string = "moonpayConfigUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"moonpayConfigUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs["moonpayConfigUpdate"] & XDirectiveVariables
  >;

  moonpayConfigUpdate<
    XArgs extends AcceptableVariables<MutationArgs["moonpayConfigUpdate"]>,
    XAlias extends string = "moonpayConfigUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"moonpayConfigUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["moonpayConfigUpdate"]> &
      XDirectiveVariables
  >;

  investorBuyAlert(): MutationFetcher<
    T & { readonly investorBuyAlert: number },
    TVariables & MutationArgs["investorBuyAlert"]
  >;

  investorBuyAlert<
    XArgs extends AcceptableVariables<MutationArgs["investorBuyAlert"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorBuyAlert: number },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["investorBuyAlert"]>
  >;

  investorBuyAlert<
    XAlias extends string = "investorBuyAlert",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlert", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & MutationArgs["investorBuyAlert"] & XDirectiveVariables
  >;

  investorBuyAlert<
    XArgs extends AcceptableVariables<MutationArgs["investorBuyAlert"]>,
    XAlias extends string = "investorBuyAlert",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlert", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlert"]> &
      XDirectiveVariables
  >;

  investorSellAlert(): MutationFetcher<
    T & { readonly investorSellAlert: number },
    TVariables & MutationArgs["investorSellAlert"]
  >;

  investorSellAlert<
    XArgs extends AcceptableVariables<MutationArgs["investorSellAlert"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorSellAlert: number },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["investorSellAlert"]>
  >;

  investorSellAlert<
    XAlias extends string = "investorSellAlert",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorSellAlert", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & MutationArgs["investorSellAlert"] & XDirectiveVariables
  >;

  investorSellAlert<
    XArgs extends AcceptableVariables<MutationArgs["investorSellAlert"]>,
    XAlias extends string = "investorSellAlert",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorSellAlert", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorSellAlert"]> &
      XDirectiveVariables
  >;

  investorBuyAlertAdmin(): MutationFetcher<
    T & { readonly investorBuyAlertAdmin: number },
    TVariables & MutationArgs["investorBuyAlertAdmin"]
  >;

  investorBuyAlertAdmin<
    XArgs extends AcceptableVariables<MutationArgs["investorBuyAlertAdmin"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorBuyAlertAdmin: number },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertAdmin"]>
  >;

  investorBuyAlertAdmin<
    XAlias extends string = "investorBuyAlertAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & MutationArgs["investorBuyAlertAdmin"] & XDirectiveVariables
  >;

  investorBuyAlertAdmin<
    XArgs extends AcceptableVariables<MutationArgs["investorBuyAlertAdmin"]>,
    XAlias extends string = "investorBuyAlertAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertAdmin"]> &
      XDirectiveVariables
  >;

  investorBuyAlertRemove(): MutationFetcher<
    T & { readonly investorBuyAlertRemove: boolean },
    TVariables & MutationArgs["investorBuyAlertRemove"]
  >;

  investorBuyAlertRemove<
    XArgs extends AcceptableVariables<MutationArgs["investorBuyAlertRemove"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorBuyAlertRemove: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertRemove"]>
  >;

  investorBuyAlertRemove<
    XAlias extends string = "investorBuyAlertRemove",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertRemove", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorBuyAlertRemove"] & XDirectiveVariables
  >;

  investorBuyAlertRemove<
    XArgs extends AcceptableVariables<MutationArgs["investorBuyAlertRemove"]>,
    XAlias extends string = "investorBuyAlertRemove",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertRemove", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertRemove"]> &
      XDirectiveVariables
  >;

  investorBuyAlertApprove(): MutationFetcher<
    T & { readonly investorBuyAlertApprove: boolean },
    TVariables & MutationArgs["investorBuyAlertApprove"]
  >;

  investorBuyAlertApprove<
    XArgs extends AcceptableVariables<MutationArgs["investorBuyAlertApprove"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorBuyAlertApprove: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertApprove"]>
  >;

  investorBuyAlertApprove<
    XAlias extends string = "investorBuyAlertApprove",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertApprove", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorBuyAlertApprove"] & XDirectiveVariables
  >;

  investorBuyAlertApprove<
    XArgs extends AcceptableVariables<MutationArgs["investorBuyAlertApprove"]>,
    XAlias extends string = "investorBuyAlertApprove",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertApprove", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertApprove"]> &
      XDirectiveVariables
  >;

  investorBuyAlertRemoveAdmin(): MutationFetcher<
    T & { readonly investorBuyAlertRemoveAdmin: boolean },
    TVariables & MutationArgs["investorBuyAlertRemoveAdmin"]
  >;

  investorBuyAlertRemoveAdmin<
    XArgs extends AcceptableVariables<
      MutationArgs["investorBuyAlertRemoveAdmin"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorBuyAlertRemoveAdmin: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertRemoveAdmin"]>
  >;

  investorBuyAlertRemoveAdmin<
    XAlias extends string = "investorBuyAlertRemoveAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertRemoveAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["investorBuyAlertRemoveAdmin"] &
      XDirectiveVariables
  >;

  investorBuyAlertRemoveAdmin<
    XArgs extends AcceptableVariables<
      MutationArgs["investorBuyAlertRemoveAdmin"]
    >,
    XAlias extends string = "investorBuyAlertRemoveAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertRemoveAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertRemoveAdmin"]> &
      XDirectiveVariables
  >;

  investorBuyAlertDeclineAdmin(): MutationFetcher<
    T & { readonly investorBuyAlertDeclineAdmin: boolean },
    TVariables & MutationArgs["investorBuyAlertDeclineAdmin"]
  >;

  investorBuyAlertDeclineAdmin<
    XArgs extends AcceptableVariables<
      MutationArgs["investorBuyAlertDeclineAdmin"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorBuyAlertDeclineAdmin: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertDeclineAdmin"]>
  >;

  investorBuyAlertDeclineAdmin<
    XAlias extends string = "investorBuyAlertDeclineAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertDeclineAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["investorBuyAlertDeclineAdmin"] &
      XDirectiveVariables
  >;

  investorBuyAlertDeclineAdmin<
    XArgs extends AcceptableVariables<
      MutationArgs["investorBuyAlertDeclineAdmin"]
    >,
    XAlias extends string = "investorBuyAlertDeclineAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertDeclineAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertDeclineAdmin"]> &
      XDirectiveVariables
  >;

  investorBuyAlertSetStatus(): MutationFetcher<
    T & { readonly investorBuyAlertSetStatus: boolean },
    TVariables & MutationArgs["investorBuyAlertSetStatus"]
  >;

  investorBuyAlertSetStatus<
    XArgs extends AcceptableVariables<MutationArgs["investorBuyAlertSetStatus"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorBuyAlertSetStatus: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertSetStatus"]>
  >;

  investorBuyAlertSetStatus<
    XAlias extends string = "investorBuyAlertSetStatus",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertSetStatus", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorBuyAlertSetStatus"] & XDirectiveVariables
  >;

  investorBuyAlertSetStatus<
    XArgs extends AcceptableVariables<
      MutationArgs["investorBuyAlertSetStatus"]
    >,
    XAlias extends string = "investorBuyAlertSetStatus",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertSetStatus", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertSetStatus"]> &
      XDirectiveVariables
  >;

  investorBuyAlertHide(): MutationFetcher<
    T & { readonly investorBuyAlertHide: boolean },
    TVariables & MutationArgs["investorBuyAlertHide"]
  >;

  investorBuyAlertHide<
    XArgs extends AcceptableVariables<MutationArgs["investorBuyAlertHide"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorBuyAlertHide: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertHide"]>
  >;

  investorBuyAlertHide<
    XAlias extends string = "investorBuyAlertHide",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertHide", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorBuyAlertHide"] & XDirectiveVariables
  >;

  investorBuyAlertHide<
    XArgs extends AcceptableVariables<MutationArgs["investorBuyAlertHide"]>,
    XAlias extends string = "investorBuyAlertHide",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertHide", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertHide"]> &
      XDirectiveVariables
  >;

  investorDepositWithdrawAlert(): MutationFetcher<
    T & { readonly investorDepositWithdrawAlert: boolean },
    TVariables & MutationArgs["investorDepositWithdrawAlert"]
  >;

  investorDepositWithdrawAlert<
    XArgs extends AcceptableVariables<
      MutationArgs["investorDepositWithdrawAlert"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorDepositWithdrawAlert: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorDepositWithdrawAlert"]>
  >;

  investorDepositWithdrawAlert<
    XAlias extends string = "investorDepositWithdrawAlert",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorDepositWithdrawAlert", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["investorDepositWithdrawAlert"] &
      XDirectiveVariables
  >;

  investorDepositWithdrawAlert<
    XArgs extends AcceptableVariables<
      MutationArgs["investorDepositWithdrawAlert"]
    >,
    XAlias extends string = "investorDepositWithdrawAlert",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorDepositWithdrawAlert", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorDepositWithdrawAlert"]> &
      XDirectiveVariables
  >;

  investorInvestingEntityCreate(): MutationFetcher<
    T & { readonly investorInvestingEntityCreate: boolean },
    TVariables & MutationArgs["investorInvestingEntityCreate"]
  >;

  investorInvestingEntityCreate<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityCreate"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorInvestingEntityCreate: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorInvestingEntityCreate"]>
  >;

  investorInvestingEntityCreate<
    XAlias extends string = "investorInvestingEntityCreate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityCreate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["investorInvestingEntityCreate"] &
      XDirectiveVariables
  >;

  investorInvestingEntityCreate<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityCreate"]
    >,
    XAlias extends string = "investorInvestingEntityCreate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityCreate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["investorInvestingEntityCreate"]
      > &
      XDirectiveVariables
  >;

  investorInvestingEntityUpdate(): MutationFetcher<
    T & { readonly investorInvestingEntityUpdate: boolean },
    TVariables & MutationArgs["investorInvestingEntityUpdate"]
  >;

  investorInvestingEntityUpdate<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityUpdate"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorInvestingEntityUpdate: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorInvestingEntityUpdate"]>
  >;

  investorInvestingEntityUpdate<
    XAlias extends string = "investorInvestingEntityUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["investorInvestingEntityUpdate"] &
      XDirectiveVariables
  >;

  investorInvestingEntityUpdate<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityUpdate"]
    >,
    XAlias extends string = "investorInvestingEntityUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["investorInvestingEntityUpdate"]
      > &
      XDirectiveVariables
  >;

  investorInvestingEntityRemove(): MutationFetcher<
    T & { readonly investorInvestingEntityRemove: boolean },
    TVariables & MutationArgs["investorInvestingEntityRemove"]
  >;

  investorInvestingEntityRemove<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityRemove"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorInvestingEntityRemove: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorInvestingEntityRemove"]>
  >;

  investorInvestingEntityRemove<
    XAlias extends string = "investorInvestingEntityRemove",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityRemove", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["investorInvestingEntityRemove"] &
      XDirectiveVariables
  >;

  investorInvestingEntityRemove<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityRemove"]
    >,
    XAlias extends string = "investorInvestingEntityRemove",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityRemove", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["investorInvestingEntityRemove"]
      > &
      XDirectiveVariables
  >;

  investorInvestingEntityMemberCreate(): MutationFetcher<
    T & { readonly investorInvestingEntityMemberCreate: boolean },
    TVariables & MutationArgs["investorInvestingEntityMemberCreate"]
  >;

  investorInvestingEntityMemberCreate<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityMemberCreate"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorInvestingEntityMemberCreate: boolean },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["investorInvestingEntityMemberCreate"]
      >
  >;

  investorInvestingEntityMemberCreate<
    XAlias extends string = "investorInvestingEntityMemberCreate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityMemberCreate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["investorInvestingEntityMemberCreate"] &
      XDirectiveVariables
  >;

  investorInvestingEntityMemberCreate<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityMemberCreate"]
    >,
    XAlias extends string = "investorInvestingEntityMemberCreate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityMemberCreate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["investorInvestingEntityMemberCreate"]
      > &
      XDirectiveVariables
  >;

  investorInvestingEntityMemberUpdate(): MutationFetcher<
    T & { readonly investorInvestingEntityMemberUpdate: boolean },
    TVariables & MutationArgs["investorInvestingEntityMemberUpdate"]
  >;

  investorInvestingEntityMemberUpdate<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityMemberUpdate"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorInvestingEntityMemberUpdate: boolean },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["investorInvestingEntityMemberUpdate"]
      >
  >;

  investorInvestingEntityMemberUpdate<
    XAlias extends string = "investorInvestingEntityMemberUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityMemberUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["investorInvestingEntityMemberUpdate"] &
      XDirectiveVariables
  >;

  investorInvestingEntityMemberUpdate<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityMemberUpdate"]
    >,
    XAlias extends string = "investorInvestingEntityMemberUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityMemberUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["investorInvestingEntityMemberUpdate"]
      > &
      XDirectiveVariables
  >;

  investorInvestingEntityMemberRemove(): MutationFetcher<
    T & { readonly investorInvestingEntityMemberRemove: boolean },
    TVariables & MutationArgs["investorInvestingEntityMemberRemove"]
  >;

  investorInvestingEntityMemberRemove<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityMemberRemove"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorInvestingEntityMemberRemove: boolean },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["investorInvestingEntityMemberRemove"]
      >
  >;

  investorInvestingEntityMemberRemove<
    XAlias extends string = "investorInvestingEntityMemberRemove",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityMemberRemove", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["investorInvestingEntityMemberRemove"] &
      XDirectiveVariables
  >;

  investorInvestingEntityMemberRemove<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvestingEntityMemberRemove"]
    >,
    XAlias extends string = "investorInvestingEntityMemberRemove",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityMemberRemove", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["investorInvestingEntityMemberRemove"]
      > &
      XDirectiveVariables
  >;

  setStatusOfAccreditationOnStoAdmin<
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<"InvestingEntity", X, XVariables>
  ): MutationFetcher<
    T & { readonly setStatusOfAccreditationOnStoAdmin: readonly X[] },
    TVariables & XVariables & MutationArgs["setStatusOfAccreditationOnStoAdmin"]
  >;

  setStatusOfAccreditationOnStoAdmin<
    XArgs extends AcceptableVariables<
      MutationArgs["setStatusOfAccreditationOnStoAdmin"]
    >,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestingEntity", X, XVariables>
  ): MutationFetcher<
    T & { readonly setStatusOfAccreditationOnStoAdmin: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["setStatusOfAccreditationOnStoAdmin"]
      >
  >;

  setStatusOfAccreditationOnStoAdmin<
    X extends object,
    XVariables extends object,
    XAlias extends string = "setStatusOfAccreditationOnStoAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestingEntity", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"setStatusOfAccreditationOnStoAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      MutationArgs["setStatusOfAccreditationOnStoAdmin"] &
      XDirectiveVariables
  >;

  setStatusOfAccreditationOnStoAdmin<
    XArgs extends AcceptableVariables<
      MutationArgs["setStatusOfAccreditationOnStoAdmin"]
    >,
    X extends object,
    XVariables extends object,
    XAlias extends string = "setStatusOfAccreditationOnStoAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestingEntity", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"setStatusOfAccreditationOnStoAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["setStatusOfAccreditationOnStoAdmin"]
      > &
      XDirectiveVariables
  >;

  signUpMarketSpace(): MutationFetcher<
    T & { readonly signUpMarketSpace: number },
    TVariables & MutationArgs["signUpMarketSpace"]
  >;

  signUpMarketSpace<
    XArgs extends AcceptableVariables<MutationArgs["signUpMarketSpace"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly signUpMarketSpace: number },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["signUpMarketSpace"]>
  >;

  signUpMarketSpace<
    XAlias extends string = "signUpMarketSpace",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"signUpMarketSpace", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & MutationArgs["signUpMarketSpace"] & XDirectiveVariables
  >;

  signUpMarketSpace<
    XArgs extends AcceptableVariables<MutationArgs["signUpMarketSpace"]>,
    XAlias extends string = "signUpMarketSpace",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"signUpMarketSpace", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["signUpMarketSpace"]> &
      XDirectiveVariables
  >;

  investorBuyAlertMarketSpace(): MutationFetcher<
    T & { readonly investorBuyAlertMarketSpace: number },
    TVariables & MutationArgs["investorBuyAlertMarketSpace"]
  >;

  investorBuyAlertMarketSpace<
    XArgs extends AcceptableVariables<
      MutationArgs["investorBuyAlertMarketSpace"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorBuyAlertMarketSpace: number },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertMarketSpace"]>
  >;

  investorBuyAlertMarketSpace<
    XAlias extends string = "investorBuyAlertMarketSpace",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertMarketSpace", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      MutationArgs["investorBuyAlertMarketSpace"] &
      XDirectiveVariables
  >;

  investorBuyAlertMarketSpace<
    XArgs extends AcceptableVariables<
      MutationArgs["investorBuyAlertMarketSpace"]
    >,
    XAlias extends string = "investorBuyAlertMarketSpace",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertMarketSpace", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBuyAlertMarketSpace"]> &
      XDirectiveVariables
  >;

  createInvestorMarketSpace(): MutationFetcher<
    T & { readonly createInvestorMarketSpace: number },
    TVariables & MutationArgs["createInvestorMarketSpace"]
  >;

  createInvestorMarketSpace<
    XArgs extends AcceptableVariables<MutationArgs["createInvestorMarketSpace"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly createInvestorMarketSpace: number },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["createInvestorMarketSpace"]>
  >;

  createInvestorMarketSpace<
    XAlias extends string = "createInvestorMarketSpace",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"createInvestorMarketSpace", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & MutationArgs["createInvestorMarketSpace"] & XDirectiveVariables
  >;

  createInvestorMarketSpace<
    XArgs extends AcceptableVariables<
      MutationArgs["createInvestorMarketSpace"]
    >,
    XAlias extends string = "createInvestorMarketSpace",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"createInvestorMarketSpace", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["createInvestorMarketSpace"]> &
      XDirectiveVariables
  >;

  investorRegisterVote(): MutationFetcher<
    T & { readonly investorRegisterVote: boolean },
    TVariables & MutationArgs["investorRegisterVote"]
  >;

  investorRegisterVote<
    XArgs extends AcceptableVariables<MutationArgs["investorRegisterVote"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorRegisterVote: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorRegisterVote"]>
  >;

  investorRegisterVote<
    XAlias extends string = "investorRegisterVote",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorRegisterVote", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorRegisterVote"] & XDirectiveVariables
  >;

  investorRegisterVote<
    XArgs extends AcceptableVariables<MutationArgs["investorRegisterVote"]>,
    XAlias extends string = "investorRegisterVote",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorRegisterVote", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorRegisterVote"]> &
      XDirectiveVariables
  >;

  setMercuryRecipient(): MutationFetcher<
    T & { readonly setMercuryRecipient: boolean },
    TVariables & MutationArgs["setMercuryRecipient"]
  >;

  setMercuryRecipient<
    XArgs extends AcceptableVariables<MutationArgs["setMercuryRecipient"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly setMercuryRecipient: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["setMercuryRecipient"]>
  >;

  setMercuryRecipient<
    XAlias extends string = "setMercuryRecipient",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"setMercuryRecipient", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["setMercuryRecipient"] & XDirectiveVariables
  >;

  setMercuryRecipient<
    XArgs extends AcceptableVariables<MutationArgs["setMercuryRecipient"]>,
    XAlias extends string = "setMercuryRecipient",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"setMercuryRecipient", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["setMercuryRecipient"]> &
      XDirectiveVariables
  >;

  createACHPayment(): MutationFetcher<
    T & { readonly createACHPayment: boolean },
    TVariables & MutationArgs["createACHPayment"]
  >;

  createACHPayment<
    XArgs extends AcceptableVariables<MutationArgs["createACHPayment"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly createACHPayment: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["createACHPayment"]>
  >;

  createACHPayment<
    XAlias extends string = "createACHPayment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"createACHPayment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["createACHPayment"] & XDirectiveVariables
  >;

  createACHPayment<
    XArgs extends AcceptableVariables<MutationArgs["createACHPayment"]>,
    XAlias extends string = "createACHPayment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"createACHPayment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["createACHPayment"]> &
      XDirectiveVariables
  >;

  readonly syncMercuryTransactions: MutationFetcher<
    T & { readonly syncMercuryTransactions: boolean },
    TVariables
  >;

  "syncMercuryTransactions+"<
    XAlias extends string = "syncMercuryTransactions",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"syncMercuryTransactions", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~syncMercuryTransactions": MutationFetcher<
    Omit<T, "syncMercuryTransactions">,
    TVariables
  >;

  sendMercuryInstructionalEmail(): MutationFetcher<
    T & { readonly sendMercuryInstructionalEmail: boolean },
    TVariables & MutationArgs["sendMercuryInstructionalEmail"]
  >;

  sendMercuryInstructionalEmail<
    XArgs extends AcceptableVariables<
      MutationArgs["sendMercuryInstructionalEmail"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly sendMercuryInstructionalEmail: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["sendMercuryInstructionalEmail"]>
  >;

  sendMercuryInstructionalEmail<
    XAlias extends string = "sendMercuryInstructionalEmail",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sendMercuryInstructionalEmail", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["sendMercuryInstructionalEmail"] &
      XDirectiveVariables
  >;

  sendMercuryInstructionalEmail<
    XArgs extends AcceptableVariables<
      MutationArgs["sendMercuryInstructionalEmail"]
    >,
    XAlias extends string = "sendMercuryInstructionalEmail",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"sendMercuryInstructionalEmail", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["sendMercuryInstructionalEmail"]
      > &
      XDirectiveVariables
  >;

  setThemeConfig(): MutationFetcher<
    T & { readonly setThemeConfig: boolean },
    TVariables & MutationArgs["setThemeConfig"]
  >;

  setThemeConfig<
    XArgs extends AcceptableVariables<MutationArgs["setThemeConfig"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly setThemeConfig: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["setThemeConfig"]>
  >;

  setThemeConfig<
    XAlias extends string = "setThemeConfig",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"setThemeConfig", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["setThemeConfig"] & XDirectiveVariables
  >;

  setThemeConfig<
    XArgs extends AcceptableVariables<MutationArgs["setThemeConfig"]>,
    XAlias extends string = "setThemeConfig",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"setThemeConfig", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["setThemeConfig"]> &
      XDirectiveVariables
  >;

  fileUpload<X extends object, XVariables extends object>(
    child: ObjectFetcher<"FileUploaded", X, XVariables>
  ): MutationFetcher<
    T & { readonly fileUpload: X },
    TVariables & XVariables & MutationArgs["fileUpload"]
  >;

  fileUpload<
    XArgs extends AcceptableVariables<MutationArgs["fileUpload"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"FileUploaded", X, XVariables>
  ): MutationFetcher<
    T & { readonly fileUpload: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs["fileUpload"]>
  >;

  fileUpload<
    X extends object,
    XVariables extends object,
    XAlias extends string = "fileUpload",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"FileUploaded", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fileUpload", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & MutationArgs["fileUpload"] & XDirectiveVariables
  >;

  fileUpload<
    XArgs extends AcceptableVariables<MutationArgs["fileUpload"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "fileUpload",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"FileUploaded", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fileUpload", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, MutationArgs["fileUpload"]> &
      XDirectiveVariables
  >;

  fileRemove(): MutationFetcher<
    T & { readonly fileRemove: boolean },
    TVariables & MutationArgs["fileRemove"]
  >;

  fileRemove<XArgs extends AcceptableVariables<MutationArgs["fileRemove"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly fileRemove: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["fileRemove"]>
  >;

  fileRemove<
    XAlias extends string = "fileRemove",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"fileRemove", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["fileRemove"] & XDirectiveVariables
  >;

  fileRemove<
    XArgs extends AcceptableVariables<MutationArgs["fileRemove"]>,
    XAlias extends string = "fileRemove",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"fileRemove", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["fileRemove"]> &
      XDirectiveVariables
  >;

  setDocuSignSignature(): MutationFetcher<
    T & { readonly setDocuSignSignature: boolean },
    TVariables & MutationArgs["setDocuSignSignature"]
  >;

  setDocuSignSignature<
    XArgs extends AcceptableVariables<MutationArgs["setDocuSignSignature"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly setDocuSignSignature: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["setDocuSignSignature"]>
  >;

  setDocuSignSignature<
    XAlias extends string = "setDocuSignSignature",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"setDocuSignSignature", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["setDocuSignSignature"] & XDirectiveVariables
  >;

  setDocuSignSignature<
    XArgs extends AcceptableVariables<MutationArgs["setDocuSignSignature"]>,
    XAlias extends string = "setDocuSignSignature",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"setDocuSignSignature", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["setDocuSignSignature"]> &
      XDirectiveVariables
  >;

  createComment(): MutationFetcher<
    T & { readonly createComment: number },
    TVariables & MutationArgs["createComment"]
  >;

  createComment<
    XArgs extends AcceptableVariables<MutationArgs["createComment"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly createComment: number },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["createComment"]>
  >;

  createComment<
    XAlias extends string = "createComment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"createComment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & MutationArgs["createComment"] & XDirectiveVariables
  >;

  createComment<
    XArgs extends AcceptableVariables<MutationArgs["createComment"]>,
    XAlias extends string = "createComment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"createComment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["createComment"]> &
      XDirectiveVariables
  >;

  updateComment(): MutationFetcher<
    T & { readonly updateComment: boolean },
    TVariables & MutationArgs["updateComment"]
  >;

  updateComment<
    XArgs extends AcceptableVariables<MutationArgs["updateComment"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly updateComment: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["updateComment"]>
  >;

  updateComment<
    XAlias extends string = "updateComment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"updateComment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["updateComment"] & XDirectiveVariables
  >;

  updateComment<
    XArgs extends AcceptableVariables<MutationArgs["updateComment"]>,
    XAlias extends string = "updateComment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"updateComment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["updateComment"]> &
      XDirectiveVariables
  >;

  deleteComment(): MutationFetcher<
    T & { readonly deleteComment: boolean },
    TVariables & MutationArgs["deleteComment"]
  >;

  deleteComment<
    XArgs extends AcceptableVariables<MutationArgs["deleteComment"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteComment: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["deleteComment"]>
  >;

  deleteComment<
    XAlias extends string = "deleteComment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteComment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["deleteComment"] & XDirectiveVariables
  >;

  deleteComment<
    XArgs extends AcceptableVariables<MutationArgs["deleteComment"]>,
    XAlias extends string = "deleteComment",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteComment", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteComment"]> &
      XDirectiveVariables
  >;

  setSignature(): MutationFetcher<
    T & { readonly setSignature: string },
    TVariables & MutationArgs["setSignature"]
  >;

  setSignature<XArgs extends AcceptableVariables<MutationArgs["setSignature"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly setSignature: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["setSignature"]>
  >;

  setSignature<
    XAlias extends string = "setSignature",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"setSignature", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs["setSignature"] & XDirectiveVariables
  >;

  setSignature<
    XArgs extends AcceptableVariables<MutationArgs["setSignature"]>,
    XAlias extends string = "setSignature",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"setSignature", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["setSignature"]> &
      XDirectiveVariables
  >;

  sendContract(): MutationFetcher<
    T & { readonly sendContract: boolean },
    TVariables & MutationArgs["sendContract"]
  >;

  sendContract<XArgs extends AcceptableVariables<MutationArgs["sendContract"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly sendContract: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["sendContract"]>
  >;

  sendContract<
    XAlias extends string = "sendContract",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sendContract", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["sendContract"] & XDirectiveVariables
  >;

  sendContract<
    XArgs extends AcceptableVariables<MutationArgs["sendContract"]>,
    XAlias extends string = "sendContract",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"sendContract", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["sendContract"]> &
      XDirectiveVariables
  >;

  setSharePurchaseDocumentSignature(): MutationFetcher<
    T & { readonly setSharePurchaseDocumentSignature: string },
    TVariables & MutationArgs["setSharePurchaseDocumentSignature"]
  >;

  setSharePurchaseDocumentSignature<
    XArgs extends AcceptableVariables<
      MutationArgs["setSharePurchaseDocumentSignature"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly setSharePurchaseDocumentSignature: string },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["setSharePurchaseDocumentSignature"]
      >
  >;

  setSharePurchaseDocumentSignature<
    XAlias extends string = "setSharePurchaseDocumentSignature",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"setSharePurchaseDocumentSignature", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      MutationArgs["setSharePurchaseDocumentSignature"] &
      XDirectiveVariables
  >;

  setSharePurchaseDocumentSignature<
    XArgs extends AcceptableVariables<
      MutationArgs["setSharePurchaseDocumentSignature"]
    >,
    XAlias extends string = "setSharePurchaseDocumentSignature",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"setSharePurchaseDocumentSignature", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["setSharePurchaseDocumentSignature"]
      > &
      XDirectiveVariables
  >;

  sendSharePurchaseContract(): MutationFetcher<
    T & { readonly sendSharePurchaseContract: boolean },
    TVariables & MutationArgs["sendSharePurchaseContract"]
  >;

  sendSharePurchaseContract<
    XArgs extends AcceptableVariables<MutationArgs["sendSharePurchaseContract"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly sendSharePurchaseContract: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["sendSharePurchaseContract"]>
  >;

  sendSharePurchaseContract<
    XAlias extends string = "sendSharePurchaseContract",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sendSharePurchaseContract", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["sendSharePurchaseContract"] & XDirectiveVariables
  >;

  sendSharePurchaseContract<
    XArgs extends AcceptableVariables<
      MutationArgs["sendSharePurchaseContract"]
    >,
    XAlias extends string = "sendSharePurchaseContract",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"sendSharePurchaseContract", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["sendSharePurchaseContract"]> &
      XDirectiveVariables
  >;

  deleteSharePurchaseRequest(): MutationFetcher<
    T & { readonly deleteSharePurchaseRequest: boolean },
    TVariables & MutationArgs["deleteSharePurchaseRequest"]
  >;

  deleteSharePurchaseRequest<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteSharePurchaseRequest"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteSharePurchaseRequest: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteSharePurchaseRequest"]>
  >;

  deleteSharePurchaseRequest<
    XAlias extends string = "deleteSharePurchaseRequest",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteSharePurchaseRequest", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["deleteSharePurchaseRequest"] &
      XDirectiveVariables
  >;

  deleteSharePurchaseRequest<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteSharePurchaseRequest"]
    >,
    XAlias extends string = "deleteSharePurchaseRequest",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteSharePurchaseRequest", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteSharePurchaseRequest"]> &
      XDirectiveVariables
  >;

  setSubmittedDocument(): MutationFetcher<
    T & { readonly setSubmittedDocument: boolean },
    TVariables & MutationArgs["setSubmittedDocument"]
  >;

  setSubmittedDocument<
    XArgs extends AcceptableVariables<MutationArgs["setSubmittedDocument"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly setSubmittedDocument: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["setSubmittedDocument"]>
  >;

  setSubmittedDocument<
    XAlias extends string = "setSubmittedDocument",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"setSubmittedDocument", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["setSubmittedDocument"] & XDirectiveVariables
  >;

  setSubmittedDocument<
    XArgs extends AcceptableVariables<MutationArgs["setSubmittedDocument"]>,
    XAlias extends string = "setSubmittedDocument",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"setSubmittedDocument", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["setSubmittedDocument"]> &
      XDirectiveVariables
  >;

  setSubmittedSharePurchaseDocument(): MutationFetcher<
    T & { readonly setSubmittedSharePurchaseDocument: boolean },
    TVariables & MutationArgs["setSubmittedSharePurchaseDocument"]
  >;

  setSubmittedSharePurchaseDocument<
    XArgs extends AcceptableVariables<
      MutationArgs["setSubmittedSharePurchaseDocument"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly setSubmittedSharePurchaseDocument: boolean },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["setSubmittedSharePurchaseDocument"]
      >
  >;

  setSubmittedSharePurchaseDocument<
    XAlias extends string = "setSubmittedSharePurchaseDocument",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"setSubmittedSharePurchaseDocument", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["setSubmittedSharePurchaseDocument"] &
      XDirectiveVariables
  >;

  setSubmittedSharePurchaseDocument<
    XArgs extends AcceptableVariables<
      MutationArgs["setSubmittedSharePurchaseDocument"]
    >,
    XAlias extends string = "setSubmittedSharePurchaseDocument",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"setSubmittedSharePurchaseDocument", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["setSubmittedSharePurchaseDocument"]
      > &
      XDirectiveVariables
  >;

  investorInboxCreate(): MutationFetcher<
    T & { readonly investorInboxCreate: number },
    TVariables & MutationArgs["investorInboxCreate"]
  >;

  investorInboxCreate<
    XArgs extends AcceptableVariables<MutationArgs["investorInboxCreate"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorInboxCreate: number },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["investorInboxCreate"]>
  >;

  investorInboxCreate<
    XAlias extends string = "investorInboxCreate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorInboxCreate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & MutationArgs["investorInboxCreate"] & XDirectiveVariables
  >;

  investorInboxCreate<
    XArgs extends AcceptableVariables<MutationArgs["investorInboxCreate"]>,
    XAlias extends string = "investorInboxCreate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorInboxCreate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorInboxCreate"]> &
      XDirectiveVariables
  >;

  signIn(): MutationFetcher<
    T & { readonly signIn: string },
    TVariables & MutationArgs["signIn"]
  >;

  signIn<XArgs extends AcceptableVariables<MutationArgs["signIn"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly signIn: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["signIn"]>
  >;

  signIn<
    XAlias extends string = "signIn",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"signIn", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs["signIn"] & XDirectiveVariables
  >;

  signIn<
    XArgs extends AcceptableVariables<MutationArgs["signIn"]>,
    XAlias extends string = "signIn",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"signIn", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["signIn"]> &
      XDirectiveVariables
  >;

  signInSSO(): MutationFetcher<
    T & { readonly signInSSO: string },
    TVariables & MutationArgs["signInSSO"]
  >;

  signInSSO<XArgs extends AcceptableVariables<MutationArgs["signInSSO"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly signInSSO: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["signInSSO"]>
  >;

  signInSSO<
    XAlias extends string = "signInSSO",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"signInSSO", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs["signInSSO"] & XDirectiveVariables
  >;

  signInSSO<
    XArgs extends AcceptableVariables<MutationArgs["signInSSO"]>,
    XAlias extends string = "signInSSO",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"signInSSO", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["signInSSO"]> &
      XDirectiveVariables
  >;

  investor2FAConfirm(): MutationFetcher<
    T & { readonly investor2FAConfirm: string },
    TVariables & MutationArgs["investor2FAConfirm"]
  >;

  investor2FAConfirm<
    XArgs extends AcceptableVariables<MutationArgs["investor2FAConfirm"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investor2FAConfirm: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["investor2FAConfirm"]>
  >;

  investor2FAConfirm<
    XAlias extends string = "investor2FAConfirm",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investor2FAConfirm", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs["investor2FAConfirm"] & XDirectiveVariables
  >;

  investor2FAConfirm<
    XArgs extends AcceptableVariables<MutationArgs["investor2FAConfirm"]>,
    XAlias extends string = "investor2FAConfirm",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investor2FAConfirm", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investor2FAConfirm"]> &
      XDirectiveVariables
  >;

  signUp(): MutationFetcher<
    T & { readonly signUp: number },
    TVariables & MutationArgs["signUp"]
  >;

  signUp<XArgs extends AcceptableVariables<MutationArgs["signUp"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly signUp: number },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["signUp"]>
  >;

  signUp<
    XAlias extends string = "signUp",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"signUp", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & MutationArgs["signUp"] & XDirectiveVariables
  >;

  signUp<
    XArgs extends AcceptableVariables<MutationArgs["signUp"]>,
    XAlias extends string = "signUp",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"signUp", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["signUp"]> &
      XDirectiveVariables
  >;

  investorVerify(): MutationFetcher<
    T & { readonly investorVerify: number },
    TVariables & MutationArgs["investorVerify"]
  >;

  investorVerify<
    XArgs extends AcceptableVariables<MutationArgs["investorVerify"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorVerify: number },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["investorVerify"]>
  >;

  investorVerify<
    XAlias extends string = "investorVerify",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorVerify", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & MutationArgs["investorVerify"] & XDirectiveVariables
  >;

  investorVerify<
    XArgs extends AcceptableVariables<MutationArgs["investorVerify"]>,
    XAlias extends string = "investorVerify",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorVerify", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorVerify"]> &
      XDirectiveVariables
  >;

  investorChangePassword(): MutationFetcher<
    T & { readonly investorChangePassword: boolean },
    TVariables & MutationArgs["investorChangePassword"]
  >;

  investorChangePassword<
    XArgs extends AcceptableVariables<MutationArgs["investorChangePassword"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorChangePassword: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorChangePassword"]>
  >;

  investorChangePassword<
    XAlias extends string = "investorChangePassword",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorChangePassword", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorChangePassword"] & XDirectiveVariables
  >;

  investorChangePassword<
    XArgs extends AcceptableVariables<MutationArgs["investorChangePassword"]>,
    XAlias extends string = "investorChangePassword",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorChangePassword", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorChangePassword"]> &
      XDirectiveVariables
  >;

  readonly investorToggleTwoFA: MutationFetcher<
    T & { readonly investorToggleTwoFA: boolean },
    TVariables
  >;

  "investorToggleTwoFA+"<
    XAlias extends string = "investorToggleTwoFA",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorToggleTwoFA", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorToggleTwoFA": MutationFetcher<
    Omit<T, "investorToggleTwoFA">,
    TVariables
  >;

  investorReset(): MutationFetcher<
    T & { readonly investorReset: boolean },
    TVariables & MutationArgs["investorReset"]
  >;

  investorReset<
    XArgs extends AcceptableVariables<MutationArgs["investorReset"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorReset: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["investorReset"]>
  >;

  investorReset<
    XAlias extends string = "investorReset",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorReset", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorReset"] & XDirectiveVariables
  >;

  investorReset<
    XArgs extends AcceptableVariables<MutationArgs["investorReset"]>,
    XAlias extends string = "investorReset",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorReset", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorReset"]> &
      XDirectiveVariables
  >;

  investorSetPassword(): MutationFetcher<
    T & { readonly investorSetPassword: boolean },
    TVariables & MutationArgs["investorSetPassword"]
  >;

  investorSetPassword<
    XArgs extends AcceptableVariables<MutationArgs["investorSetPassword"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorSetPassword: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["investorSetPassword"]>
  >;

  investorSetPassword<
    XAlias extends string = "investorSetPassword",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorSetPassword", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorSetPassword"] & XDirectiveVariables
  >;

  investorSetPassword<
    XArgs extends AcceptableVariables<MutationArgs["investorSetPassword"]>,
    XAlias extends string = "investorSetPassword",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorSetPassword", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorSetPassword"]> &
      XDirectiveVariables
  >;

  investorUsufructuaryUpdate(): MutationFetcher<
    T & { readonly investorUsufructuaryUpdate: boolean },
    TVariables & MutationArgs["investorUsufructuaryUpdate"]
  >;

  investorUsufructuaryUpdate<
    XArgs extends AcceptableVariables<
      MutationArgs["investorUsufructuaryUpdate"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorUsufructuaryUpdate: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorUsufructuaryUpdate"]>
  >;

  investorUsufructuaryUpdate<
    XAlias extends string = "investorUsufructuaryUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorUsufructuaryUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["investorUsufructuaryUpdate"] &
      XDirectiveVariables
  >;

  investorUsufructuaryUpdate<
    XArgs extends AcceptableVariables<
      MutationArgs["investorUsufructuaryUpdate"]
    >,
    XAlias extends string = "investorUsufructuaryUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorUsufructuaryUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorUsufructuaryUpdate"]> &
      XDirectiveVariables
  >;

  investorBeneficialUpdate(): MutationFetcher<
    T & { readonly investorBeneficialUpdate: boolean },
    TVariables & MutationArgs["investorBeneficialUpdate"]
  >;

  investorBeneficialUpdate<
    XArgs extends AcceptableVariables<MutationArgs["investorBeneficialUpdate"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorBeneficialUpdate: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBeneficialUpdate"]>
  >;

  investorBeneficialUpdate<
    XAlias extends string = "investorBeneficialUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorBeneficialUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorBeneficialUpdate"] & XDirectiveVariables
  >;

  investorBeneficialUpdate<
    XArgs extends AcceptableVariables<MutationArgs["investorBeneficialUpdate"]>,
    XAlias extends string = "investorBeneficialUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorBeneficialUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorBeneficialUpdate"]> &
      XDirectiveVariables
  >;

  investorProfile(): MutationFetcher<
    T & { readonly investorProfile: boolean },
    TVariables & MutationArgs["investorProfile"]
  >;

  investorProfile<
    XArgs extends AcceptableVariables<MutationArgs["investorProfile"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorProfile: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["investorProfile"]>
  >;

  investorProfile<
    XAlias extends string = "investorProfile",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorProfile", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorProfile"] & XDirectiveVariables
  >;

  investorProfile<
    XArgs extends AcceptableVariables<MutationArgs["investorProfile"]>,
    XAlias extends string = "investorProfile",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorProfile", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorProfile"]> &
      XDirectiveVariables
  >;

  investorCompanyProfile(): MutationFetcher<
    T & { readonly investorCompanyProfile: boolean },
    TVariables & MutationArgs["investorCompanyProfile"]
  >;

  investorCompanyProfile<
    XArgs extends AcceptableVariables<MutationArgs["investorCompanyProfile"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorCompanyProfile: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorCompanyProfile"]>
  >;

  investorCompanyProfile<
    XAlias extends string = "investorCompanyProfile",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorCompanyProfile", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorCompanyProfile"] & XDirectiveVariables
  >;

  investorCompanyProfile<
    XArgs extends AcceptableVariables<MutationArgs["investorCompanyProfile"]>,
    XAlias extends string = "investorCompanyProfile",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorCompanyProfile", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorCompanyProfile"]> &
      XDirectiveVariables
  >;

  fillKyc(): MutationFetcher<
    T & { readonly fillKyc: boolean },
    TVariables & MutationArgs["fillKyc"]
  >;

  fillKyc<XArgs extends AcceptableVariables<MutationArgs["fillKyc"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly fillKyc: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["fillKyc"]>
  >;

  fillKyc<
    XAlias extends string = "fillKyc",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"fillKyc", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["fillKyc"] & XDirectiveVariables
  >;

  fillKyc<
    XArgs extends AcceptableVariables<MutationArgs["fillKyc"]>,
    XAlias extends string = "fillKyc",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"fillKyc", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["fillKyc"]> &
      XDirectiveVariables
  >;

  applyKyc(): MutationFetcher<
    T & { readonly applyKyc: boolean },
    TVariables & MutationArgs["applyKyc"]
  >;

  applyKyc<XArgs extends AcceptableVariables<MutationArgs["applyKyc"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly applyKyc: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["applyKyc"]>
  >;

  applyKyc<
    XAlias extends string = "applyKyc",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"applyKyc", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["applyKyc"] & XDirectiveVariables
  >;

  applyKyc<
    XArgs extends AcceptableVariables<MutationArgs["applyKyc"]>,
    XAlias extends string = "applyKyc",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"applyKyc", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["applyKyc"]> &
      XDirectiveVariables
  >;

  investorPublicKeyAdd(): MutationFetcher<
    T & { readonly investorPublicKeyAdd: boolean },
    TVariables & MutationArgs["investorPublicKeyAdd"]
  >;

  investorPublicKeyAdd<
    XArgs extends AcceptableVariables<MutationArgs["investorPublicKeyAdd"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorPublicKeyAdd: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorPublicKeyAdd"]>
  >;

  investorPublicKeyAdd<
    XAlias extends string = "investorPublicKeyAdd",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorPublicKeyAdd", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorPublicKeyAdd"] & XDirectiveVariables
  >;

  investorPublicKeyAdd<
    XArgs extends AcceptableVariables<MutationArgs["investorPublicKeyAdd"]>,
    XAlias extends string = "investorPublicKeyAdd",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorPublicKeyAdd", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorPublicKeyAdd"]> &
      XDirectiveVariables
  >;

  investorPublicKeyDelete(): MutationFetcher<
    T & { readonly investorPublicKeyDelete: boolean },
    TVariables & MutationArgs["investorPublicKeyDelete"]
  >;

  investorPublicKeyDelete<
    XArgs extends AcceptableVariables<MutationArgs["investorPublicKeyDelete"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorPublicKeyDelete: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorPublicKeyDelete"]>
  >;

  investorPublicKeyDelete<
    XAlias extends string = "investorPublicKeyDelete",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorPublicKeyDelete", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorPublicKeyDelete"] & XDirectiveVariables
  >;

  investorPublicKeyDelete<
    XArgs extends AcceptableVariables<MutationArgs["investorPublicKeyDelete"]>,
    XAlias extends string = "investorPublicKeyDelete",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorPublicKeyDelete", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorPublicKeyDelete"]> &
      XDirectiveVariables
  >;

  investorTransferShares(): MutationFetcher<
    T & { readonly investorTransferShares: boolean },
    TVariables & MutationArgs["investorTransferShares"]
  >;

  investorTransferShares<
    XArgs extends AcceptableVariables<MutationArgs["investorTransferShares"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorTransferShares: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorTransferShares"]>
  >;

  investorTransferShares<
    XAlias extends string = "investorTransferShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorTransferShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["investorTransferShares"] & XDirectiveVariables
  >;

  investorTransferShares<
    XArgs extends AcceptableVariables<MutationArgs["investorTransferShares"]>,
    XAlias extends string = "investorTransferShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorTransferShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorTransferShares"]> &
      XDirectiveVariables
  >;

  companyTransferShares(): MutationFetcher<
    T & { readonly companyTransferShares: boolean },
    TVariables & MutationArgs["companyTransferShares"]
  >;

  companyTransferShares<
    XArgs extends AcceptableVariables<MutationArgs["companyTransferShares"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly companyTransferShares: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["companyTransferShares"]>
  >;

  companyTransferShares<
    XAlias extends string = "companyTransferShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"companyTransferShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["companyTransferShares"] & XDirectiveVariables
  >;

  companyTransferShares<
    XArgs extends AcceptableVariables<MutationArgs["companyTransferShares"]>,
    XAlias extends string = "companyTransferShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"companyTransferShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["companyTransferShares"]> &
      XDirectiveVariables
  >;

  transferSharesBetween(): MutationFetcher<
    T & { readonly transferSharesBetween: boolean },
    TVariables & MutationArgs["transferSharesBetween"]
  >;

  transferSharesBetween<
    XArgs extends AcceptableVariables<MutationArgs["transferSharesBetween"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly transferSharesBetween: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["transferSharesBetween"]>
  >;

  transferSharesBetween<
    XAlias extends string = "transferSharesBetween",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"transferSharesBetween", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["transferSharesBetween"] & XDirectiveVariables
  >;

  transferSharesBetween<
    XArgs extends AcceptableVariables<MutationArgs["transferSharesBetween"]>,
    XAlias extends string = "transferSharesBetween",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"transferSharesBetween", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["transferSharesBetween"]> &
      XDirectiveVariables
  >;

  setSTOStatus(): MutationFetcher<
    T & { readonly setSTOStatus: boolean },
    TVariables & MutationArgs["setSTOStatus"]
  >;

  setSTOStatus<XArgs extends AcceptableVariables<MutationArgs["setSTOStatus"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly setSTOStatus: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["setSTOStatus"]>
  >;

  setSTOStatus<
    XAlias extends string = "setSTOStatus",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"setSTOStatus", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["setSTOStatus"] & XDirectiveVariables
  >;

  setSTOStatus<
    XArgs extends AcceptableVariables<MutationArgs["setSTOStatus"]>,
    XAlias extends string = "setSTOStatus",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"setSTOStatus", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["setSTOStatus"]> &
      XDirectiveVariables
  >;

  addMetadataKey(): MutationFetcher<
    T & { readonly addMetadataKey: boolean },
    TVariables & MutationArgs["addMetadataKey"]
  >;

  addMetadataKey<
    XArgs extends AcceptableVariables<MutationArgs["addMetadataKey"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly addMetadataKey: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["addMetadataKey"]>
  >;

  addMetadataKey<
    XAlias extends string = "addMetadataKey",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"addMetadataKey", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["addMetadataKey"] & XDirectiveVariables
  >;

  addMetadataKey<
    XArgs extends AcceptableVariables<MutationArgs["addMetadataKey"]>,
    XAlias extends string = "addMetadataKey",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"addMetadataKey", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["addMetadataKey"]> &
      XDirectiveVariables
  >;

  removeMetadataKey(): MutationFetcher<
    T & { readonly removeMetadataKey: boolean },
    TVariables & MutationArgs["removeMetadataKey"]
  >;

  removeMetadataKey<
    XArgs extends AcceptableVariables<MutationArgs["removeMetadataKey"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly removeMetadataKey: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["removeMetadataKey"]>
  >;

  removeMetadataKey<
    XAlias extends string = "removeMetadataKey",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"removeMetadataKey", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["removeMetadataKey"] & XDirectiveVariables
  >;

  removeMetadataKey<
    XArgs extends AcceptableVariables<MutationArgs["removeMetadataKey"]>,
    XAlias extends string = "removeMetadataKey",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"removeMetadataKey", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["removeMetadataKey"]> &
      XDirectiveVariables
  >;

  adminSignIn(): MutationFetcher<
    T & { readonly adminSignIn?: string },
    TVariables & MutationArgs["adminSignIn"]
  >;

  adminSignIn<XArgs extends AcceptableVariables<MutationArgs["adminSignIn"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly adminSignIn?: string },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["adminSignIn"]>
  >;

  adminSignIn<
    XAlias extends string = "adminSignIn",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"adminSignIn", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MutationFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & MutationArgs["adminSignIn"] & XDirectiveVariables
  >;

  adminSignIn<
    XArgs extends AcceptableVariables<MutationArgs["adminSignIn"]>,
    XAlias extends string = "adminSignIn",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"adminSignIn", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MutationFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["adminSignIn"]> &
      XDirectiveVariables
  >;

  readonly generateAPIToken: MutationFetcher<
    T & { readonly generateAPIToken: string },
    TVariables
  >;

  "generateAPIToken+"<
    XAlias extends string = "generateAPIToken",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"generateAPIToken", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~generateAPIToken": MutationFetcher<
    Omit<T, "generateAPIToken">,
    TVariables
  >;

  setPlatformParam(): MutationFetcher<
    T & { readonly setPlatformParam: number },
    TVariables & MutationArgs["setPlatformParam"]
  >;

  setPlatformParam<
    XArgs extends AcceptableVariables<MutationArgs["setPlatformParam"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly setPlatformParam: number },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["setPlatformParam"]>
  >;

  setPlatformParam<
    XAlias extends string = "setPlatformParam",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"setPlatformParam", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & MutationArgs["setPlatformParam"] & XDirectiveVariables
  >;

  setPlatformParam<
    XArgs extends AcceptableVariables<MutationArgs["setPlatformParam"]>,
    XAlias extends string = "setPlatformParam",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"setPlatformParam", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["setPlatformParam"]> &
      XDirectiveVariables
  >;

  setEntityAccreditation(): MutationFetcher<
    T & { readonly setEntityAccreditation: boolean },
    TVariables & MutationArgs["setEntityAccreditation"]
  >;

  setEntityAccreditation<
    XArgs extends AcceptableVariables<MutationArgs["setEntityAccreditation"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly setEntityAccreditation: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["setEntityAccreditation"]>
  >;

  setEntityAccreditation<
    XAlias extends string = "setEntityAccreditation",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"setEntityAccreditation", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["setEntityAccreditation"] & XDirectiveVariables
  >;

  setEntityAccreditation<
    XArgs extends AcceptableVariables<MutationArgs["setEntityAccreditation"]>,
    XAlias extends string = "setEntityAccreditation",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"setEntityAccreditation", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["setEntityAccreditation"]> &
      XDirectiveVariables
  >;

  updateInvestorKyc(): MutationFetcher<
    T & { readonly updateInvestorKyc: boolean },
    TVariables & MutationArgs["updateInvestorKyc"]
  >;

  updateInvestorKyc<
    XArgs extends AcceptableVariables<MutationArgs["updateInvestorKyc"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly updateInvestorKyc: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["updateInvestorKyc"]>
  >;

  updateInvestorKyc<
    XAlias extends string = "updateInvestorKyc",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"updateInvestorKyc", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["updateInvestorKyc"] & XDirectiveVariables
  >;

  updateInvestorKyc<
    XArgs extends AcceptableVariables<MutationArgs["updateInvestorKyc"]>,
    XAlias extends string = "updateInvestorKyc",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"updateInvestorKyc", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["updateInvestorKyc"]> &
      XDirectiveVariables
  >;

  deleteInvestorSto(): MutationFetcher<
    T & { readonly deleteInvestorSto: boolean },
    TVariables & MutationArgs["deleteInvestorSto"]
  >;

  deleteInvestorSto<
    XArgs extends AcceptableVariables<MutationArgs["deleteInvestorSto"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteInvestorSto: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["deleteInvestorSto"]>
  >;

  deleteInvestorSto<
    XAlias extends string = "deleteInvestorSto",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteInvestorSto", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["deleteInvestorSto"] & XDirectiveVariables
  >;

  deleteInvestorSto<
    XArgs extends AcceptableVariables<MutationArgs["deleteInvestorSto"]>,
    XAlias extends string = "deleteInvestorSto",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteInvestorSto", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteInvestorSto"]> &
      XDirectiveVariables
  >;

  copyInvestorsToOtherProjects(): MutationFetcher<
    T & { readonly copyInvestorsToOtherProjects: boolean },
    TVariables & MutationArgs["copyInvestorsToOtherProjects"]
  >;

  copyInvestorsToOtherProjects<
    XArgs extends AcceptableVariables<
      MutationArgs["copyInvestorsToOtherProjects"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly copyInvestorsToOtherProjects: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["copyInvestorsToOtherProjects"]>
  >;

  copyInvestorsToOtherProjects<
    XAlias extends string = "copyInvestorsToOtherProjects",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"copyInvestorsToOtherProjects", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["copyInvestorsToOtherProjects"] &
      XDirectiveVariables
  >;

  copyInvestorsToOtherProjects<
    XArgs extends AcceptableVariables<
      MutationArgs["copyInvestorsToOtherProjects"]
    >,
    XAlias extends string = "copyInvestorsToOtherProjects",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"copyInvestorsToOtherProjects", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["copyInvestorsToOtherProjects"]> &
      XDirectiveVariables
  >;

  updateMetadataValue(): MutationFetcher<
    T & { readonly updateMetadataValue: boolean },
    TVariables & MutationArgs["updateMetadataValue"]
  >;

  updateMetadataValue<
    XArgs extends AcceptableVariables<MutationArgs["updateMetadataValue"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly updateMetadataValue: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["updateMetadataValue"]>
  >;

  updateMetadataValue<
    XAlias extends string = "updateMetadataValue",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"updateMetadataValue", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["updateMetadataValue"] & XDirectiveVariables
  >;

  updateMetadataValue<
    XArgs extends AcceptableVariables<MutationArgs["updateMetadataValue"]>,
    XAlias extends string = "updateMetadataValue",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"updateMetadataValue", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["updateMetadataValue"]> &
      XDirectiveVariables
  >;

  addNewBlockchain(): MutationFetcher<
    T & { readonly addNewBlockchain: boolean },
    TVariables & MutationArgs["addNewBlockchain"]
  >;

  addNewBlockchain<
    XArgs extends AcceptableVariables<MutationArgs["addNewBlockchain"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly addNewBlockchain: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["addNewBlockchain"]>
  >;

  addNewBlockchain<
    XAlias extends string = "addNewBlockchain",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"addNewBlockchain", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["addNewBlockchain"] & XDirectiveVariables
  >;

  addNewBlockchain<
    XArgs extends AcceptableVariables<MutationArgs["addNewBlockchain"]>,
    XAlias extends string = "addNewBlockchain",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"addNewBlockchain", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["addNewBlockchain"]> &
      XDirectiveVariables
  >;

  updateBlockchain(): MutationFetcher<
    T & { readonly updateBlockchain: boolean },
    TVariables & MutationArgs["updateBlockchain"]
  >;

  updateBlockchain<
    XArgs extends AcceptableVariables<MutationArgs["updateBlockchain"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly updateBlockchain: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["updateBlockchain"]>
  >;

  updateBlockchain<
    XAlias extends string = "updateBlockchain",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"updateBlockchain", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["updateBlockchain"] & XDirectiveVariables
  >;

  updateBlockchain<
    XArgs extends AcceptableVariables<MutationArgs["updateBlockchain"]>,
    XAlias extends string = "updateBlockchain",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"updateBlockchain", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["updateBlockchain"]> &
      XDirectiveVariables
  >;

  verifyTransactionFromBlockchain(): MutationFetcher<
    T & { readonly verifyTransactionFromBlockchain?: string },
    TVariables & MutationArgs["verifyTransactionFromBlockchain"]
  >;

  verifyTransactionFromBlockchain<
    XArgs extends AcceptableVariables<
      MutationArgs["verifyTransactionFromBlockchain"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly verifyTransactionFromBlockchain?: string },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["verifyTransactionFromBlockchain"]
      >
  >;

  verifyTransactionFromBlockchain<
    XAlias extends string = "verifyTransactionFromBlockchain",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"verifyTransactionFromBlockchain", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MutationFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables &
      MutationArgs["verifyTransactionFromBlockchain"] &
      XDirectiveVariables
  >;

  verifyTransactionFromBlockchain<
    XArgs extends AcceptableVariables<
      MutationArgs["verifyTransactionFromBlockchain"]
    >,
    XAlias extends string = "verifyTransactionFromBlockchain",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"verifyTransactionFromBlockchain", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MutationFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["verifyTransactionFromBlockchain"]
      > &
      XDirectiveVariables
  >;

  feeCreate(): MutationFetcher<
    T & { readonly feeCreate: boolean },
    TVariables & MutationArgs["feeCreate"]
  >;

  feeCreate<XArgs extends AcceptableVariables<MutationArgs["feeCreate"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly feeCreate: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["feeCreate"]>
  >;

  feeCreate<
    XAlias extends string = "feeCreate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"feeCreate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["feeCreate"] & XDirectiveVariables
  >;

  feeCreate<
    XArgs extends AcceptableVariables<MutationArgs["feeCreate"]>,
    XAlias extends string = "feeCreate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"feeCreate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["feeCreate"]> &
      XDirectiveVariables
  >;

  feeUpdate(): MutationFetcher<
    T & { readonly feeUpdate: boolean },
    TVariables & MutationArgs["feeUpdate"]
  >;

  feeUpdate<XArgs extends AcceptableVariables<MutationArgs["feeUpdate"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly feeUpdate: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["feeUpdate"]>
  >;

  feeUpdate<
    XAlias extends string = "feeUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"feeUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["feeUpdate"] & XDirectiveVariables
  >;

  feeUpdate<
    XArgs extends AcceptableVariables<MutationArgs["feeUpdate"]>,
    XAlias extends string = "feeUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"feeUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["feeUpdate"]> &
      XDirectiveVariables
  >;

  feeDelete(): MutationFetcher<
    T & { readonly feeDelete: boolean },
    TVariables & MutationArgs["feeDelete"]
  >;

  feeDelete<XArgs extends AcceptableVariables<MutationArgs["feeDelete"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly feeDelete: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["feeDelete"]>
  >;

  feeDelete<
    XAlias extends string = "feeDelete",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"feeDelete", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["feeDelete"] & XDirectiveVariables
  >;

  feeDelete<
    XArgs extends AcceptableVariables<MutationArgs["feeDelete"]>,
    XAlias extends string = "feeDelete",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"feeDelete", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["feeDelete"]> &
      XDirectiveVariables
  >;

  readonly feeDeleteAll: MutationFetcher<
    T & { readonly feeDeleteAll: boolean },
    TVariables
  >;

  "feeDeleteAll+"<
    XAlias extends string = "feeDeleteAll",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"feeDeleteAll", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~feeDeleteAll": MutationFetcher<
    Omit<T, "feeDeleteAll">,
    TVariables
  >;

  feeCommissionUpdate(): MutationFetcher<
    T & { readonly feeCommissionUpdate: boolean },
    TVariables & MutationArgs["feeCommissionUpdate"]
  >;

  feeCommissionUpdate<
    XArgs extends AcceptableVariables<MutationArgs["feeCommissionUpdate"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly feeCommissionUpdate: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["feeCommissionUpdate"]>
  >;

  feeCommissionUpdate<
    XAlias extends string = "feeCommissionUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"feeCommissionUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["feeCommissionUpdate"] & XDirectiveVariables
  >;

  feeCommissionUpdate<
    XArgs extends AcceptableVariables<MutationArgs["feeCommissionUpdate"]>,
    XAlias extends string = "feeCommissionUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"feeCommissionUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["feeCommissionUpdate"]> &
      XDirectiveVariables
  >;

  feeCommissionDelete(): MutationFetcher<
    T & { readonly feeCommissionDelete: boolean },
    TVariables & MutationArgs["feeCommissionDelete"]
  >;

  feeCommissionDelete<
    XArgs extends AcceptableVariables<MutationArgs["feeCommissionDelete"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly feeCommissionDelete: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["feeCommissionDelete"]>
  >;

  feeCommissionDelete<
    XAlias extends string = "feeCommissionDelete",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"feeCommissionDelete", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["feeCommissionDelete"] & XDirectiveVariables
  >;

  feeCommissionDelete<
    XArgs extends AcceptableVariables<MutationArgs["feeCommissionDelete"]>,
    XAlias extends string = "feeCommissionDelete",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"feeCommissionDelete", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["feeCommissionDelete"]> &
      XDirectiveVariables
  >;

  readonly feeCommissionDeleteAll: MutationFetcher<
    T & { readonly feeCommissionDeleteAll: boolean },
    TVariables
  >;

  "feeCommissionDeleteAll+"<
    XAlias extends string = "feeCommissionDeleteAll",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"feeCommissionDeleteAll", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~feeCommissionDeleteAll": MutationFetcher<
    Omit<T, "feeCommissionDeleteAll">,
    TVariables
  >;

  readonly refreshInvestorData: MutationFetcher<
    T & { readonly refreshInvestorData: boolean },
    TVariables
  >;

  "refreshInvestorData+"<
    XAlias extends string = "refreshInvestorData",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"refreshInvestorData", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~refreshInvestorData": MutationFetcher<
    Omit<T, "refreshInvestorData">,
    TVariables
  >;

  createOffer(): MutationFetcher<
    T & { readonly createOffer: boolean },
    TVariables & MutationArgs["createOffer"]
  >;

  createOffer<XArgs extends AcceptableVariables<MutationArgs["createOffer"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly createOffer: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["createOffer"]>
  >;

  createOffer<
    XAlias extends string = "createOffer",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"createOffer", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["createOffer"] & XDirectiveVariables
  >;

  createOffer<
    XArgs extends AcceptableVariables<MutationArgs["createOffer"]>,
    XAlias extends string = "createOffer",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"createOffer", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["createOffer"]> &
      XDirectiveVariables
  >;

  deleteOffer(): MutationFetcher<
    T & { readonly deleteOffer: boolean },
    TVariables & MutationArgs["deleteOffer"]
  >;

  deleteOffer<XArgs extends AcceptableVariables<MutationArgs["deleteOffer"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteOffer: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["deleteOffer"]>
  >;

  deleteOffer<
    XAlias extends string = "deleteOffer",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteOffer", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["deleteOffer"] & XDirectiveVariables
  >;

  deleteOffer<
    XArgs extends AcceptableVariables<MutationArgs["deleteOffer"]>,
    XAlias extends string = "deleteOffer",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteOffer", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteOffer"]> &
      XDirectiveVariables
  >;

  createSellOrder(): MutationFetcher<
    T & { readonly createSellOrder: boolean },
    TVariables & MutationArgs["createSellOrder"]
  >;

  createSellOrder<
    XArgs extends AcceptableVariables<MutationArgs["createSellOrder"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly createSellOrder: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["createSellOrder"]>
  >;

  createSellOrder<
    XAlias extends string = "createSellOrder",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"createSellOrder", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["createSellOrder"] & XDirectiveVariables
  >;

  createSellOrder<
    XArgs extends AcceptableVariables<MutationArgs["createSellOrder"]>,
    XAlias extends string = "createSellOrder",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"createSellOrder", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["createSellOrder"]> &
      XDirectiveVariables
  >;

  updateSellOrder(): MutationFetcher<
    T & { readonly updateSellOrder: boolean },
    TVariables & MutationArgs["updateSellOrder"]
  >;

  updateSellOrder<
    XArgs extends AcceptableVariables<MutationArgs["updateSellOrder"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly updateSellOrder: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["updateSellOrder"]>
  >;

  updateSellOrder<
    XAlias extends string = "updateSellOrder",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"updateSellOrder", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["updateSellOrder"] & XDirectiveVariables
  >;

  updateSellOrder<
    XArgs extends AcceptableVariables<MutationArgs["updateSellOrder"]>,
    XAlias extends string = "updateSellOrder",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"updateSellOrder", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["updateSellOrder"]> &
      XDirectiveVariables
  >;

  createBuyOrder(): MutationFetcher<
    T & { readonly createBuyOrder: boolean },
    TVariables & MutationArgs["createBuyOrder"]
  >;

  createBuyOrder<
    XArgs extends AcceptableVariables<MutationArgs["createBuyOrder"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly createBuyOrder: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["createBuyOrder"]>
  >;

  createBuyOrder<
    XAlias extends string = "createBuyOrder",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"createBuyOrder", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["createBuyOrder"] & XDirectiveVariables
  >;

  createBuyOrder<
    XArgs extends AcceptableVariables<MutationArgs["createBuyOrder"]>,
    XAlias extends string = "createBuyOrder",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"createBuyOrder", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["createBuyOrder"]> &
      XDirectiveVariables
  >;

  deleteOrder(): MutationFetcher<
    T & { readonly deleteOrder: boolean },
    TVariables & MutationArgs["deleteOrder"]
  >;

  deleteOrder<XArgs extends AcceptableVariables<MutationArgs["deleteOrder"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteOrder: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["deleteOrder"]>
  >;

  deleteOrder<
    XAlias extends string = "deleteOrder",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteOrder", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["deleteOrder"] & XDirectiveVariables
  >;

  deleteOrder<
    XArgs extends AcceptableVariables<MutationArgs["deleteOrder"]>,
    XAlias extends string = "deleteOrder",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteOrder", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteOrder"]> &
      XDirectiveVariables
  >;

  updateOrderStatus(): MutationFetcher<
    T & { readonly updateOrderStatus: boolean },
    TVariables & MutationArgs["updateOrderStatus"]
  >;

  updateOrderStatus<
    XArgs extends AcceptableVariables<MutationArgs["updateOrderStatus"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly updateOrderStatus: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["updateOrderStatus"]>
  >;

  updateOrderStatus<
    XAlias extends string = "updateOrderStatus",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"updateOrderStatus", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["updateOrderStatus"] & XDirectiveVariables
  >;

  updateOrderStatus<
    XArgs extends AcceptableVariables<MutationArgs["updateOrderStatus"]>,
    XAlias extends string = "updateOrderStatus",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"updateOrderStatus", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["updateOrderStatus"]> &
      XDirectiveVariables
  >;

  startSwap(): MutationFetcher<
    T & { readonly startSwap: boolean },
    TVariables & MutationArgs["startSwap"]
  >;

  startSwap<XArgs extends AcceptableVariables<MutationArgs["startSwap"]>>(
    args: XArgs
  ): MutationFetcher<
    T & { readonly startSwap: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["startSwap"]>
  >;

  startSwap<
    XAlias extends string = "startSwap",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"startSwap", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["startSwap"] & XDirectiveVariables
  >;

  startSwap<
    XArgs extends AcceptableVariables<MutationArgs["startSwap"]>,
    XAlias extends string = "startSwap",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"startSwap", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["startSwap"]> &
      XDirectiveVariables
  >;

  acceptInternalSwap(): MutationFetcher<
    T & { readonly acceptInternalSwap: boolean },
    TVariables & MutationArgs["acceptInternalSwap"]
  >;

  acceptInternalSwap<
    XArgs extends AcceptableVariables<MutationArgs["acceptInternalSwap"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly acceptInternalSwap: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["acceptInternalSwap"]>
  >;

  acceptInternalSwap<
    XAlias extends string = "acceptInternalSwap",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"acceptInternalSwap", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["acceptInternalSwap"] & XDirectiveVariables
  >;

  acceptInternalSwap<
    XArgs extends AcceptableVariables<MutationArgs["acceptInternalSwap"]>,
    XAlias extends string = "acceptInternalSwap",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"acceptInternalSwap", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["acceptInternalSwap"]> &
      XDirectiveVariables
  >;

  acceptBlockchainSwap(): MutationFetcher<
    T & { readonly acceptBlockchainSwap: boolean },
    TVariables & MutationArgs["acceptBlockchainSwap"]
  >;

  acceptBlockchainSwap<
    XArgs extends AcceptableVariables<MutationArgs["acceptBlockchainSwap"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly acceptBlockchainSwap: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["acceptBlockchainSwap"]>
  >;

  acceptBlockchainSwap<
    XAlias extends string = "acceptBlockchainSwap",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"acceptBlockchainSwap", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["acceptBlockchainSwap"] & XDirectiveVariables
  >;

  acceptBlockchainSwap<
    XArgs extends AcceptableVariables<MutationArgs["acceptBlockchainSwap"]>,
    XAlias extends string = "acceptBlockchainSwap",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"acceptBlockchainSwap", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["acceptBlockchainSwap"]> &
      XDirectiveVariables
  >;

  createBlockchainTransactionTransfer(): MutationFetcher<
    T & { readonly createBlockchainTransactionTransfer: number },
    TVariables & MutationArgs["createBlockchainTransactionTransfer"]
  >;

  createBlockchainTransactionTransfer<
    XArgs extends AcceptableVariables<
      MutationArgs["createBlockchainTransactionTransfer"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly createBlockchainTransactionTransfer: number },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["createBlockchainTransactionTransfer"]
      >
  >;

  createBlockchainTransactionTransfer<
    XAlias extends string = "createBlockchainTransactionTransfer",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"createBlockchainTransactionTransfer", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      MutationArgs["createBlockchainTransactionTransfer"] &
      XDirectiveVariables
  >;

  createBlockchainTransactionTransfer<
    XArgs extends AcceptableVariables<
      MutationArgs["createBlockchainTransactionTransfer"]
    >,
    XAlias extends string = "createBlockchainTransactionTransfer",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"createBlockchainTransactionTransfer", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["createBlockchainTransactionTransfer"]
      > &
      XDirectiveVariables
  >;

  investorInvoiceAlertDelete(): MutationFetcher<
    T & { readonly investorInvoiceAlertDelete: boolean },
    TVariables & MutationArgs["investorInvoiceAlertDelete"]
  >;

  investorInvoiceAlertDelete<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvoiceAlertDelete"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly investorInvoiceAlertDelete: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorInvoiceAlertDelete"]>
  >;

  investorInvoiceAlertDelete<
    XAlias extends string = "investorInvoiceAlertDelete",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorInvoiceAlertDelete", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["investorInvoiceAlertDelete"] &
      XDirectiveVariables
  >;

  investorInvoiceAlertDelete<
    XArgs extends AcceptableVariables<
      MutationArgs["investorInvoiceAlertDelete"]
    >,
    XAlias extends string = "investorInvoiceAlertDelete",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"investorInvoiceAlertDelete", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["investorInvoiceAlertDelete"]> &
      XDirectiveVariables
  >;

  messageCreate(): MutationFetcher<
    T & { readonly messageCreate: number },
    TVariables & MutationArgs["messageCreate"]
  >;

  messageCreate<
    XArgs extends AcceptableVariables<MutationArgs["messageCreate"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly messageCreate: number },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["messageCreate"]>
  >;

  messageCreate<
    XAlias extends string = "messageCreate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"messageCreate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & MutationArgs["messageCreate"] & XDirectiveVariables
  >;

  messageCreate<
    XArgs extends AcceptableVariables<MutationArgs["messageCreate"]>,
    XAlias extends string = "messageCreate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"messageCreate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["messageCreate"]> &
      XDirectiveVariables
  >;

  messageUpdate(): MutationFetcher<
    T & { readonly messageUpdate: boolean },
    TVariables & MutationArgs["messageUpdate"]
  >;

  messageUpdate<
    XArgs extends AcceptableVariables<MutationArgs["messageUpdate"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly messageUpdate: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["messageUpdate"]>
  >;

  messageUpdate<
    XAlias extends string = "messageUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"messageUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["messageUpdate"] & XDirectiveVariables
  >;

  messageUpdate<
    XArgs extends AcceptableVariables<MutationArgs["messageUpdate"]>,
    XAlias extends string = "messageUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"messageUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["messageUpdate"]> &
      XDirectiveVariables
  >;

  updateChatsToSeen(): MutationFetcher<
    T & { readonly updateChatsToSeen: boolean },
    TVariables & MutationArgs["updateChatsToSeen"]
  >;

  updateChatsToSeen<
    XArgs extends AcceptableVariables<MutationArgs["updateChatsToSeen"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly updateChatsToSeen: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["updateChatsToSeen"]>
  >;

  updateChatsToSeen<
    XAlias extends string = "updateChatsToSeen",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"updateChatsToSeen", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["updateChatsToSeen"] & XDirectiveVariables
  >;

  updateChatsToSeen<
    XArgs extends AcceptableVariables<MutationArgs["updateChatsToSeen"]>,
    XAlias extends string = "updateChatsToSeen",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"updateChatsToSeen", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["updateChatsToSeen"]> &
      XDirectiveVariables
  >;

  updatePriceNegotiationChatsToSeen(): MutationFetcher<
    T & { readonly updatePriceNegotiationChatsToSeen: boolean },
    TVariables & MutationArgs["updatePriceNegotiationChatsToSeen"]
  >;

  updatePriceNegotiationChatsToSeen<
    XArgs extends AcceptableVariables<
      MutationArgs["updatePriceNegotiationChatsToSeen"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly updatePriceNegotiationChatsToSeen: boolean },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["updatePriceNegotiationChatsToSeen"]
      >
  >;

  updatePriceNegotiationChatsToSeen<
    XAlias extends string = "updatePriceNegotiationChatsToSeen",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"updatePriceNegotiationChatsToSeen", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["updatePriceNegotiationChatsToSeen"] &
      XDirectiveVariables
  >;

  updatePriceNegotiationChatsToSeen<
    XArgs extends AcceptableVariables<
      MutationArgs["updatePriceNegotiationChatsToSeen"]
    >,
    XAlias extends string = "updatePriceNegotiationChatsToSeen",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"updatePriceNegotiationChatsToSeen", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["updatePriceNegotiationChatsToSeen"]
      > &
      XDirectiveVariables
  >;

  deleteOneMessage(): MutationFetcher<
    T & { readonly deleteOneMessage: boolean },
    TVariables & MutationArgs["deleteOneMessage"]
  >;

  deleteOneMessage<
    XArgs extends AcceptableVariables<MutationArgs["deleteOneMessage"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteOneMessage: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["deleteOneMessage"]>
  >;

  deleteOneMessage<
    XAlias extends string = "deleteOneMessage",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteOneMessage", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["deleteOneMessage"] & XDirectiveVariables
  >;

  deleteOneMessage<
    XArgs extends AcceptableVariables<MutationArgs["deleteOneMessage"]>,
    XAlias extends string = "deleteOneMessage",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteOneMessage", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteOneMessage"]> &
      XDirectiveVariables
  >;

  deleteOneMessagePermanently(): MutationFetcher<
    T & { readonly deleteOneMessagePermanently: boolean },
    TVariables & MutationArgs["deleteOneMessagePermanently"]
  >;

  deleteOneMessagePermanently<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteOneMessagePermanently"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteOneMessagePermanently: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteOneMessagePermanently"]>
  >;

  deleteOneMessagePermanently<
    XAlias extends string = "deleteOneMessagePermanently",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteOneMessagePermanently", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["deleteOneMessagePermanently"] &
      XDirectiveVariables
  >;

  deleteOneMessagePermanently<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteOneMessagePermanently"]
    >,
    XAlias extends string = "deleteOneMessagePermanently",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteOneMessagePermanently", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteOneMessagePermanently"]> &
      XDirectiveVariables
  >;

  deleteChatHistory(): MutationFetcher<
    T & { readonly deleteChatHistory: boolean },
    TVariables & MutationArgs["deleteChatHistory"]
  >;

  deleteChatHistory<
    XArgs extends AcceptableVariables<MutationArgs["deleteChatHistory"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteChatHistory: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["deleteChatHistory"]>
  >;

  deleteChatHistory<
    XAlias extends string = "deleteChatHistory",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteChatHistory", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["deleteChatHistory"] & XDirectiveVariables
  >;

  deleteChatHistory<
    XArgs extends AcceptableVariables<MutationArgs["deleteChatHistory"]>,
    XAlias extends string = "deleteChatHistory",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteChatHistory", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteChatHistory"]> &
      XDirectiveVariables
  >;

  deleteCustomerSupportChatHistory(): MutationFetcher<
    T & { readonly deleteCustomerSupportChatHistory: boolean },
    TVariables & MutationArgs["deleteCustomerSupportChatHistory"]
  >;

  deleteCustomerSupportChatHistory<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteCustomerSupportChatHistory"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteCustomerSupportChatHistory: boolean },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["deleteCustomerSupportChatHistory"]
      >
  >;

  deleteCustomerSupportChatHistory<
    XAlias extends string = "deleteCustomerSupportChatHistory",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteCustomerSupportChatHistory", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["deleteCustomerSupportChatHistory"] &
      XDirectiveVariables
  >;

  deleteCustomerSupportChatHistory<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteCustomerSupportChatHistory"]
    >,
    XAlias extends string = "deleteCustomerSupportChatHistory",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteCustomerSupportChatHistory", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["deleteCustomerSupportChatHistory"]
      > &
      XDirectiveVariables
  >;

  deleteChatHistoryPermanently(): MutationFetcher<
    T & { readonly deleteChatHistoryPermanently: boolean },
    TVariables & MutationArgs["deleteChatHistoryPermanently"]
  >;

  deleteChatHistoryPermanently<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteChatHistoryPermanently"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteChatHistoryPermanently: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteChatHistoryPermanently"]>
  >;

  deleteChatHistoryPermanently<
    XAlias extends string = "deleteChatHistoryPermanently",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteChatHistoryPermanently", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["deleteChatHistoryPermanently"] &
      XDirectiveVariables
  >;

  deleteChatHistoryPermanently<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteChatHistoryPermanently"]
    >,
    XAlias extends string = "deleteChatHistoryPermanently",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteChatHistoryPermanently", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteChatHistoryPermanently"]> &
      XDirectiveVariables
  >;

  deleteCustomerSupportChatHistoryPermanently(): MutationFetcher<
    T & { readonly deleteCustomerSupportChatHistoryPermanently: boolean },
    TVariables & MutationArgs["deleteCustomerSupportChatHistoryPermanently"]
  >;

  deleteCustomerSupportChatHistoryPermanently<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteCustomerSupportChatHistoryPermanently"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteCustomerSupportChatHistoryPermanently: boolean },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["deleteCustomerSupportChatHistoryPermanently"]
      >
  >;

  deleteCustomerSupportChatHistoryPermanently<
    XAlias extends string = "deleteCustomerSupportChatHistoryPermanently",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<
        "deleteCustomerSupportChatHistoryPermanently",
        {},
        {}
      >
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["deleteCustomerSupportChatHistoryPermanently"] &
      XDirectiveVariables
  >;

  deleteCustomerSupportChatHistoryPermanently<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteCustomerSupportChatHistoryPermanently"]
    >,
    XAlias extends string = "deleteCustomerSupportChatHistoryPermanently",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<
        "deleteCustomerSupportChatHistoryPermanently",
        {},
        {}
      >
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["deleteCustomerSupportChatHistoryPermanently"]
      > &
      XDirectiveVariables
  >;

  deleteChatList(): MutationFetcher<
    T & { readonly deleteChatList: boolean },
    TVariables & MutationArgs["deleteChatList"]
  >;

  deleteChatList<
    XArgs extends AcceptableVariables<MutationArgs["deleteChatList"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteChatList: boolean },
    TVariables & UnresolvedVariables<XArgs, MutationArgs["deleteChatList"]>
  >;

  deleteChatList<
    XAlias extends string = "deleteChatList",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteChatList", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["deleteChatList"] & XDirectiveVariables
  >;

  deleteChatList<
    XArgs extends AcceptableVariables<MutationArgs["deleteChatList"]>,
    XAlias extends string = "deleteChatList",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteChatList", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteChatList"]> &
      XDirectiveVariables
  >;

  deleteCustomerSupportChatList(): MutationFetcher<
    T & { readonly deleteCustomerSupportChatList: boolean },
    TVariables & MutationArgs["deleteCustomerSupportChatList"]
  >;

  deleteCustomerSupportChatList<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteCustomerSupportChatList"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteCustomerSupportChatList: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteCustomerSupportChatList"]>
  >;

  deleteCustomerSupportChatList<
    XAlias extends string = "deleteCustomerSupportChatList",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteCustomerSupportChatList", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["deleteCustomerSupportChatList"] &
      XDirectiveVariables
  >;

  deleteCustomerSupportChatList<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteCustomerSupportChatList"]
    >,
    XAlias extends string = "deleteCustomerSupportChatList",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteCustomerSupportChatList", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["deleteCustomerSupportChatList"]
      > &
      XDirectiveVariables
  >;

  deleteChatListPermanently(): MutationFetcher<
    T & { readonly deleteChatListPermanently: boolean },
    TVariables & MutationArgs["deleteChatListPermanently"]
  >;

  deleteChatListPermanently<
    XArgs extends AcceptableVariables<MutationArgs["deleteChatListPermanently"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteChatListPermanently: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteChatListPermanently"]>
  >;

  deleteChatListPermanently<
    XAlias extends string = "deleteChatListPermanently",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteChatListPermanently", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["deleteChatListPermanently"] & XDirectiveVariables
  >;

  deleteChatListPermanently<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteChatListPermanently"]
    >,
    XAlias extends string = "deleteChatListPermanently",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteChatListPermanently", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["deleteChatListPermanently"]> &
      XDirectiveVariables
  >;

  deleteCustomerSupportChatListPermanently(): MutationFetcher<
    T & { readonly deleteCustomerSupportChatListPermanently: boolean },
    TVariables & MutationArgs["deleteCustomerSupportChatListPermanently"]
  >;

  deleteCustomerSupportChatListPermanently<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteCustomerSupportChatListPermanently"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly deleteCustomerSupportChatListPermanently: boolean },
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["deleteCustomerSupportChatListPermanently"]
      >
  >;

  deleteCustomerSupportChatListPermanently<
    XAlias extends string = "deleteCustomerSupportChatListPermanently",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"deleteCustomerSupportChatListPermanently", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["deleteCustomerSupportChatListPermanently"] &
      XDirectiveVariables
  >;

  deleteCustomerSupportChatListPermanently<
    XArgs extends AcceptableVariables<
      MutationArgs["deleteCustomerSupportChatListPermanently"]
    >,
    XAlias extends string = "deleteCustomerSupportChatListPermanently",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"deleteCustomerSupportChatListPermanently", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        MutationArgs["deleteCustomerSupportChatListPermanently"]
      > &
      XDirectiveVariables
  >;

  sendEmailNotification(): MutationFetcher<
    T & { readonly sendEmailNotification: boolean },
    TVariables & MutationArgs["sendEmailNotification"]
  >;

  sendEmailNotification<
    XArgs extends AcceptableVariables<MutationArgs["sendEmailNotification"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly sendEmailNotification: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["sendEmailNotification"]>
  >;

  sendEmailNotification<
    XAlias extends string = "sendEmailNotification",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sendEmailNotification", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & MutationArgs["sendEmailNotification"] & XDirectiveVariables
  >;

  sendEmailNotification<
    XArgs extends AcceptableVariables<MutationArgs["sendEmailNotification"]>,
    XAlias extends string = "sendEmailNotification",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"sendEmailNotification", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["sendEmailNotification"]> &
      XDirectiveVariables
  >;

  addNewInvestorBankAccount(): MutationFetcher<
    T & { readonly addNewInvestorBankAccount: string },
    TVariables & MutationArgs["addNewInvestorBankAccount"]
  >;

  addNewInvestorBankAccount<
    XArgs extends AcceptableVariables<MutationArgs["addNewInvestorBankAccount"]>
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly addNewInvestorBankAccount: string },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["addNewInvestorBankAccount"]>
  >;

  addNewInvestorBankAccount<
    XAlias extends string = "addNewInvestorBankAccount",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"addNewInvestorBankAccount", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & MutationArgs["addNewInvestorBankAccount"] & XDirectiveVariables
  >;

  addNewInvestorBankAccount<
    XArgs extends AcceptableVariables<
      MutationArgs["addNewInvestorBankAccount"]
    >,
    XAlias extends string = "addNewInvestorBankAccount",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"addNewInvestorBankAccount", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["addNewInvestorBankAccount"]> &
      XDirectiveVariables
  >;

  customizedComponentsInsert(): MutationFetcher<
    T & { readonly customizedComponentsInsert: boolean },
    TVariables & MutationArgs["customizedComponentsInsert"]
  >;

  customizedComponentsInsert<
    XArgs extends AcceptableVariables<
      MutationArgs["customizedComponentsInsert"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly customizedComponentsInsert: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["customizedComponentsInsert"]>
  >;

  customizedComponentsInsert<
    XAlias extends string = "customizedComponentsInsert",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"customizedComponentsInsert", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["customizedComponentsInsert"] &
      XDirectiveVariables
  >;

  customizedComponentsInsert<
    XArgs extends AcceptableVariables<
      MutationArgs["customizedComponentsInsert"]
    >,
    XAlias extends string = "customizedComponentsInsert",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"customizedComponentsInsert", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["customizedComponentsInsert"]> &
      XDirectiveVariables
  >;

  customizedComponentsUpdate(): MutationFetcher<
    T & { readonly customizedComponentsUpdate: boolean },
    TVariables & MutationArgs["customizedComponentsUpdate"]
  >;

  customizedComponentsUpdate<
    XArgs extends AcceptableVariables<
      MutationArgs["customizedComponentsUpdate"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly customizedComponentsUpdate: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["customizedComponentsUpdate"]>
  >;

  customizedComponentsUpdate<
    XAlias extends string = "customizedComponentsUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"customizedComponentsUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["customizedComponentsUpdate"] &
      XDirectiveVariables
  >;

  customizedComponentsUpdate<
    XArgs extends AcceptableVariables<
      MutationArgs["customizedComponentsUpdate"]
    >,
    XAlias extends string = "customizedComponentsUpdate",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"customizedComponentsUpdate", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["customizedComponentsUpdate"]> &
      XDirectiveVariables
  >;

  customizedComponentsDelete(): MutationFetcher<
    T & { readonly customizedComponentsDelete: boolean },
    TVariables & MutationArgs["customizedComponentsDelete"]
  >;

  customizedComponentsDelete<
    XArgs extends AcceptableVariables<
      MutationArgs["customizedComponentsDelete"]
    >
  >(
    args: XArgs
  ): MutationFetcher<
    T & { readonly customizedComponentsDelete: boolean },
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["customizedComponentsDelete"]>
  >;

  customizedComponentsDelete<
    XAlias extends string = "customizedComponentsDelete",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"customizedComponentsDelete", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      MutationArgs["customizedComponentsDelete"] &
      XDirectiveVariables
  >;

  customizedComponentsDelete<
    XArgs extends AcceptableVariables<
      MutationArgs["customizedComponentsDelete"]
    >,
    XAlias extends string = "customizedComponentsDelete",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"customizedComponentsDelete", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MutationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, MutationArgs["customizedComponentsDelete"]> &
      XDirectiveVariables
  >;
}

export const mutation$: MutationFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Mutation",
    "EMBEDDED",
    [],
    [
      {
        category: "SCALAR",
        name: "moonpayAddTransactionDefault",
        argGraphQLTypeMap: {
          status: "String!",
          moonpayID: "String!",
        },
      },
      {
        category: "SCALAR",
        name: "moonpayConfigUpdate",
        argGraphQLTypeMap: { config: "MoonpayConfigInput!" },
      },
      {
        category: "SCALAR",
        name: "investorBuyAlert",
        argGraphQLTypeMap: { query: "InvestorBuyAlertInput!" },
      },
      {
        category: "SCALAR",
        name: "investorSellAlert",
        argGraphQLTypeMap: { data: "InvestorBuyAlertInput!" },
      },
      {
        category: "SCALAR",
        name: "investorBuyAlertAdmin",
        argGraphQLTypeMap: {
          options: "InvestorBuyAlertOptions",
          data: "InvestorBuyAlertInputAdmin!",
        },
      },
      {
        category: "SCALAR",
        name: "investorBuyAlertRemove",
        argGraphQLTypeMap: { alertID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "investorBuyAlertApprove",
        argGraphQLTypeMap: { alertID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "investorBuyAlertRemoveAdmin",
        argGraphQLTypeMap: { alertID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "investorBuyAlertDeclineAdmin",
        argGraphQLTypeMap: { alertID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "investorBuyAlertSetStatus",
        argGraphQLTypeMap: {
          status: "BuyAlertStatus!",
          alertID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "investorBuyAlertHide",
        argGraphQLTypeMap: { alertID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "investorDepositWithdrawAlert",
        argGraphQLTypeMap: { data: "InvestorDepositWithdrawAlertInput!" },
      },
      {
        category: "SCALAR",
        name: "investorInvestingEntityCreate",
        argGraphQLTypeMap: { data: "InvestingEntityInput!" },
      },
      {
        category: "SCALAR",
        name: "investorInvestingEntityUpdate",
        argGraphQLTypeMap: {
          data: "InvestingEntityInput!",
          entityID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "investorInvestingEntityRemove",
        argGraphQLTypeMap: { entityID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "investorInvestingEntityMemberCreate",
        argGraphQLTypeMap: { data: "InvestingEntityMemberInput!" },
      },
      {
        category: "SCALAR",
        name: "investorInvestingEntityMemberUpdate",
        argGraphQLTypeMap: {
          data: "InvestingEntityMemberInput!",
          memberID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "investorInvestingEntityMemberRemove",
        argGraphQLTypeMap: { memberID: "Int!" },
      },
      {
        category: "LIST",
        name: "setStatusOfAccreditationOnStoAdmin",
        argGraphQLTypeMap: {
          status: "accreditionStatus!",
          entityID: "Int!",
        },
        targetTypeName: "InvestingEntity",
      },
      {
        category: "SCALAR",
        name: "signUpMarketSpace",
        argGraphQLTypeMap: { data: "SignUpMarketSpaceInput!" },
      },
      {
        category: "SCALAR",
        name: "investorBuyAlertMarketSpace",
        argGraphQLTypeMap: { data: "InvestorBuyAlertMSInput!" },
      },
      {
        category: "SCALAR",
        name: "createInvestorMarketSpace",
        argGraphQLTypeMap: { data: "InvestorMarketSpaceInput!" },
      },
      {
        category: "SCALAR",
        name: "investorRegisterVote",
        argGraphQLTypeMap: { data: "RegisterVoteInput!" },
      },
      {
        category: "SCALAR",
        name: "setMercuryRecipient",
        argGraphQLTypeMap: {
          routingNumber: "String!",
          accountNumber: "String!",
        },
      },
      {
        category: "SCALAR",
        name: "createACHPayment",
        argGraphQLTypeMap: {
          idempotencyKey: "String!",
          amount: "Float!",
          stoID: "Int!",
        },
      },
      "syncMercuryTransactions",
      {
        category: "SCALAR",
        name: "sendMercuryInstructionalEmail",
        argGraphQLTypeMap: {
          stoID: "Int!",
          note: "String!",
          routingNumber: "String!",
          accountNumber: "String!",
        },
      },
      {
        category: "SCALAR",
        name: "setThemeConfig",
        argGraphQLTypeMap: { theme: "String!" },
      },
      {
        category: "SCALAR",
        name: "fileUpload",
        argGraphQLTypeMap: { file: "Upload!" },
        targetTypeName: "FileUploaded",
      },
      {
        category: "SCALAR",
        name: "fileRemove",
        argGraphQLTypeMap: { file: "String!" },
      },
      {
        category: "SCALAR",
        name: "setDocuSignSignature",
        argGraphQLTypeMap: {
          docusignEnvelopeID: "String!",
          documentID: "Int!",
          sharePurchaseID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "createComment",
        argGraphQLTypeMap: {
          text: "String!",
          documentID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "updateComment",
        argGraphQLTypeMap: {
          text: "String!",
          commentID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "deleteComment",
        argGraphQLTypeMap: { commentID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "setSignature",
        argGraphQLTypeMap: {
          base64: "String!",
          documentID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "sendContract",
        argGraphQLTypeMap: { documentID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "setSharePurchaseDocumentSignature",
        argGraphQLTypeMap: {
          investorID: "Int",
          sharePurchaseID: "Int!",
          base64: "String!",
          documentID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "sendSharePurchaseContract",
        argGraphQLTypeMap: {
          sharePurchaseID: "Int!",
          documentID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "deleteSharePurchaseRequest",
        argGraphQLTypeMap: { documentID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "setSubmittedDocument",
        argGraphQLTypeMap: {
          fieldValues: "[DocumentFieldValueDTO!]!",
          documentID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "setSubmittedSharePurchaseDocument",
        argGraphQLTypeMap: {
          fieldValues: "[DocumentFieldValueDTO!]!",
          sharePurchaseID: "Int!",
          documentID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "investorInboxCreate",
        argGraphQLTypeMap: { data: "InboxInput!" },
      },
      {
        category: "SCALAR",
        name: "signIn",
        argGraphQLTypeMap: {
          stoID: "Int!",
          password: "String!",
          email: "String!",
        },
      },
      {
        category: "SCALAR",
        name: "signInSSO",
        argGraphQLTypeMap: { data: "SignInSSOInput!" },
      },
      {
        category: "SCALAR",
        name: "investor2FAConfirm",
        argGraphQLTypeMap: { code: "Int!" },
      },
      {
        category: "SCALAR",
        name: "signUp",
        argGraphQLTypeMap: { data: "SignUpInput!" },
      },
      {
        category: "SCALAR",
        name: "investorVerify",
        argGraphQLTypeMap: { secret: "String!" },
      },
      {
        category: "SCALAR",
        name: "investorChangePassword",
        argGraphQLTypeMap: { data: "ChangePasswordInput!" },
      },
      "investorToggleTwoFA",
      {
        category: "SCALAR",
        name: "investorReset",
        argGraphQLTypeMap: {
          stoID: "Int!",
          email: "String!",
        },
      },
      {
        category: "SCALAR",
        name: "investorSetPassword",
        argGraphQLTypeMap: { data: "SetPasswordInput!" },
      },
      {
        category: "SCALAR",
        name: "investorUsufructuaryUpdate",
        argGraphQLTypeMap: { data: "InvestorUsufructuaryInput!" },
      },
      {
        category: "SCALAR",
        name: "investorBeneficialUpdate",
        argGraphQLTypeMap: { data: "InvestorBeneficialInput!" },
      },
      {
        category: "SCALAR",
        name: "investorProfile",
        argGraphQLTypeMap: { data: "InvestorProfileInput!" },
      },
      {
        category: "SCALAR",
        name: "investorCompanyProfile",
        argGraphQLTypeMap: { data: "InvestorCompanyProfileInput!" },
      },
      {
        category: "SCALAR",
        name: "fillKyc",
        argGraphQLTypeMap: { data: "JSON!" },
      },
      {
        category: "SCALAR",
        name: "applyKyc",
        argGraphQLTypeMap: { applied: "Boolean!" },
      },
      {
        category: "SCALAR",
        name: "investorPublicKeyAdd",
        argGraphQLTypeMap: {
          blockchainID: "Int!",
          title: "String!",
        },
      },
      {
        category: "SCALAR",
        name: "investorPublicKeyDelete",
        argGraphQLTypeMap: { keyID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "investorTransferShares",
        argGraphQLTypeMap: { data: "TransferShareInput!" },
      },
      {
        category: "SCALAR",
        name: "companyTransferShares",
        argGraphQLTypeMap: { data: "TransferShareInput!" },
      },
      {
        category: "SCALAR",
        name: "transferSharesBetween",
        argGraphQLTypeMap: {
          alert: "Int!",
          data: "TransferShareInput!",
          to: "TransferEntity!",
          from: "TransferEntity!",
        },
      },
      {
        category: "SCALAR",
        name: "setSTOStatus",
        argGraphQLTypeMap: {
          isActive: "Boolean!",
          stoID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "addMetadataKey",
        argGraphQLTypeMap: { key: "String!" },
      },
      {
        category: "SCALAR",
        name: "removeMetadataKey",
        argGraphQLTypeMap: { key: "String!" },
      },
      {
        category: "SCALAR",
        name: "adminSignIn",
        argGraphQLTypeMap: {
          platform: "Boolean",
          STO: "Int",
          password: "String!",
          username: "String!",
        },
        undefinable: true,
      },
      "generateAPIToken",
      {
        category: "SCALAR",
        name: "setPlatformParam",
        argGraphQLTypeMap: {
          intValue: "Int",
          stringValue: "String",
          param: "String!",
        },
      },
      {
        category: "SCALAR",
        name: "setEntityAccreditation",
        argGraphQLTypeMap: {
          isAccredited: "Boolean!",
          entityID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "updateInvestorKyc",
        argGraphQLTypeMap: { kycData: "InvestorKycInput!" },
      },
      {
        category: "SCALAR",
        name: "deleteInvestorSto",
        argGraphQLTypeMap: {
          stoID: "Int!",
          investorID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "copyInvestorsToOtherProjects",
        argGraphQLTypeMap: {
          investorIDs: "[Int!]!",
          pasteStoID: "Int!",
          copyStoID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "updateMetadataValue",
        argGraphQLTypeMap: { data: "UpdateMetadataValueInput!" },
      },
      {
        category: "SCALAR",
        name: "addNewBlockchain",
        argGraphQLTypeMap: { title: "String!" },
      },
      {
        category: "SCALAR",
        name: "updateBlockchain",
        argGraphQLTypeMap: {
          title: "String!",
          ID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "verifyTransactionFromBlockchain",
        argGraphQLTypeMap: { data: "VerifyCryptoReciepeInput!" },
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "feeCreate",
        argGraphQLTypeMap: { data: "FeeInput!" },
      },
      {
        category: "SCALAR",
        name: "feeUpdate",
        argGraphQLTypeMap: {
          data: "FeeInput!",
          feeID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "feeDelete",
        argGraphQLTypeMap: { feeID: "Int!" },
      },
      "feeDeleteAll",
      {
        category: "SCALAR",
        name: "feeCommissionUpdate",
        argGraphQLTypeMap: {
          data: "FeeCommissionInput!",
          feeCommissionID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "feeCommissionDelete",
        argGraphQLTypeMap: { feeCommissionID: "Int!" },
      },
      "feeCommissionDeleteAll",
      "refreshInvestorData",
      {
        category: "SCALAR",
        name: "createOffer",
        argGraphQLTypeMap: { offer: "ExchangeOfferInput!" },
      },
      {
        category: "SCALAR",
        name: "deleteOffer",
        argGraphQLTypeMap: { orderID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "createSellOrder",
        argGraphQLTypeMap: { order: "ExchangeSellOrderInput!" },
      },
      {
        category: "SCALAR",
        name: "updateSellOrder",
        argGraphQLTypeMap: {
          data: "ExchangeUpdateOrderInput!",
          orderID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "createBuyOrder",
        argGraphQLTypeMap: { order: "ExchangeBuyOrderInput!" },
      },
      {
        category: "SCALAR",
        name: "deleteOrder",
        argGraphQLTypeMap: { orderID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "updateOrderStatus",
        argGraphQLTypeMap: {
          atomicSwapCurrentStatus: "AtomicSwapStatus!",
          orderID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "startSwap",
        argGraphQLTypeMap: { offerID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "acceptInternalSwap",
        argGraphQLTypeMap: { offerID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "acceptBlockchainSwap",
        argGraphQLTypeMap: {
          orderID: "Int!",
          walletAddress: "String!",
        },
      },
      {
        category: "SCALAR",
        name: "createBlockchainTransactionTransfer",
        argGraphQLTypeMap: {
          data: "BlockchainSharesTransferTransactionsInput!",
        },
      },
      {
        category: "SCALAR",
        name: "investorInvoiceAlertDelete",
        argGraphQLTypeMap: { ID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "messageCreate",
        argGraphQLTypeMap: { data: "ChatInput!" },
      },
      {
        category: "SCALAR",
        name: "messageUpdate",
        argGraphQLTypeMap: {
          data: "ChatInput!",
          chatID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "updateChatsToSeen",
        argGraphQLTypeMap: {
          sender: "SENDER_TYPE!",
          stoID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "updatePriceNegotiationChatsToSeen",
        argGraphQLTypeMap: {
          counterpartID: "Int!",
          contextID: "Int!",
          context: "CHAT_CONTEXT!",
        },
      },
      {
        category: "SCALAR",
        name: "deleteOneMessage",
        argGraphQLTypeMap: { chatID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "deleteOneMessagePermanently",
        argGraphQLTypeMap: { chatID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "deleteChatHistory",
        argGraphQLTypeMap: {
          investorID: "Int!",
          stoID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "deleteCustomerSupportChatHistory",
        argGraphQLTypeMap: {
          investorID: "Int!",
          stoID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "deleteChatHistoryPermanently",
        argGraphQLTypeMap: {
          investorID: "Int!",
          stoID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "deleteCustomerSupportChatHistoryPermanently",
        argGraphQLTypeMap: {
          investorID: "Int!",
          stoID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "deleteChatList",
        argGraphQLTypeMap: { stoID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "deleteCustomerSupportChatList",
        argGraphQLTypeMap: { stoID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "deleteChatListPermanently",
        argGraphQLTypeMap: { stoID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "deleteCustomerSupportChatListPermanently",
        argGraphQLTypeMap: { stoID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "sendEmailNotification",
        argGraphQLTypeMap: {
          message: "String!",
          stoID: "Int!",
          senderType: "SENDER_TYPE!",
          investorIDs: "[Int!]!",
        },
      },
      {
        category: "SCALAR",
        name: "addNewInvestorBankAccount",
        argGraphQLTypeMap: { data: "InvestorBankAccountInput!" },
      },
      {
        category: "SCALAR",
        name: "customizedComponentsInsert",
        argGraphQLTypeMap: { data: "ComponentCustomizationInput!" },
      },
      {
        category: "SCALAR",
        name: "customizedComponentsUpdate",
        argGraphQLTypeMap: {
          data: "ComponentCustomizationInput!",
          componentID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "customizedComponentsDelete",
        argGraphQLTypeMap: { componentID: "Int" },
      },
    ]
  ),
  undefined
);

export interface MutationArgs {
  readonly moonpayAddTransactionDefault: {
    readonly status: string;
    readonly moonpayID: string;
  };

  readonly moonpayConfigUpdate: {
    readonly config: MoonpayConfigInput;
  };

  readonly investorBuyAlert: {
    readonly query: InvestorBuyAlertInput;
  };

  readonly investorSellAlert: {
    readonly data: InvestorBuyAlertInput;
  };

  readonly investorBuyAlertAdmin: {
    readonly options?: InvestorBuyAlertOptions;
    readonly data: InvestorBuyAlertInputAdmin;
  };

  readonly investorBuyAlertRemove: {
    readonly alertID: number;
  };

  readonly investorBuyAlertApprove: {
    readonly alertID: number;
  };

  readonly investorBuyAlertRemoveAdmin: {
    readonly alertID: number;
  };

  readonly investorBuyAlertDeclineAdmin: {
    readonly alertID: number;
  };

  readonly investorBuyAlertSetStatus: {
    readonly status: BuyAlertStatus;
    readonly alertID: number;
  };

  readonly investorBuyAlertHide: {
    readonly alertID: number;
  };

  readonly investorDepositWithdrawAlert: {
    readonly data: InvestorDepositWithdrawAlertInput;
  };

  readonly investorInvestingEntityCreate: {
    readonly data: InvestingEntityInput;
  };

  readonly investorInvestingEntityUpdate: {
    readonly data: InvestingEntityInput;
    readonly entityID: number;
  };

  readonly investorInvestingEntityRemove: {
    readonly entityID: number;
  };

  readonly investorInvestingEntityMemberCreate: {
    readonly data: InvestingEntityMemberInput;
  };

  readonly investorInvestingEntityMemberUpdate: {
    readonly data: InvestingEntityMemberInput;
    readonly memberID: number;
  };

  readonly investorInvestingEntityMemberRemove: {
    readonly memberID: number;
  };

  readonly setStatusOfAccreditationOnStoAdmin: {
    readonly status: accreditionStatus;
    readonly entityID: number;
  };

  readonly signUpMarketSpace: {
    readonly data: SignUpMarketSpaceInput;
  };

  readonly investorBuyAlertMarketSpace: {
    readonly data: InvestorBuyAlertMSInput;
  };

  readonly createInvestorMarketSpace: {
    readonly data: InvestorMarketSpaceInput;
  };

  readonly investorRegisterVote: {
    readonly data: RegisterVoteInput;
  };

  readonly setMercuryRecipient: {
    readonly routingNumber: string;
    readonly accountNumber: string;
  };

  readonly createACHPayment: {
    readonly idempotencyKey: string;
    readonly amount: number;
    readonly stoID: number;
  };

  readonly sendMercuryInstructionalEmail: {
    readonly stoID: number;
    readonly note: string;
    readonly routingNumber: string;
    readonly accountNumber: string;
  };

  readonly setThemeConfig: {
    readonly theme: string;
  };

  readonly fileUpload: {
    readonly file: object;
  };

  readonly fileRemove: {
    readonly file: string;
  };

  readonly setDocuSignSignature: {
    readonly docusignEnvelopeID: string;
    readonly documentID: number;
    readonly sharePurchaseID: number;
  };

  readonly createComment: {
    readonly text: string;
    readonly documentID: number;
  };

  readonly updateComment: {
    readonly text: string;
    readonly commentID: number;
  };

  readonly deleteComment: {
    readonly commentID: number;
  };

  readonly setSignature: {
    readonly base64: string;
    readonly documentID: number;
  };

  readonly sendContract: {
    readonly documentID: number;
  };

  readonly setSharePurchaseDocumentSignature: {
    readonly investorID?: number;
    readonly sharePurchaseID: number;
    readonly base64: string;
    readonly documentID: number;
  };

  readonly sendSharePurchaseContract: {
    readonly sharePurchaseID: number;
    readonly documentID: number;
  };

  readonly deleteSharePurchaseRequest: {
    readonly documentID: number;
  };

  readonly setSubmittedDocument: {
    readonly fieldValues: readonly DocumentFieldValueDTO[];
    readonly documentID: number;
  };

  readonly setSubmittedSharePurchaseDocument: {
    readonly fieldValues: readonly DocumentFieldValueDTO[];
    readonly sharePurchaseID: number;
    readonly documentID: number;
  };

  readonly investorInboxCreate: {
    readonly data: InboxInput;
  };

  readonly signIn: {
    readonly stoID: number;
    readonly password: string;
    readonly email: string;
  };

  readonly signInSSO: {
    readonly data: SignInSSOInput;
  };

  readonly investor2FAConfirm: {
    readonly code: number;
  };

  readonly signUp: {
    readonly data: SignUpInput;
  };

  readonly investorVerify: {
    readonly secret: string;
  };

  readonly investorChangePassword: {
    readonly data: ChangePasswordInput;
  };

  readonly investorReset: {
    readonly stoID: number;
    readonly email: string;
  };

  readonly investorSetPassword: {
    readonly data: SetPasswordInput;
  };

  readonly investorUsufructuaryUpdate: {
    readonly data: InvestorUsufructuaryInput;
  };

  readonly investorBeneficialUpdate: {
    readonly data: InvestorBeneficialInput;
  };

  readonly investorProfile: {
    readonly data: InvestorProfileInput;
  };

  readonly investorCompanyProfile: {
    readonly data: InvestorCompanyProfileInput;
  };

  readonly fillKyc: {
    readonly data: object;
  };

  readonly applyKyc: {
    readonly applied: boolean;
  };

  readonly investorPublicKeyAdd: {
    readonly blockchainID: number;
    readonly title: string;
  };

  readonly investorPublicKeyDelete: {
    readonly keyID: number;
  };

  readonly investorTransferShares: {
    readonly data: TransferShareInput;
  };

  readonly companyTransferShares: {
    readonly data: TransferShareInput;
  };

  readonly transferSharesBetween: {
    readonly alert: number;
    readonly data: TransferShareInput;
    readonly to: TransferEntity;
    readonly from: TransferEntity;
  };

  readonly setSTOStatus: {
    readonly isActive: boolean;
    readonly stoID: number;
  };

  readonly addMetadataKey: {
    readonly key: string;
  };

  readonly removeMetadataKey: {
    readonly key: string;
  };

  readonly adminSignIn: {
    readonly platform?: boolean;
    readonly STO?: number;
    readonly password: string;
    readonly username: string;
  };

  readonly setPlatformParam: {
    readonly intValue?: number;
    readonly stringValue?: string;
    readonly param: string;
  };

  readonly setEntityAccreditation: {
    readonly isAccredited: boolean;
    readonly entityID: number;
  };

  readonly updateInvestorKyc: {
    readonly kycData: InvestorKycInput;
  };

  readonly deleteInvestorSto: {
    readonly stoID: number;
    readonly investorID: number;
  };

  readonly copyInvestorsToOtherProjects: {
    readonly investorIDs: readonly number[];
    readonly pasteStoID: number;
    readonly copyStoID: number;
  };

  readonly updateMetadataValue: {
    readonly data: UpdateMetadataValueInput;
  };

  readonly addNewBlockchain: {
    readonly title: string;
  };

  readonly updateBlockchain: {
    readonly title: string;
    readonly ID: number;
  };

  readonly verifyTransactionFromBlockchain: {
    readonly data: VerifyCryptoReciepeInput;
  };

  readonly feeCreate: {
    readonly data: FeeInput;
  };

  readonly feeUpdate: {
    readonly data: FeeInput;
    readonly feeID: number;
  };

  readonly feeDelete: {
    readonly feeID: number;
  };

  readonly feeCommissionUpdate: {
    readonly data: FeeCommissionInput;
    readonly feeCommissionID: number;
  };

  readonly feeCommissionDelete: {
    readonly feeCommissionID: number;
  };

  readonly createOffer: {
    readonly offer: ExchangeOfferInput;
  };

  readonly deleteOffer: {
    readonly orderID: number;
  };

  readonly createSellOrder: {
    readonly order: ExchangeSellOrderInput;
  };

  readonly updateSellOrder: {
    readonly data: ExchangeUpdateOrderInput;
    readonly orderID: number;
  };

  readonly createBuyOrder: {
    readonly order: ExchangeBuyOrderInput;
  };

  readonly deleteOrder: {
    readonly orderID: number;
  };

  readonly updateOrderStatus: {
    readonly atomicSwapCurrentStatus: AtomicSwapStatus;
    readonly orderID: number;
  };

  readonly startSwap: {
    readonly offerID: number;
  };

  readonly acceptInternalSwap: {
    readonly offerID: number;
  };

  readonly acceptBlockchainSwap: {
    readonly orderID: number;
    readonly walletAddress: string;
  };

  readonly createBlockchainTransactionTransfer: {
    readonly data: BlockchainSharesTransferTransactionsInput;
  };

  readonly investorInvoiceAlertDelete: {
    readonly ID: number;
  };

  readonly messageCreate: {
    readonly data: ChatInput;
  };

  readonly messageUpdate: {
    readonly data: ChatInput;
    readonly chatID: number;
  };

  readonly updateChatsToSeen: {
    readonly sender: SENDER_TYPE;
    readonly stoID: number;
  };

  readonly updatePriceNegotiationChatsToSeen: {
    readonly counterpartID: number;
    readonly contextID: number;
    readonly context: CHAT_CONTEXT;
  };

  readonly deleteOneMessage: {
    readonly chatID: number;
  };

  readonly deleteOneMessagePermanently: {
    readonly chatID: number;
  };

  readonly deleteChatHistory: {
    readonly investorID: number;
    readonly stoID: number;
  };

  readonly deleteCustomerSupportChatHistory: {
    readonly investorID: number;
    readonly stoID: number;
  };

  readonly deleteChatHistoryPermanently: {
    readonly investorID: number;
    readonly stoID: number;
  };

  readonly deleteCustomerSupportChatHistoryPermanently: {
    readonly investorID: number;
    readonly stoID: number;
  };

  readonly deleteChatList: {
    readonly stoID: number;
  };

  readonly deleteCustomerSupportChatList: {
    readonly stoID: number;
  };

  readonly deleteChatListPermanently: {
    readonly stoID: number;
  };

  readonly deleteCustomerSupportChatListPermanently: {
    readonly stoID: number;
  };

  readonly sendEmailNotification: {
    readonly message: string;
    readonly stoID: number;
    readonly senderType: SENDER_TYPE;
    readonly investorIDs: readonly number[];
  };

  readonly addNewInvestorBankAccount: {
    readonly data: InvestorBankAccountInput;
  };

  readonly customizedComponentsInsert: {
    readonly data: ComponentCustomizationInput;
  };

  readonly customizedComponentsUpdate: {
    readonly data: ComponentCustomizationInput;
    readonly componentID: number;
  };

  readonly customizedComponentsDelete: {
    readonly componentID?: number;
  };
}
