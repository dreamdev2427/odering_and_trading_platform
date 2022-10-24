import { Request, Response } from "express";
import logger from "../../../logger";
import common from "../../../modules/common";
import { uploadToGql } from "../../../services/file-upload-gql";

export default async (req: Request, res: Response) => {
  try {
    const data = await uploadToGql(req);
    res.send(data);
  } catch (error) {
    logger.error(`${error}`);
    common.handleError(req, res, "Error in postUploadFileToCloud");
  }
};
