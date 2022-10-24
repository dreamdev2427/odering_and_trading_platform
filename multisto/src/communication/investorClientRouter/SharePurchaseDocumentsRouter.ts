import * as express from "express";
import sharePurchaseDocumentsCtl from "../../controllers/investorClient/sharePurchaseDocumentsCtl";
import { isInvestorUserAuthenticated } from "../../modules/common";
import redirectToDocusignDocument from "../../controllers/stoAdmin/documents/externalDocuments/redirectToDocusignDocument";
import setSignatureFromDocusign from "../../controllers/investorClient/documentsCtl/docusign/setSignatureFromDocusign";
import sendInstructionalDepositEmail from "../../controllers/investorClient/emailCtl/sendInstructionalDepositEmail";

const router = express.Router();

/* Documents module router. */

router.get(
    "/sharePurchaseDocument",
    isInvestorUserAuthenticated,
    sharePurchaseDocumentsCtl.getContractView2
);
router.post(
    "/sharePurchaseDocumentSign",
    isInvestorUserAuthenticated,
    sharePurchaseDocumentsCtl.signContractView2
);
router.post(
    "/sharePurchaseDocumentSignPost",
    isInvestorUserAuthenticated,
    sharePurchaseDocumentsCtl.setSignature
);
router.get(
    "/sharePurchaseDocumentDelete",
    isInvestorUserAuthenticated,
    sharePurchaseDocumentsCtl.deleteSignature
);
router.get(
    "/sharePurchaseDocumentSignDocusignDocument",
    isInvestorUserAuthenticated,
    redirectToDocusignDocument
);
router.get(
    "/sharePurchaseDocumentDocusignRedirect",
    isInvestorUserAuthenticated,
    setSignatureFromDocusign
);
router.post("/sendInstructionalEmail", isInvestorUserAuthenticated, sendInstructionalDepositEmail);

export = router;
