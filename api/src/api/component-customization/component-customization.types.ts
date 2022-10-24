import { InputType, Field } from 'type-graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType({ description: 'Component customization data' })
export class ComponentCustomizationInput {
  @Field(() => String)
  @IsString()
  component: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  body?: string;
}
