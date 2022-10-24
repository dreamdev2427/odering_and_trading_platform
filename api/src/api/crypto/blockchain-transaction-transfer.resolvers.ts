import { Resolver, Arg, Authorized, Mutation, Ctx } from 'type-graphql';
import { Context, JWT_ROLE } from 'core/context';
import { BlockchainSharesTransferTransactions, Stos } from 'entities';
import { BlockchainSharesTransferTransactionsInput } from './blockchain-transaction-transfer.types';

@Resolver()
class BlockchainTransactionTransferResolvers {
  @Authorized(JWT_ROLE.api, JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Mutation(() => Number, { description: 'Mutation for blockchain transaction transfer' })
  async createBlockchainTransactionTransfer(
    @Ctx() { user }: Context,
    @Arg('data', () => BlockchainSharesTransferTransactionsInput)
    data: BlockchainSharesTransferTransactionsInput,
  ): Promise<number> {
    console.log(`Initiating blockchain transaction creation with data: ${JSON.stringify(data)}`);

    console.log(`Retrieving STO with stoID:${user.stoID}`);
    const sto = await Stos.findOneOrFail(user.stoID);
    const transaction = BlockchainSharesTransferTransactions.create(data);
    transaction.investorID = user.ID;
    transaction.stoID = user.stoID;
    transaction.hostname = sto.stolink;
    await transaction.save();
    return transaction.ID;
  }
}
export default BlockchainTransactionTransferResolvers;
