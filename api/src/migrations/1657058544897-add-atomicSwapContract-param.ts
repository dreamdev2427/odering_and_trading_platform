import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAtomicSwapContractParam1657058544897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'atomicSwapContractAddress',
        isGlobal: 1,
        dataType: 1,
        intValue: 1,
        stringValue: '0x3cb6df9845af79ab7c2af9530da0b046bacb6cf9',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "atomicSwapContractAddress"')
      .execute();
  }
}
