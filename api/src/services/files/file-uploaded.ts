import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class FileUploaded {
  @Field()
  link: string;

  @Field()
  name: string;
}

export default FileUploaded;
