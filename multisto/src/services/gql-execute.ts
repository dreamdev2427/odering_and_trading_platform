import got, { Headers } from "got";
import type { Fetcher } from "graphql-ts-client-api";
import { TextWriter, util } from "graphql-ts-client-api";
import { Request } from "express";

export interface Response<TData> {
  readonly data?: TData;
  readonly error?: Error;
}

export class GraphQLError extends Error {
  readonly errors: readonly GraphQLSubError[];

  constructor(errors: any) {
    super();
    this.errors = errors;
  }
}

export interface GraphQLSubError {
  readonly message: string;
  readonly path: string[];
}

export async function execute<TData extends object, TVariables extends object>(
  this: Request,
  fetcher: Fetcher<"Query" | "Mutation", TData, TVariables>,
  options?: {
    readonly operationName?: string;
    readonly variables?: TVariables;
  }
): Promise<TData> {
  if (!process.env.API_URL) {
    throw new Error("set the API_URL environment variable");
  }

  const writer = new TextWriter();
  writer.text(
    `${fetcher.fetchableType.name.toLowerCase()} ${
      options?.operationName ?? ""
    }`
  );
  if (fetcher.variableTypeMap.size !== 0) {
    writer.scope(
      {
        type: "ARGUMENTS",
        multiLines: fetcher.variableTypeMap.size > 2,
        suffix: " ",
      },
      () => {
        util.iterateMap(fetcher.variableTypeMap, ([name, type]) => {
          writer.seperator();
          writer.text(`$${name}: ${type}`);
        });
      }
    );
  }
  writer.text(fetcher.toString());
  writer.text(fetcher.toFragmentString());

  const headers: Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // call it as admin/platform admin
  if (this?.session?.JWTToken) {
    headers.Authorization = `Bearer ${this.session.JWTToken}`;
  }
  // call it as api role
  if (!this && (global as any).config?.API_JWT) {
    headers.Authorization = `Bearer ${(global as any).config.API_JWT}`;
  }

  const response = await got(process.env.API_URL, {
    method: "POST",
    responseType: "json",
    headers,
    body: JSON.stringify({
      query: writer.toString(),
      variables: options?.variables ?? {},
    }),
  });

  const rawResponse = response.body as any;
  if (rawResponse.errors) {
    throw new GraphQLError(rawResponse.errors);
  }
  return rawResponse.data as TData;
}
