import { Arg, Resolver, Authorized, Mutation, Ctx } from 'type-graphql';
import { Context } from 'core/context';
import { ValidationError } from 'apollo-server-core';
import { doAutomaticBlockchainTransactionChecks } from 'core/feature-flags-checkers';
import verifyTransactionReciepe from 'services/crypto/verifyTransaction';
import { VerifyCryptoReciepeInput } from './verifer.types';

@Resolver()
class VerifierResolvers {
  @Authorized()
  @Mutation(() => String, {
    description: 'Check Blockchain Transaction with hash',
    nullable: true,
  })
  async verifyTransactionFromBlockchain(
    @Ctx() { user }: Context,
    @Arg('data') data: VerifyCryptoReciepeInput,
  ): Promise<any> {
    const abtc = await doAutomaticBlockchainTransactionChecks();
    if (!abtc) {
      throw new ValidationError(
        'Automatic transaction checks are disabled, please activate them or use the internal depositing system',
      );
    }
    const { transactionHash, details, currencyID, amount, channelID, stoID } = data;
    return verifyTransactionReciepe(
      user,
      transactionHash,
      details,
      currencyID,
      amount,
      channelID,
      true,
      stoID,
    );
  }
}

export default VerifierResolvers;
