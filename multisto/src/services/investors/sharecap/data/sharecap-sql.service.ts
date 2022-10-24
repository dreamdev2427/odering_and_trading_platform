/* eslint-disable max-classes-per-file */
import AbstractSqlService from "../../../generic/AbstractSqlService";
import ParamsSqlService from "../../../platform/environmentParams/data/ParamsSqlService";

/**
 * These services are a whole lot of generic classes with little content, so I groupped them
 * Mainly use them so I can specify the table names in the data layer, not the service logic layer
 */

export class InvestorSqlService extends AbstractSqlService {
  protected tableName = "investor";
}

export class SharesSqlService extends AbstractSqlService {
  protected tableName = "shares";
}

export class ShareTypesSqlService extends AbstractSqlService {
  protected tableName = "sharetypes";
}

export class CurrenciesSqlService extends AbstractSqlService {
  protected tableName = "currency";
}

export class PaaramsSqlService extends AbstractSqlService {
  protected tableName = "params";
}

const Investors = new InvestorSqlService();
const Shares = new SharesSqlService();
const ShareTypes = new ShareTypesSqlService();
const Currencies = new CurrenciesSqlService();
const Params = new ParamsSqlService();

export default {
  Investors,
  Shares,
  ShareTypes,
  Currencies,
  Params,
};
