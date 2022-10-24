import { MigrationInterface, QueryRunner } from 'typeorm';

export class internalSigningSignatureMode1647002720650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'internalSignatureMode',
        isGlobal: 1,
        dataType: 1,
        intValue: 0,
        stringValue: 'draw',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'drawSignaturePrefillFonts',
        isGlobal: 1,
        dataType: 3,
        intValue: 0,
        stringValue: '["Cedarville Cursive", "UnifrakturCook"]',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "internalSignatureMode"')
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "drawSignaturePrefillFonts"')
      .execute();
  }
}
