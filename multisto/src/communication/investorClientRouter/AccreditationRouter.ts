import * as express from 'express';
import { isInvestorUserAuthenticated } from '../../modules/common';
import getAccreditationView from "../../controllers/investorClient/accreditation/getAccreditationView";

const router = express.Router();

router.get('/accreditationMainView', isInvestorUserAuthenticated, getAccreditationView);

export = router;
