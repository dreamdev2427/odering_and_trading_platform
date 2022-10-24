import { Response } from "express";
import logger from "../../../logger";
import common from "../../../modules/common";

interface ModuleSwitches {
  ID: string;
  checked: boolean;
  title: string;
  description: string;
  isMandatory?: boolean;
}

const loadSwitches = (): ModuleSwitches[] => {
  const globalObj = global as any;
  // TODO: make the title and description use i18n when moving this to the FRONTEND
  const moduleSwitches: ModuleSwitches[] = [
    {
      ID: "isWalletManagementModuleEnabled",
      checked: globalObj.config.isWalletManagementModuleEnabled,
      description: "Allow the Investors to see and manage their wallets",
      title: "Wallet Management Module",
      isMandatory: false,
    },
    {
      ID: "isMyPortfolioModuleEnabled",
      checked: globalObj.config.isMyPortfolioModuleEnabled,
      description: "Allow the Investors to see and manage their portfolios",
      title: "My Portfolio Module*",
      isMandatory: true,
    },
    {
      ID: "isActiveOfferingsModuleEnabled",
      checked: globalObj.config.isActiveOfferingsModuleEnabled,
      description:
        "Allow the Investors to see and interact with the offerings from the platform",
      title: "Active Offerings Module*",
      isMandatory: true,
    },
    {
      ID: "isNewsModuleEnabled",
      checked: globalObj.config.isNewsModuleEnabled,
      description:
        "Allow the Investors to see News posted by the Project Administrators",
      title: "News Module",
    },
    {
      ID: "isContractsModuleEnabled",
      checked: globalObj.config.isContractsModuleEnabled,
      description:
        "Allow the Investors to see and download contracts and agreements they have previously signed",
      title: "Contracts/Documents Module",
    },
    {
      ID: "isCorporateActionsModuleEnabled",
      checked: globalObj.config.isCorporateActionsModuleEnabled,
      description:
        "Allow the Investors to see and interact with Votes and Meetings created by the Project Administrators",
      title: "Corporate Actions Module",
    },
    {
      ID: "isTradingModuleEnabled",
      checked: globalObj.config.isTradingModuleEnabled,
      description: "Allow the Investors to trade shares with each other",
      title: "Trading Module",
    },
    {
      ID: "isChatModuleEnabled",
      checked: globalObj.config.isChatModuleEnabled,
      description:
        "Allow the Investors to open a direct link of communication with the Project Administrators, through an instant messaging module",
      title: "Chat Module",
    },
    {
      ID: "isSupportModuleEnabled",
      checked: globalObj.config.isSupportModuleEnabled,
      description:
        "Allow the Investors to ask for help, from the Project Administrator, using instant messages on the platform",
      title: "Support Module",
    },
    {
      ID: "isInvestorOwnershipModuleEnabled",
      checked: globalObj.config.isInvestorOwnershipModuleEnabled,
      description:
        "Allow the Investors to create and manage their own investing entities",
      title: "Investor Ownership",
    },
    {
      ID: "isSettingsModuleEnabled",
      checked: globalObj.config.isSettingsModuleEnabled,
      description:
        "Allow the Investors to manage their own settings (like 2FA, change passwords, blockchain addresses, etc.)",
      title: "Settings Module",
    },
    {
      ID: "isTellAFriendModuleEnabled",
      checked: globalObj.config.isTellAFriendModuleEnabled,
      description:
        "Allow the Investors to invite others on the platform through a referral program",
      title: "Referral Module",
    },
    {
      ID: "isAccreditationModuleEnabled",
      checked: globalObj.config.isAccreditationModuleEnabled,
      description: "Allow the Investors to manage their accreditation status",
      title: "Accreditation Module",
    },
  ];
  return moduleSwitches;
};

export default async (req: any, res: Response) => {
  try {
    const moduleSwitches: ModuleSwitches[] = loadSwitches();
    res.render(`platform/investor-module-switches`, {
      moduleSwitches,
      partials: common.getPlatformPartials(),
      Data: common.getPlatformCommonPageProperties(req),
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    logger.error(`${error} - Error occurred in get-investor-module-switches`);
  }
};
