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
export interface DocumentUserFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"DocumentUser", T, TVariables> {
  on<
    XName extends ImplementationType<"DocumentUser">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): DocumentUserFetcher<
    XName extends "DocumentUser"
      ? T & X
      : WithTypeName<T, ImplementationType<"DocumentUser">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"DocumentUser">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): DocumentUserFetcher<T, TVariables>;

  readonly __typename: DocumentUserFetcher<
    T & { __typename: ImplementationType<"DocumentUser"> },
    TVariables
  >;

  readonly ID: DocumentUserFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": DocumentUserFetcher<Omit<T, "ID">, TVariables>;

  readonly contents: DocumentUserFetcher<
    T & { readonly contents: string },
    TVariables
  >;

  "contents+"<
    XAlias extends string = "contents",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"contents", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~contents": DocumentUserFetcher<Omit<T, "contents">, TVariables>;

  readonly investorID: DocumentUserFetcher<
    T & { readonly investorID?: number },
    TVariables
  >;

  "investorID+"<
    XAlias extends string = "investorID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": DocumentUserFetcher<
    Omit<T, "investorID">,
    TVariables
  >;

  readonly stoID: DocumentUserFetcher<
    T & { readonly stoID?: number },
    TVariables
  >;

  "stoID+"<
    XAlias extends string = "stoID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": DocumentUserFetcher<Omit<T, "stoID">, TVariables>;

  readonly documentID: DocumentUserFetcher<
    T & { readonly documentID?: number },
    TVariables
  >;

  "documentID+"<
    XAlias extends string = "documentID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"documentID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~documentID": DocumentUserFetcher<
    Omit<T, "documentID">,
    TVariables
  >;

  readonly directoryID: DocumentUserFetcher<
    T & { readonly directoryID?: number },
    TVariables
  >;

  "directoryID+"<
    XAlias extends string = "directoryID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"directoryID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~directoryID": DocumentUserFetcher<
    Omit<T, "directoryID">,
    TVariables
  >;

  readonly status: DocumentUserFetcher<
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
  ): DocumentUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~status": DocumentUserFetcher<Omit<T, "status">, TVariables>;

  readonly fieldValuesJson: DocumentUserFetcher<
    T & { readonly fieldValuesJson: string },
    TVariables
  >;

  "fieldValuesJson+"<
    XAlias extends string = "fieldValuesJson",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"fieldValuesJson", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~fieldValuesJson": DocumentUserFetcher<
    Omit<T, "fieldValuesJson">,
    TVariables
  >;

  readonly documentOfferInvestorID: DocumentUserFetcher<
    T & { readonly documentOfferInvestorID: number },
    TVariables
  >;

  "documentOfferInvestorID+"<
    XAlias extends string = "documentOfferInvestorID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"documentOfferInvestorID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~documentOfferInvestorID": DocumentUserFetcher<
    Omit<T, "documentOfferInvestorID">,
    TVariables
  >;

  readonly signatureFilePath: DocumentUserFetcher<
    T & { readonly signatureFilePath?: string },
    TVariables
  >;

  "signatureFilePath+"<
    XAlias extends string = "signatureFilePath",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"signatureFilePath", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~signatureFilePath": DocumentUserFetcher<
    Omit<T, "signatureFilePath">,
    TVariables
  >;

  readonly signatureDate: DocumentUserFetcher<
    T & { readonly signatureDate?: string },
    TVariables
  >;

  "signatureDate+"<
    XAlias extends string = "signatureDate",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"signatureDate", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~signatureDate": DocumentUserFetcher<
    Omit<T, "signatureDate">,
    TVariables
  >;

  readonly signatureFileID: DocumentUserFetcher<
    T & { readonly signatureFileID?: number },
    TVariables
  >;

  "signatureFileID+"<
    XAlias extends string = "signatureFileID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"signatureFileID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~signatureFileID": DocumentUserFetcher<
    Omit<T, "signatureFileID">,
    TVariables
  >;

  fieldValues<X extends object, XVariables extends object>(
    child: ObjectFetcher<"DocumentUserFieldValue", X, XVariables>
  ): DocumentUserFetcher<
    T & { readonly fieldValues?: readonly X[] },
    TVariables & XVariables
  >;

  fieldValues<
    X extends object,
    XVariables extends object,
    XAlias extends string = "fieldValues",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"DocumentUserFieldValue", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"fieldValues", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly sharePurchaseID: DocumentUserFetcher<
    T & { readonly sharePurchaseID?: number },
    TVariables
  >;

  "sharePurchaseID+"<
    XAlias extends string = "sharePurchaseID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sharePurchaseID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~sharePurchaseID": DocumentUserFetcher<
    Omit<T, "sharePurchaseID">,
    TVariables
  >;

  buyAlert<X extends object, XVariables extends object>(
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>
  ): DocumentUserFetcher<
    T & { readonly buyAlert?: X },
    TVariables & XVariables
  >;

  buyAlert<
    X extends object,
    XVariables extends object,
    XAlias extends string = "buyAlert",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"InvestorBuyAlert", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"buyAlert", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;

  signature<X extends object, XVariables extends object>(
    child: ObjectFetcher<"CloudFiles", X, XVariables>
  ): DocumentUserFetcher<
    T & { readonly signature?: X },
    TVariables & XVariables
  >;

  signature<
    X extends object,
    XVariables extends object,
    XAlias extends string = "signature",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"CloudFiles", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"signature", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFetcher<
    T & { readonly [key in XAlias]?: X },
    TVariables & XVariables & XDirectiveVariables
  >;

  document<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Document", X, XVariables>
  ): DocumentUserFetcher<T & { readonly document: X }, TVariables & XVariables>;

  document<
    X extends object,
    XVariables extends object,
    XAlias extends string = "document",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Document", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"document", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const documentUser$: DocumentUserFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "DocumentUser",
    "EMBEDDED",
    [],
    [
      "ID",
      "contents",
      {
        category: "SCALAR",
        name: "investorID",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "stoID",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "documentID",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "directoryID",
        undefinable: true,
      },
      "status",
      "fieldValuesJson",
      "documentOfferInvestorID",
      {
        category: "SCALAR",
        name: "signatureFilePath",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "signatureDate",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "signatureFileID",
        undefinable: true,
      },
      {
        category: "LIST",
        name: "fieldValues",
        targetTypeName: "DocumentUserFieldValue",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "sharePurchaseID",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "buyAlert",
        targetTypeName: "InvestorBuyAlert",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "signature",
        targetTypeName: "CloudFiles",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "document",
        targetTypeName: "Document",
      },
    ]
  ),
  undefined
);

export const documentUser$$ =
  documentUser$.ID.contents.investorID.stoID.documentID.directoryID.status
    .fieldValuesJson.documentOfferInvestorID.signatureFilePath.signatureDate
    .signatureFileID.sharePurchaseID;
