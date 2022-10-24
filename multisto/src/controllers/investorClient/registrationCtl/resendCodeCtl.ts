import common from "../../../modules/common";
import resendCode from "../../../services/investorClient/registration/resendCode";
import { Stos } from "../../../Schema";

// url: global.config.stos[req.hostname].stolinkfull
// footer: global.config.stos[req.hostname].emailFooter
export default async (req: any, res: any) => {
  try {
    const { registrationID, isFromAdmin } = req.body;
    const sto = (global as any).config.stos[req.hostname] as Stos;
    try {
      await resendCode(
        registrationID,
        req.hostname,
        sto.stolinkfull ?? "",
        sto.emailFooter ?? "",
        sto.ID
      );
    } catch (error) {
      common.handleDebug(
        req,
        `${(error as Error).message} Error occured in resendcode`
      );
    }

    req.flash("Message", "The verification code has been sent again");
    if (isFromAdmin) {
      res.sendStatus(200);
    } else {
      res.redirect(`/verificationcode?registrationID=${registrationID}`);
    }
  } catch (error) {
    common.handleError(
      req,
      res,
      `${(error as Error).message} Error occured in resendcode`
    );
  }
};
