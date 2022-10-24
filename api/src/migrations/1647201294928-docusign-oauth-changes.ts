import { MigrationInterface, QueryRunner } from 'typeorm';

export class docusignOauthChanges1647201294928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'DocuSignOauthBasePath',
        isGlobal: 1,
        dataType: 1,
        intValue: 0,
        stringValue: 'https://account-d.docusign.com',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'DocuSignRsaKey',
        isGlobal: 1,
        dataType: 1,
        intValue: 0,
        stringValue: '',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'DocuSignUserID',
        isGlobal: 1,
        dataType: 1,
        intValue: 0,
        stringValue: '',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'DocuSignConsentUri',
        isGlobal: 1,
        dataType: 1,
        intValue: 0,
        stringValue: 'https://account-d.docusign.com',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "DocuSignOauthBasePath"')
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "DocuSignRsaKey"')
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "DocuSignUserID"')
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "DocuSignConsentUri"')
      .execute();
  }
}
