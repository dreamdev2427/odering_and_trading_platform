import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addBeneficiaryTypeToFeeCommissions1648145914739 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'fee_commissions',
      new TableColumn({
        name: 'beneficiaryType',
        type: 'enum',
        enum: ['USER', 'INVESTOR'],
        enumName: 'beneficiaryTypeEnum',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('fee_commissions', 'beneficiaryType');
  }
}
