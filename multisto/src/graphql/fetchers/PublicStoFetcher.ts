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
export interface PublicStoFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"PublicSto", T, TVariables> {
  on<
    XName extends ImplementationType<"PublicSto">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): PublicStoFetcher<
    XName extends "PublicSto"
      ? T & X
      : WithTypeName<T, ImplementationType<"PublicSto">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"PublicSto">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): PublicStoFetcher<T, TVariables>;

  readonly __typename: PublicStoFetcher<
    T & { __typename: ImplementationType<"PublicSto"> },
    TVariables
  >;

  settings<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Settings", X, XVariables>
  ): PublicStoFetcher<T & { readonly settings: X }, TVariables & XVariables>;

  settings<
    X extends object,
    XVariables extends object,
    XAlias extends string = "settings",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Settings", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"settings", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PublicStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly stolinkfull: PublicStoFetcher<
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
  ): PublicStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stolinkfull": PublicStoFetcher<Omit<T, "stolinkfull">, TVariables>;

  readonly logo: PublicStoFetcher<T & { readonly logo: string }, TVariables>;

  "logo+"<
    XAlias extends string = "logo",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"logo", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PublicStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~logo": PublicStoFetcher<Omit<T, "logo">, TVariables>;

  readonly registrationText: PublicStoFetcher<
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
  ): PublicStoFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~registrationText": PublicStoFetcher<
    Omit<T, "registrationText">,
    TVariables
  >;

  readonly title: PublicStoFetcher<T & { readonly title: string }, TVariables>;

  "title+"<
    XAlias extends string = "title",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"title", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): PublicStoFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": PublicStoFetcher<Omit<T, "title">, TVariables>;
}

export const publicSto$: PublicStoFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "PublicSto",
    "EMBEDDED",
    [],
    [
      {
        category: "SCALAR",
        name: "settings",
        targetTypeName: "Settings",
      },
      "stolinkfull",
      "logo",
      {
        category: "SCALAR",
        name: "registrationText",
        undefinable: true,
      },
      "title",
    ]
  ),
  undefined
);

export const publicSto$$ = publicSto$.stolinkfull.logo.registrationText.title;
