import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class fixExchangeFeeEnums1653304515008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const beneficiaryEnum = new TableColumn({
      name: 'beneficiary',
      type: 'enum',
      enum: ['PLATFORM', 'BROKER'],
      enumName: 'beneficiaryEnum',
      isNullable: false,
    });
    await queryRunner.changeColumn('fees', 'beneficiary', beneficiaryEnum);

    const statusEnum = new TableColumn({
      name: 'status',
      type: 'enum',
      enum: ['FLAT', 'PERCENTAGE'],
      enumName: 'statusEnum',
      isNullable: false,
    });
    await queryRunner.changeColumn('fees', 'status', statusEnum);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const beneficiaryEnum = new TableColumn({
      name: 'beneficiary',
      type: 'enum',
      enum: ['platform', 'broker'],
      enumName: 'beneficiaryEnum',
      isNullable: false,
    });
    await queryRunner.changeColumn('fees', 'beneficiary', beneficiaryEnum);

    const statusEnum = new TableColumn({
      name: 'status',
      type: 'enum',
      enum: ['flat', 'percentage'],
      enumName: 'statusEnum',
      isNullable: false,
    });
    await queryRunner.changeColumn('fees', 'status', statusEnum);
  }
}
