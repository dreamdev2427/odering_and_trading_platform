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
export interface AdminUserFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"AdminUser", T, TVariables> {
  on<
    XName extends ImplementationType<"AdminUser">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): AdminUserFetcher<
    XName extends "AdminUser"
      ? T & X
      : WithTypeName<T, ImplementationType<"AdminUser">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"AdminUser">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): AdminUserFetcher<T, TVariables>;

  readonly __typename: AdminUserFetcher<
    T & { __typename: ImplementationType<"AdminUser"> },
    TVariables
  >;

  readonly ID: AdminUserFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AdminUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": AdminUserFetcher<Omit<T, "ID">, TVariables>;

  readonly stoid: AdminUserFetcher<T & { readonly stoid?: number }, TVariables>;

  "stoid+"<
    XAlias extends string = "stoid",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoid", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AdminUserFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~stoid": AdminUserFetcher<Omit<T, "stoid">, TVariables>;

  readonly FirstName: AdminUserFetcher<
    T & { readonly FirstName?: string },
    TVariables
  >;

  "FirstName+"<
    XAlias extends string = "FirstName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"FirstName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AdminUserFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~FirstName": AdminUserFetcher<Omit<T, "FirstName">, TVariables>;

  readonly LastName: AdminUserFetcher<
    T & { readonly LastName?: string },
    TVariables
  >;

  "LastName+"<
    XAlias extends string = "LastName",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"LastName", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AdminUserFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~LastName": AdminUserFetcher<Omit<T, "LastName">, TVariables>;

  readonly isActive: AdminUserFetcher<
    T & { readonly isActive?: number },
    TVariables
  >;

  "isActive+"<
    XAlias extends string = "isActive",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isActive", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AdminUserFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~isActive": AdminUserFetcher<Omit<T, "isActive">, TVariables>;

  readonly Username: AdminUserFetcher<
    T & { readonly Username: string },
    TVariables
  >;

  "Username+"<
    XAlias extends string = "Username",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"Username", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): AdminUserFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~Username": AdminUserFetcher<Omit<T, "Username">, TVariables>;

  readonly twofactorenable: AdminUserFetcher<
    T & { readonly twofactorenable?: number },
    TVariables
  >;

  "twofactorenable+"<
    XAlias extends string = "twofactorenable",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"twofactorenable", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AdminUserFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~twofactorenable": AdminUserFetcher<
    Omit<T, "twofactorenable">,
    TVariables
  >;

  readonly email: AdminUserFetcher<T & { readonly email?: string }, TVariables>;

  "email+"<
    XAlias extends string = "email",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"email", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AdminUserFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~email": AdminUserFetcher<Omit<T, "email">, TVariables>;

  readonly isPlatformAdminLogin: AdminUserFetcher<
    T & { readonly isPlatformAdminLogin?: number },
    TVariables
  >;

  "isPlatformAdminLogin+"<
    XAlias extends string = "isPlatformAdminLogin",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isPlatformAdminLogin", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): AdminUserFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~isPlatformAdminLogin": AdminUserFetcher<
    Omit<T, "isPlatformAdminLogin">,
    TVariables
  >;
}

export const adminUser$: AdminUserFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "AdminUser",
    "EMBEDDED",
    [],
    [
      "ID",
      {
        category: "SCALAR",
        name: "stoid",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "FirstName",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "LastName",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "isActive",
        undefinable: true,
      },
      "Username",
      {
        category: "SCALAR",
        name: "twofactorenable",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "email",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "isPlatformAdminLogin",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const adminUser$$ =
  adminUser$.ID.stoid.FirstName.LastName.isActive.Username.twofactorenable.email
    .isPlatformAdminLogin;
