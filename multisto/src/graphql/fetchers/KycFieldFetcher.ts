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
export interface KycFieldFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"KycField", T, TVariables> {
  on<
    XName extends ImplementationType<"KycField">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): KycFieldFetcher<
    XName extends "KycField"
      ? T & X
      : WithTypeName<T, ImplementationType<"KycField">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"KycField">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): KycFieldFetcher<T, TVariables>;

  readonly __typename: KycFieldFetcher<
    T & { __typename: ImplementationType<"KycField"> },
    TVariables
  >;

  values<X extends object, XVariables extends object>(
    child: ObjectFetcher<"KycFiledValue", X, XVariables>
  ): KycFieldFetcher<
    T & { readonly values?: readonly X[] },
    TVariables & XVariables
  >;

  values<
    X extends object,
    XVariables extends object,
    XAlias extends string = "values",
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"KycFiledValue", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"values", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): KycFieldFetcher<
    T & { readonly [key in XAlias]?: readonly X[] },
    TVariables & XVariables & XDirectiveVariables
  >;

  readonly name: KycFieldFetcher<T & { readonly name: string }, TVariables>;

  "name+"<
    XAlias extends string = "name",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"name", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): KycFieldFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~name": KycFieldFetcher<Omit<T, "name">, TVariables>;

  readonly label: KycFieldFetcher<T & { readonly label?: string }, TVariables>;

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
  ): KycFieldFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~label": KycFieldFetcher<Omit<T, "label">, TVariables>;

  readonly placeholder: KycFieldFetcher<
    T & { readonly placeholder?: string },
    TVariables
  >;

  "placeholder+"<
    XAlias extends string = "placeholder",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"placeholder", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): KycFieldFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~placeholder": KycFieldFetcher<Omit<T, "placeholder">, TVariables>;

  readonly description: KycFieldFetcher<
    T & { readonly description?: string },
    TVariables
  >;

  "description+"<
    XAlias extends string = "description",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"description", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): KycFieldFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~description": KycFieldFetcher<Omit<T, "description">, TVariables>;

  readonly error: KycFieldFetcher<T & { readonly error?: string }, TVariables>;

  "error+"<
    XAlias extends string = "error",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"error", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): KycFieldFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~error": KycFieldFetcher<Omit<T, "error">, TVariables>;

  readonly required: KycFieldFetcher<
    T & { readonly required: boolean },
    TVariables
  >;

  "required+"<
    XAlias extends string = "required",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"required", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): KycFieldFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~required": KycFieldFetcher<Omit<T, "required">, TVariables>;

  readonly type: KycFieldFetcher<T & { readonly type: string }, TVariables>;

  "type+"<
    XAlias extends string = "type",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"type", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): KycFieldFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~type": KycFieldFetcher<Omit<T, "type">, TVariables>;
}

export const kycField$: KycFieldFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "KycField",
    "EMBEDDED",
    [],
    [
      {
        category: "LIST",
        name: "values",
        targetTypeName: "KycFiledValue",
        undefinable: true,
      },
      "name",
      {
        category: "SCALAR",
        name: "label",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "placeholder",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "description",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "error",
        undefinable: true,
      },
      "required",
      "type",
    ]
  ),
  undefined
);

export const kycField$$ =
  kycField$.name.label.placeholder.description.error.required.type;
