import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class changeBeneficiaryTypeColumn1649317195682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newColumn = new TableColumn({
      name: 'beneficiaryType',
      type: 'enum',
      enum: ['BROKER', 'INVESTOR'],
      enumName: 'beneficiaryTypeEnum',
      isNullable: true,
    });
    await queryRunner.changeColumn('fee_commissions', 'beneficiaryType', newColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const oldColumn = new TableColumn({
      name: 'beneficiaryType',
      type: 'enum',
      enum: ['USER', 'INVESTOR'],
      enumName: 'beneficiaryTypeEnum',
      isNullable: true,
    });
    await queryRunner.changeColumn('fee_commissions', 'beneficiaryType', oldColumn);
  }
}
