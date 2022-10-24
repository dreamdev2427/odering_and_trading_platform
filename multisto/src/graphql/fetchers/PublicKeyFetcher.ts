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
export interface PublicKeyFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"PublicKey", T, TVariables> {
  on<
    XName extends ImplementationType<"PublicKey">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): PublicKeyFetcher<
    XName extends "PublicKey"
      ? T & X
      : WithTypeName<T, ImplementationType<"PublicKey">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"PublicKey">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): PublicKeyFetcher<T, TVariables>;

  readonly __typename: PublicKeyFetcher<
    T & { __typename: ImplementationType<"PublicKey"> },
    TVariables
  >;

  readonly ID: PublicKeyFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PublicKeyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": PublicKeyFetcher<Omit<T, "ID">, TVariables>;

  readonly blockchainID: PublicKeyFetcher<
    T & { readonly blockchainID: number },
    TVariables
  >;

  "blockchainID+"<
    XAlias extends string = "blockchainID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"blockchainID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PublicKeyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~blockchainID": PublicKeyFetcher<
    Omit<T, "blockchainID">,
    TVariables
  >;

  readonly title: PublicKeyFetcher<T & { readonly title: string }, TVariables>;

  "title+"<
    XAlias extends string = "title",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"title", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PublicKeyFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": PublicKeyFetcher<Omit<T, "title">, TVariables>;
}

export const publicKey$: PublicKeyFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "PublicKey",
    "EMBEDDED",
    [],
    ["ID", "blockchainID", "title"]
  ),
  undefined
);

export const publicKey$$ = publicKey$.ID.blockchainID.title;
