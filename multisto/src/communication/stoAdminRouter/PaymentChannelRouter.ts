import express from "express";
import common from "../../modules/common";
import getPaymentChannel from "../../controllers/stoAdmin/payment-channels/getPaymentChannel";
import postPaymentChannel from "../../controllers/stoAdmin/payment-channels/postPaymentChannel";
import postChangePaymentChannelMode from "../../controllers/stoAdmin/payment-channels/postChangePaymentChannelMode";

const router = express.Router();

router.get(
  "/admin/createNewPaymentChannel",
  common.isAdminUserAuthenticated,
  getPaymentChannel
);
router.post(
  "/admin/addeditpaymentchannel",
  common.isAdminUserAuthenticated,
  postPaymentChannel
);
router.post(
  "/admin/changePaymentChannelMode",
  common.isAdminUserAuthenticated,
  postChangePaymentChannelMode
);

export = router;
