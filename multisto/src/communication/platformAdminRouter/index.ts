import * as express from "express";
import PlatformAdminRouter from "./PlatformAdminRouter";
import StoSettingsRouter from "./StoSettingsRouter";
import ChatRouter from "./ChatRouter";
import PlatformSignInRouter from "./PlatformSignInRouter";

const router = express.Router();

router.use(PlatformSignInRouter);
router.use(PlatformAdminRouter);
router.use(StoSettingsRouter);
router.use(ChatRouter);

export = router;
