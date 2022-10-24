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
export interface ComponentCustomizationFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"ComponentCustomization", T, TVariables> {
  on<
    XName extends ImplementationType<"ComponentCustomization">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ComponentCustomizationFetcher<
    XName extends "ComponentCustomization"
      ? T & X
      : WithTypeName<T, ImplementationType<"ComponentCustomization">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"ComponentCustomization">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): ComponentCustomizationFetcher<T, TVariables>;

  readonly __typename: ComponentCustomizationFetcher<
    T & { __typename: ImplementationType<"ComponentCustomization"> },
    TVariables
  >;

  readonly ID: ComponentCustomizationFetcher<
    T & { readonly ID: number },
    TVariables
  >;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ComponentCustomizationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": ComponentCustomizationFetcher<Omit<T, "ID">, TVariables>;

  readonly component: ComponentCustomizationFetcher<
    T & { readonly component: string },
    TVariables
  >;

  "component+"<
    XAlias extends string = "component",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"component", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ComponentCustomizationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~component": ComponentCustomizationFetcher<
    Omit<T, "component">,
    TVariables
  >;

  readonly body: ComponentCustomizationFetcher<
    T & { readonly body: string },
    TVariables
  >;

  "body+"<
    XAlias extends string = "body",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"body", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ComponentCustomizationFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~body": ComponentCustomizationFetcher<Omit<T, "body">, TVariables>;
}

export const componentCustomization$: ComponentCustomizationFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "ComponentCustomization",
      "EMBEDDED",
      [],
      ["ID", "component", "body"]
    ),
    undefined
  );

export const componentCustomization$$ =
  componentCustomization$.ID.component.body;
