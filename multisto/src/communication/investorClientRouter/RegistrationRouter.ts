import * as express from "express";
import sharePurchaseDocumentsCtl from "../../controllers/investorClient/sharePurchaseDocumentsCtl";
import resendCodeCtl from "../../controllers/investorClient/registrationCtl/resendCodeCtl";

const router = express.Router();

/* Documents module router. */

router.post("/resendCode", resendCodeCtl);
export = router;
