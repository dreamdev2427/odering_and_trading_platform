import { FeeCommission } from 'entities';
import { BROKER_TYPE, PAYMENT_STATUS } from 'entities/fee-commissions';
import math from 'mathjs';

const getSum = async (
  beneficiaryID: number,
  beneficiaryType: BROKER_TYPE,
  status: PAYMENT_STATUS,
): Promise<number> => {
  const commissions = await FeeCommission.find({
    where: { beneficiaryID, beneficiaryType, status },
  });
  const total = commissions.reduce(
    (sum, commission) => math.add(sum, commission.amount ?? 0) as number,
    0,
  );
  return total;
};

export { getSum };
