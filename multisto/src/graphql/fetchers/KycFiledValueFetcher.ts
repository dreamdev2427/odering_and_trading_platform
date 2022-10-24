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
export interface KycFiledValueFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"KycFiledValue", T, TVariables> {
  on<
    XName extends ImplementationType<"KycFiledValue">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): KycFiledValueFetcher<
    XName extends "KycFiledValue"
      ? T & X
      : WithTypeName<T, ImplementationType<"KycFiledValue">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"KycFiledValue">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): KycFiledValueFetcher<T, TVariables>;

  readonly __typename: KycFiledValueFetcher<
    T & { __typename: ImplementationType<"KycFiledValue"> },
    TVariables
  >;

  readonly value: KycFiledValueFetcher<
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
  ): KycFiledValueFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~value": KycFiledValueFetcher<Omit<T, "value">, TVariables>;

  readonly label: KycFiledValueFetcher<
    T & { readonly label?: string },
    TVariables
  >;

  "label+"<
    XAlias extends string = "label",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"label", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): KycFiledValueFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~label": KycFiledValueFetcher<Omit<T, "label">, TVariables>;
}

export const kycFiledValue$: KycFiledValueFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "KycFiledValue",
    "EMBEDDED",
    [],
    [
      "value",
      {
        category: "SCALAR",
        name: "label",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const kycFiledValue$$ = kycFiledValue$.value.label;
