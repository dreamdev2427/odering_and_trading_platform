//import { Resolver, Query, Arg, Authorized, Int } from 'type-graphql';
import { Arg, Authorized, Int, Query, Resolver, Mutation } from 'type-graphql';
import { JWT_ROLE } from 'core/context';
import { Blockchains } from 'entities';

@Resolver()
class BlockchainResolvers {
  @Authorized()
  @Query(() => [Blockchains], {
    description: 'Get all blockchains available',
    nullable: true,
  })
  async findAllBlockchains(): Promise<Blockchains[]> {
    return Blockchains.find();
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Add new blockchain',
  })
  async addNewBlockchain(@Arg('title', () => String) title: string): Promise<boolean> {
    try {
      const upd = new Blockchains();
      upd.title = title;
      await upd.save();
      console.log('Saved a new user with id: ' + upd.ID);

      return true;
    } catch (e) {
      console.log(`${(e as Error).stack}`);
      throw new Error(`Could not add new Blockchain.`);
    }
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description: 'Add new blockchain',
  })
  async updateBlockchain(
    @Arg('ID', () => Int) ID: number,
    @Arg('title', () => String) title: string,
  ): Promise<boolean> {
    try {
      const record = Blockchains.findOneOrFail({ ID: ID });
      (await record).title = title;
      (await record).save();
      console.log('Saved a new user with id: ');

      return true;
    } catch (e) {
      console.log(`${(e as Error).stack}`);
      throw new Error(`Could not update Blockchain.`);
    }
  }
}

export default BlockchainResolvers;
