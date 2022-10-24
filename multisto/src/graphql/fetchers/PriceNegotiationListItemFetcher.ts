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
export interface PriceNegotiationListItemFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"PriceNegotiationListItem", T, TVariables> {
  on<
    XName extends ImplementationType<"PriceNegotiationListItem">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): PriceNegotiationListItemFetcher<
    XName extends "PriceNegotiationListItem"
      ? T & X
      : WithTypeName<T, ImplementationType<"PriceNegotiationListItem">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"PriceNegotiationListItem">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): PriceNegotiationListItemFetcher<T, TVariables>;

  readonly __typename: PriceNegotiationListItemFetcher<
    T & { __typename: ImplementationType<"PriceNegotiationListItem"> },
    TVariables
  >;

  readonly counterpartID: PriceNegotiationListItemFetcher<
    T & { readonly counterpartID: number },
    TVariables
  >;

  "counterpartID+"<
    XAlias extends string = "counterpartID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"counterpartID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PriceNegotiationListItemFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~counterpartID": PriceNegotiationListItemFetcher<
    Omit<T, "counterpartID">,
    TVariables
  >;

  readonly orderID: PriceNegotiationListItemFetcher<
    T & { readonly orderID: number },
    TVariables
  >;

  "orderID+"<
    XAlias extends string = "orderID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"orderID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PriceNegotiationListItemFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~orderID": PriceNegotiationListItemFetcher<
    Omit<T, "orderID">,
    TVariables
  >;

  readonly orderOwnerID: PriceNegotiationListItemFetcher<
    T & { readonly orderOwnerID: number },
    TVariables
  >;

  "orderOwnerID+"<
    XAlias extends string = "orderOwnerID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"orderOwnerID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PriceNegotiationListItemFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~orderOwnerID": PriceNegotiationListItemFetcher<
    Omit<T, "orderOwnerID">,
    TVariables
  >;

  readonly isRead: PriceNegotiationListItemFetcher<
    T & { readonly isRead?: boolean },
    TVariables
  >;

  "isRead+"<
    XAlias extends string = "isRead",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isRead", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): PriceNegotiationListItemFetcher<
    T & { readonly [key in XAlias]?: boolean },
    TVariables & XDirectiveVariables
  >;

  readonly "~isRead": PriceNegotiationListItemFetcher<
    Omit<T, "isRead">,
    TVariables
  >;

  readonly dateRead: PriceNegotiationListItemFetcher<
    T & { readonly dateRead?: number },
    TVariables
  >;

  "dateRead+"<
    XAlias extends string = "dateRead",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateRead", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): PriceNegotiationListItemFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~dateRead": PriceNegotiationListItemFetcher<
    Omit<T, "dateRead">,
    TVariables
  >;

  readonly formattedDateSent: PriceNegotiationListItemFetcher<
    T & { readonly formattedDateSent: string },
    TVariables
  >;

  "formattedDateSent+"<
    XAlias extends string = "formattedDateSent",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"formattedDateSent", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PriceNegotiationListItemFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~formattedDateSent": PriceNegotiationListItemFetcher<
    Omit<T, "formattedDateSent">,
    TVariables
  >;

  readonly counterpartFullName: PriceNegotiationListItemFetcher<
    T & { readonly counterpartFullName: string },
    TVariables
  >;

  "counterpartFullName+"<
    XAlias extends string = "counterpartFullName",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"counterpartFullName", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PriceNegotiationListItemFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~counterpartFullName": PriceNegotiationListItemFetcher<
    Omit<T, "counterpartFullName">,
    TVariables
  >;
}

export const priceNegotiationListItem$: PriceNegotiationListItemFetcher<
  {},
  {}
> = createFetcher(
  createFetchableType(
    "PriceNegotiationListItem",
    "EMBEDDED",
    [],
    [
      "counterpartID",
      "orderID",
      "orderOwnerID",
      {
        category: "SCALAR",
        name: "isRead",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "dateRead",
        undefinable: true,
      },
      "formattedDateSent",
      "counterpartFullName",
    ]
  ),
  undefined
);

export const priceNegotiationListItem$$ =
  priceNegotiationListItem$.counterpartID.orderID.orderOwnerID.isRead.dateRead
    .formattedDateSent.counterpartFullName;
