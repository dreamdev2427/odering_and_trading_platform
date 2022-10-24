import { Resolver, Query, Arg, Int, Authorized, Mutation } from 'type-graphql';
import { FindConditions } from 'typeorm';

import { JWT_ROLE } from 'core/context';
import { ComponentCustomization } from 'entities';
import { ComponentCustomizationInput } from './component-customization.types';

@Resolver()
class ComponentCustomizationResolvers {
  @Authorized(JWT_ROLE.investor, JWT_ROLE.admin, JWT_ROLE.platformAdmin)
  @Query(() => ComponentCustomization, {
    description: 'Get component customization',
  })
  fetchCustomizedComponent(
    @Arg('componentID', () => Int, { nullable: true }) componentID: number,
    @Arg('componentTitle', () => String, { nullable: true }) componentTitle: string,
  ): Promise<ComponentCustomization | undefined> {
    const findConditions: FindConditions<ComponentCustomization> = {};
    if (componentID) {
      findConditions.ID = componentID;
    }
    if (componentTitle) {
      findConditions.component = componentTitle;
    }
    return ComponentCustomization.findOneOrFail(findConditions);
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Query(() => [ComponentCustomization], {
    description: 'Get all customized components',
  })
  fetchCustomizedComponents(): Promise<ComponentCustomization[]> {
    return ComponentCustomization.find();
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Mutation(() => Boolean, {
    description: 'Mutation for inserting a component customization',
  })
  async customizedComponentsInsert(
    @Arg('data', () => ComponentCustomizationInput) data: ComponentCustomizationInput,
  ): Promise<boolean> {
    const componentCustomization = ComponentCustomization.create(data);
    await componentCustomization.save();
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Mutation(() => Boolean, {
    description: 'Mutation for updating a component customization',
  })
  async customizedComponentsUpdate(
    @Arg('componentID', () => Int) componentID: number,
    @Arg('data', () => ComponentCustomizationInput) data: ComponentCustomizationInput,
  ): Promise<boolean> {
    const componentCustomization = await ComponentCustomization.findOneOrFail({ ID: componentID });
    ComponentCustomization.merge(componentCustomization, data);
    await componentCustomization.save();
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing a component customization',
  })
  async customizedComponentsDelete(
    @Arg('componentID', () => Int, { nullable: true }) componentID: number,
  ): Promise<boolean> {
    if (componentID) {
      const componetCustomization = await ComponentCustomization.findOneOrFail({ ID: componentID });
      await componetCustomization.remove();
      return true;
    } else {
      await ComponentCustomization.delete({});
      return true;
    }
  }
}

export default ComponentCustomizationResolvers;
