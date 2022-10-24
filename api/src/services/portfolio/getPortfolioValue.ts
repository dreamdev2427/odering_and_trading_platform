import { InvestorBuyPropertyAlert as BuyAlert, Stos } from 'entities';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import { groupBy } from 'core/helpers';

interface PurchasesWithDates {
  date: Date;
  ID: number;
  investorID: number;
  stoID: number;
  purchasePriceOffered: number;
}

const getDaysInvested = (startDate: Date, endDate: Date) => {
  const normalizedEndDate = endDate > new Date() ? new Date() : endDate;
  const differenceInTime = normalizedEndDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return Math.floor(differenceInDays) + 1;
};

const findFirstDay = (purchases: PurchasesWithDates[]) => {
  const min = Math.min(
    ...purchases.map((p) => {
      return p.date.getTime();
    }),
  );
  return new Date(min);
};

const convertDates = (purchases: BuyAlert[]): PurchasesWithDates[] => {
  const cleanPurchases: PurchasesWithDates[] = [];
  purchases.map((p) => {
    const temp: PurchasesWithDates = {
      ID: p.ID,
      investorID: p.investorID,
      stoID: p.stoID,
      purchasePriceOffered: p.purchasePriceOffered,
      date: new Date(p.date),
    };
    cleanPurchases.push(temp);
  });
  return cleanPurchases;
};

const calculateYearlyTotal = (
  firstInvestment: Date,
  value: PurchasesWithDates[],
  investmentReturn: number,
) => {
  const daysInvested = getDaysInvested(
    firstInvestment,
    new Date(firstInvestment.getFullYear(), 12, 31),
  );
  const investedAmount = value.reduce<number>((total, obj) => {
    return +total + +obj.purchasePriceOffered;
  }, 0);
  const returnRatio = daysInvested / 365;
  const subTotal = (investmentReturn / 100) * returnRatio;
  return investedAmount * subTotal;
};

const calculateYearlyValues = (
  groupedPurchases: Map<number, PurchasesWithDates[]>,
  investmentReturn: number,
) => {
  const yearlyValue = new Map<number, number>();
  groupedPurchases.forEach((yearGroup) => {
    const firstInvestment = findFirstDay(yearGroup);
    const total: number = calculateYearlyTotal(firstInvestment, yearGroup, investmentReturn);
    yearlyValue.set(firstInvestment.getFullYear(), total);
  });
  return yearlyValue;
};

export const getPortfolioValue = async (investorID: number, stoID: number): Promise<number> => {
  const sto = await Stos.findOneOrFail({ ID: stoID });
  const purchases = await BuyAlert.find({
    investorID,
    stoID,
    status: PURCHASE_STATUS_TYPE.Accepted,
  });
  const cleanPurchases = convertDates(purchases);
  const groupedPurchases = groupBy(cleanPurchases, (purchase) => purchase.date.getFullYear());
  const yearlyValues = calculateYearlyValues(groupedPurchases, sto.investmentReturn);

  let portfolioValue = 0;
  yearlyValues.forEach((value) => {
    portfolioValue += value;
  });

  return portfolioValue;
};
