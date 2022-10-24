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
export interface StoInvestorTypeFetcher<
  T extends object,
  TVariables extends object
> extends ObjectFetcher<"StoInvestorType", T, TVariables> {
  on<
    XName extends ImplementationType<"StoInvestorType">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): StoInvestorTypeFetcher<
    XName extends "StoInvestorType"
      ? T & X
      : WithTypeName<T, ImplementationType<"StoInvestorType">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"StoInvestorType">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(
    name: string,
    args?: DirectiveArgs
  ): StoInvestorTypeFetcher<T, TVariables>;

  readonly __typename: StoInvestorTypeFetcher<
    T & { __typename: ImplementationType<"StoInvestorType"> },
    TVariables
  >;

  readonly ID: StoInvestorTypeFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): StoInvestorTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": StoInvestorTypeFetcher<Omit<T, "ID">, TVariables>;

  readonly type: StoInvestorTypeFetcher<
    T & { readonly type: string },
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
  ): StoInvestorTypeFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~type": StoInvestorTypeFetcher<Omit<T, "type">, TVariables>;
}

export const stoInvestorType$: StoInvestorTypeFetcher<{}, {}> = createFetcher(
  createFetchableType("StoInvestorType", "EMBEDDED", [], ["ID", "type"]),
  undefined
);

export const stoInvestorType$$ = stoInvestorType$.ID.type;
