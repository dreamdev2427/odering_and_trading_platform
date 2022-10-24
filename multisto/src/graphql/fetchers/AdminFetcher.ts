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
export interface AdminFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Admin", T, TVariables> {
  on<
    XName extends ImplementationType<"Admin">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): AdminFetcher<
    XName extends "Admin"
      ? T & X
      : WithTypeName<T, ImplementationType<"Admin">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Admin">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): AdminFetcher<T, TVariables>;

  readonly __typename: AdminFetcher<
    T & { __typename: ImplementationType<"Admin"> },
    TVariables
  >;

  user<X extends object, XVariables extends object>(
    child: ObjectFetcher<"AdminUser", X, XVariables>
  ): AdminFetcher<T & { readonly user: X }, TVariables & XVariables>;

  user<
    X extends object,
    XVariables extends object,
    XAlias extends string = "user",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"AdminUser", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"user", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AdminFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;

  STO<X extends object, XVariables extends object>(
    child: ObjectFetcher<"Sto", X, XVariables>
  ): AdminFetcher<T & { readonly STO: X }, TVariables & XVariables>;

  STO<
    X extends object,
    XVariables extends object,
    XAlias extends string = "STO",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    child: ObjectFetcher<"Sto", X, XVariables>,
    optionsConfigurer: (
      options: FieldOptions<"STO", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AdminFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: X }
        : { readonly [key in XAlias]: X }),
    TVariables & XVariables & XDirectiveVariables
  >;
}

export const admin$: AdminFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Admin",
    "EMBEDDED",
    [],
    [
      {
        category: "SCALAR",
        name: "user",
        targetTypeName: "AdminUser",
      },
      {
        category: "SCALAR",
        name: "STO",
        targetTypeName: "Sto",
      },
    ]
  ),
  undefined
);
