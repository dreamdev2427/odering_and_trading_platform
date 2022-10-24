/**
 * Currently the module requires "lcwAccessToken" param with a string value of an access token to livecoinwatch.com
 *
 *  How to set up:
 *
 * INSERT INTO params(param,isglobal,datatype,stringValue,intValue) VALUES ('lcwAccessToken',1,1,'**your token in this field**',NULL);
 */
export const getLcwAccessToken = (): string => (global as any).config.lcwAccessToken;

/**
 * Fixer is a fiat oracle
 */
export const getFixerAccessToken = (): string => (global as any).config.fixerAccessToken;

/** Defines what kind of price oracles to spawn.
 * The DB param is an array of this interface type, so more than 1 oracle is possible
 *
 * INSERT INTO params(param,isglobal,datatype,stringValue,intValue) VALUES ('priceOracles',1,3,'[{"from": "BTC", "to": "EUR", "interval": 10000}]',NULL);
 */
export interface PriceOracleDefinition {
    from: string | string[];
    to: string | string[];
    interval?: number;
    vendor?: string;
}

/*
 */

/**
 * The configuration below is not (yet) in use.
 */

/**
 * @deprecated
 */
export interface Conversion {
  name: string;
  api: {
    url: string;
    headers: {
      [header: string]: string;
    };
  };
}

/**
 * @deprecated
 */
export interface Currency {
  name: string;
  conversions: Conversion[];
}

/**
 * @deprecated
 */
export interface PriceOracleConfig {
  enabled: boolean;
  currencies: Currency[];
}
/*
EXANPLE:

insert into params(param, isglobal, datatype, stringValue, intValue) values ("priceOracleConfig", 1, 3, '{
    enabled: true;
    currencies: [
        {
            name: "BTC";
            conversions: [
                {
                    name: "USD";
                    api: {
                        url: '';
                        headers: {
                            "Authentication": "Bearer #####"
                        }
                    }
                }
            ];
        }
    ]
}',0);
 */
