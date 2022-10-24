import * as express from 'express';
import { isAdminUserAuthenticated } from '../../../../modules/common';
import postExternalDocument from "../../../../controllers/stoAdmin/documents/externalDocuments/postExternalDocument";
import getExternalDoc from '../../../../controllers/stoAdmin/documents/externalDocuments/getExternalDoc';

const router = express.Router();

router.get('/admin/externalDoc', isAdminUserAuthenticated, getExternalDoc);
router.post('/admin/postExternalDocument', isAdminUserAuthenticated, postExternalDocument)

export = router;