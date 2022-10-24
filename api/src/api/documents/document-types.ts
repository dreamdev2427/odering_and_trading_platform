import { InputType, Field } from 'type-graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType({ description: 'Document Submitted entiry data' })
export class DocumentFieldValueDTO implements Partial<DocumentFieldValueDTO> {
  @Field()
  @IsString()
  ID: string;

  @Field()
  @IsString()
  @MaxLength(255)
  value: string;
}
