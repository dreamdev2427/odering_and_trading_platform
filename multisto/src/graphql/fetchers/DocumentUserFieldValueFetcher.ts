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
export interface DocumentUserFieldValueFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"DocumentUserFieldValue", T, TVariables> {
  on<
    XName extends ImplementationType<"DocumentUserFieldValue">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): DocumentUserFieldValueFetcher<
    XName extends "DocumentUserFieldValue"
      ? T & X
      : WithTypeName<T, ImplementationType<"DocumentUserFieldValue">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"DocumentUserFieldValue">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): DocumentUserFieldValueFetcher<T, TVariables>;

  readonly __typename: DocumentUserFieldValueFetcher<
    T & { __typename: ImplementationType<"DocumentUserFieldValue"> },
    TVariables
  >;

  readonly ID: DocumentUserFieldValueFetcher<
    T & { readonly ID?: string },
    TVariables
  >;

  "ID+"<XAlias extends string = "ID", XDirectiveVariables extends object = {}>(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFieldValueFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": DocumentUserFieldValueFetcher<Omit<T, "ID">, TVariables>;

  readonly value: DocumentUserFieldValueFetcher<
    T & { readonly value?: string },
    TVariables
  >;

  "value+"<
    XAlias extends string = "value",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"value", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): DocumentUserFieldValueFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~value": DocumentUserFieldValueFetcher<
    Omit<T, "value">,
    TVariables
  >;
}

export const documentUserFieldValue$: DocumentUserFieldValueFetcher<{}, {}> =
  createFetcher(
    createFetchableType(
      "DocumentUserFieldValue",
      "EMBEDDED",
      [],
      [
        {
          category: "SCALAR",
          name: "ID",
          undefinable: true,
        },
        {
          category: "SCALAR",
          name: "value",
          undefinable: true,
        },
      ]
    ),
    undefined
  );

export const documentUserFieldValue$$ = documentUserFieldValue$.ID.value;
