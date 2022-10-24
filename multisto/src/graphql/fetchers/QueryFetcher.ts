import type {
  AcceptableVariables,
  UnresolvedVariables,
  FieldOptions,
  DirectiveArgs,
} from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { BuyAlertStatus } from "../enums";
import type { FEE_TYPE } from "../enums";
import type { COMMISSION_TYPE } from "../enums";
import type { FEE_BENEFICIARY } from "../enums";
import type { PAYMENT_STATUS } from "../enums";
import type { BROKER_TYPE } from "../enums";
import type { ExchangeType } from "../enums";
import type { CHAT_CONTEXT } from "../enums";
import type { CHAT_BETWEEN } from "../enums";
import type { SENDER_TYPE } from "../enums";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface QueryFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Query", T, TVariables> {
  directive(name: string, args?: DirectiveArgs): QueryFetcher<T, TVariables>;

  moonpayWidgetUrl(): QueryFetcher<
    T & { readonly moonpayWidgetUrl: string },
    TVariables & QueryArgs["moonpayWidgetUrl"]
  >;

  moonpayWidgetUrl<
    XArgs extends AcceptableVariables<QueryArgs["moonpayWidgetUrl"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly moonpayWidgetUrl: string },
    TVariables & UnresolvedVariables<XArgs, QueryArgs["moonpayWidgetUrl"]>
  >;

  moonpayWidgetUrl<
    XAlias extends string = "moonpayWidgetUrl",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"moonpayWidgetUrl", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & QueryArgs["moonpayWidgetUrl"] & XDirectiveVariables
  >;

  moonpayWidgetUrl<
    XArgs extends AcceptableVariables<QueryArgs["moonpayWidgetUrl"]>,
    XAlias extends string = "moonpayWidgetUrl",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"moonpayWidgetUrl", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayWidgetUrl"]> &
      XDirectiveVariables
  >;

  moonpayWidgetUrlAdmin(): QueryFetcher<
    T & { readonly moonpayWidgetUrlAdmin: string },
    TVariables & QueryArgs["moonpayWidgetUrlAdmin"]
  >;

  moonpayWidgetUrlAdmin<
    XArgs extends AcceptableVariables<QueryArgs["moonpayWidgetUrlAdmin"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly moonpayWidgetUrlAdmin: string },
    TVariables & UnresolvedVariables<XArgs, QueryArgs["moonpayWidgetUrlAdmin"]>
  >;

  moonpayWidgetUrlAdmin<
    XAlias extends string = "moonpayWidgetUrlAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"moonpayWidgetUrlAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & QueryArgs["moonpayWidgetUrlAdmin"] & XDirectiveVariables
  >;

  moonpayWidgetUrlAdmin<
    XArgs extends AcceptableVariables<QueryArgs["moonpayWidgetUrlAdmin"]>,
    XAlias extends string = "moonpayWidgetUrlAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"moonpayWidgetUrlAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayWidgetUrlAdmin"]> &
      XDirectiveVariables
  >;

  readonly moonpayAllTransactionsJSON: QueryFetcher<
    T & { readonly moonpayAllTransactionsJSON?: readonly object[] },
    TVariables
  >;

  "moonpayAllTransactionsJSON+"<
    XAlias extends string = "moonpayAllTransactionsJSON",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"moonpayAllTransactionsJSON", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly object[] },
    TVariables & XDirectiveVariables
  >;

  readonly "~moonpayAllTransactionsJSON": QueryFetcher<
    Omit<T, "moonpayAllTransactionsJSON">,
    TVariables
  >;

  moonpayAllTransactionsJSONAdmin(): QueryFetcher<
    T & { readonly moonpayAllTransactionsJSONAdmin?: readonly object[] },
    TVariables & QueryArgs["moonpayAllTransactionsJSONAdmin"]
  >;

  moonpayAllTransactionsJSONAdmin<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayAllTransactionsJSONAdmin"]
    >
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly moonpayAllTransactionsJSONAdmin?: readonly object[] },
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayAllTransactionsJSONAdmin"]>
  >;

  moonpayAllTransactionsJSONAdmin<
    XAlias extends string = "moonpayAllTransactionsJSONAdmin",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"moonpayAllTransactionsJSONAdmin", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly object[] },
    TVariables &
      QueryArgs["moonpayAllTransactionsJSONAdmin"] &
      XDirectiveVariables
  >;

  moonpayAllTransactionsJSONAdmin<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayAllTransactionsJSONAdmin"]
    >,
    XAlias extends string = "moonpayAllTransactionsJSONAdmin",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"moonpayAllTransactionsJSONAdmin", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly object[] },
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayAllTransactionsJSONAdmin"]> &
      XDirectiveVariables
  >;

  moonpayLastTransactionJSON<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>
  ): QueryFetcher<
    T & { readonly moonpayLastTransactionJSON?: X },
    TVariables & XVariables
  >;

  moonpayLastTransactionJSON<
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayLastTransactionJSON",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayLastTransactionJSON", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;

  moonpayLastTransactionJSONAdmin<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>
  ): QueryFetcher<
    T & { readonly moonpayLastTransactionJSONAdmin?: X },
    TVariables & XVariables & QueryArgs["moonpayLastTransactionJSONAdmin"]
  >;

  moonpayLastTransactionJSONAdmin<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayLastTransactionJSONAdmin"]
    >,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>
  ): QueryFetcher<
    T & { readonly moonpayLastTransactionJSONAdmin?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayLastTransactionJSONAdmin"]>
  >;

  moonpayLastTransactionJSONAdmin<
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayLastTransactionJSONAdmin",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayLastTransactionJSONAdmin", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["moonpayLastTransactionJSONAdmin"] &
      XDirectiveVariables
  >;

  moonpayLastTransactionJSONAdmin<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayLastTransactionJSONAdmin"]
    >,
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayLastTransactionJSONAdmin",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayLastTransactionJSONAdmin", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayLastTransactionJSONAdmin"]> &
      XDirectiveVariables
  >;

  moonpayBuyAlertTransactionReceiptUrl(): QueryFetcher<
    T & { readonly moonpayBuyAlertTransactionReceiptUrl?: string },
    TVariables & QueryArgs["moonpayBuyAlertTransactionReceiptUrl"]
  >;

  moonpayBuyAlertTransactionReceiptUrl<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayBuyAlertTransactionReceiptUrl"]
    >
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly moonpayBuyAlertTransactionReceiptUrl?: string },
    TVariables &
      UnresolvedVariables<
        XArgs,
        QueryArgs["moonpayBuyAlertTransactionReceiptUrl"]
      >
  >;

  moonpayBuyAlertTransactionReceiptUrl<
    XAlias extends string = "moonpayBuyAlertTransactionReceiptUrl",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"moonpayBuyAlertTransactionReceiptUrl", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables &
      QueryArgs["moonpayBuyAlertTransactionReceiptUrl"] &
      XDirectiveVariables
  >;

  moonpayBuyAlertTransactionReceiptUrl<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayBuyAlertTransactionReceiptUrl"]
    >,
    XAlias extends string = "moonpayBuyAlertTransactionReceiptUrl",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"moonpayBuyAlertTransactionReceiptUrl", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables &
      UnresolvedVariables<
        XArgs,
        QueryArgs["moonpayBuyAlertTransactionReceiptUrl"]
      > &
      XDirectiveVariables
  >;

  moonpayBuyAlertTransactionJSON<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>
  ): QueryFetcher<
    T & { readonly moonpayBuyAlertTransactionJSON?: X },
    TVariables & XVariables & QueryArgs["moonpayBuyAlertTransactionJSON"]
  >;

  moonpayBuyAlertTransactionJSON<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayBuyAlertTransactionJSON"]
    >,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>
  ): QueryFetcher<
    T & { readonly moonpayBuyAlertTransactionJSON?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayBuyAlertTransactionJSON"]>
  >;

  moonpayBuyAlertTransactionJSON<
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayBuyAlertTransactionJSON",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayBuyAlertTransactionJSON", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["moonpayBuyAlertTransactionJSON"] &
      XDirectiveVariables
  >;

  moonpayBuyAlertTransactionJSON<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayBuyAlertTransactionJSON"]
    >,
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayBuyAlertTransactionJSON",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayBuyAlertTransactionJSON", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayBuyAlertTransactionJSON"]> &
      XDirectiveVariables
  >;

  moonpayBuyAlertTransactionJSONAdmin<
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>
  ): QueryFetcher<
    T & { readonly moonpayBuyAlertTransactionJSONAdmin?: X },
    TVariables & XVariables & QueryArgs["moonpayBuyAlertTransactionJSONAdmin"]
  >;

  moonpayBuyAlertTransactionJSONAdmin<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayBuyAlertTransactionJSONAdmin"]
    >,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>
  ): QueryFetcher<
    T & { readonly moonpayBuyAlertTransactionJSONAdmin?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<
        XArgs,
        QueryArgs["moonpayBuyAlertTransactionJSONAdmin"]
      >
  >;

  moonpayBuyAlertTransactionJSONAdmin<
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayBuyAlertTransactionJSONAdmin",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayBuyAlertTransactionJSONAdmin", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["moonpayBuyAlertTransactionJSONAdmin"] &
      XDirectiveVariables
  >;

  moonpayBuyAlertTransactionJSONAdmin<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayBuyAlertTransactionJSONAdmin"]
    >,
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayBuyAlertTransactionJSONAdmin",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayBuyAlertTransactionJSONAdmin", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<
        XArgs,
        QueryArgs["moonpayBuyAlertTransactionJSONAdmin"]
      > &
      XDirectiveVariables
  >;

  moonpayGetTransactionJSONAdmin<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>
  ): QueryFetcher<
    T & { readonly moonpayGetTransactionJSONAdmin?: X },
    TVariables & XVariables & QueryArgs["moonpayGetTransactionJSONAdmin"]
  >;

  moonpayGetTransactionJSONAdmin<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayGetTransactionJSONAdmin"]
    >,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>
  ): QueryFetcher<
    T & { readonly moonpayGetTransactionJSONAdmin?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayGetTransactionJSONAdmin"]>
  >;

  moonpayGetTransactionJSONAdmin<
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayGetTransactionJSONAdmin",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayGetTransactionJSONAdmin", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["moonpayGetTransactionJSONAdmin"] &
      XDirectiveVariables
  >;

  moonpayGetTransactionJSONAdmin<
    XArgs extends AcceptableVariables<
      QueryArgs["moonpayGetTransactionJSONAdmin"]
    >,
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayGetTransactionJSONAdmin",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayGetTransactionJSONAdmin", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayGetTransactionJSONAdmin"]> &
      XDirectiveVariables
  >;

  moonpayGetTransactionJSON<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>
  ): QueryFetcher<
    T & { readonly moonpayGetTransactionJSON?: X },
    TVariables & XVariables & QueryArgs["moonpayGetTransactionJSON"]
  >;

  moonpayGetTransactionJSON<
    XArgs extends AcceptableVariables<QueryArgs["moonpayGetTransactionJSON"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>
  ): QueryFetcher<
    T & { readonly moonpayGetTransactionJSON?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayGetTransactionJSON"]>
  >;

  moonpayGetTransactionJSON<
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayGetTransactionJSON",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayGetTransactionJSON", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["moonpayGetTransactionJSON"] &
      XDirectiveVariables
  >;

  moonpayGetTransactionJSON<
    XArgs extends AcceptableVariables<QueryArgs["moonpayGetTransactionJSON"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayGetTransactionJSON",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"MoonpayTransactionJSON", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayGetTransactionJSON", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["moonpayGetTransactionJSON"]> &
      XDirectiveVariables
  >;

  moonpayConfig<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MoonpayConfig", X, XVariables>
  ): QueryFetcher<T & { readonly moonpayConfig: X }, TVariables & XVariables>;

  moonpayConfig<
    X extends object,
    XVariables extends object,
    XAlias extends string = "moonpayConfig",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MoonpayConfig", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"moonpayConfig", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  investorBuyAlerts<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorBuyAlerts?: readonly X[] },
    TVariables & XVariables & QueryArgs["investorBuyAlerts"]
  >;

  investorBuyAlerts<
    XArgs extends AcceptableVariables<QueryArgs["investorBuyAlerts"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorBuyAlerts?: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorBuyAlerts"]>
  >;

  investorBuyAlerts<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorBuyAlerts",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlerts", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables &
      XVariables &
      QueryArgs["investorBuyAlerts"] &
      XDirectiveVariables
  >;

  investorBuyAlerts<
    XArgs extends AcceptableVariables<QueryArgs["investorBuyAlerts"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorBuyAlerts",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlerts", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorBuyAlerts"]> &
      XDirectiveVariables
  >;

  investorBuyAlertsAdmin<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorBuyAlertsAdmin?: readonly X[] },
    TVariables & XVariables & QueryArgs["investorBuyAlertsAdmin"]
  >;

  investorBuyAlertsAdmin<
    XArgs extends AcceptableVariables<QueryArgs["investorBuyAlertsAdmin"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorBuyAlertsAdmin?: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorBuyAlertsAdmin"]>
  >;

  investorBuyAlertsAdmin<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorBuyAlertsAdmin",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertsAdmin", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables &
      XVariables &
      QueryArgs["investorBuyAlertsAdmin"] &
      XDirectiveVariables
  >;

  investorBuyAlertsAdmin<
    XArgs extends AcceptableVariables<QueryArgs["investorBuyAlertsAdmin"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorBuyAlertsAdmin",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorBuyAlertsAdmin", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorBuyAlertsAdmin"]> &
      XDirectiveVariables
  >;

  investorDepositHistory<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorDepositAlert", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorDepositHistory: readonly X[] },
    TVariables & XVariables & QueryArgs["investorDepositHistory"]
  >;

  investorDepositHistory<
    XArgs extends AcceptableVariables<QueryArgs["investorDepositHistory"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorDepositAlert", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorDepositHistory: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorDepositHistory"]>
  >;

  investorDepositHistory<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorDepositHistory",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorDepositAlert", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorDepositHistory", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["investorDepositHistory"] &
      XDirectiveVariables
  >;

  investorDepositHistory<
    XArgs extends AcceptableVariables<QueryArgs["investorDepositHistory"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorDepositHistory",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorDepositAlert", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorDepositHistory", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorDepositHistory"]> &
      XDirectiveVariables
  >;

  investorInvestingEntities<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestingEntity", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorInvestingEntities: readonly X[] },
    TVariables & XVariables
  >;

  investorInvestingEntities<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorInvestingEntities",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestingEntity", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntities", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  investorInvestingEntity<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestingEntity", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorInvestingEntity: X },
    TVariables & XVariables & QueryArgs["investorInvestingEntity"]
  >;

  investorInvestingEntity<
    XArgs extends AcceptableVariables<QueryArgs["investorInvestingEntity"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestingEntity", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorInvestingEntity: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorInvestingEntity"]>
  >;

  investorInvestingEntity<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorInvestingEntity",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestingEntity", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntity", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      QueryArgs["investorInvestingEntity"] &
      XDirectiveVariables
  >;

  investorInvestingEntity<
    XArgs extends AcceptableVariables<QueryArgs["investorInvestingEntity"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorInvestingEntity",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestingEntity", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntity", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorInvestingEntity"]> &
      XDirectiveVariables
  >;

  investorInvestingEntityTypes<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestingEntityTypes", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorInvestingEntityTypes: readonly X[] },
    TVariables & XVariables
  >;

  investorInvestingEntityTypes<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorInvestingEntityTypes",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestingEntityTypes", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorInvestingEntityTypes", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  getAllUnConfirmedEntitiesforStoAdmin<
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<"InvestingEntity", X, XVariables>
  ): QueryFetcher<
    T & { readonly getAllUnConfirmedEntitiesforStoAdmin: readonly X[] },
    TVariables & XVariables
  >;

  getAllUnConfirmedEntitiesforStoAdmin<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getAllUnConfirmedEntitiesforStoAdmin",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestingEntity", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getAllUnConfirmedEntitiesforStoAdmin", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  investorUserVoting<X extends object, XVariables extends object>(
    child: ObjectFetcher<"VotingUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorUserVoting: readonly X[] },
    TVariables & XVariables & QueryArgs["investorUserVoting"]
  >;

  investorUserVoting<
    XArgs extends AcceptableVariables<QueryArgs["investorUserVoting"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"VotingUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorUserVoting: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorUserVoting"]>
  >;

  investorUserVoting<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorUserVoting",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"VotingUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorUserVoting", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["investorUserVoting"] &
      XDirectiveVariables
  >;

  investorUserVoting<
    XArgs extends AcceptableVariables<QueryArgs["investorUserVoting"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorUserVoting",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"VotingUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorUserVoting", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorUserVoting"]> &
      XDirectiveVariables
  >;

  investorAllMeeting<X extends object, XVariables extends object>(
    child: ObjectFetcher<"AllMeeting", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorAllMeeting: X },
    TVariables & XVariables & QueryArgs["investorAllMeeting"]
  >;

  investorAllMeeting<
    XArgs extends AcceptableVariables<QueryArgs["investorAllMeeting"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"AllMeeting", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorAllMeeting: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorAllMeeting"]>
  >;

  investorAllMeeting<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorAllMeeting",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"AllMeeting", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorAllMeeting", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      QueryArgs["investorAllMeeting"] &
      XDirectiveVariables
  >;

  investorAllMeeting<
    XArgs extends AcceptableVariables<QueryArgs["investorAllMeeting"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorAllMeeting",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"AllMeeting", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorAllMeeting", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorAllMeeting"]> &
      XDirectiveVariables
  >;

  investorMeeting<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Meeting", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorMeeting?: X },
    TVariables & XVariables & QueryArgs["investorMeeting"]
  >;

  investorMeeting<
    XArgs extends AcceptableVariables<QueryArgs["investorMeeting"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Meeting", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorMeeting?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorMeeting"]>
  >;

  investorMeeting<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorMeeting",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Meeting", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorMeeting", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs["investorMeeting"] & XDirectiveVariables
  >;

  investorMeeting<
    XArgs extends AcceptableVariables<QueryArgs["investorMeeting"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorMeeting",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Meeting", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorMeeting", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorMeeting"]> &
      XDirectiveVariables
  >;

  investorPoll<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Poll", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorPoll: X },
    TVariables & XVariables & QueryArgs["investorPoll"]
  >;

  investorPoll<
    XArgs extends AcceptableVariables<QueryArgs["investorPoll"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Poll", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorPoll: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorPoll"]>
  >;

  investorPoll<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorPoll",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Poll", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorPoll", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs["investorPoll"] & XDirectiveVariables
  >;

  investorPoll<
    XArgs extends AcceptableVariables<QueryArgs["investorPoll"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorPoll",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Poll", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorPoll", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorPoll"]> &
      XDirectiveVariables
  >;

  investorVotingUserData<X extends object, XVariables extends object>(
    child: ObjectFetcher<"VotingUserData", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorVotingUserData?: X },
    TVariables & XVariables & QueryArgs["investorVotingUserData"]
  >;

  investorVotingUserData<
    XArgs extends AcceptableVariables<QueryArgs["investorVotingUserData"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"VotingUserData", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorVotingUserData?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorVotingUserData"]>
  >;

  investorVotingUserData<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorVotingUserData",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"VotingUserData", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorVotingUserData", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["investorVotingUserData"] &
      XDirectiveVariables
  >;

  investorVotingUserData<
    XArgs extends AcceptableVariables<QueryArgs["investorVotingUserData"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorVotingUserData",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"VotingUserData", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorVotingUserData", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorVotingUserData"]> &
      XDirectiveVariables
  >;

  investorVotingOptions<X extends object, XVariables extends object>(
    child: ObjectFetcher<"VotingOption", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorVotingOptions: readonly X[] },
    TVariables & XVariables & QueryArgs["investorVotingOptions"]
  >;

  investorVotingOptions<
    XArgs extends AcceptableVariables<QueryArgs["investorVotingOptions"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"VotingOption", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorVotingOptions: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorVotingOptions"]>
  >;

  investorVotingOptions<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorVotingOptions",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"VotingOption", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorVotingOptions", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["investorVotingOptions"] &
      XDirectiveVariables
  >;

  investorVotingOptions<
    XArgs extends AcceptableVariables<QueryArgs["investorVotingOptions"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorVotingOptions",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"VotingOption", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorVotingOptions", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorVotingOptions"]> &
      XDirectiveVariables
  >;

  investorVotingDocument<X extends object, XVariables extends object>(
    child: ObjectFetcher<"VotingDocuments", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorVotingDocument?: X },
    TVariables & XVariables & QueryArgs["investorVotingDocument"]
  >;

  investorVotingDocument<
    XArgs extends AcceptableVariables<QueryArgs["investorVotingDocument"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"VotingDocuments", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorVotingDocument?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorVotingDocument"]>
  >;

  investorVotingDocument<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorVotingDocument",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"VotingDocuments", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorVotingDocument", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["investorVotingDocument"] &
      XDirectiveVariables
  >;

  investorVotingDocument<
    XArgs extends AcceptableVariables<QueryArgs["investorVotingDocument"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorVotingDocument",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"VotingDocuments", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorVotingDocument", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorVotingDocument"]> &
      XDirectiveVariables
  >;

  getMercuryRecipient<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MercuryRecipient", X, XVariables>
  ): QueryFetcher<
    T & { readonly getMercuryRecipient?: X },
    TVariables & XVariables
  >;

  getMercuryRecipient<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getMercuryRecipient",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MercuryRecipient", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getMercuryRecipient", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;

  getMercuryAccountInfo<X extends object, XVariables extends object>(
    child: ObjectFetcher<"MercuryInfo", X, XVariables>
  ): QueryFetcher<
    T & { readonly getMercuryAccountInfo?: X },
    TVariables & XVariables
  >;

  getMercuryAccountInfo<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getMercuryAccountInfo",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"MercuryInfo", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getMercuryAccountInfo", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly countries: QueryFetcher<
    T & { readonly countries: readonly string[] },
    TVariables
  >;

  "countries+"<
    XAlias extends string = "countries",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"countries", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly string[] }
        : { readonly [key in XAlias]: readonly string[] }),
    TVariables & XDirectiveVariables
  >;

  readonly "~countries": QueryFetcher<Omit<T, "countries">, TVariables>;

  investorAppParameters<X extends object, XVariables extends object>(
    child: ObjectFetcher<"AppParameters", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorAppParameters: X },
    TVariables & XVariables
  >;

  investorAppParameters<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorAppParameters",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"AppParameters", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorAppParameters", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  findCurrency<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Currency", X, XVariables>
  ): QueryFetcher<
    T & { readonly findCurrency?: X },
    TVariables & XVariables & QueryArgs["findCurrency"]
  >;

  findCurrency<
    XArgs extends AcceptableVariables<QueryArgs["findCurrency"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Currency", X, XVariables>
  ): QueryFetcher<
    T & { readonly findCurrency?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findCurrency"]>
  >;

  findCurrency<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findCurrency",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Currency", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findCurrency", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs["findCurrency"] & XDirectiveVariables
  >;

  findCurrency<
    XArgs extends AcceptableVariables<QueryArgs["findCurrency"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "findCurrency",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Currency", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findCurrency", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findCurrency"]> &
      XDirectiveVariables
  >;

  findAllCurrencies<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Currency", X, XVariables>
  ): QueryFetcher<
    T & { readonly findAllCurrencies?: readonly X[] },
    TVariables & XVariables
  >;

  findAllCurrencies<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findAllCurrencies",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Currency", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findAllCurrencies", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >;

  commentableDocuments<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Document", X, XVariables>
  ): QueryFetcher<
    T & { readonly commentableDocuments: readonly X[] },
    TVariables & XVariables
  >;

  commentableDocuments<
    X extends object,
    XVariables extends object,
    XAlias extends string = "commentableDocuments",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Document", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"commentableDocuments", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  offeredDocuments<X extends object, XVariables extends object>(
    child: ObjectFetcher<"OfferedDocument", X, XVariables>
  ): QueryFetcher<
    T & { readonly offeredDocuments: readonly X[] },
    TVariables & XVariables
  >;

  offeredDocuments<
    X extends object,
    XVariables extends object,
    XAlias extends string = "offeredDocuments",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"OfferedDocument", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"offeredDocuments", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  offeredDocument<X extends object, XVariables extends object>(
    child: ObjectFetcher<"OfferedDocument", X, XVariables>
  ): QueryFetcher<
    T & { readonly offeredDocument: X },
    TVariables & XVariables & QueryArgs["offeredDocument"]
  >;

  offeredDocument<
    XArgs extends AcceptableVariables<QueryArgs["offeredDocument"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"OfferedDocument", X, XVariables>
  ): QueryFetcher<
    T & { readonly offeredDocument: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["offeredDocument"]>
  >;

  offeredDocument<
    X extends object,
    XVariables extends object,
    XAlias extends string = "offeredDocument",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"OfferedDocument", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"offeredDocument", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs["offeredDocument"] & XDirectiveVariables
  >;

  offeredDocument<
    XArgs extends AcceptableVariables<QueryArgs["offeredDocument"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "offeredDocument",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"OfferedDocument", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"offeredDocument", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["offeredDocument"]> &
      XDirectiveVariables
  >;

  document<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Document", X, XVariables>
  ): QueryFetcher<
    T & { readonly document?: X },
    TVariables & XVariables & QueryArgs["document"]
  >;

  document<
    XArgs extends AcceptableVariables<QueryArgs["document"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Document", X, XVariables>
  ): QueryFetcher<
    T & { readonly document?: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs["document"]>
  >;

  document<
    X extends object,
    XVariables extends object,
    XAlias extends string = "document",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Document", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"document", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs["document"] & XDirectiveVariables
  >;

  document<
    XArgs extends AcceptableVariables<QueryArgs["document"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "document",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Document", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"document", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["document"]> &
      XDirectiveVariables
  >;

  submittedDocuments<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DocumentUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly submittedDocuments: readonly X[] },
    TVariables & XVariables & QueryArgs["submittedDocuments"]
  >;

  submittedDocuments<
    XArgs extends AcceptableVariables<QueryArgs["submittedDocuments"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly submittedDocuments: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["submittedDocuments"]>
  >;

  submittedDocuments<
    X extends object,
    XVariables extends object,
    XAlias extends string = "submittedDocuments",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DocumentUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"submittedDocuments", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["submittedDocuments"] &
      XDirectiveVariables
  >;

  submittedDocuments<
    XArgs extends AcceptableVariables<QueryArgs["submittedDocuments"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "submittedDocuments",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"submittedDocuments", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["submittedDocuments"]> &
      XDirectiveVariables
  >;

  submittedDocument<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DocumentUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly submittedDocument?: X },
    TVariables & XVariables & QueryArgs["submittedDocument"]
  >;

  submittedDocument<
    XArgs extends AcceptableVariables<QueryArgs["submittedDocument"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly submittedDocument?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["submittedDocument"]>
  >;

  submittedDocument<
    X extends object,
    XVariables extends object,
    XAlias extends string = "submittedDocument",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DocumentUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"submittedDocument", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["submittedDocument"] &
      XDirectiveVariables
  >;

  submittedDocument<
    XArgs extends AcceptableVariables<QueryArgs["submittedDocument"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "submittedDocument",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"submittedDocument", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["submittedDocument"]> &
      XDirectiveVariables
  >;

  unfinishedDocument<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DocumentUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly unfinishedDocument?: X },
    TVariables & XVariables & QueryArgs["unfinishedDocument"]
  >;

  unfinishedDocument<
    XArgs extends AcceptableVariables<QueryArgs["unfinishedDocument"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly unfinishedDocument?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["unfinishedDocument"]>
  >;

  unfinishedDocument<
    X extends object,
    XVariables extends object,
    XAlias extends string = "unfinishedDocument",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DocumentUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"unfinishedDocument", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["unfinishedDocument"] &
      XDirectiveVariables
  >;

  unfinishedDocument<
    XArgs extends AcceptableVariables<QueryArgs["unfinishedDocument"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "unfinishedDocument",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"unfinishedDocument", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["unfinishedDocument"]> &
      XDirectiveVariables
  >;

  documentFields<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DocumentField", X, XVariables>
  ): QueryFetcher<
    T & { readonly documentFields: readonly X[] },
    TVariables & XVariables & QueryArgs["documentFields"]
  >;

  documentFields<
    XArgs extends AcceptableVariables<QueryArgs["documentFields"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentField", X, XVariables>
  ): QueryFetcher<
    T & { readonly documentFields: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["documentFields"]>
  >;

  documentFields<
    X extends object,
    XVariables extends object,
    XAlias extends string = "documentFields",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DocumentField", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"documentFields", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & QueryArgs["documentFields"] & XDirectiveVariables
  >;

  documentFields<
    XArgs extends AcceptableVariables<QueryArgs["documentFields"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "documentFields",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentField", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"documentFields", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["documentFields"]> &
      XDirectiveVariables
  >;

  sharePurchaseDocuments<X extends object, XVariables extends object>(
    child: ObjectFetcher<"SharePurchaseDocument", X, XVariables>
  ): QueryFetcher<
    T & { readonly sharePurchaseDocuments: readonly X[] },
    TVariables & XVariables & QueryArgs["sharePurchaseDocuments"]
  >;

  sharePurchaseDocuments<
    XArgs extends AcceptableVariables<QueryArgs["sharePurchaseDocuments"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"SharePurchaseDocument", X, XVariables>
  ): QueryFetcher<
    T & { readonly sharePurchaseDocuments: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["sharePurchaseDocuments"]>
  >;

  sharePurchaseDocuments<
    X extends object,
    XVariables extends object,
    XAlias extends string = "sharePurchaseDocuments",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"SharePurchaseDocument", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"sharePurchaseDocuments", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["sharePurchaseDocuments"] &
      XDirectiveVariables
  >;

  sharePurchaseDocuments<
    XArgs extends AcceptableVariables<QueryArgs["sharePurchaseDocuments"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "sharePurchaseDocuments",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"SharePurchaseDocument", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"sharePurchaseDocuments", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["sharePurchaseDocuments"]> &
      XDirectiveVariables
  >;

  sharePurchaseDocument<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DocumentUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly sharePurchaseDocument?: X },
    TVariables & XVariables & QueryArgs["sharePurchaseDocument"]
  >;

  sharePurchaseDocument<
    XArgs extends AcceptableVariables<QueryArgs["sharePurchaseDocument"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly sharePurchaseDocument?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["sharePurchaseDocument"]>
  >;

  sharePurchaseDocument<
    X extends object,
    XVariables extends object,
    XAlias extends string = "sharePurchaseDocument",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DocumentUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"sharePurchaseDocument", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["sharePurchaseDocument"] &
      XDirectiveVariables
  >;

  sharePurchaseDocument<
    XArgs extends AcceptableVariables<QueryArgs["sharePurchaseDocument"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "sharePurchaseDocument",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"sharePurchaseDocument", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["sharePurchaseDocument"]> &
      XDirectiveVariables
  >;

  getPrefilledDocumentValues<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DocumentUserFieldValue", X, XVariables>
  ): QueryFetcher<
    T & { readonly getPrefilledDocumentValues: readonly X[] },
    TVariables & XVariables & QueryArgs["getPrefilledDocumentValues"]
  >;

  getPrefilledDocumentValues<
    XArgs extends AcceptableVariables<QueryArgs["getPrefilledDocumentValues"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentUserFieldValue", X, XVariables>
  ): QueryFetcher<
    T & { readonly getPrefilledDocumentValues: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getPrefilledDocumentValues"]>
  >;

  getPrefilledDocumentValues<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getPrefilledDocumentValues",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DocumentUserFieldValue", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getPrefilledDocumentValues", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["getPrefilledDocumentValues"] &
      XDirectiveVariables
  >;

  getPrefilledDocumentValues<
    XArgs extends AcceptableVariables<QueryArgs["getPrefilledDocumentValues"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getPrefilledDocumentValues",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentUserFieldValue", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getPrefilledDocumentValues", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getPrefilledDocumentValues"]> &
      XDirectiveVariables
  >;

  getDocuSignUrl(): QueryFetcher<
    T & { readonly getDocuSignUrl: string },
    TVariables & QueryArgs["getDocuSignUrl"]
  >;

  getDocuSignUrl<
    XArgs extends AcceptableVariables<QueryArgs["getDocuSignUrl"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly getDocuSignUrl: string },
    TVariables & UnresolvedVariables<XArgs, QueryArgs["getDocuSignUrl"]>
  >;

  getDocuSignUrl<
    XAlias extends string = "getDocuSignUrl",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"getDocuSignUrl", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & QueryArgs["getDocuSignUrl"] & XDirectiveVariables
  >;

  getDocuSignUrl<
    XArgs extends AcceptableVariables<QueryArgs["getDocuSignUrl"]>,
    XAlias extends string = "getDocuSignUrl",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"getDocuSignUrl", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["getDocuSignUrl"]> &
      XDirectiveVariables
  >;

  sendHelloSignTemplateSignRequest(): QueryFetcher<
    T & { readonly sendHelloSignTemplateSignRequest: string },
    TVariables & QueryArgs["sendHelloSignTemplateSignRequest"]
  >;

  sendHelloSignTemplateSignRequest<
    XArgs extends AcceptableVariables<
      QueryArgs["sendHelloSignTemplateSignRequest"]
    >
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly sendHelloSignTemplateSignRequest: string },
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["sendHelloSignTemplateSignRequest"]>
  >;

  sendHelloSignTemplateSignRequest<
    XAlias extends string = "sendHelloSignTemplateSignRequest",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sendHelloSignTemplateSignRequest", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      QueryArgs["sendHelloSignTemplateSignRequest"] &
      XDirectiveVariables
  >;

  sendHelloSignTemplateSignRequest<
    XArgs extends AcceptableVariables<
      QueryArgs["sendHelloSignTemplateSignRequest"]
    >,
    XAlias extends string = "sendHelloSignTemplateSignRequest",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"sendHelloSignTemplateSignRequest", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        QueryArgs["sendHelloSignTemplateSignRequest"]
      > &
      XDirectiveVariables
  >;

  comments<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DocumentComment", X, XVariables>
  ): QueryFetcher<
    T & { readonly comments: readonly X[] },
    TVariables & XVariables & QueryArgs["comments"]
  >;

  comments<
    XArgs extends AcceptableVariables<QueryArgs["comments"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentComment", X, XVariables>
  ): QueryFetcher<
    T & { readonly comments: readonly X[] },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs["comments"]>
  >;

  comments<
    X extends object,
    XVariables extends object,
    XAlias extends string = "comments",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DocumentComment", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"comments", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & QueryArgs["comments"] & XDirectiveVariables
  >;

  comments<
    XArgs extends AcceptableVariables<QueryArgs["comments"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "comments",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"DocumentComment", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"comments", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["comments"]> &
      XDirectiveVariables
  >;

  downloadSignedHelloSign(): QueryFetcher<
    T & { readonly downloadSignedHelloSign: string },
    TVariables & QueryArgs["downloadSignedHelloSign"]
  >;

  downloadSignedHelloSign<
    XArgs extends AcceptableVariables<QueryArgs["downloadSignedHelloSign"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly downloadSignedHelloSign: string },
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["downloadSignedHelloSign"]>
  >;

  downloadSignedHelloSign<
    XAlias extends string = "downloadSignedHelloSign",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"downloadSignedHelloSign", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & QueryArgs["downloadSignedHelloSign"] & XDirectiveVariables
  >;

  downloadSignedHelloSign<
    XArgs extends AcceptableVariables<QueryArgs["downloadSignedHelloSign"]>,
    XAlias extends string = "downloadSignedHelloSign",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"downloadSignedHelloSign", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["downloadSignedHelloSign"]> &
      XDirectiveVariables
  >;

  downloadSignedDocuSign(): QueryFetcher<
    T & { readonly downloadSignedDocuSign: string },
    TVariables & QueryArgs["downloadSignedDocuSign"]
  >;

  downloadSignedDocuSign<
    XArgs extends AcceptableVariables<QueryArgs["downloadSignedDocuSign"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly downloadSignedDocuSign: string },
    TVariables & UnresolvedVariables<XArgs, QueryArgs["downloadSignedDocuSign"]>
  >;

  downloadSignedDocuSign<
    XAlias extends string = "downloadSignedDocuSign",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"downloadSignedDocuSign", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & QueryArgs["downloadSignedDocuSign"] & XDirectiveVariables
  >;

  downloadSignedDocuSign<
    XArgs extends AcceptableVariables<QueryArgs["downloadSignedDocuSign"]>,
    XAlias extends string = "downloadSignedDocuSign",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"downloadSignedDocuSign", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["downloadSignedDocuSign"]> &
      XDirectiveVariables
  >;

  investorInbox<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Inbox", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorInbox?: X },
    TVariables & XVariables & QueryArgs["investorInbox"]
  >;

  investorInbox<
    XArgs extends AcceptableVariables<QueryArgs["investorInbox"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Inbox", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorInbox?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorInbox"]>
  >;

  investorInbox<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorInbox",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Inbox", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorInbox", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs["investorInbox"] & XDirectiveVariables
  >;

  investorInbox<
    XArgs extends AcceptableVariables<QueryArgs["investorInbox"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorInbox",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Inbox", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorInbox", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorInbox"]> &
      XDirectiveVariables
  >;

  investorInboxes<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Inbox", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorInboxes?: readonly X[] },
    TVariables & XVariables & QueryArgs["investorInboxes"]
  >;

  investorInboxes<
    XArgs extends AcceptableVariables<QueryArgs["investorInboxes"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Inbox", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorInboxes?: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorInboxes"]>
  >;

  investorInboxes<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorInboxes",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Inbox", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorInboxes", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & QueryArgs["investorInboxes"] & XDirectiveVariables
  >;

  investorInboxes<
    XArgs extends AcceptableVariables<QueryArgs["investorInboxes"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorInboxes",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Inbox", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorInboxes", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorInboxes"]> &
      XDirectiveVariables
  >;

  investorUser<X extends object, XVariables extends object>(
    child: ObjectFetcher<"User", X, XVariables>
  ): QueryFetcher<T & { readonly investorUser?: X }, TVariables & XVariables>;

  investorUser<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorUser",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"User", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorUser", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;

  unverifiedRegistrations<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Register", X, XVariables>
  ): QueryFetcher<
    T & { readonly unverifiedRegistrations: readonly X[] },
    TVariables & XVariables & QueryArgs["unverifiedRegistrations"]
  >;

  unverifiedRegistrations<
    XArgs extends AcceptableVariables<QueryArgs["unverifiedRegistrations"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Register", X, XVariables>
  ): QueryFetcher<
    T & { readonly unverifiedRegistrations: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["unverifiedRegistrations"]>
  >;

  unverifiedRegistrations<
    X extends object,
    XVariables extends object,
    XAlias extends string = "unverifiedRegistrations",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Register", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"unverifiedRegistrations", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["unverifiedRegistrations"] &
      XDirectiveVariables
  >;

  unverifiedRegistrations<
    XArgs extends AcceptableVariables<QueryArgs["unverifiedRegistrations"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "unverifiedRegistrations",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Register", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"unverifiedRegistrations", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["unverifiedRegistrations"]> &
      XDirectiveVariables
  >;

  readonly getInvitationLink: QueryFetcher<
    T & { readonly getInvitationLink: string },
    TVariables
  >;

  "getInvitationLink+"<
    XAlias extends string = "getInvitationLink",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"getInvitationLink", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~getInvitationLink": QueryFetcher<
    Omit<T, "getInvitationLink">,
    TVariables
  >;

  investorBalance<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorBalance", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorBalance?: X },
    TVariables & XVariables & QueryArgs["investorBalance"]
  >;

  investorBalance<
    XArgs extends AcceptableVariables<QueryArgs["investorBalance"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorBalance", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorBalance?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorBalance"]>
  >;

  investorBalance<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorBalance",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorBalance", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorBalance", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs["investorBalance"] & XDirectiveVariables
  >;

  investorBalance<
    XArgs extends AcceptableVariables<QueryArgs["investorBalance"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorBalance",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorBalance", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorBalance", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorBalance"]> &
      XDirectiveVariables
  >;

  investorBalances<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorBalance", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorBalances: readonly X[] },
    TVariables & XVariables & QueryArgs["investorBalances"]
  >;

  investorBalances<
    XArgs extends AcceptableVariables<QueryArgs["investorBalances"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorBalance", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorBalances: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorBalances"]>
  >;

  investorBalances<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorBalances",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorBalance", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorBalances", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["investorBalances"] &
      XDirectiveVariables
  >;

  investorBalances<
    XArgs extends AcceptableVariables<QueryArgs["investorBalances"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorBalances",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorBalance", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorBalances", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorBalances"]> &
      XDirectiveVariables
  >;

  portfolioValue(): QueryFetcher<
    T & { readonly portfolioValue: number },
    TVariables & QueryArgs["portfolioValue"]
  >;

  portfolioValue<
    XArgs extends AcceptableVariables<QueryArgs["portfolioValue"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly portfolioValue: number },
    TVariables & UnresolvedVariables<XArgs, QueryArgs["portfolioValue"]>
  >;

  portfolioValue<
    XAlias extends string = "portfolioValue",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"portfolioValue", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & QueryArgs["portfolioValue"] & XDirectiveVariables
  >;

  portfolioValue<
    XArgs extends AcceptableVariables<QueryArgs["portfolioValue"]>,
    XAlias extends string = "portfolioValue",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"portfolioValue", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["portfolioValue"]> &
      XDirectiveVariables
  >;

  investorSto<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorSto", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorSto: X },
    TVariables & XVariables & QueryArgs["investorSto"]
  >;

  investorSto<
    XArgs extends AcceptableVariables<QueryArgs["investorSto"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorSto", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorSto: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorSto"]>
  >;

  investorSto<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorSto",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorSto", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorSto", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & QueryArgs["investorSto"] & XDirectiveVariables
  >;

  investorSto<
    XArgs extends AcceptableVariables<QueryArgs["investorSto"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorSto",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorSto", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorSto", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorSto"]> &
      XDirectiveVariables
  >;

  readonly investorKyc: QueryFetcher<
    T & { readonly investorKyc: object },
    TVariables
  >;

  "investorKyc+"<
    XAlias extends string = "investorKyc",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorKyc", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: object }
        : { readonly [key in XAlias]: object }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorKyc": QueryFetcher<Omit<T, "investorKyc">, TVariables>;

  kyc<X extends object, XVariables extends object>(
    child: ObjectFetcher<"KycPage", X, XVariables>
  ): QueryFetcher<T & { readonly kyc: readonly X[] }, TVariables & XVariables>;

  kyc<
    X extends object,
    XVariables extends object,
    XAlias extends string = "kyc",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"KycPage", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"kyc", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  investorPaymentChannels<X extends object, XVariables extends object>(
    child: ObjectFetcher<"PaymentChannel", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorPaymentChannels: readonly X[] },
    TVariables & XVariables & QueryArgs["investorPaymentChannels"]
  >;

  investorPaymentChannels<
    XArgs extends AcceptableVariables<QueryArgs["investorPaymentChannels"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"PaymentChannel", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorPaymentChannels: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorPaymentChannels"]>
  >;

  investorPaymentChannels<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorPaymentChannels",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"PaymentChannel", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorPaymentChannels", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["investorPaymentChannels"] &
      XDirectiveVariables
  >;

  investorPaymentChannels<
    XArgs extends AcceptableVariables<QueryArgs["investorPaymentChannels"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorPaymentChannels",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"PaymentChannel", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorPaymentChannels", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorPaymentChannels"]> &
      XDirectiveVariables
  >;

  investorPublicKeys<X extends object, XVariables extends object>(
    child: ObjectFetcher<"PublicKey", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorPublicKeys?: readonly X[] },
    TVariables & XVariables
  >;

  investorPublicKeys<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorPublicKeys",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"PublicKey", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorPublicKeys", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >;

  isInvestorWhiteListed(): QueryFetcher<
    T & { readonly isInvestorWhiteListed: boolean },
    TVariables & QueryArgs["isInvestorWhiteListed"]
  >;

  isInvestorWhiteListed<
    XArgs extends AcceptableVariables<QueryArgs["isInvestorWhiteListed"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly isInvestorWhiteListed: boolean },
    TVariables & UnresolvedVariables<XArgs, QueryArgs["isInvestorWhiteListed"]>
  >;

  isInvestorWhiteListed<
    XAlias extends string = "isInvestorWhiteListed",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isInvestorWhiteListed", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & QueryArgs["isInvestorWhiteListed"] & XDirectiveVariables
  >;

  isInvestorWhiteListed<
    XArgs extends AcceptableVariables<QueryArgs["isInvestorWhiteListed"]>,
    XAlias extends string = "isInvestorWhiteListed",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"isInvestorWhiteListed", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["isInvestorWhiteListed"]> &
      XDirectiveVariables
  >;

  findShareTypes<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ShareType", X, XVariables>
  ): QueryFetcher<
    T & { readonly findShareTypes: readonly X[] },
    TVariables & XVariables & QueryArgs["findShareTypes"]
  >;

  findShareTypes<
    XArgs extends AcceptableVariables<QueryArgs["findShareTypes"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"ShareType", X, XVariables>
  ): QueryFetcher<
    T & { readonly findShareTypes: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findShareTypes"]>
  >;

  findShareTypes<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findShareTypes",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ShareType", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findShareTypes", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & QueryArgs["findShareTypes"] & XDirectiveVariables
  >;

  findShareTypes<
    XArgs extends AcceptableVariables<QueryArgs["findShareTypes"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "findShareTypes",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"ShareType", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findShareTypes", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findShareTypes"]> &
      XDirectiveVariables
  >;

  findAllShareTypes<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ShareType", X, XVariables>
  ): QueryFetcher<
    T & { readonly findAllShareTypes: readonly X[] },
    TVariables & XVariables
  >;

  findAllShareTypes<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findAllShareTypes",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ShareType", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findAllShareTypes", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  findShareHistoricalValues<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ShareHistoricalData", X, XVariables>
  ): QueryFetcher<
    T & { readonly findShareHistoricalValues: readonly X[] },
    TVariables & XVariables & QueryArgs["findShareHistoricalValues"]
  >;

  findShareHistoricalValues<
    XArgs extends AcceptableVariables<QueryArgs["findShareHistoricalValues"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"ShareHistoricalData", X, XVariables>
  ): QueryFetcher<
    T & { readonly findShareHistoricalValues: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findShareHistoricalValues"]>
  >;

  findShareHistoricalValues<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findShareHistoricalValues",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ShareHistoricalData", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findShareHistoricalValues", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["findShareHistoricalValues"] &
      XDirectiveVariables
  >;

  findShareHistoricalValues<
    XArgs extends AcceptableVariables<QueryArgs["findShareHistoricalValues"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "findShareHistoricalValues",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"ShareHistoricalData", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findShareHistoricalValues", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findShareHistoricalValues"]> &
      XDirectiveVariables
  >;

  findInvestorDividendPayouts<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DividendInvestorPayout", X, XVariables>
  ): QueryFetcher<
    T & { readonly findInvestorDividendPayouts: readonly X[] },
    TVariables & XVariables
  >;

  findInvestorDividendPayouts<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findInvestorDividendPayouts",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DividendInvestorPayout", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findInvestorDividendPayouts", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  investorShare<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Share", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorShare?: X },
    TVariables & XVariables & QueryArgs["investorShare"]
  >;

  investorShare<
    XArgs extends AcceptableVariables<QueryArgs["investorShare"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Share", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorShare?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorShare"]>
  >;

  investorShare<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorShare",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Share", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorShare", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs["investorShare"] & XDirectiveVariables
  >;

  investorShare<
    XArgs extends AcceptableVariables<QueryArgs["investorShare"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorShare",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Share", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorShare", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorShare"]> &
      XDirectiveVariables
  >;

  investorShareBalance<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Share", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorShareBalance: readonly X[] },
    TVariables & XVariables & QueryArgs["investorShareBalance"]
  >;

  investorShareBalance<
    XArgs extends AcceptableVariables<QueryArgs["investorShareBalance"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Share", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorShareBalance: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorShareBalance"]>
  >;

  investorShareBalance<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorShareBalance",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Share", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorShareBalance", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["investorShareBalance"] &
      XDirectiveVariables
  >;

  investorShareBalance<
    XArgs extends AcceptableVariables<QueryArgs["investorShareBalance"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorShareBalance",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Share", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorShareBalance", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorShareBalance"]> &
      XDirectiveVariables
  >;

  shareTypeShares<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Share", X, XVariables>
  ): QueryFetcher<
    T & { readonly shareTypeShares: readonly X[] },
    TVariables & XVariables & QueryArgs["shareTypeShares"]
  >;

  shareTypeShares<
    XArgs extends AcceptableVariables<QueryArgs["shareTypeShares"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Share", X, XVariables>
  ): QueryFetcher<
    T & { readonly shareTypeShares: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["shareTypeShares"]>
  >;

  shareTypeShares<
    X extends object,
    XVariables extends object,
    XAlias extends string = "shareTypeShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Share", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"shareTypeShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & QueryArgs["shareTypeShares"] & XDirectiveVariables
  >;

  shareTypeShares<
    XArgs extends AcceptableVariables<QueryArgs["shareTypeShares"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "shareTypeShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Share", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"shareTypeShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["shareTypeShares"]> &
      XDirectiveVariables
  >;

  investorShares<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Share", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorShares: readonly X[] },
    TVariables & XVariables & QueryArgs["investorShares"]
  >;

  investorShares<
    XArgs extends AcceptableVariables<QueryArgs["investorShares"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Share", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorShares: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorShares"]>
  >;

  investorShares<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Share", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & QueryArgs["investorShares"] & XDirectiveVariables
  >;

  investorShares<
    XArgs extends AcceptableVariables<QueryArgs["investorShares"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorShares",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Share", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorShares", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorShares"]> &
      XDirectiveVariables
  >;

  findSto<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Sto", X, XVariables>
  ): QueryFetcher<
    T & { readonly findSto?: X },
    TVariables & XVariables & QueryArgs["findSto"]
  >;

  findSto<
    XArgs extends AcceptableVariables<QueryArgs["findSto"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Sto", X, XVariables>
  ): QueryFetcher<
    T & { readonly findSto?: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs["findSto"]>
  >;

  findSto<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findSto",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Sto", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findSto", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs["findSto"] & XDirectiveVariables
  >;

  findSto<
    XArgs extends AcceptableVariables<QueryArgs["findSto"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "findSto",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Sto", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findSto", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findSto"]> &
      XDirectiveVariables
  >;

  publicSto<X extends object, XVariables extends object>(
    child: ObjectFetcher<"PublicSto", X, XVariables>
  ): QueryFetcher<
    T & { readonly publicSto?: X },
    TVariables & XVariables & QueryArgs["publicSto"]
  >;

  publicSto<
    XArgs extends AcceptableVariables<QueryArgs["publicSto"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"PublicSto", X, XVariables>
  ): QueryFetcher<
    T & { readonly publicSto?: X },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs["publicSto"]>
  >;

  publicSto<
    X extends object,
    XVariables extends object,
    XAlias extends string = "publicSto",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"PublicSto", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"publicSto", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs["publicSto"] & XDirectiveVariables
  >;

  publicSto<
    XArgs extends AcceptableVariables<QueryArgs["publicSto"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "publicSto",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"PublicSto", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"publicSto", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["publicSto"]> &
      XDirectiveVariables
  >;

  findAllSto<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Sto", X, XVariables>
  ): QueryFetcher<
    T & { readonly findAllSto: readonly X[] },
    TVariables & XVariables
  >;

  findAllSto<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findAllSto",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Sto", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findAllSto", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  investorActiveProperties<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ActiveProperty", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorActiveProperties: readonly X[] },
    TVariables & XVariables
  >;

  investorActiveProperties<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorActiveProperties",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ActiveProperty", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorActiveProperties", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  investorDetailProperty<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DetailProperty", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorDetailProperty: X },
    TVariables & XVariables & QueryArgs["investorDetailProperty"]
  >;

  investorDetailProperty<
    XArgs extends AcceptableVariables<QueryArgs["investorDetailProperty"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"DetailProperty", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorDetailProperty: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorDetailProperty"]>
  >;

  investorDetailProperty<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorDetailProperty",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DetailProperty", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorDetailProperty", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      QueryArgs["investorDetailProperty"] &
      XDirectiveVariables
  >;

  investorDetailProperty<
    XArgs extends AcceptableVariables<QueryArgs["investorDetailProperty"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorDetailProperty",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"DetailProperty", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorDetailProperty", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorDetailProperty"]> &
      XDirectiveVariables
  >;

  investorRelatedSto<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ActiveProperty", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorRelatedSto: readonly X[] },
    TVariables & XVariables
  >;

  investorRelatedSto<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorRelatedSto",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ActiveProperty", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorRelatedSto", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  investorUpdate<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Update", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorUpdate?: X },
    TVariables & XVariables & QueryArgs["investorUpdate"]
  >;

  investorUpdate<
    XArgs extends AcceptableVariables<QueryArgs["investorUpdate"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Update", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorUpdate?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorUpdate"]>
  >;

  investorUpdate<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorUpdate",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Update", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorUpdate", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs["investorUpdate"] & XDirectiveVariables
  >;

  investorUpdate<
    XArgs extends AcceptableVariables<QueryArgs["investorUpdate"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorUpdate",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Update", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorUpdate", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorUpdate"]> &
      XDirectiveVariables
  >;

  investorUpdates<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Update", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorUpdates?: readonly X[] },
    TVariables & XVariables & QueryArgs["investorUpdates"]
  >;

  investorUpdates<
    XArgs extends AcceptableVariables<QueryArgs["investorUpdates"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Update", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorUpdates?: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorUpdates"]>
  >;

  investorUpdates<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorUpdates",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Update", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorUpdates", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & QueryArgs["investorUpdates"] & XDirectiveVariables
  >;

  investorUpdates<
    XArgs extends AcceptableVariables<QueryArgs["investorUpdates"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorUpdates",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Update", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorUpdates", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorUpdates"]> &
      XDirectiveVariables
  >;

  adminMe<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Admin", X, XVariables>
  ): QueryFetcher<T & { readonly adminMe?: X }, TVariables & XVariables>;

  adminMe<
    X extends object,
    XVariables extends object,
    XAlias extends string = "adminMe",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Admin", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"adminMe", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;

  findInvestor<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Investor", X, XVariables>
  ): QueryFetcher<
    T & { readonly findInvestor?: X },
    TVariables & XVariables & QueryArgs["findInvestor"]
  >;

  findInvestor<
    XArgs extends AcceptableVariables<QueryArgs["findInvestor"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Investor", X, XVariables>
  ): QueryFetcher<
    T & { readonly findInvestor?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findInvestor"]>
  >;

  findInvestor<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findInvestor",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Investor", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findInvestor", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & QueryArgs["findInvestor"] & XDirectiveVariables
  >;

  findInvestor<
    XArgs extends AcceptableVariables<QueryArgs["findInvestor"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "findInvestor",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Investor", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findInvestor", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findInvestor"]> &
      XDirectiveVariables
  >;

  findInvestors<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Investor", X, XVariables>
  ): QueryFetcher<
    T & { readonly findInvestors?: readonly X[] },
    TVariables & XVariables & QueryArgs["findInvestors"]
  >;

  findInvestors<
    XArgs extends AcceptableVariables<QueryArgs["findInvestors"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Investor", X, XVariables>
  ): QueryFetcher<
    T & { readonly findInvestors?: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findInvestors"]>
  >;

  findInvestors<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findInvestors",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Investor", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findInvestors", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & QueryArgs["findInvestors"] & XDirectiveVariables
  >;

  findInvestors<
    XArgs extends AcceptableVariables<QueryArgs["findInvestors"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "findInvestors",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Investor", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findInvestors", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findInvestors"]> &
      XDirectiveVariables
  >;

  findAllInvestors<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Investor", X, XVariables>
  ): QueryFetcher<
    T & { readonly findAllInvestors?: readonly X[] },
    TVariables & XVariables
  >;

  findAllInvestors<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findAllInvestors",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Investor", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findAllInvestors", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >;

  findAdmins<X extends object, XVariables extends object>(
    child: ObjectFetcher<"AdminUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly findAdmins: readonly X[] },
    TVariables & XVariables & QueryArgs["findAdmins"]
  >;

  findAdmins<
    XArgs extends AcceptableVariables<QueryArgs["findAdmins"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"AdminUser", X, XVariables>
  ): QueryFetcher<
    T & { readonly findAdmins: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findAdmins"]>
  >;

  findAdmins<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findAdmins",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"AdminUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findAdmins", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & QueryArgs["findAdmins"] & XDirectiveVariables
  >;

  findAdmins<
    XArgs extends AcceptableVariables<QueryArgs["findAdmins"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "findAdmins",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"AdminUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findAdmins", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["findAdmins"]> &
      XDirectiveVariables
  >;

  getNonKycInvestors<X extends object, XVariables extends object>(
    child: ObjectFetcher<"NonKycInvestor", X, XVariables>
  ): QueryFetcher<
    T & { readonly getNonKycInvestors: readonly X[] },
    TVariables & XVariables & QueryArgs["getNonKycInvestors"]
  >;

  getNonKycInvestors<
    XArgs extends AcceptableVariables<QueryArgs["getNonKycInvestors"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"NonKycInvestor", X, XVariables>
  ): QueryFetcher<
    T & { readonly getNonKycInvestors: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getNonKycInvestors"]>
  >;

  getNonKycInvestors<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getNonKycInvestors",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"NonKycInvestor", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getNonKycInvestors", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["getNonKycInvestors"] &
      XDirectiveVariables
  >;

  getNonKycInvestors<
    XArgs extends AcceptableVariables<QueryArgs["getNonKycInvestors"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getNonKycInvestors",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"NonKycInvestor", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getNonKycInvestors", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getNonKycInvestors"]> &
      XDirectiveVariables
  >;

  getInvestorInvitations<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorInvitation", X, XVariables>
  ): QueryFetcher<
    T & { readonly getInvestorInvitations: readonly X[] },
    TVariables & XVariables & QueryArgs["getInvestorInvitations"]
  >;

  getInvestorInvitations<
    XArgs extends AcceptableVariables<QueryArgs["getInvestorInvitations"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorInvitation", X, XVariables>
  ): QueryFetcher<
    T & { readonly getInvestorInvitations: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getInvestorInvitations"]>
  >;

  getInvestorInvitations<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getInvestorInvitations",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorInvitation", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getInvestorInvitations", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["getInvestorInvitations"] &
      XDirectiveVariables
  >;

  getInvestorInvitations<
    XArgs extends AcceptableVariables<QueryArgs["getInvestorInvitations"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getInvestorInvitations",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorInvitation", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getInvestorInvitations", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getInvestorInvitations"]> &
      XDirectiveVariables
  >;

  readonly getVerifyInvestorUrl: QueryFetcher<
    T & { readonly getVerifyInvestorUrl: string },
    TVariables
  >;

  "getVerifyInvestorUrl+"<
    XAlias extends string = "getVerifyInvestorUrl",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"getVerifyInvestorUrl", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~getVerifyInvestorUrl": QueryFetcher<
    Omit<T, "getVerifyInvestorUrl">,
    TVariables
  >;

  findAllBlockchains<X extends object, XVariables extends object>(
    child: ObjectFetcher<"blockchains", X, XVariables>
  ): QueryFetcher<
    T & { readonly findAllBlockchains?: readonly X[] },
    TVariables & XVariables
  >;

  findAllBlockchains<
    X extends object,
    XVariables extends object,
    XAlias extends string = "findAllBlockchains",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"blockchains", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"findAllBlockchains", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >;

  fetchFees<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Fee", X, XVariables>
  ): QueryFetcher<
    T & { readonly fetchFees: readonly X[] },
    TVariables & XVariables & QueryArgs["fetchFees"]
  >;

  fetchFees<
    XArgs extends AcceptableVariables<QueryArgs["fetchFees"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Fee", X, XVariables>
  ): QueryFetcher<
    T & { readonly fetchFees: readonly X[] },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs["fetchFees"]>
  >;

  fetchFees<
    X extends object,
    XVariables extends object,
    XAlias extends string = "fetchFees",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Fee", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fetchFees", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & QueryArgs["fetchFees"] & XDirectiveVariables
  >;

  fetchFees<
    XArgs extends AcceptableVariables<QueryArgs["fetchFees"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "fetchFees",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Fee", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fetchFees", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["fetchFees"]> &
      XDirectiveVariables
  >;

  fetchFeeCommissionsByID<X extends object, XVariables extends object>(
    child: ObjectFetcher<"FeeCommission", X, XVariables>
  ): QueryFetcher<
    T & { readonly fetchFeeCommissionsByID: X },
    TVariables & XVariables & QueryArgs["fetchFeeCommissionsByID"]
  >;

  fetchFeeCommissionsByID<
    XArgs extends AcceptableVariables<QueryArgs["fetchFeeCommissionsByID"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"FeeCommission", X, XVariables>
  ): QueryFetcher<
    T & { readonly fetchFeeCommissionsByID: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["fetchFeeCommissionsByID"]>
  >;

  fetchFeeCommissionsByID<
    X extends object,
    XVariables extends object,
    XAlias extends string = "fetchFeeCommissionsByID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"FeeCommission", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fetchFeeCommissionsByID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      QueryArgs["fetchFeeCommissionsByID"] &
      XDirectiveVariables
  >;

  fetchFeeCommissionsByID<
    XArgs extends AcceptableVariables<QueryArgs["fetchFeeCommissionsByID"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "fetchFeeCommissionsByID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"FeeCommission", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fetchFeeCommissionsByID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["fetchFeeCommissionsByID"]> &
      XDirectiveVariables
  >;

  fetchFeeCommissions<X extends object, XVariables extends object>(
    child: ObjectFetcher<"FeeCommission", X, XVariables>
  ): QueryFetcher<
    T & { readonly fetchFeeCommissions: readonly X[] },
    TVariables & XVariables & QueryArgs["fetchFeeCommissions"]
  >;

  fetchFeeCommissions<
    XArgs extends AcceptableVariables<QueryArgs["fetchFeeCommissions"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"FeeCommission", X, XVariables>
  ): QueryFetcher<
    T & { readonly fetchFeeCommissions: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["fetchFeeCommissions"]>
  >;

  fetchFeeCommissions<
    X extends object,
    XVariables extends object,
    XAlias extends string = "fetchFeeCommissions",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"FeeCommission", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fetchFeeCommissions", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["fetchFeeCommissions"] &
      XDirectiveVariables
  >;

  fetchFeeCommissions<
    XArgs extends AcceptableVariables<QueryArgs["fetchFeeCommissions"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "fetchFeeCommissions",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"FeeCommission", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fetchFeeCommissions", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["fetchFeeCommissions"]> &
      XDirectiveVariables
  >;

  getCommissionsSum(): QueryFetcher<
    T & { readonly getCommissionsSum: number },
    TVariables & QueryArgs["getCommissionsSum"]
  >;

  getCommissionsSum<
    XArgs extends AcceptableVariables<QueryArgs["getCommissionsSum"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly getCommissionsSum: number },
    TVariables & UnresolvedVariables<XArgs, QueryArgs["getCommissionsSum"]>
  >;

  getCommissionsSum<
    XAlias extends string = "getCommissionsSum",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"getCommissionsSum", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & QueryArgs["getCommissionsSum"] & XDirectiveVariables
  >;

  getCommissionsSum<
    XArgs extends AcceptableVariables<QueryArgs["getCommissionsSum"]>,
    XAlias extends string = "getCommissionsSum",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"getCommissionsSum", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["getCommissionsSum"]> &
      XDirectiveVariables
  >;

  getInvestorCommissionsSum(): QueryFetcher<
    T & { readonly getInvestorCommissionsSum: number },
    TVariables & QueryArgs["getInvestorCommissionsSum"]
  >;

  getInvestorCommissionsSum<
    XArgs extends AcceptableVariables<QueryArgs["getInvestorCommissionsSum"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly getInvestorCommissionsSum: number },
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["getInvestorCommissionsSum"]>
  >;

  getInvestorCommissionsSum<
    XAlias extends string = "getInvestorCommissionsSum",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"getInvestorCommissionsSum", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & QueryArgs["getInvestorCommissionsSum"] & XDirectiveVariables
  >;

  getInvestorCommissionsSum<
    XArgs extends AcceptableVariables<QueryArgs["getInvestorCommissionsSum"]>,
    XAlias extends string = "getInvestorCommissionsSum",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"getInvestorCommissionsSum", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["getInvestorCommissionsSum"]> &
      XDirectiveVariables
  >;

  readonly getSumSubInvestorToken: QueryFetcher<
    T & { readonly getSumSubInvestorToken: string },
    TVariables
  >;

  "getSumSubInvestorToken+"<
    XAlias extends string = "getSumSubInvestorToken",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"getSumSubInvestorToken", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~getSumSubInvestorToken": QueryFetcher<
    Omit<T, "getSumSubInvestorToken">,
    TVariables
  >;

  readonly getBlockPassClientID: QueryFetcher<
    T & { readonly getBlockPassClientID: string },
    TVariables
  >;

  "getBlockPassClientID+"<
    XAlias extends string = "getBlockPassClientID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"getBlockPassClientID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~getBlockPassClientID": QueryFetcher<
    Omit<T, "getBlockPassClientID">,
    TVariables
  >;

  getNetkiSignUpData<X extends object, XVariables extends object>(
    child: ObjectFetcher<"NetkiSignUpData", X, XVariables>
  ): QueryFetcher<
    T & { readonly getNetkiSignUpData: X },
    TVariables & XVariables
  >;

  getNetkiSignUpData<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getNetkiSignUpData",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"NetkiSignUpData", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getNetkiSignUpData", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  getExchangeOffers<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>
  ): QueryFetcher<
    T & { readonly getExchangeOffers: readonly X[] },
    TVariables & XVariables & QueryArgs["getExchangeOffers"]
  >;

  getExchangeOffers<
    XArgs extends AcceptableVariables<QueryArgs["getExchangeOffers"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>
  ): QueryFetcher<
    T & { readonly getExchangeOffers: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getExchangeOffers"]>
  >;

  getExchangeOffers<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getExchangeOffers",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getExchangeOffers", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["getExchangeOffers"] &
      XDirectiveVariables
  >;

  getExchangeOffers<
    XArgs extends AcceptableVariables<QueryArgs["getExchangeOffers"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getExchangeOffers",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getExchangeOffers", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getExchangeOffers"]> &
      XDirectiveVariables
  >;

  getExchangeOrderOffers<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>
  ): QueryFetcher<
    T & { readonly getExchangeOrderOffers: readonly X[] },
    TVariables & XVariables & QueryArgs["getExchangeOrderOffers"]
  >;

  getExchangeOrderOffers<
    XArgs extends AcceptableVariables<QueryArgs["getExchangeOrderOffers"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>
  ): QueryFetcher<
    T & { readonly getExchangeOrderOffers: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getExchangeOrderOffers"]>
  >;

  getExchangeOrderOffers<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getExchangeOrderOffers",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getExchangeOrderOffers", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["getExchangeOrderOffers"] &
      XDirectiveVariables
  >;

  getExchangeOrderOffers<
    XArgs extends AcceptableVariables<QueryArgs["getExchangeOrderOffers"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getExchangeOrderOffers",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getExchangeOrderOffers", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getExchangeOrderOffers"]> &
      XDirectiveVariables
  >;

  getAcceptedExchangeOffer<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>
  ): QueryFetcher<
    T & { readonly getAcceptedExchangeOffer?: X },
    TVariables & XVariables & QueryArgs["getAcceptedExchangeOffer"]
  >;

  getAcceptedExchangeOffer<
    XArgs extends AcceptableVariables<QueryArgs["getAcceptedExchangeOffer"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>
  ): QueryFetcher<
    T & { readonly getAcceptedExchangeOffer?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getAcceptedExchangeOffer"]>
  >;

  getAcceptedExchangeOffer<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getAcceptedExchangeOffer",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getAcceptedExchangeOffer", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["getAcceptedExchangeOffer"] &
      XDirectiveVariables
  >;

  getAcceptedExchangeOffer<
    XArgs extends AcceptableVariables<QueryArgs["getAcceptedExchangeOffer"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getAcceptedExchangeOffer",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getAcceptedExchangeOffer", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getAcceptedExchangeOffer"]> &
      XDirectiveVariables
  >;

  getExchangeOffer<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>
  ): QueryFetcher<
    T & { readonly getExchangeOffer?: X },
    TVariables & XVariables & QueryArgs["getExchangeOffer"]
  >;

  getExchangeOffer<
    XArgs extends AcceptableVariables<QueryArgs["getExchangeOffer"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>
  ): QueryFetcher<
    T & { readonly getExchangeOffer?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getExchangeOffer"]>
  >;

  getExchangeOffer<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getExchangeOffer",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getExchangeOffer", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      QueryArgs["getExchangeOffer"] &
      XDirectiveVariables
  >;

  getExchangeOffer<
    XArgs extends AcceptableVariables<QueryArgs["getExchangeOffer"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getExchangeOffer",
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOffer", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getExchangeOffer", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): QueryFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getExchangeOffer"]> &
      XDirectiveVariables
  >;

  exchangeOrders<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>
  ): QueryFetcher<
    T & { readonly exchangeOrders: readonly X[] },
    TVariables & XVariables
  >;

  exchangeOrders<
    X extends object,
    XVariables extends object,
    XAlias extends string = "exchangeOrders",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"exchangeOrders", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  getInvestorExchangeOrders<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>
  ): QueryFetcher<
    T & { readonly getInvestorExchangeOrders: readonly X[] },
    TVariables & XVariables & QueryArgs["getInvestorExchangeOrders"]
  >;

  getInvestorExchangeOrders<
    XArgs extends AcceptableVariables<QueryArgs["getInvestorExchangeOrders"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>
  ): QueryFetcher<
    T & { readonly getInvestorExchangeOrders: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getInvestorExchangeOrders"]>
  >;

  getInvestorExchangeOrders<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getInvestorExchangeOrders",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getInvestorExchangeOrders", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["getInvestorExchangeOrders"] &
      XDirectiveVariables
  >;

  getInvestorExchangeOrders<
    XArgs extends AcceptableVariables<QueryArgs["getInvestorExchangeOrders"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getInvestorExchangeOrders",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getInvestorExchangeOrders", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getInvestorExchangeOrders"]> &
      XDirectiveVariables
  >;

  getExchangeOrders<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>
  ): QueryFetcher<
    T & { readonly getExchangeOrders: readonly X[] },
    TVariables & XVariables & QueryArgs["getExchangeOrders"]
  >;

  getExchangeOrders<
    XArgs extends AcceptableVariables<QueryArgs["getExchangeOrders"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>
  ): QueryFetcher<
    T & { readonly getExchangeOrders: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getExchangeOrders"]>
  >;

  getExchangeOrders<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getExchangeOrders",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getExchangeOrders", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["getExchangeOrders"] &
      XDirectiveVariables
  >;

  getExchangeOrders<
    XArgs extends AcceptableVariables<QueryArgs["getExchangeOrders"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getExchangeOrders",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getExchangeOrders", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getExchangeOrders"]> &
      XDirectiveVariables
  >;

  getExchangeOrder<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>
  ): QueryFetcher<
    T & { readonly getExchangeOrder: X },
    TVariables & XVariables & QueryArgs["getExchangeOrder"]
  >;

  getExchangeOrder<
    XArgs extends AcceptableVariables<QueryArgs["getExchangeOrder"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>
  ): QueryFetcher<
    T & { readonly getExchangeOrder: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getExchangeOrder"]>
  >;

  getExchangeOrder<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getExchangeOrder",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getExchangeOrder", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      QueryArgs["getExchangeOrder"] &
      XDirectiveVariables
  >;

  getExchangeOrder<
    XArgs extends AcceptableVariables<QueryArgs["getExchangeOrder"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getExchangeOrder",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"ExchangeOrder", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getExchangeOrder", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getExchangeOrder"]> &
      XDirectiveVariables
  >;

  getSharesWallets<X extends object, XVariables extends object>(
    child: ObjectFetcher<"SharesWallet", X, XVariables>
  ): QueryFetcher<
    T & { readonly getSharesWallets: readonly X[] },
    TVariables & XVariables & QueryArgs["getSharesWallets"]
  >;

  getSharesWallets<
    XArgs extends AcceptableVariables<QueryArgs["getSharesWallets"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"SharesWallet", X, XVariables>
  ): QueryFetcher<
    T & { readonly getSharesWallets: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getSharesWallets"]>
  >;

  getSharesWallets<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getSharesWallets",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"SharesWallet", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getSharesWallets", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["getSharesWallets"] &
      XDirectiveVariables
  >;

  getSharesWallets<
    XArgs extends AcceptableVariables<QueryArgs["getSharesWallets"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getSharesWallets",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"SharesWallet", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getSharesWallets", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getSharesWallets"]> &
      XDirectiveVariables
  >;

  getSwapTokens<X extends object, XVariables extends object>(
    child: ObjectFetcher<"SwapToken", X, XVariables>
  ): QueryFetcher<
    T & { readonly getSwapTokens: readonly X[] },
    TVariables & XVariables
  >;

  getSwapTokens<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getSwapTokens",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"SwapToken", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getSwapTokens", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  getInvestorTypes<X extends object, XVariables extends object>(
    child: ObjectFetcher<"StoInvestorType", X, XVariables>
  ): QueryFetcher<
    T & { readonly getInvestorTypes: readonly X[] },
    TVariables & XVariables
  >;

  getInvestorTypes<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getInvestorTypes",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"StoInvestorType", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getInvestorTypes", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  investorInvoiceAlerts<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorInvoices", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorInvoiceAlerts: readonly X[] },
    TVariables & XVariables
  >;

  investorInvoiceAlerts<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorInvoiceAlerts",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorInvoices", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorInvoiceAlerts", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;

  investorInvoiceAlert<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorInvoices", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorInvoiceAlert: X },
    TVariables & XVariables & QueryArgs["investorInvoiceAlert"]
  >;

  investorInvoiceAlert<
    XArgs extends AcceptableVariables<QueryArgs["investorInvoiceAlert"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorInvoices", X, XVariables>
  ): QueryFetcher<
    T & { readonly investorInvoiceAlert: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorInvoiceAlert"]>
  >;

  investorInvoiceAlert<
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorInvoiceAlert",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorInvoices", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorInvoiceAlert", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      QueryArgs["investorInvoiceAlert"] &
      XDirectiveVariables
  >;

  investorInvoiceAlert<
    XArgs extends AcceptableVariables<QueryArgs["investorInvoiceAlert"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "investorInvoiceAlert",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"InvestorInvoices", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"investorInvoiceAlert", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["investorInvoiceAlert"]> &
      XDirectiveVariables
  >;

  getChats<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Chat", X, XVariables>
  ): QueryFetcher<
    T & { readonly getChats: readonly X[] },
    TVariables & XVariables & QueryArgs["getChats"]
  >;

  getChats<
    XArgs extends AcceptableVariables<QueryArgs["getChats"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Chat", X, XVariables>
  ): QueryFetcher<
    T & { readonly getChats: readonly X[] },
    TVariables & XVariables & UnresolvedVariables<XArgs, QueryArgs["getChats"]>
  >;

  getChats<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getChats",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Chat", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getChats", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & QueryArgs["getChats"] & XDirectiveVariables
  >;

  getChats<
    XArgs extends AcceptableVariables<QueryArgs["getChats"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getChats",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Chat", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getChats", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getChats"]> &
      XDirectiveVariables
  >;

  getPriceNegotiationList<X extends object, XVariables extends object>(
    child: ObjectFetcher<"PriceNegotiationListItem", X, XVariables>
  ): QueryFetcher<
    T & { readonly getPriceNegotiationList: readonly X[] },
    TVariables & XVariables & QueryArgs["getPriceNegotiationList"]
  >;

  getPriceNegotiationList<
    XArgs extends AcceptableVariables<QueryArgs["getPriceNegotiationList"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"PriceNegotiationListItem", X, XVariables>
  ): QueryFetcher<
    T & { readonly getPriceNegotiationList: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getPriceNegotiationList"]>
  >;

  getPriceNegotiationList<
    X extends object,
    XVariables extends object,
    XAlias extends string = "getPriceNegotiationList",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"PriceNegotiationListItem", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getPriceNegotiationList", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      QueryArgs["getPriceNegotiationList"] &
      XDirectiveVariables
  >;

  getPriceNegotiationList<
    XArgs extends AcceptableVariables<QueryArgs["getPriceNegotiationList"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "getPriceNegotiationList",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"PriceNegotiationListItem", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"getPriceNegotiationList", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["getPriceNegotiationList"]> &
      XDirectiveVariables
  >;

  getUnreadMessagesCount(): QueryFetcher<
    T & { readonly getUnreadMessagesCount: number },
    TVariables & QueryArgs["getUnreadMessagesCount"]
  >;

  getUnreadMessagesCount<
    XArgs extends AcceptableVariables<QueryArgs["getUnreadMessagesCount"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly getUnreadMessagesCount: number },
    TVariables & UnresolvedVariables<XArgs, QueryArgs["getUnreadMessagesCount"]>
  >;

  getUnreadMessagesCount<
    XAlias extends string = "getUnreadMessagesCount",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"getUnreadMessagesCount", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & QueryArgs["getUnreadMessagesCount"] & XDirectiveVariables
  >;

  getUnreadMessagesCount<
    XArgs extends AcceptableVariables<QueryArgs["getUnreadMessagesCount"]>,
    XAlias extends string = "getUnreadMessagesCount",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"getUnreadMessagesCount", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["getUnreadMessagesCount"]> &
      XDirectiveVariables
  >;

  getPriceNegotiationUnreadMessagesCount(): QueryFetcher<
    T & { readonly getPriceNegotiationUnreadMessagesCount: number },
    TVariables & QueryArgs["getPriceNegotiationUnreadMessagesCount"]
  >;

  getPriceNegotiationUnreadMessagesCount<
    XArgs extends AcceptableVariables<
      QueryArgs["getPriceNegotiationUnreadMessagesCount"]
    >
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly getPriceNegotiationUnreadMessagesCount: number },
    TVariables &
      UnresolvedVariables<
        XArgs,
        QueryArgs["getPriceNegotiationUnreadMessagesCount"]
      >
  >;

  getPriceNegotiationUnreadMessagesCount<
    XAlias extends string = "getPriceNegotiationUnreadMessagesCount",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"getPriceNegotiationUnreadMessagesCount", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      QueryArgs["getPriceNegotiationUnreadMessagesCount"] &
      XDirectiveVariables
  >;

  getPriceNegotiationUnreadMessagesCount<
    XArgs extends AcceptableVariables<
      QueryArgs["getPriceNegotiationUnreadMessagesCount"]
    >,
    XAlias extends string = "getPriceNegotiationUnreadMessagesCount",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"getPriceNegotiationUnreadMessagesCount", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables &
      UnresolvedVariables<
        XArgs,
        QueryArgs["getPriceNegotiationUnreadMessagesCount"]
      > &
      XDirectiveVariables
  >;

  getUsernameByID(): QueryFetcher<
    T & { readonly getUsernameByID: string },
    TVariables & QueryArgs["getUsernameByID"]
  >;

  getUsernameByID<
    XArgs extends AcceptableVariables<QueryArgs["getUsernameByID"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly getUsernameByID: string },
    TVariables & UnresolvedVariables<XArgs, QueryArgs["getUsernameByID"]>
  >;

  getUsernameByID<
    XAlias extends string = "getUsernameByID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"getUsernameByID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & QueryArgs["getUsernameByID"] & XDirectiveVariables
  >;

  getUsernameByID<
    XArgs extends AcceptableVariables<QueryArgs["getUsernameByID"]>,
    XAlias extends string = "getUsernameByID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"getUsernameByID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["getUsernameByID"]> &
      XDirectiveVariables
  >;

  getFullNameByID(): QueryFetcher<
    T & { readonly getFullNameByID: string },
    TVariables & QueryArgs["getFullNameByID"]
  >;

  getFullNameByID<
    XArgs extends AcceptableVariables<QueryArgs["getFullNameByID"]>
  >(
    args: XArgs
  ): QueryFetcher<
    T & { readonly getFullNameByID: string },
    TVariables & UnresolvedVariables<XArgs, QueryArgs["getFullNameByID"]>
  >;

  getFullNameByID<
    XAlias extends string = "getFullNameByID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"getFullNameByID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & QueryArgs["getFullNameByID"] & XDirectiveVariables
  >;

  getFullNameByID<
    XArgs extends AcceptableVariables<QueryArgs["getFullNameByID"]>,
    XAlias extends string = "getFullNameByID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    optionsConfigurer: (
      options: FieldOptions<"getFullNameByID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables &
      UnresolvedVariables<XArgs, QueryArgs["getFullNameByID"]> &
      XDirectiveVariables
  >;

  translations<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Translation", X, XVariables>
  ): QueryFetcher<
    T & { readonly translations: readonly X[] },
    TVariables & XVariables & QueryArgs["translations"]
  >;

  translations<
    XArgs extends AcceptableVariables<QueryArgs["translations"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"Translation", X, XVariables>
  ): QueryFetcher<
    T & { readonly translations: readonly X[] },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["translations"]>
  >;

  translations<
    X extends object,
    XVariables extends object,
    XAlias extends string = "translations",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Translation", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"translations", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & QueryArgs["translations"] & XDirectiveVariables
  >;

  translations<
    XArgs extends AcceptableVariables<QueryArgs["translations"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "translations",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"Translation", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"translations", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["translations"]> &
      XDirectiveVariables
  >;

  readonly locales: QueryFetcher<
    T & { readonly locales: readonly string[] },
    TVariables
  >;

  "locales+"<
    XAlias extends string = "locales",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"locales", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly string[] }
        : { readonly [key in XAlias]: readonly string[] }),
    TVariables & XDirectiveVariables
  >;

  readonly "~locales": QueryFetcher<Omit<T, "locales">, TVariables>;

  fetchCustomizedComponent<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ComponentCustomization", X, XVariables>
  ): QueryFetcher<
    T & { readonly fetchCustomizedComponent: X },
    TVariables & XVariables & QueryArgs["fetchCustomizedComponent"]
  >;

  fetchCustomizedComponent<
    XArgs extends AcceptableVariables<QueryArgs["fetchCustomizedComponent"]>,
    X extends object,
    XVariables extends object
  >(
    args: XArgs,
    child: ObjectFetcher<"ComponentCustomization", X, XVariables>
  ): QueryFetcher<
    T & { readonly fetchCustomizedComponent: X },
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["fetchCustomizedComponent"]>
  >;

  fetchCustomizedComponent<
    X extends object,
    XVariables extends object,
    XAlias extends string = "fetchCustomizedComponent",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ComponentCustomization", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fetchCustomizedComponent", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      QueryArgs["fetchCustomizedComponent"] &
      XDirectiveVariables
  >;

  fetchCustomizedComponent<
    XArgs extends AcceptableVariables<QueryArgs["fetchCustomizedComponent"]>,
    X extends object,
    XVariables extends object,
    XAlias extends string = "fetchCustomizedComponent",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    args: XArgs,
    child: ObjectFetcher<"ComponentCustomization", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fetchCustomizedComponent", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables &
      XVariables &
      UnresolvedVariables<XArgs, QueryArgs["fetchCustomizedComponent"]> &
      XDirectiveVariables
  >;

  fetchCustomizedComponents<X extends object, XVariables extends object>(
    child: ObjectFetcher<"ComponentCustomization", X, XVariables>
  ): QueryFetcher<
    T & { readonly fetchCustomizedComponents: readonly X[] },
    TVariables & XVariables
  >;

  fetchCustomizedComponents<
    X extends object,
    XVariables extends object,
    XAlias extends string = "fetchCustomizedComponents",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"ComponentCustomization", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fetchCustomizedComponents", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): QueryFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: readonly X[] }
        : { readonly [key in XAlias]: readonly X[] }),
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const query$: QueryFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Query",
    "OBJECT",
    [],
    [
      {
        category: "SCALAR",
        name: "moonpayWidgetUrl",
        argGraphQLTypeMap: {
          alertID: "Int",
          shares: "Float!",
          shareTypeID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "moonpayWidgetUrlAdmin",
        argGraphQLTypeMap: {
          alertID: "Int",
          investorID: "Int!",
          shares: "Float!",
          shareTypeID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "moonpayAllTransactionsJSON",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "moonpayAllTransactionsJSONAdmin",
        argGraphQLTypeMap: { investorID: "Int!" },
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "moonpayLastTransactionJSON",
        targetTypeName: "MoonpayTransactionJSON",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "moonpayLastTransactionJSONAdmin",
        argGraphQLTypeMap: {
          limit: "Int",
          investorID: "Int!",
        },
        targetTypeName: "MoonpayTransactionJSON",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "moonpayBuyAlertTransactionReceiptUrl",
        argGraphQLTypeMap: { alertID: "Int!" },
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "moonpayBuyAlertTransactionJSON",
        argGraphQLTypeMap: { alertID: "Int!" },
        targetTypeName: "MoonpayTransactionJSON",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "moonpayBuyAlertTransactionJSONAdmin",
        argGraphQLTypeMap: { alertID: "Int!" },
        targetTypeName: "MoonpayTransactionJSON",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "moonpayGetTransactionJSONAdmin",
        argGraphQLTypeMap: {
          transactionID: "Int!",
          investorID: "Int!",
        },
        targetTypeName: "MoonpayTransactionJSON",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "moonpayGetTransactionJSON",
        argGraphQLTypeMap: { transactionID: "Int!" },
        targetTypeName: "MoonpayTransactionJSON",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "moonpayConfig",
        targetTypeName: "MoonpayConfig",
      },
      {
        category: "LIST",
        name: "investorBuyAlerts",
        argGraphQLTypeMap: { status: "[BuyAlertStatus!]!" },
        targetTypeName: "InvestorBuyAlert",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "investorBuyAlertsAdmin",
        argGraphQLTypeMap: {
          isSellRequest: "Boolean",
          alertID: "Int",
          status: "BuyAlertStatus",
          investorID: "Int",
        },
        targetTypeName: "InvestorBuyAlert",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "investorDepositHistory",
        argGraphQLTypeMap: { stoID: "Int!" },
        targetTypeName: "InvestorDepositAlert",
      },
      {
        category: "LIST",
        name: "investorInvestingEntities",
        targetTypeName: "InvestingEntity",
      },
      {
        category: "SCALAR",
        name: "investorInvestingEntity",
        argGraphQLTypeMap: { entityID: "Int!" },
        targetTypeName: "InvestingEntity",
      },
      {
        category: "LIST",
        name: "investorInvestingEntityTypes",
        targetTypeName: "InvestingEntityTypes",
      },
      {
        category: "LIST",
        name: "getAllUnConfirmedEntitiesforStoAdmin",
        targetTypeName: "InvestingEntity",
      },
      {
        category: "LIST",
        name: "investorUserVoting",
        argGraphQLTypeMap: { votingID: "Int!" },
        targetTypeName: "VotingUser",
      },
      {
        category: "SCALAR",
        name: "investorAllMeeting",
        argGraphQLTypeMap: { stoID: "Int!" },
        targetTypeName: "AllMeeting",
      },
      {
        category: "SCALAR",
        name: "investorMeeting",
        argGraphQLTypeMap: { meetingID: "Int!" },
        targetTypeName: "Meeting",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "investorPoll",
        argGraphQLTypeMap: { meetingID: "Int!" },
        targetTypeName: "Poll",
      },
      {
        category: "SCALAR",
        name: "investorVotingUserData",
        argGraphQLTypeMap: { votingID: "Int!" },
        targetTypeName: "VotingUserData",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "investorVotingOptions",
        argGraphQLTypeMap: { votingID: "Int!" },
        targetTypeName: "VotingOption",
      },
      {
        category: "SCALAR",
        name: "investorVotingDocument",
        argGraphQLTypeMap: { documentID: "Int!" },
        targetTypeName: "VotingDocuments",
        undefinable: true,
      },
      {
        category: "REFERENCE",
        name: "getMercuryRecipient",
        targetTypeName: "MercuryRecipient",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "getMercuryAccountInfo",
        targetTypeName: "MercuryInfo",
        undefinable: true,
      },
      "countries",
      {
        category: "SCALAR",
        name: "investorAppParameters",
        targetTypeName: "AppParameters",
      },
      {
        category: "SCALAR",
        name: "findCurrency",
        argGraphQLTypeMap: { currencyID: "Int!" },
        targetTypeName: "Currency",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "findAllCurrencies",
        targetTypeName: "Currency",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "commentableDocuments",
        targetTypeName: "Document",
      },
      {
        category: "LIST",
        name: "offeredDocuments",
        targetTypeName: "OfferedDocument",
      },
      {
        category: "SCALAR",
        name: "offeredDocument",
        argGraphQLTypeMap: { documentID: "Int!" },
        targetTypeName: "OfferedDocument",
      },
      {
        category: "SCALAR",
        name: "document",
        argGraphQLTypeMap: { documentID: "Int!" },
        targetTypeName: "Document",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "submittedDocuments",
        argGraphQLTypeMap: { minStatus: "Int!" },
        targetTypeName: "DocumentUser",
      },
      {
        category: "SCALAR",
        name: "submittedDocument",
        argGraphQLTypeMap: { submittedDocumentID: "Int!" },
        targetTypeName: "DocumentUser",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "unfinishedDocument",
        argGraphQLTypeMap: { documentID: "Int!" },
        targetTypeName: "DocumentUser",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "documentFields",
        argGraphQLTypeMap: { documentID: "Int!" },
        targetTypeName: "DocumentField",
      },
      {
        category: "LIST",
        name: "sharePurchaseDocuments",
        argGraphQLTypeMap: {
          investorID: "Int",
          sharePurchaseID: "Int!",
        },
        targetTypeName: "SharePurchaseDocument",
      },
      {
        category: "SCALAR",
        name: "sharePurchaseDocument",
        argGraphQLTypeMap: {
          investorID: "Int",
          documentID: "Int!",
          sharePurchaseID: "Int!",
        },
        targetTypeName: "DocumentUser",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "getPrefilledDocumentValues",
        argGraphQLTypeMap: {
          documentID: "Int!",
          sharePurchaseID: "Int!",
        },
        targetTypeName: "DocumentUserFieldValue",
      },
      {
        category: "SCALAR",
        name: "getDocuSignUrl",
        argGraphQLTypeMap: {
          preferredReturnURL: "String!",
          documentID: "Int!",
          sharePurchaseID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "sendHelloSignTemplateSignRequest",
        argGraphQLTypeMap: {
          documentID: "Int!",
          sharePurchaseID: "Int!",
        },
      },
      {
        category: "LIST",
        name: "comments",
        argGraphQLTypeMap: { documentID: "Int!" },
        targetTypeName: "DocumentComment",
      },
      {
        category: "SCALAR",
        name: "downloadSignedHelloSign",
        argGraphQLTypeMap: { fileID: "String!" },
      },
      {
        category: "SCALAR",
        name: "downloadSignedDocuSign",
        argGraphQLTypeMap: { envelopeID: "String!" },
      },
      {
        category: "SCALAR",
        name: "investorInbox",
        argGraphQLTypeMap: { ID: "Int!" },
        targetTypeName: "Inbox",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "investorInboxes",
        argGraphQLTypeMap: {
          limit: "Int",
          offset: "Int",
          stoID: "Int!",
        },
        targetTypeName: "Inbox",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "investorUser",
        targetTypeName: "User",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "unverifiedRegistrations",
        argGraphQLTypeMap: {
          secret: "String",
          email: "String",
          ID: "Int",
        },
        targetTypeName: "Register",
      },
      "getInvitationLink",
      {
        category: "SCALAR",
        name: "investorBalance",
        argGraphQLTypeMap: {
          stoID: "Int",
          currencyID: "Int",
          ID: "Int",
        },
        targetTypeName: "InvestorBalance",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "investorBalances",
        argGraphQLTypeMap: { stoID: "Int!" },
        targetTypeName: "InvestorBalance",
      },
      {
        category: "SCALAR",
        name: "portfolioValue",
        argGraphQLTypeMap: { stoID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "investorSto",
        argGraphQLTypeMap: {
          investorID: "Int",
          stoID: "Int",
        },
        targetTypeName: "InvestorSto",
      },
      "investorKyc",
      {
        category: "LIST",
        name: "kyc",
        targetTypeName: "KycPage",
      },
      {
        category: "LIST",
        name: "investorPaymentChannels",
        argGraphQLTypeMap: { stoID: "Int!" },
        targetTypeName: "PaymentChannel",
      },
      {
        category: "LIST",
        name: "investorPublicKeys",
        targetTypeName: "PublicKey",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "isInvestorWhiteListed",
        argGraphQLTypeMap: { walletAddress: "String!" },
      },
      {
        category: "LIST",
        name: "findShareTypes",
        argGraphQLTypeMap: { stoID: "Int" },
        targetTypeName: "ShareType",
      },
      {
        category: "LIST",
        name: "findAllShareTypes",
        targetTypeName: "ShareType",
      },
      {
        category: "LIST",
        name: "findShareHistoricalValues",
        argGraphQLTypeMap: { shareTypeID: "Int!" },
        targetTypeName: "ShareHistoricalData",
      },
      {
        category: "LIST",
        name: "findInvestorDividendPayouts",
        targetTypeName: "DividendInvestorPayout",
      },
      {
        category: "SCALAR",
        name: "investorShare",
        argGraphQLTypeMap: {
          shareTypeID: "Int",
          ID: "Int",
        },
        targetTypeName: "Share",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "investorShareBalance",
        argGraphQLTypeMap: {
          shareTypeIDs: "[Int!]",
          investorID: "Int!",
        },
        targetTypeName: "Share",
      },
      {
        category: "LIST",
        name: "shareTypeShares",
        argGraphQLTypeMap: { shareTypeID: "Int!" },
        targetTypeName: "Share",
      },
      {
        category: "LIST",
        name: "investorShares",
        argGraphQLTypeMap: {
          stoID: "Int",
          investorID: "Int",
        },
        targetTypeName: "Share",
      },
      {
        category: "SCALAR",
        name: "findSto",
        argGraphQLTypeMap: { ID: "Int!" },
        targetTypeName: "Sto",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "publicSto",
        argGraphQLTypeMap: { stoID: "Int!" },
        targetTypeName: "PublicSto",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "findAllSto",
        targetTypeName: "Sto",
      },
      {
        category: "LIST",
        name: "investorActiveProperties",
        targetTypeName: "ActiveProperty",
      },
      {
        category: "SCALAR",
        name: "investorDetailProperty",
        argGraphQLTypeMap: { stoID: "Int!" },
        targetTypeName: "DetailProperty",
      },
      {
        category: "LIST",
        name: "investorRelatedSto",
        targetTypeName: "ActiveProperty",
      },
      {
        category: "SCALAR",
        name: "investorUpdate",
        argGraphQLTypeMap: { ID: "Int!" },
        targetTypeName: "Update",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "investorUpdates",
        argGraphQLTypeMap: {
          limit: "Int",
          offset: "Int",
          stoID: "Int!",
        },
        targetTypeName: "Update",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "adminMe",
        targetTypeName: "Admin",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "findInvestor",
        argGraphQLTypeMap: {
          passportNumber: "String",
          govtID: "String",
          taxID: "String",
          email: "String",
          investorID: "Int",
        },
        targetTypeName: "Investor",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "findInvestors",
        argGraphQLTypeMap: { emails: "[String!]!" },
        targetTypeName: "Investor",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "findAllInvestors",
        targetTypeName: "Investor",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "findAdmins",
        argGraphQLTypeMap: { email: "String" },
        targetTypeName: "AdminUser",
      },
      {
        category: "LIST",
        name: "getNonKycInvestors",
        argGraphQLTypeMap: {
          name: "String",
          stoID: "Int!",
        },
        targetTypeName: "NonKycInvestor",
      },
      {
        category: "LIST",
        name: "getInvestorInvitations",
        argGraphQLTypeMap: { stoID: "Int!" },
        targetTypeName: "InvestorInvitation",
      },
      "getVerifyInvestorUrl",
      {
        category: "LIST",
        name: "findAllBlockchains",
        targetTypeName: "blockchains",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "fetchFees",
        argGraphQLTypeMap: {
          type: "FEE_TYPE",
          status: "COMMISSION_TYPE",
          beneficiary: "FEE_BENEFICIARY",
          stoID: "Int!",
        },
        targetTypeName: "Fee",
      },
      {
        category: "SCALAR",
        name: "fetchFeeCommissionsByID",
        argGraphQLTypeMap: { feeCommissionID: "Int!" },
        targetTypeName: "FeeCommission",
      },
      {
        category: "LIST",
        name: "fetchFeeCommissions",
        argGraphQLTypeMap: {
          status: "PAYMENT_STATUS",
          beneficiaryType: "BROKER_TYPE",
          beneficiaryID: "Int",
          transactionID: "Int",
          feeID: "Int",
        },
        targetTypeName: "FeeCommission",
      },
      {
        category: "SCALAR",
        name: "getCommissionsSum",
        argGraphQLTypeMap: {
          status: "PAYMENT_STATUS",
          beneficiaryType: "BROKER_TYPE",
          beneficiaryID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "getInvestorCommissionsSum",
        argGraphQLTypeMap: { status: "PAYMENT_STATUS" },
      },
      "getSumSubInvestorToken",
      "getBlockPassClientID",
      {
        category: "SCALAR",
        name: "getNetkiSignUpData",
        targetTypeName: "NetkiSignUpData",
      },
      {
        category: "LIST",
        name: "getExchangeOffers",
        argGraphQLTypeMap: {
          type: "ExchangeType!",
          stoID: "Int!",
        },
        targetTypeName: "ExchangeOffer",
      },
      {
        category: "LIST",
        name: "getExchangeOrderOffers",
        argGraphQLTypeMap: { orderID: "Int!" },
        targetTypeName: "ExchangeOffer",
      },
      {
        category: "SCALAR",
        name: "getAcceptedExchangeOffer",
        argGraphQLTypeMap: { orderID: "Int!" },
        targetTypeName: "ExchangeOffer",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "getExchangeOffer",
        argGraphQLTypeMap: { orderID: "Int!" },
        targetTypeName: "ExchangeOffer",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "exchangeOrders",
        targetTypeName: "ExchangeOrder",
      },
      {
        category: "LIST",
        name: "getInvestorExchangeOrders",
        argGraphQLTypeMap: {
          stoID: "Int",
          type: "ExchangeType!",
        },
        targetTypeName: "ExchangeOrder",
      },
      {
        category: "LIST",
        name: "getExchangeOrders",
        argGraphQLTypeMap: { stoID: "Int!" },
        targetTypeName: "ExchangeOrder",
      },
      {
        category: "SCALAR",
        name: "getExchangeOrder",
        argGraphQLTypeMap: { orderID: "Int!" },
        targetTypeName: "ExchangeOrder",
      },
      {
        category: "LIST",
        name: "getSharesWallets",
        argGraphQLTypeMap: {
          platform: "Boolean",
          stoID: "Int",
          shareTypeID: "Int",
        },
        targetTypeName: "SharesWallet",
      },
      {
        category: "LIST",
        name: "getSwapTokens",
        targetTypeName: "SwapToken",
      },
      {
        category: "LIST",
        name: "getInvestorTypes",
        targetTypeName: "StoInvestorType",
      },
      {
        category: "LIST",
        name: "investorInvoiceAlerts",
        targetTypeName: "InvestorInvoices",
      },
      {
        category: "SCALAR",
        name: "investorInvoiceAlert",
        argGraphQLTypeMap: { ID: "Int!" },
        targetTypeName: "InvestorInvoices",
      },
      {
        category: "LIST",
        name: "getChats",
        argGraphQLTypeMap: {
          counterpartID: "Int",
          contextID: "Int",
          context: "CHAT_CONTEXT",
          stoID: "Int",
          chatBetween: "CHAT_BETWEEN!",
        },
        targetTypeName: "Chat",
      },
      {
        category: "LIST",
        name: "getPriceNegotiationList",
        argGraphQLTypeMap: { orderID: "Int!" },
        targetTypeName: "PriceNegotiationListItem",
      },
      {
        category: "SCALAR",
        name: "getUnreadMessagesCount",
        argGraphQLTypeMap: {
          sender: "SENDER_TYPE!",
          stoID: "Int!",
        },
      },
      {
        category: "SCALAR",
        name: "getPriceNegotiationUnreadMessagesCount",
        argGraphQLTypeMap: {
          counterpartID: "Int",
          contextID: "Int!",
          context: "CHAT_CONTEXT!",
        },
      },
      {
        category: "SCALAR",
        name: "getUsernameByID",
        argGraphQLTypeMap: { userID: "Int!" },
      },
      {
        category: "SCALAR",
        name: "getFullNameByID",
        argGraphQLTypeMap: { userID: "Int!" },
      },
      {
        category: "LIST",
        name: "translations",
        argGraphQLTypeMap: { locale: "String" },
        targetTypeName: "Translation",
      },
      "locales",
      {
        category: "SCALAR",
        name: "fetchCustomizedComponent",
        argGraphQLTypeMap: {
          componentTitle: "String",
          componentID: "Int",
        },
        targetTypeName: "ComponentCustomization",
      },
      {
        category: "LIST",
        name: "fetchCustomizedComponents",
        targetTypeName: "ComponentCustomization",
      },
    ]
  ),
  undefined
);

export interface QueryArgs {
  readonly moonpayWidgetUrl: {
    readonly alertID?: number;
    readonly shares: number;
    readonly shareTypeID: number;
  };

  readonly moonpayWidgetUrlAdmin: {
    readonly alertID?: number;
    readonly investorID: number;
    readonly shares: number;
    readonly shareTypeID: number;
  };

  readonly moonpayAllTransactionsJSONAdmin: {
    readonly investorID: number;
  };

  readonly moonpayLastTransactionJSONAdmin: {
    readonly limit?: number;
    readonly investorID: number;
  };

  readonly moonpayBuyAlertTransactionReceiptUrl: {
    readonly alertID: number;
  };

  readonly moonpayBuyAlertTransactionJSON: {
    readonly alertID: number;
  };

  readonly moonpayBuyAlertTransactionJSONAdmin: {
    readonly alertID: number;
  };

  readonly moonpayGetTransactionJSONAdmin: {
    readonly transactionID: number;
    readonly investorID: number;
  };

  readonly moonpayGetTransactionJSON: {
    readonly transactionID: number;
  };

  readonly investorBuyAlerts: {
    readonly status: readonly BuyAlertStatus[];
  };

  readonly investorBuyAlertsAdmin: {
    readonly isSellRequest?: boolean;
    readonly alertID?: number;
    readonly status?: BuyAlertStatus;
    readonly investorID?: number;
  };

  readonly investorDepositHistory: {
    readonly stoID: number;
  };

  readonly investorInvestingEntity: {
    readonly entityID: number;
  };

  readonly investorUserVoting: {
    readonly votingID: number;
  };

  readonly investorAllMeeting: {
    readonly stoID: number;
  };

  readonly investorMeeting: {
    readonly meetingID: number;
  };

  readonly investorPoll: {
    readonly meetingID: number;
  };

  readonly investorVotingUserData: {
    readonly votingID: number;
  };

  readonly investorVotingOptions: {
    readonly votingID: number;
  };

  readonly investorVotingDocument: {
    readonly documentID: number;
  };

  readonly findCurrency: {
    readonly currencyID: number;
  };

  readonly offeredDocument: {
    readonly documentID: number;
  };

  readonly document: {
    readonly documentID: number;
  };

  readonly submittedDocuments: {
    readonly minStatus: number;
  };

  readonly submittedDocument: {
    readonly submittedDocumentID: number;
  };

  readonly unfinishedDocument: {
    readonly documentID: number;
  };

  readonly documentFields: {
    readonly documentID: number;
  };

  readonly sharePurchaseDocuments: {
    readonly investorID?: number;
    readonly sharePurchaseID: number;
  };

  readonly sharePurchaseDocument: {
    readonly investorID?: number;
    readonly documentID: number;
    readonly sharePurchaseID: number;
  };

  readonly getPrefilledDocumentValues: {
    readonly documentID: number;
    readonly sharePurchaseID: number;
  };

  readonly getDocuSignUrl: {
    readonly preferredReturnURL: string;
    readonly documentID: number;
    readonly sharePurchaseID: number;
  };

  readonly sendHelloSignTemplateSignRequest: {
    readonly documentID: number;
    readonly sharePurchaseID: number;
  };

  readonly comments: {
    readonly documentID: number;
  };

  readonly downloadSignedHelloSign: {
    readonly fileID: string;
  };

  readonly downloadSignedDocuSign: {
    readonly envelopeID: string;
  };

  readonly investorInbox: {
    readonly ID: number;
  };

  readonly investorInboxes: {
    readonly limit?: number;
    readonly offset?: number;
    readonly stoID: number;
  };

  readonly unverifiedRegistrations: {
    readonly secret?: string;
    readonly email?: string;
    readonly ID?: number;
  };

  readonly investorBalance: {
    readonly stoID?: number;
    readonly currencyID?: number;
    readonly ID?: number;
  };

  readonly investorBalances: {
    readonly stoID: number;
  };

  readonly portfolioValue: {
    readonly stoID: number;
  };

  readonly investorSto: {
    readonly investorID?: number;
    readonly stoID?: number;
  };

  readonly investorPaymentChannels: {
    readonly stoID: number;
  };

  readonly isInvestorWhiteListed: {
    readonly walletAddress: string;
  };

  readonly findShareTypes: {
    readonly stoID?: number;
  };

  readonly findShareHistoricalValues: {
    readonly shareTypeID: number;
  };

  readonly investorShare: {
    readonly shareTypeID?: number;
    readonly ID?: number;
  };

  readonly investorShareBalance: {
    readonly shareTypeIDs?: readonly number[];
    readonly investorID: number;
  };

  readonly shareTypeShares: {
    readonly shareTypeID: number;
  };

  readonly investorShares: {
    readonly stoID?: number;
    readonly investorID?: number;
  };

  readonly findSto: {
    readonly ID: number;
  };

  readonly publicSto: {
    readonly stoID: number;
  };

  readonly investorDetailProperty: {
    readonly stoID: number;
  };

  readonly investorUpdate: {
    readonly ID: number;
  };

  readonly investorUpdates: {
    readonly limit?: number;
    readonly offset?: number;
    readonly stoID: number;
  };

  readonly findInvestor: {
    readonly passportNumber?: string;
    readonly govtID?: string;
    readonly taxID?: string;
    readonly email?: string;
    readonly investorID?: number;
  };

  readonly findInvestors: {
    readonly emails: readonly string[];
  };

  readonly findAdmins: {
    readonly email?: string;
  };

  readonly getNonKycInvestors: {
    readonly name?: string;
    readonly stoID: number;
  };

  readonly getInvestorInvitations: {
    readonly stoID: number;
  };

  readonly fetchFees: {
    readonly type?: FEE_TYPE;
    readonly status?: COMMISSION_TYPE;
    readonly beneficiary?: FEE_BENEFICIARY;
    readonly stoID: number;
  };

  readonly fetchFeeCommissionsByID: {
    readonly feeCommissionID: number;
  };

  readonly fetchFeeCommissions: {
    readonly status?: PAYMENT_STATUS;
    readonly beneficiaryType?: BROKER_TYPE;
    readonly beneficiaryID?: number;
    readonly transactionID?: number;
    readonly feeID?: number;
  };

  readonly getCommissionsSum: {
    readonly status?: PAYMENT_STATUS;
    readonly beneficiaryType?: BROKER_TYPE;
    readonly beneficiaryID: number;
  };

  readonly getInvestorCommissionsSum: {
    readonly status?: PAYMENT_STATUS;
  };

  readonly getExchangeOffers: {
    readonly type: ExchangeType;
    readonly stoID: number;
  };

  readonly getExchangeOrderOffers: {
    readonly orderID: number;
  };

  readonly getAcceptedExchangeOffer: {
    readonly orderID: number;
  };

  readonly getExchangeOffer: {
    readonly orderID: number;
  };

  readonly getInvestorExchangeOrders: {
    readonly stoID?: number;
    readonly type: ExchangeType;
  };

  readonly getExchangeOrders: {
    readonly stoID: number;
  };

  readonly getExchangeOrder: {
    readonly orderID: number;
  };

  readonly getSharesWallets: {
    readonly platform?: boolean;
    readonly stoID?: number;
    readonly shareTypeID?: number;
  };

  readonly investorInvoiceAlert: {
    readonly ID: number;
  };

  readonly getChats: {
    readonly counterpartID?: number;
    readonly contextID?: number;
    readonly context?: CHAT_CONTEXT;
    readonly stoID?: number;
    readonly chatBetween: CHAT_BETWEEN;
  };

  readonly getPriceNegotiationList: {
    readonly orderID: number;
  };

  readonly getUnreadMessagesCount: {
    readonly sender: SENDER_TYPE;
    readonly stoID: number;
  };

  readonly getPriceNegotiationUnreadMessagesCount: {
    readonly counterpartID?: number;
    readonly contextID: number;
    readonly context: CHAT_CONTEXT;
  };

  readonly getUsernameByID: {
    readonly userID: number;
  };

  readonly getFullNameByID: {
    readonly userID: number;
  };

  readonly translations: {
    readonly locale?: string;
  };

  readonly fetchCustomizedComponent: {
    readonly componentTitle?: string;
    readonly componentID?: number;
  };
}
