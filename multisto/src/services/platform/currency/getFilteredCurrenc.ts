import { Currency } from "../../../Schema";

const getFilteredCurrency = (currencies: Currency[]): Currency[] => {
  const defaultCurrencyType = (global as any).config.defaultCurrencyType;
  let filteredCurrencies: Currency[];
  switch (defaultCurrencyType) {
    case 1: // Fiat only
      filteredCurrencies = currencies.filter((c) => !c.isBlockchainBased);
      break;
    case 2: // Crypto only
      filteredCurrencies = currencies.filter((c) => c.isBlockchainBased);
      break;
    default: // combined
      filteredCurrencies = currencies;
      break;
  }
  return filteredCurrencies;
};

export default getFilteredCurrency;
