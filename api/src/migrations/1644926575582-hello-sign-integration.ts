import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class helloSignIntegration1644926575582 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'documents',
        new TableColumn({
            name: 'helloSignDocumentID',
            type: 'varchar',
            length: '50',
            isNullable: true,
            default: null,
        }),
      );
      await queryRunner.addColumn(
        'stos',
        new TableColumn({
          name: 'helloSignClientID',
          type: 'varchar',
          length: '50',
          isNullable: true,
          default: null,
        }),
      );
      await queryRunner.addColumn(
          'documentuser',
          new TableColumn({
            name: 'sharePurchaseID',
            type: 'int',
            isNullable: true,
            default: null,
          }),
        );
      await queryRunner.createTable(
        new Table({
          name: 'helloSignSignatures',
          columns: [
            {
              name: 'ID',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'signatureID',
              type: 'varchar',
              length: '50',
              isNullable: false,
            },
            {
              name: 'investorBuyPropertyAlertID',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'investorID',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'documentID',
              type: 'int',
              isNullable: false,
            },
          ],
        }),
        true,
      );
      await queryRunner.renameColumn(
        'documentfields',
        'docusignFieldDataLabel',
        'externalFileDataLabel'
      );
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('params')
        .values({
          param: 'helloSignApiKey',
          isGlobal: 1,
          dataType: 1,
          stringValue: '',
        })
        .execute();
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('params')
        .values({
          param: 'helloSignTestMode',
          isGlobal: 1,
          dataType: 2,
          intValue: 0,
        })
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('documents', 'helloSignDocumentID');
      await queryRunner.dropColumn('stos', 'helloSignClientID');
      await queryRunner.dropColumn('documentuser', 'sharePurchaseID');
      await queryRunner.dropTable('helloSignSignatures');
      await queryRunner.renameColumn(
        'documentfields',
        'externalFileDataLabel',
        'docusignFieldDataLabel'
      );
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from('params')
        .where('param = "helloSignApiKey"')
        .execute();
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from('params')
        .where('param = "helloSignTestMode"')
        .execute();

    }

}
