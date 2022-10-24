import * as express from "express";
import documentsCtl from "../../controllers/investorClient/documentsCtl";
import { isInvestorUserAuthenticated } from "../../modules/common";

const router = express.Router();

/* Documents module router. */

router.get('/documentviewforcomments', isInvestorUserAuthenticated, documentsCtl.getCommentsView);
router.post('/documentsuggestion', isInvestorUserAuthenticated, documentsCtl.createComment);
router.get('/documentDeleteComment', isInvestorUserAuthenticated, documentsCtl.deleteComment);
router.post('/changecommenttext', isInvestorUserAuthenticated, documentsCtl.updateComment);

router.get(
    "/contractview2",
    isInvestorUserAuthenticated,
    documentsCtl.getContractView2
);
router.post(
    "/contractview2sign",
    isInvestorUserAuthenticated,
    documentsCtl.signContractView2
);
router.post(
    "/contractview2signpost",
    isInvestorUserAuthenticated,
    documentsCtl.setSignature
); 
router.get(
    "/deletedocumentusersignatures",
    isInvestorUserAuthenticated,
    documentsCtl.deleteSignature
);

export = router;
