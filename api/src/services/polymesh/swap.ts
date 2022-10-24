import { ValidationError } from 'apollo-server-core';

import { PolymeshSwapTransaction } from 'entities';

const swap = async (recordID: number, privateKey: string): Promise<boolean> => {
  try {
    const transaction = await PolymeshSwapTransaction.findOneOrFail({ ID: recordID });
    return true;
  } catch (error) {
    throw new ValidationError('Polymesh Swap Transaction Failed');
  }
};

export { swap };
