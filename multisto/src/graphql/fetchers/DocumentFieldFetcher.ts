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
export interface DocumentFieldFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"DocumentField", T, TVariables> {
  on<
    XName extends ImplementationType<"DocumentField">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): DocumentFieldFetcher<
    XName extends "DocumentField"
      ? T & X
      : WithTypeName<T, ImplementationType<"DocumentField">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"DocumentField">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): DocumentFieldFetcher<T, TVariables>;

  readonly __typename: DocumentFieldFetcher<
    T & { __typename: ImplementationType<"DocumentField"> },
    TVariables
  >;

  readonly ID: DocumentFieldFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentFieldFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": DocumentFieldFetcher<Omit<T, "ID">, TVariables>;

  readonly documentID: DocumentFieldFetcher<
    T & { readonly documentID: number },
    TVariables
  >;

  "documentID+"<
    XAlias extends string = "documentID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"documentID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentFieldFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~documentID": DocumentFieldFetcher<
    Omit<T, "documentID">,
    TVariables
  >;

  readonly stoID: DocumentFieldFetcher<
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
  ): DocumentFieldFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": DocumentFieldFetcher<Omit<T, "stoID">, TVariables>;

  readonly title: DocumentFieldFetcher<
    T & { readonly title: string },
    TVariables
  >;

  "title+"<
    XAlias extends string = "title",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"title", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentFieldFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": DocumentFieldFetcher<Omit<T, "title">, TVariables>;

  readonly type: DocumentFieldFetcher<
    T & { readonly type: number },
    TVariables
  >;

  "type+"<
    XAlias extends string = "type",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"type", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentFieldFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~type": DocumentFieldFetcher<Omit<T, "type">, TVariables>;

  readonly helperText: DocumentFieldFetcher<
    T & { readonly helperText: string },
    TVariables
  >;

  "helperText+"<
    XAlias extends string = "helperText",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"helperText", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentFieldFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~helperText": DocumentFieldFetcher<
    Omit<T, "helperText">,
    TVariables
  >;

  readonly fieldID: DocumentFieldFetcher<
    T & { readonly fieldID: string },
    TVariables
  >;

  "fieldID+"<
    XAlias extends string = "fieldID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"fieldID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentFieldFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~fieldID": DocumentFieldFetcher<Omit<T, "fieldID">, TVariables>;

  readonly externalFileDataLabel: DocumentFieldFetcher<
    T & { readonly externalFileDataLabel: string },
    TVariables
  >;

  "externalFileDataLabel+"<
    XAlias extends string = "externalFileDataLabel",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"externalFileDataLabel", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): DocumentFieldFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~externalFileDataLabel": DocumentFieldFetcher<
    Omit<T, "externalFileDataLabel">,
    TVariables
  >;
}

export const documentField$: DocumentFieldFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "DocumentField",
    "EMBEDDED",
    [],
    [
      "ID",
      "documentID",
      "stoID",
      "title",
      "type",
      "helperText",
      "fieldID",
      "externalFileDataLabel",
    ]
  ),
  undefined
);

export const documentField$$ =
  documentField$.ID.documentID.stoID.title.type.helperText.fieldID
    .externalFileDataLabel;
