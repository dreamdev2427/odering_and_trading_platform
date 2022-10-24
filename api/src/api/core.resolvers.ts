import { Resolver, Query, Arg, Mutation, Authorized } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { countries } from 'services/country/list';
import upload from 'services/files/upload';
import { Params } from 'entities';
import { AppParameters } from 'entities/params';
import FileUploaded from 'services/files/file-uploaded';

@Resolver()
class CoreResolvers {
  @Query(() => [String], { description: 'Get all countries' })
  countries(): string[] {
    return countries;
  }

  @Query(() => AppParameters, {
    description: 'Get investors application parameters',
  })
  investorAppParameters(): Promise<AppParameters> {
    return Params.getAppParams();
  }

  @Authorized()
  @Mutation(() => Boolean, {
    description: 'Set a theme config',
  })
  setThemeConfig(@Arg('theme') theme: string): Promise<boolean> {
    return Params.setTheme(theme);
  }

  @Authorized()
  @Mutation(() => FileUploaded, { description: 'Mutation for upload investors files' })
  async fileUpload(
    @Arg('file', () => GraphQLUpload) file: Promise<FileUpload>,
  ): Promise<FileUploaded> {
    return upload.uploadFile(file);
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Mutation for delete uploaded files' })
  async fileRemove(@Arg('file', () => String) file: string): Promise<boolean> {
    await upload.deleteFile(file);
    return true;
  }
}

export default CoreResolvers;
