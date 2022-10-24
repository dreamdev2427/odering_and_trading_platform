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
export interface TranslationFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Translation", T, TVariables> {
  on<
    XName extends ImplementationType<"Translation">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): TranslationFetcher<
    XName extends "Translation"
      ? T & X
      : WithTypeName<T, ImplementationType<"Translation">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Translation">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): TranslationFetcher<T, TVariables>;

  readonly __typename: TranslationFetcher<
    T & { __typename: ImplementationType<"Translation"> },
    TVariables
  >;

  readonly key: TranslationFetcher<T & { readonly key: string }, TVariables>;

  "key+"<
    XAlias extends string = "key",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"key", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): TranslationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~key": TranslationFetcher<Omit<T, "key">, TVariables>;

  readonly locale: TranslationFetcher<
    T & { readonly locale: string },
    TVariables
  >;

  "locale+"<
    XAlias extends string = "locale",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"locale", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): TranslationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~locale": TranslationFetcher<Omit<T, "locale">, TVariables>;

  readonly translation: TranslationFetcher<
    T & { readonly translation: string },
    TVariables
  >;

  "translation+"<
    XAlias extends string = "translation",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"translation", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): TranslationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~translation": TranslationFetcher<
    Omit<T, "translation">,
    TVariables
  >;
}

export const translation$: TranslationFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Translation",
    "EMBEDDED",
    [],
    ["key", "locale", "translation"]
  ),
  undefined
);

export const translation$$ = translation$.key.locale.translation;
