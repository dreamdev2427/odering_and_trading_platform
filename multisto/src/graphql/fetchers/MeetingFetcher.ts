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
export interface MeetingFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Meeting", T, TVariables> {
  on<
    XName extends ImplementationType<"Meeting">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): MeetingFetcher<
    XName extends "Meeting"
      ? T & X
      : WithTypeName<T, ImplementationType<"Meeting">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Meeting">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): MeetingFetcher<T, TVariables>;

  readonly __typename: MeetingFetcher<
    T & { __typename: ImplementationType<"Meeting"> },
    TVariables
  >;

  readonly ID: MeetingFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MeetingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": MeetingFetcher<Omit<T, "ID">, TVariables>;

  readonly stoID: MeetingFetcher<T & { readonly stoID: number }, TVariables>;

  "stoID+"<
    XAlias extends string = "stoID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MeetingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": MeetingFetcher<Omit<T, "stoID">, TVariables>;

  readonly title: MeetingFetcher<T & { readonly title: string }, TVariables>;

  "title+"<
    XAlias extends string = "title",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"title", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MeetingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~title": MeetingFetcher<Omit<T, "title">, TVariables>;

  readonly type: MeetingFetcher<T & { readonly type: number }, TVariables>;

  "type+"<
    XAlias extends string = "type",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"type", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MeetingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~type": MeetingFetcher<Omit<T, "type">, TVariables>;

  readonly nameResponsiblePerson: MeetingFetcher<
    T & { readonly nameResponsiblePerson?: string },
    TVariables
  >;

  "nameResponsiblePerson+"<
    XAlias extends string = "nameResponsiblePerson",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"nameResponsiblePerson", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MeetingFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~nameResponsiblePerson": MeetingFetcher<
    Omit<T, "nameResponsiblePerson">,
    TVariables
  >;

  readonly phoneResponsiblePerson: MeetingFetcher<
    T & { readonly phoneResponsiblePerson?: string },
    TVariables
  >;

  "phoneResponsiblePerson+"<
    XAlias extends string = "phoneResponsiblePerson",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"phoneResponsiblePerson", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MeetingFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~phoneResponsiblePerson": MeetingFetcher<
    Omit<T, "phoneResponsiblePerson">,
    TVariables
  >;

  readonly emailResponsiblePerson: MeetingFetcher<
    T & { readonly emailResponsiblePerson?: string },
    TVariables
  >;

  "emailResponsiblePerson+"<
    XAlias extends string = "emailResponsiblePerson",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"emailResponsiblePerson", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MeetingFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~emailResponsiblePerson": MeetingFetcher<
    Omit<T, "emailResponsiblePerson">,
    TVariables
  >;

  readonly nameProxyPerson: MeetingFetcher<
    T & { readonly nameProxyPerson?: string },
    TVariables
  >;

  "nameProxyPerson+"<
    XAlias extends string = "nameProxyPerson",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"nameProxyPerson", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MeetingFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~nameProxyPerson": MeetingFetcher<
    Omit<T, "nameProxyPerson">,
    TVariables
  >;

  readonly phoneProxyPerson: MeetingFetcher<
    T & { readonly phoneProxyPerson?: string },
    TVariables
  >;

  "phoneProxyPerson+"<
    XAlias extends string = "phoneProxyPerson",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"phoneProxyPerson", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MeetingFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~phoneProxyPerson": MeetingFetcher<
    Omit<T, "phoneProxyPerson">,
    TVariables
  >;

  readonly emailProxyPerson: MeetingFetcher<
    T & { readonly emailProxyPerson?: string },
    TVariables
  >;

  "emailProxyPerson+"<
    XAlias extends string = "emailProxyPerson",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"emailProxyPerson", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MeetingFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~emailProxyPerson": MeetingFetcher<
    Omit<T, "emailProxyPerson">,
    TVariables
  >;

  readonly place: MeetingFetcher<T & { readonly place?: string }, TVariables>;

  "place+"<
    XAlias extends string = "place",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"place", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MeetingFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~place": MeetingFetcher<Omit<T, "place">, TVariables>;

  readonly openDate: MeetingFetcher<
    T & { readonly openDate?: string },
    TVariables
  >;

  "openDate+"<
    XAlias extends string = "openDate",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"openDate", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MeetingFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~openDate": MeetingFetcher<Omit<T, "openDate">, TVariables>;

  readonly opendate: MeetingFetcher<
    T & { readonly opendate?: string },
    TVariables
  >;

  "opendate+"<
    XAlias extends string = "opendate",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"opendate", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MeetingFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~opendate": MeetingFetcher<Omit<T, "opendate">, TVariables>;

  readonly closeDate: MeetingFetcher<
    T & { readonly closeDate?: string },
    TVariables
  >;

  "closeDate+"<
    XAlias extends string = "closeDate",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"closeDate", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MeetingFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~closeDate": MeetingFetcher<Omit<T, "closeDate">, TVariables>;

  readonly closedate: MeetingFetcher<
    T & { readonly closedate?: string },
    TVariables
  >;

  "closedate+"<
    XAlias extends string = "closedate",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"closedate", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): MeetingFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~closedate": MeetingFetcher<Omit<T, "closedate">, TVariables>;

  readonly voteType: MeetingFetcher<
    T & { readonly voteType: number },
    TVariables
  >;

  "voteType+"<
    XAlias extends string = "voteType",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"voteType", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MeetingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~voteType": MeetingFetcher<Omit<T, "voteType">, TVariables>;

  readonly timezone: MeetingFetcher<
    T & { readonly timezone: string },
    TVariables
  >;

  "timezone+"<
    XAlias extends string = "timezone",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"timezone", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MeetingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~timezone": MeetingFetcher<Omit<T, "timezone">, TVariables>;

  readonly timePadding: MeetingFetcher<
    T & { readonly timePadding: number },
    TVariables
  >;

  "timePadding+"<
    XAlias extends string = "timePadding",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"timePadding", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): MeetingFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~timePadding": MeetingFetcher<Omit<T, "timePadding">, TVariables>;
}

export const meeting$: MeetingFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Meeting",
    "EMBEDDED",
    [],
    [
      "ID",
      "stoID",
      "title",
      "type",
      {
        category: "SCALAR",
        name: "nameResponsiblePerson",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "phoneResponsiblePerson",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "emailResponsiblePerson",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "nameProxyPerson",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "phoneProxyPerson",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "emailProxyPerson",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "place",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "openDate",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "opendate",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "closeDate",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "closedate",
        undefinable: true,
      },
      "voteType",
      "timezone",
      "timePadding",
    ]
  ),
  undefined
);

export const meeting$$ =
  meeting$.ID.stoID.title.type.nameResponsiblePerson.phoneResponsiblePerson
    .emailResponsiblePerson.nameProxyPerson.phoneProxyPerson.emailProxyPerson
    .place.openDate.opendate.closeDate.closedate.voteType.timezone.timePadding;
