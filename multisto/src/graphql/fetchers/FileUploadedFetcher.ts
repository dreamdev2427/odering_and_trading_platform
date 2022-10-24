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
export interface FileUploadedFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"FileUploaded", T, TVariables> {
  on<
    XName extends ImplementationType<"FileUploaded">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): FileUploadedFetcher<
    XName extends "FileUploaded"
      ? T & X
      : WithTypeName<T, ImplementationType<"FileUploaded">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"FileUploaded">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): FileUploadedFetcher<T, TVariables>;

  readonly __typename: FileUploadedFetcher<
    T & { __typename: ImplementationType<"FileUploaded"> },
    TVariables
  >;

  readonly link: FileUploadedFetcher<T & { readonly link: string }, TVariables>;

  "link+"<
    XAlias extends string = "link",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"link", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FileUploadedFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~link": FileUploadedFetcher<Omit<T, "link">, TVariables>;

  readonly name: FileUploadedFetcher<T & { readonly name: string }, TVariables>;

  "name+"<
    XAlias extends string = "name",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"name", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): FileUploadedFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~name": FileUploadedFetcher<Omit<T, "name">, TVariables>;
}

export const fileUploaded$: FileUploadedFetcher<{}, {}> = createFetcher(
  createFetchableType("FileUploaded", "EMBEDDED", [], ["link", "name"]),
  undefined
);

export const fileUploaded$$ = fileUploaded$.link.name;
