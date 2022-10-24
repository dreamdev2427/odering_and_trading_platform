import { Request, Response } from "express";
import logger from "../../../../logger";
import IInvestmentsService from "../../../../services/investorClient/affiliate/data/IInvestmentsService";
import InvestmentsSqlService from "../../../../services/investorClient/affiliate/data/InvestmentsSqlService";
import InvestmentDto from "../../../../services/investorClient/affiliate/dto/InvestmentDto";
import { loadConfig } from "../../../../services/investorClient/affiliate/api/RemoteAfilliateServiceConfig";

export default async (req: Request, res: Response) => {
  try {
    const config = loadConfig();
    if (config?.enabled && req.query.investor !== undefined) {
      const svc: IInvestmentsService = new InvestmentsSqlService();
      let amount: string;
      let projectId: number;
      if (req.query.project == null) {
        projectId = -1;
        amount = await svc.getTotalInvestment(+req.query.investor);
      } else {
        projectId = +req.query.project;
        amount = await svc.getInvestedIn(+req.query.investor, projectId);
      }
      const result: InvestmentDto = {
        project_id: projectId,
        investor_id: +req.query.investor,
        amount,
      };
      res.status(200).json(result);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    logger.error(error as Error);
    // On generic error:
    res.status(500).json({
      status: "false",
      message: "Internal error",
    });
  }
};
