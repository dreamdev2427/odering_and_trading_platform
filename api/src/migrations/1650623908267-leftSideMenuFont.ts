import {MigrationInterface, QueryRunner} from "typeorm";

export class leftSideMenuFont1650623908267 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
          param: 'leftSideMenuFont',
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
        param: 'poweredByLabel',
        isGlobal: 1,
        dataType: 1,
        intValue: 0,
        stringValue: '',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "leftSideMenuFont"')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "poweredByLabel"')
      .execute();
  }

}
