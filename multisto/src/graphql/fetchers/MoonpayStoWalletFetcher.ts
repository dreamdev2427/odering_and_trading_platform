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
export interface MoonpayStoWalletFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"MoonpayStoWallet", T, TVariables> {
  on<
    XName extends ImplementationType<"MoonpayStoWallet">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): MoonpayStoWalletFetcher<
    XName extends "MoonpayStoWallet"
      ? T & X
      : WithTypeName<T, ImplementationType<"MoonpayStoWallet">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"MoonpayStoWallet">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): MoonpayStoWalletFetcher<T, TVariables>;

  readonly __typename: MoonpayStoWalletFetcher<
    T & { __typename: ImplementationType<"MoonpayStoWallet"> },
    TVariables
  >;

  readonly stoID: MoonpayStoWalletFetcher<
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
  ): MoonpayStoWalletFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": MoonpayStoWalletFetcher<Omit<T, "stoID">, TVariables>;

  readonly walletAddress: MoonpayStoWalletFetcher<
    T & { readonly walletAddress: string },
    TVariables
  >;

  "walletAddress+"<
    XAlias extends string = "walletAddress",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"walletAddress", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MoonpayStoWalletFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~walletAddress": MoonpayStoWalletFetcher<
    Omit<T, "walletAddress">,
    TVariables
  >;

  readonly walletAddressTag: MoonpayStoWalletFetcher<
    T & { readonly walletAddressTag?: string },
    TVariables
  >;

  "walletAddressTag+"<
    XAlias extends string = "walletAddressTag",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"walletAddressTag", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MoonpayStoWalletFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~walletAddressTag": MoonpayStoWalletFetcher<
    Omit<T, "walletAddressTag">,
    TVariables
  >;
}

export const moonpayStoWallet$: MoonpayStoWalletFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "MoonpayStoWallet",
    "EMBEDDED",
    [],
    [
      "stoID",
      "walletAddress",
      {
        category: "SCALAR",
        name: "walletAddressTag",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const moonpayStoWallet$$ =
  moonpayStoWallet$.stoID.walletAddress.walletAddressTag;
