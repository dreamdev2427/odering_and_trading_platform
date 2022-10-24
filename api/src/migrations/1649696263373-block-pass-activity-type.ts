import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class blockPassActivityType1649696263373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('activitytype')
        .values({
            ID: 35,
            Activity: 'Block Pass Webhook called',
        })
        .execute();

      await queryRunner.addColumn(
        'investor',
        new TableColumn({
          name: 'driversLicenseID',
          type: 'varchar',
          length: '255',
          isNullable: true,
          default: null,
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from('activitytype')
        .where('ID = 35')
        .execute();

      await queryRunner.dropColumn('investor', 'driversLicenseID');
    }

}
