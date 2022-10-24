import { Resolver, Query, Arg, Int, Authorized } from 'type-graphql';

import { User } from 'entities';

@Resolver()
class UserResolvers {
  @Authorized()
  @Query(() => String, {
    description: 'Get Username by ID',
  })
  async getUsernameByID(@Arg('userID', () => Int) userID: number): Promise<string> {
    const user = await User.findOne({ ID: userID });
    if (user) {
      return user.username;
    } else {
      return '';
    }
  }

  @Authorized()
  @Query(() => String, {
    description: 'Get Full Name by ID',
  })
  async getFullNameByID(@Arg('userID', () => Int) userID: number): Promise<string> {
    const user = await User.findOne({ ID: userID });
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    } else {
      return '';
    }
  }
}

export default UserResolvers;
