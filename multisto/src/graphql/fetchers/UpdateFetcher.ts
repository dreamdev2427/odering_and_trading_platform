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
export interface UpdateFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Update", T, TVariables> {
  on<
    XName extends ImplementationType<"Update">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): UpdateFetcher<
    XName extends "Update"
      ? T & X
      : WithTypeName<T, ImplementationType<"Update">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Update">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): UpdateFetcher<T, TVariables>;

  readonly __typename: UpdateFetcher<
    T & { __typename: ImplementationType<"Update"> },
    TVariables
  >;

  readonly ID: UpdateFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): UpdateFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": UpdateFetcher<Omit<T, "ID">, TVariables>;

  readonly stoID: UpdateFetcher<T & { readonly stoID: number }, TVariables>;

  "stoID+"<
    XAlias extends string = "stoID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): UpdateFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": UpdateFetcher<Omit<T, "stoID">, TVariables>;

  readonly title: UpdateFetcher<T & { readonly title: string }, TVariables>;

  "title+"<
    XAlias extends string = "title",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"title", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): UpdateFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": UpdateFetcher<Omit<T, "title">, TVariables>;

  readonly details: UpdateFetcher<T & { readonly details: string }, TVariables>;

  "details+"<
    XAlias extends string = "details",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"details", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): UpdateFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~details": UpdateFetcher<Omit<T, "details">, TVariables>;

  readonly coverphoto: UpdateFetcher<
    T & { readonly coverphoto: string },
    TVariables
  >;

  "coverphoto+"<
    XAlias extends string = "coverphoto",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"coverphoto", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): UpdateFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~coverphoto": UpdateFetcher<Omit<T, "coverphoto">, TVariables>;

  readonly date: UpdateFetcher<T & { readonly date: string }, TVariables>;

  "date+"<
    XAlias extends string = "date",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"date", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): UpdateFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~date": UpdateFetcher<Omit<T, "date">, TVariables>;
}

export const update$: UpdateFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Update",
    "EMBEDDED",
    [],
    ["ID", "stoID", "title", "details", "coverphoto", "date"]
  ),
  undefined
);

export const update$$ = update$.ID.stoID.title.details.coverphoto.date;
