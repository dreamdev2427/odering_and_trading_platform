import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class netkiIntegration1651509355267 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('activitytype')
      .values({
        ID: 36,
        Activity: 'Netki Webhook called',
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'NetkiParamJson',
        isGlobal: 1,
        dataType: 3,
        intValue: 0,
        stringValue: `{
                  "mobileAppPanel": "",
                  "username": "",
                  "password": "",
                  "emailHeader": "",
                  "emailBody": "",
                  "attachMobileAppPanelToEmail": false,
                  "sendEmail": true
              }`,
      })
      .execute();

    await queryRunner.createTable(
      new Table({
        name: 'netki_access_codes',
        columns: [
          {
            name: 'access_code',
            type: 'varchar',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'investorID',
            type: 'int',
            length: '255',
            isNullable: true,
          },
          {
            name: 'childAccessCode',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'netki_access_codes',
      new TableForeignKey({
        name: 'FC_netki_access_codes_investor',
        columnNames: ['investorID'],
        referencedColumnNames: ['ID'],
        referencedTableName: 'investor',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('activitytype')
      .where('ID = 36')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "NetkiParamJson"')
      .execute();

    await queryRunner.dropForeignKey('netki_access_codes', 'FC_netki_access_codes_investor');
    await queryRunner.dropTable('netki_access_codes');
  }
}
