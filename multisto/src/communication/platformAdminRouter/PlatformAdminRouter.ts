import * as express from "express";
import common from "../../modules/common";
import setEnvironmentParams from "../../controllers/admin/environmentParameters/setEnvironmentParams";
import getStoInvestors from "../../controllers/admin/investors/getStoInvestors";
import searchPlatformInvestor from "../../controllers/admin/investors/searchPlatformInvestor";
import postCopyStoInvestors from "../../controllers/admin/investors/postCopyStoInvestors";
import getStoToolsPage from "../../controllers/admin/stoTools/getStoToolsPage";
import postCopyStoParameters from "../../controllers/admin/stoTools/postCopyStoParameters";
import getGeniusInvestorSearchPage from "../../controllers/admin/investors/getGeniusInvestorSearchPage";
import exportIncompleteKycInvestorsToCsv from "../../controllers/admin/incompleteKyc/exportIncompleteKycInvestorsToCsv";
import getUnfinishedRegisterList from "../../controllers/admin/unfinishedRegisters/getUnfinishedRegisterList";
import exportUnfinishedRegistersToCsv from "../../controllers/admin/unfinishedRegisters/exportUnfinishedRegistersToCsv";
import searchIncompleteKycInvestors from "../../controllers/admin/incompleteKyc/searchIncompleteKycInvestors";
import geniusSearchPlatformInvestor from "../../controllers/admin/investors/geniusSearchPlatformInvestor";
import getCopyInvestorsPage from "../../controllers/admin/investors/getCopyInvestorsPage";
import getCurrencySearchPage from "../../controllers/admin/currencyManagement/getCurrencySearchPage";
import exportCurrenciesToCsv from "../../controllers/admin/currencyManagement/exportCurrenciesToCsv";
import addOrUpdateCurrency from "../../controllers/admin/currencyManagement/addOrUpdateCurrency";
import viewOrUpdateCryptoCurrency from "../../controllers/admin/currencyManagement/viewOrUpdateCryptoCurrency";
import getVerifiyInvestorTestSuitPage from "../../controllers/admin/verifyInvestorComTestSuit/getVerifiyInvestorTestSuitPage";
import postVerifyInvestorAccreditationLevel from "../../controllers/admin/verifyInvestorComTestSuit/postVerifyInvestorAccreditationLevel";
import getTranslationsPage from "../../controllers/admin/translations/getTranslationsPage";
import postTranslation from "../../controllers/admin/translations/postTranslation";
import addTranslationLanguage from "../../controllers/admin/translations/addTranslationLanguage";
import getStosMetaKeysPage from "../../controllers/admin/stos-meta-keys/getStosMetaKeysPage";
import postStosMetaKeys from "../../controllers/admin/stos-meta-keys/postStosMetaKeys";
import removeStosMetaKeys from "../../controllers/admin/stos-meta-keys/removeStosMetaKeys";
import getSharePurchaseModeMainPageInfo from "../../controllers/admin/sharePurchaseModeSettings/getSharePurchaseModeMainPageInfo";
import postChangeSharePurchaseDocumentsMode from "../../controllers/admin/sharePurchaseModeSettings/postChangeSharePurchaseDocumentsMode";
import postChangeDocuSignSettings from "../../controllers/admin/sharePurchaseModeSettings/postChangeDocuSignSettings";
import postChangeHelloSignSettings from "../../controllers/admin/sharePurchaseModeSettings/postChangeHelloSignSettings";
import getFees from "../../controllers/admin/feesCtl/getFees";
import postFee from "../../controllers/admin/feesCtl/postFee";
import deleteFee from "../../controllers/admin/feesCtl/deleteFee";
import getKycProviderModeMainPageInfo from "../../controllers/admin/kycProviderModeSettings/getKycProviderModeMainPageInfo";
import postChangeKycProviderMode from "../../controllers/admin/kycProviderModeSettings/postChangeKycProviderMode";
import postChangeBlockPassSettings from "../../controllers/admin/kycProviderModeSettings/postChangeBlockPassSettings";
import postChangeSumSubSettings from "../../controllers/admin/kycProviderModeSettings/postChangeSumSubSettings";
import postChangeInternalSignSettings from "../../controllers/admin/sharePurchaseModeSettings/postChangeInternalSignSettings";
import postChangeTabSettings from "../../controllers/admin/postChangeTabSettings";
import getCommissions from "../../controllers/admin/commissionsCtl/getCommissions";
import deleteCommission from "../../controllers/admin/commissionsCtl/deleteCommission";
import rejectCommission from "../../controllers/admin/commissionsCtl/rejectCommission";
import approveCommission from "../../controllers/admin/commissionsCtl/approveCommission";
import getInternalWalletModeMainPageInfo from "../../controllers/admin/internalWalletModeSettings/getInternalWalletModeMainPageInfo";
import postChangeInternalWalletSettings from "../../controllers/admin/internalWalletModeSettings/postChangeInternalWalletSettings";
import postChangeNetkiSettings from "../../controllers/admin/kycProviderModeSettings/postChangeNetkiSettings";
import getNetkiAccessCodes from "../../controllers/admin/netki/getNetkiAccessCodes";
import deleteNetkiAccessCodes from "../../controllers/admin/netki/deleteNetkiAccessCodes";
import getAccreditationModeMainPage from "../../controllers/admin/accreditation-Mode-Settings/get-Accreditation-Mode-MainPage";
import postChangeAccreditationSettings from "../../controllers/admin/accreditation-Mode-Settings/post-Change-Accreditation-Settings";
import postChangeAccreddSettings from "../../controllers/admin/accreditation-Mode-Settings/post-Change-Accredd-Settings";
import postChangeVerifyInvestorSettings from "../../controllers/admin/accreditation-Mode-Settings/post-Change-VerifyInvestor-Settings";
import twoFactorAuthenticationSettings from "../../controllers/admin/twoFactorSettings/getTwoFactorPage";
import postTwoFactorSettings from "../../controllers/admin/twoFactorSettings/postTwoFactorSettings";
import postChangeIsPropertySortingEnabled from "../../controllers/admin/switches/post-Change-IsPropertySortingEnabled";
import getInvestorModuleSwitches from "../../controllers/admin/investor-module-switches/get-investor-module-switches";
import postChangeInvestorModuleSwitches from "../../controllers/admin/investor-module-switches/post-change-investor-module-switches";
import setEnvironmentParamsToApi from "../../controllers/admin/environmentParameters/setEnvironmentParamsToApi";
import getPlatformConfigurationModeMainPage from "../../controllers/admin/get-Platform-Configuration-Mode-MainPage";
import getPlatformSwitches from "../../controllers/admin/environmentParameters/get-Platform-Switches";
import getNavbarCustomization from "../../controllers/admin/platform-customization/get-navbar-header-customization";
import postNavbarHeaderCustomization from "../../controllers/admin/platform-customization/post-navbar-header-customization";
import postStoInvestmentReturn from "../../controllers/admin/stoTools/postStoInvestmentReturn";
import ShareRegisterCtl from "../../services/investors/sharecap/controller/web/platform-admin";
import ShareRegisterApi from "../../services/investors/sharecap/controller/api/platform-admin";
import getSellBackModeMainPageInfo from "../../controllers/admin/sellBack-ModeSettings/get-sellBack-ModeMainPageInfo";
import postSellBackSettings from "../../controllers/admin/sellBack-ModeSettings/post-sellBack-Settings";
import postDeleteInvestorSto from "../../controllers/stoAdmin/investor/post-delete-investorSto";
import manageInvoiceBoard from "../../controllers/admin/invoicemanagment/manageInvoiceBoard";

const router = express.Router();

router.post(
  "/platform/setEnvironmentParams",
  common.isPlatformAdminUserAuthenticated,
  setEnvironmentParams
);

router.get(
  "/platform/copyInvestors",
  common.isPlatformAdminUserAuthenticated,
  getCopyInvestorsPage
);
router.get(
  "/platform/getStoInvestors",
  common.isPlatformAdminUserAuthenticated,
  getStoInvestors
);
router.get(
  "/platform/geniusSearchPlatformInvestorsByQuery",
  common.isPlatformAdminUserAuthenticated,
  geniusSearchPlatformInvestor
);
router.get(
  "/platform/searchPlatformInvestorsByQuery",
  common.isPlatformAdminUserAuthenticated,
  searchPlatformInvestor
);
router.post(
  "/platform/postCopyStoInvestors",
  common.isPlatformAdminUserAuthenticated,
  postCopyStoInvestors
);

router.get(
  "/platform/stotools",
  common.isPlatformAdminUserAuthenticated,
  getStoToolsPage
);
router.post(
  "/platform/postCopyStoParameters",
  common.isPlatformAdminUserAuthenticated,
  postCopyStoParameters
);

router.get(
  "/platform/translations",
  common.isPlatformAdminUserAuthenticated,
  getTranslationsPage
);
router.post(
  "/platform/postTranslation",
  common.isPlatformAdminUserAuthenticated,
  postTranslation
);

router.post(
  "/platform/addTranslationLanguage",
  common.isPlatformAdminUserAuthenticated,
  addTranslationLanguage
);

router.get(
  "/platform/stosMetaKeys",
  common.isPlatformAdminUserAuthenticated,
  getStosMetaKeysPage
);
router.post(
  "/platform/postStosMetaKeys",
  common.isPlatformAdminUserAuthenticated,
  postStosMetaKeys
);
router.post(
  "/platform/removeStosMetaKeys",
  common.isPlatformAdminUserAuthenticated,
  removeStosMetaKeys
);

router.get(
  "/platform/getInvestorSearchPage",
  common.isPlatformAdminUserAuthenticated,
  getGeniusInvestorSearchPage
);

router.get(
  "/platform/investors",
  common.isPlatformAdminUserAuthenticated,
  searchIncompleteKycInvestors
);
router.get(
  "/platform/exportIncompleteKycToCsv",
  common.isPlatformAdminUserAuthenticated,
  exportIncompleteKycInvestorsToCsv
);

router.get(
  "/platform/registerlist",
  common.isPlatformAdminUserAuthenticated,
  getUnfinishedRegisterList
);
router.get(
  "/platform/exportUnfinishedRegistersToCsv",
  common.isPlatformAdminUserAuthenticated,
  exportUnfinishedRegistersToCsv
);

router.get(
  "/platform/getCurrencySearchPage",
  common.isPlatformAdminUserAuthenticated,
  getCurrencySearchPage
);
router.get(
  "/platform/exportCurrenciesToCsv",
  common.isPlatformAdminUserAuthenticated,
  exportCurrenciesToCsv
);
router.post(
  "/platform/AddOrUpdateCurrency",
  common.isPlatformAdminUserAuthenticated,
  addOrUpdateCurrency
);

router.post(
  "/platform/VieworUpdateCurrencyCrypto",
  common.isPlatformAdminUserAuthenticated,
  viewOrUpdateCryptoCurrency
);

router.get(
  "/platform/getVerifyInvestorComTestSuit",
  common.isPlatformAdminUserAuthenticated,
  getVerifiyInvestorTestSuitPage
);
router.post(
  "/platform/setVerifyInvestorAccreditationLevel",
  common.isPlatformAdminUserAuthenticated,
  postVerifyInvestorAccreditationLevel
);
router.get(
  "/platform/sharePurchaseModeSettings",
  common.isPlatformAdminUserAuthenticated,
  getSharePurchaseModeMainPageInfo
);
router.get(
  "/platform/investorinvoicemanangmentboard",
  common.isPlatformAdminUserAuthenticated,
  manageInvoiceBoard
);
router.post(
  "/platform/postChangeSharePurchaseDocumentsMode",
  common.isPlatformAdminUserAuthenticated,
  postChangeSharePurchaseDocumentsMode
);
router.post(
  "/platform/postChangeDocuSignSettings",
  common.isPlatformAdminUserAuthenticated,
  postChangeDocuSignSettings
);
router.post(
  "/platform/postChangeHelloSignSettings",
  common.isPlatformAdminUserAuthenticated,
  postChangeHelloSignSettings
);
router.post(
  "/platform/postChangeInternalSignSettings",
  common.isPlatformAdminUserAuthenticated,
  postChangeInternalSignSettings
);
router.get(
  "/platform/kycProviderModeSettings",
  common.isPlatformAdminUserAuthenticated,
  getKycProviderModeMainPageInfo
);
router.post(
  "/platform/postChangeKycProviderMode",
  common.isPlatformAdminUserAuthenticated,
  postChangeKycProviderMode
);
router.post(
  "/platform/postChangeBlockPassSettings",
  common.isPlatformAdminUserAuthenticated,
  postChangeBlockPassSettings
);
router.post(
  "/platform/postChangeSumSubSettings",
  common.isPlatformAdminUserAuthenticated,
  postChangeSumSubSettings
);
router.get(
  "/platform/internalWalletModeSettings",
  common.isPlatformAdminUserAuthenticated,
  getInternalWalletModeMainPageInfo
);
router.post(
  "/platform/setInternalWalletMode",
  common.isPlatformAdminUserAuthenticated,
  postChangeInternalWalletSettings
);
router.get(
  "/platform/accreditationMode",
  common.isPlatformAdminUserAuthenticated,
  getAccreditationModeMainPage
);
router.get(
  "/platform/investorModulesSwitches",
  common.isPlatformAdminUserAuthenticated,
  getInvestorModuleSwitches
);
router.get(
  "/platform/otherSwitches",
  common.isPlatformAdminUserAuthenticated,
  getPlatformSwitches
);
router.post(
  "/platform/changeInvestorModulesSwitches",
  common.isPlatformAdminUserAuthenticated,
  postChangeInvestorModuleSwitches
);
router.get(
  "/platform/platformConfigurationMode",
  common.isPlatformAdminUserAuthenticated,
  getPlatformConfigurationModeMainPage
);
router.post(
  "/platform/setAccreditationMode",
  common.isPlatformAdminUserAuthenticated,
  postChangeAccreditationSettings
);
router.post(
  "/platform/postChangeAccreddSettings",
  common.isPlatformAdminUserAuthenticated,
  postChangeAccreddSettings
);
router.post(
  "/platform/postChangeVerifyInvestorSettings",
  common.isPlatformAdminUserAuthenticated,
  postChangeVerifyInvestorSettings
);
router.post(
  "/platform/postChangeNetkiSettings",
  common.isPlatformAdminUserAuthenticated,
  postChangeNetkiSettings
);
router.get(
  "/platform/getNetkiAccessCodes",
  common.isPlatformAdminUserAuthenticated,
  getNetkiAccessCodes
);
router.get(
  "/platform/deleteNetkiAccessCodes",
  common.isPlatformAdminUserAuthenticated,
  deleteNetkiAccessCodes
);
router.post(
  "/platform/setTabDetails",
  common.isPlatformAdminUserAuthenticated,
  postChangeTabSettings
);

router.get("/platform/fees", common.isPlatformAdminUserAuthenticated, getFees);
router.post(
  "/platform/postFee",
  common.isPlatformAdminUserAuthenticated,
  postFee
);
router.post(
  "/platform/deleteFee",
  common.isPlatformAdminUserAuthenticated,
  deleteFee
);

router.get(
  "/platform/commissions",
  common.isPlatformAdminUserAuthenticated,
  getCommissions
);
router.post(
  "/platform/deleteCommission",
  common.isPlatformAdminUserAuthenticated,
  deleteCommission
);

router.post(
  "/platform/rejectCommission",
  common.isPlatformAdminUserAuthenticated,
  rejectCommission
);

router.post(
  "/platform/approveCommission",
  common.isPlatformAdminUserAuthenticated,
  approveCommission
);
router.post(
  "/platform/postChangeIsPropertySortingEnabled",
  common.isPlatformAdminUserAuthenticated,
  postChangeIsPropertySortingEnabled
);

router.post(
  "/platform/postTwoFactorSettings",
  common.isPlatformAdminUserAuthenticated,
  postTwoFactorSettings
);

router.get(
  "/platform/twoFactorAuthenticationSettings",
  common.isPlatformAdminUserAuthenticated,
  twoFactorAuthenticationSettings
);

router.post(
  "/platform/postParamUpdateToApi",
  common.isPlatformAdminUserAuthenticated,
  setEnvironmentParamsToApi
);

router.post(
  "/platform/updateInvestmentReturn",
  common.isPlatformAdminUserAuthenticated,
  postStoInvestmentReturn
);

router.get(
  "/platform/shareRegisterSettings",
  common.isPlatformAdminUserAuthenticated,
  ShareRegisterCtl.getShareRegisterSettings
);

router.get(
  "/platform/api/shareRegisterSettings",
  common.isPlatformAdminUserAuthenticated,
  ShareRegisterApi.getSettings
);

router.post(
  "/platform/api/shareRegisterSettings",
  common.isPlatformAdminUserAuthenticated,
  ShareRegisterApi.formPostSettings
);

router.get(
  "/platform/navbarHeaderCustomization",
  common.isPlatformAdminUserAuthenticated,
  getNavbarCustomization
);

router.post(
  "/platform/postNavbarHeaderCustomization",
  common.isPlatformAdminUserAuthenticated,
  postNavbarHeaderCustomization
);

router.get(
  "/platform/sellBackModeSettings",
  common.isPlatformAdminUserAuthenticated,
  getSellBackModeMainPageInfo
);
router.post(
  "/platform/setSellBackMode",
  common.isPlatformAdminUserAuthenticated,
  postSellBackSettings
);

router.get(
  "/platform/deleteInvestorSto",
  common.isPlatformAdminUserAuthenticated,
  postDeleteInvestorSto
);

export = router;
