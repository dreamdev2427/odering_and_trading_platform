import type { FieldOptions, DirectiveArgs } from "graphql-ts-client-api";
import type { ObjectFetcher } from "graphql-ts-client-api";
import { createFetcher, createFetchableType } from "graphql-ts-client-api";
import type { WithTypeName, ImplementationType } from "../CommonTypes";
import type { SENDER_TYPE } from "../enums";
import type { RECEIVER_TYPE } from "../enums";
import type { MESSAGE_TYPE } from "../enums";
import type { CHAT_CONTEXT } from "../enums";

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 *
 * So any instance of this interface is reuseable.
 */
export interface ChatFetcher<T extends object, TVariables extends object>
  extends ObjectFetcher<"Chat", T, TVariables> {
  on<
    XName extends ImplementationType<"Chat">,
    X extends object,
    XVariables extends object
  >(
    child: ObjectFetcher<XName, X, XVariables>,
    fragmentName?: string // undefined: inline fragment; otherwise, otherwise, real fragment
  ): ChatFetcher<
    XName extends "Chat"
      ? T & X
      : WithTypeName<T, ImplementationType<"Chat">> &
          (
            | WithTypeName<X, ImplementationType<XName>>
            | {
                __typename: Exclude<
                  ImplementationType<"Chat">,
                  ImplementationType<XName>
                >;
              }
          ),
    TVariables & XVariables
  >;

  directive(name: string, args?: DirectiveArgs): ChatFetcher<T, TVariables>;

  readonly __typename: ChatFetcher<
    T & { __typename: ImplementationType<"Chat"> },
    TVariables
  >;

  readonly ID: ChatFetcher<T & { readonly ID: number }, TVariables>;

  "ID+"<
    XAlias extends string = "ID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"ID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~ID": ChatFetcher<Omit<T, "ID">, TVariables>;

  readonly sender: ChatFetcher<
    T & { readonly sender: SENDER_TYPE },
    TVariables
  >;

  "sender+"<
    XAlias extends string = "sender",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"sender", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: SENDER_TYPE }
        : { readonly [key in XAlias]: SENDER_TYPE }),
    TVariables & XDirectiveVariables
  >;

  readonly "~sender": ChatFetcher<Omit<T, "sender">, TVariables>;

  readonly receiver: ChatFetcher<
    T & { readonly receiver: RECEIVER_TYPE },
    TVariables
  >;

  "receiver+"<
    XAlias extends string = "receiver",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"receiver", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: RECEIVER_TYPE }
        : { readonly [key in XAlias]: RECEIVER_TYPE }),
    TVariables & XDirectiveVariables
  >;

  readonly "~receiver": ChatFetcher<Omit<T, "receiver">, TVariables>;

  readonly investorID: ChatFetcher<
    T & { readonly investorID: number },
    TVariables
  >;

  "investorID+"<
    XAlias extends string = "investorID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"investorID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~investorID": ChatFetcher<Omit<T, "investorID">, TVariables>;

  readonly adminID: ChatFetcher<T & { readonly adminID: number }, TVariables>;

  "adminID+"<
    XAlias extends string = "adminID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"adminID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~adminID": ChatFetcher<Omit<T, "adminID">, TVariables>;

  readonly stoID: ChatFetcher<T & { readonly stoID: number }, TVariables>;

  "stoID+"<
    XAlias extends string = "stoID",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"stoID", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~stoID": ChatFetcher<Omit<T, "stoID">, TVariables>;

  readonly message: ChatFetcher<T & { readonly message: string }, TVariables>;

  "message+"<
    XAlias extends string = "message",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"message", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: string }
        : { readonly [key in XAlias]: string }),
    TVariables & XDirectiveVariables
  >;

  readonly "~message": ChatFetcher<Omit<T, "message">, TVariables>;

  readonly type: ChatFetcher<T & { readonly type: MESSAGE_TYPE }, TVariables>;

  "type+"<
    XAlias extends string = "type",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"type", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: MESSAGE_TYPE }
        : { readonly [key in XAlias]: MESSAGE_TYPE }),
    TVariables & XDirectiveVariables
  >;

  readonly "~type": ChatFetcher<Omit<T, "type">, TVariables>;

  readonly dateSent: ChatFetcher<T & { readonly dateSent: number }, TVariables>;

  "dateSent+"<
    XAlias extends string = "dateSent",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateSent", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: number }
        : { readonly [key in XAlias]: number }),
    TVariables & XDirectiveVariables
  >;

  readonly "~dateSent": ChatFetcher<Omit<T, "dateSent">, TVariables>;

  readonly isRead: ChatFetcher<T & { readonly isRead: boolean }, TVariables>;

  "isRead+"<
    XAlias extends string = "isRead",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isRead", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isRead": ChatFetcher<Omit<T, "isRead">, TVariables>;

  readonly dateRead: ChatFetcher<
    T & { readonly dateRead?: number },
    TVariables
  >;

  "dateRead+"<
    XAlias extends string = "dateRead",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"dateRead", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ChatFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~dateRead": ChatFetcher<Omit<T, "dateRead">, TVariables>;

  readonly isEdited: ChatFetcher<
    T & { readonly isEdited: boolean },
    TVariables
  >;

  "isEdited+"<
    XAlias extends string = "isEdited",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isEdited", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isEdited": ChatFetcher<Omit<T, "isEdited">, TVariables>;

  readonly location: ChatFetcher<
    T & { readonly location?: string },
    TVariables
  >;

  "location+"<
    XAlias extends string = "location",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"location", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ChatFetcher<
    T & { readonly [key in XAlias]?: string },
    TVariables & XDirectiveVariables
  >;

  readonly "~location": ChatFetcher<Omit<T, "location">, TVariables>;

  readonly isDeleted: ChatFetcher<
    T & { readonly isDeleted: boolean },
    TVariables
  >;

  "isDeleted+"<
    XAlias extends string = "isDeleted",
    XDirectives extends { readonly [key: string]: DirectiveArgs } = {},
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"isDeleted", {}, {}>
    ) => FieldOptions<XAlias, XDirectives, XDirectiveVariables>
  ): ChatFetcher<
    T &
      (XDirectives extends { readonly include: any } | { readonly skip: any }
        ? { readonly [key in XAlias]?: boolean }
        : { readonly [key in XAlias]: boolean }),
    TVariables & XDirectiveVariables
  >;

  readonly "~isDeleted": ChatFetcher<Omit<T, "isDeleted">, TVariables>;

  readonly context: ChatFetcher<
    T & { readonly context?: CHAT_CONTEXT },
    TVariables
  >;

  "context+"<
    XAlias extends string = "context",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"context", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ChatFetcher<
    T & { readonly [key in XAlias]?: CHAT_CONTEXT },
    TVariables & XDirectiveVariables
  >;

  readonly "~context": ChatFetcher<Omit<T, "context">, TVariables>;

  readonly contextID: ChatFetcher<
    T & { readonly contextID?: number },
    TVariables
  >;

  "contextID+"<
    XAlias extends string = "contextID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"contextID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ChatFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~contextID": ChatFetcher<Omit<T, "contextID">, TVariables>;

  readonly contextReceiverID: ChatFetcher<
    T & { readonly contextReceiverID?: number },
    TVariables
  >;

  "contextReceiverID+"<
    XAlias extends string = "contextReceiverID",
    XDirectiveVariables extends object = {}
  >(
    optionsConfigurer: (
      options: FieldOptions<"contextReceiverID", {}, {}>
    ) => FieldOptions<
      XAlias,
      { readonly [key: string]: DirectiveArgs },
      XDirectiveVariables
    >
  ): ChatFetcher<
    T & { readonly [key in XAlias]?: number },
    TVariables & XDirectiveVariables
  >;

  readonly "~contextReceiverID": ChatFetcher<
    Omit<T, "contextReceiverID">,
    TVariables
  >;
}

export const chat$: ChatFetcher<{}, {}> = createFetcher(
  createFetchableType(
    "Chat",
    "EMBEDDED",
    [],
    [
      "ID",
      "sender",
      "receiver",
      "investorID",
      "adminID",
      "stoID",
      "message",
      "type",
      "dateSent",
      "isRead",
      {
        category: "SCALAR",
        name: "dateRead",
        undefinable: true,
      },
      "isEdited",
      {
        category: "SCALAR",
        name: "location",
        undefinable: true,
      },
      "isDeleted",
      {
        category: "SCALAR",
        name: "context",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "contextID",
        undefinable: true,
      },
      {
        category: "SCALAR",
        name: "contextReceiverID",
        undefinable: true,
      },
    ]
  ),
  undefined
);

export const chat$$ =
  chat$.ID.sender.receiver.investorID.adminID.stoID.message.type.dateSent.isRead
    .dateRead.isEdited.location.isDeleted.context.contextID.contextReceiverID;
