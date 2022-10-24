interface RestEndpoint {
  /** Relative path */
  path: string;
  /** HTTP Method */
  method: string;
}
interface KickOffChallenge {
  enabled?: boolean;
  dateFrom: string;
  dateTo: string;
  minLines: number;
  minVolume: string;
}
interface DashboardSettings {
  /** If the investor affiliate dashboard should be disabled */
  isDisabled?: boolean;
  /** If the dashboard is disabled, display this optional content in its place */
  disabledMessage?: string;
}
export default interface RemoteAffiliateServiceConfig {
  enabled: boolean;
  port: string;
  host: string;
  headers: {
    "x-api-key": string;
    "Content-Type": string;
  };
  /** Upload investor data remotely on server start. */
  doSyncInvestorsOnStartup: boolean;
  /** Whether to re-try uploading investors marked as uploaded
   * (affiliateStatus = 1) on server start.
   * Requires doSyncInvestorsOnStartup */
  doSyncUploadedInvestors: boolean;
  /** Upload project data remotely on server start. */
  doSyncProjectsOnStartup: boolean; // not yet implemented
  /** Apply a discount price on ICO projects specifically */
  doIcoDiscounts: boolean; // not yet implemented or not to be implemented
  /** Optional dashboard settings */
  dashboard?: DashboardSettings;
  kickOffChallenge?: KickOffChallenge;

  registerInvestor: RestEndpoint;
  registerInvestorsBulk: RestEndpoint;
  updateInvestor: RestEndpoint;
  registerProject: RestEndpoint;
  updateProject: RestEndpoint;
  registerBuyOrder: RestEndpoint;
  withdrawBuyOrder: RestEndpoint;
  changeReferrer: RestEndpoint;
  updateKyc: RestEndpoint;
}

export const loadConfig = (): RemoteAffiliateServiceConfig | undefined =>
  undefined; // (global as any).config.affiliateConfig;

/*
To configure Affiliate for Genius and MLM:
-- insert into params(param, isglobal, datatype, stringValue, intValue) values ("affiliateConfig", 1, 3,

update params set stringValue = '{
    "enabled": "true",
    "port": "443",
    "host": "www.test.affiliate-geniusestates.com",
    "headers": {
        "x-api-key": "9e1846c121d27d1016d2727ada4b7303",
        "Content-Type": "application/json"
    },
    "doSyncInvestorsOnStartup": true,
    "doSyncUploadedInvestors": false,
    "doSyncProjectsOnStartup": true,
    "doIcoDiscounts": false,
    "kickOffChallenge": {
        "enabled": false,
        "dateFrom": "2021-08-15",
        "dateTo": "2021-09-30",
        "minLines": 10,
        "minVolume": "10000"
    },
    "dashboard": {
        "isDisabled": true,
        "disabledMessage": "The current plan will be changed to a new one on the new release."
    },
    "registerInvestor": {
        "path": "/api/register",
        "method": "POST"
    },
    "registerInvestorsBulk": {
        "path": "/api/bulk_register",
        "method": "POST"
    },
    "registerProject": {
        "path": "/api/update_project",
        "method": "POST"
    },
    "updateProject": {
        "path": "/api/update_project",
        "method": "POST"
    },
    "deleteProject": {
        "path": "/api/update_project",
        "method": "POST"
    },
    "registerBuyOrder": {
        "path": "/api/update_order",
        "method": "POST"
    },
    "registerWithdrawOrder": {
        "path": "/api/withdrawl_update",
        "method": "POST"
    },
    "changeReferrer": {
        "path": "/api/change_sponsor",
        "method": "POST"
    },
    "updateKyc": {
        "path": "/api/update_kyc",
        "method": "POST"
    }
}' where param='affiliateConfig';

-- , 0);
*/
/*
To configure for local tests with mockoon or other local server:
insert into params(param, isglobal, datatype, stringValue, intValue) values ("affiliateConfig", 1, 3, '{
    "enabled": "true",
    "port": "3033",
    "host": "127.0.0.1",
    "headers": {
        "x-api-key": "9e1846c121d27d1016d2727ada4b7303",
        "Content-Type": "application/json"
    },
    "doSyncInvestorsOnStartup": true,
    "doSyncUploadedInvestors": false,
    "doSyncProjectsOnStartup": true,
    "doIcoDiscounts": false,
    "kickOffChallenge": {
		"enabled": true,
		"dateFrom": "2021-08-15",
		"dateTo": "2021-09-30",
		"minLines": 10,
		"minVolume": "10000"
	},
    "registerInvestor": {
        "path": "/api/register",
        "method": "POST"
    },
    "updateInvestor": {
        "path": "/api/register",
        "method": "POST"
    },
    "registerInvestorsBulk": {
        "path": "/api/bulk_register",
        "method": "POST"
    },
    "registerProject": {
        "path": "/api/update_project",
        "method": "POST"
    },
    "updateProject": {
        "path": "/api/update_project",
        "method": "POST"
    },
    "deleteProject": {
        "path": "/api/update_project",
        "method": "POST"
    },
    "registerBuyOrder": {
        "path": "/api/update_order",
        "method": "POST"
    },
    "registerWithdrawOrder": {
        "path": "/api/withdrawl_update",
        "method": "POST"
    },
    "changeReferrer": {
        "path": "/api/change_sponsor",
        "method": "POST"
    },
    "updateKyc": {
        "path": "/api/update_kyc",
        "method": "POST"
    }
}', 0);
*/
