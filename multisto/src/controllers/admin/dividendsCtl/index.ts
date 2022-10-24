import getPayouts from "./api/getPayouts";
import postDividendIsActive from "./api/postDividendIsActive";
import getIndex from "./getIndex";
import postDividends from "./postDividends";
import getInvestorPayouts from "./api/getInvestorPayouts";
import postTriggerDividendPayout from "./api/postTriggerDividendPayout";
import postWebTriggerDividendPayout from "./postWebTriggerDividendPayout";
import postChangeAwardValue from "./api/postChangeAwardValue";
import postDistributeDividend from "./api/postDistributeDividend";
import postPurgeDividend from "./api/postPurgeDividend";

export default {
  getIndex,
  postDividends,
  postDividendIsActive,
  getPayouts,
  getInvestorPayouts,
  postTriggerDividendPayout,
  postChangeAwardValue,
  postDistributeDividend,
  postPurgeDividend,
  postWebTriggerDividendPayout,
};
