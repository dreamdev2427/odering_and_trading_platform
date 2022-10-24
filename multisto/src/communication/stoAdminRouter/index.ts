import * as express from "express";
import StoAdminRouter from "./StoAdminRouter";
import DocumentsAdminRouter from "./documents/DocumentsAdminRouter";
import ChatRouter from "./ChatRouter";
import AdminSignInRouter from "./AdminSignInRouter";

const router = express.Router();

router.use(AdminSignInRouter);
router.use(StoAdminRouter);
router.use(DocumentsAdminRouter);
router.use(ChatRouter);

export = router;
