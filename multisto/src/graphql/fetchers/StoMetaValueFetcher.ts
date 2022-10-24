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
export interface StoMetaValueFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"StoMetaValue", T, TVariables> {
  on<
    XName extends ImplementationType<"StoMetaValue">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): StoMetaValueFetcher<
    XName extends "StoMetaValue"
      ? T & X
      : WithTypeName<T, ImplementationType<"StoMetaValue">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"StoMetaValue">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): StoMetaValueFetcher<T, TVariables>;

  readonly __typename: StoMetaValueFetcher<
    T & { __typename: ImplementationType<"StoMetaValue"> },
    TVariables
  >;

  readonly stoID: StoMetaValueFetcher<
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
  ): StoMetaValueFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": StoMetaValueFetcher<Omit<T, "stoID">, TVariables>;

  readonly key: StoMetaValueFetcher<T & { readonly key: string }, TVariables>;

  "key+"<
    XAlias extends string = "key",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"key", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoMetaValueFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~key": StoMetaValueFetcher<Omit<T, "key">, TVariables>;

  readonly value: StoMetaValueFetcher<
    T & { readonly value: string },
    TVariables
  >;

  "value+"<
    XAlias extends string = "value",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"value", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoMetaValueFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~value": StoMetaValueFetcher<Omit<T, "value">, TVariables>;

  readonly order: StoMetaValueFetcher<
    T & { readonly order: number },
    TVariables
  >;

  "order+"<
    XAlias extends string = "order",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"order", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoMetaValueFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~order": StoMetaValueFetcher<Omit<T, "order">, TVariables>;

  readonly display: StoMetaValueFetcher<
    T & { readonly display: boolean },
    TVariables
  >;

  "display+"<
    XAlias extends string = "display",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"display", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoMetaValueFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~display": StoMetaValueFetcher<Omit<T, "display">, TVariables>;
}

export const stoMetaValue$: StoMetaValueFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "StoMetaValue",
    "EMBEDDED",
    [],
    ["stoID", "key", "value", "order", "display"]
  ),
  undefined
);

export const stoMetaValue$$ = stoMetaValue$.stoID.key.value.order.display;
