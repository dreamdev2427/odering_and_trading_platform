import { createReadStream } from "fs";
import { resolve } from "path";
import got, { Headers } from "got";
import multer from "multer";
import FormData from "form-data";
import { Request } from "express";

import { GraphQLError } from "./gql-execute";

export const upload = multer({ dest: "uploads/" });

interface Uploaded {
  name: string;
  link: string;
}

export const uploadToGql = async (req: Request): Promise<Uploaded> => {
  if (!process.env.API_URL) {
    throw new Error("set the API_URL environment variable");
  }

  if (!req.file) {
    throw new Error("bad-file");
  }

  const headers: Headers = {};

  // call it as admin/platform admin
  if (req?.session?.JWTToken) {
    headers.Authorization = `Bearer ${req.session.JWTToken}`;
  }
  // call it as api role
  if (!this && (global as any).config?.API_JWT) {
    headers.Authorization = `Bearer ${(global as any).config.API_JWT}`;
  }

  const { originalname: filename, path } = req.file;

  const file = createReadStream(resolve(__dirname, `../../${path}`));

  const body = new FormData();

  body.append(
    "operations",
    JSON.stringify({
      query: /* GraphQL */ `
        mutation($file: Upload!) {
          fileUpload(file: $file) {
            name
            link
          }
        }
      `,
      variables: {
        file: null,
      },
    })
  );
  body.append("map", JSON.stringify({ 0: ["variables.file"] }));
  body.append("0", file, { filename });

  const response = await got(process.env.API_URL, {
    method: "POST",
    responseType: "json",
    headers,
    body,
  });

  const rawResponse = response.body as any;
  if (rawResponse.errors) {
    throw new GraphQLError(rawResponse.errors);
  }
  return rawResponse.data.fileUpload as Uploaded;
};
