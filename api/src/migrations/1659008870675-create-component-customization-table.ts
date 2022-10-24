import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createComponentCustomizationTable1659008870675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'component_customization',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'component',
            type: 'varchar',
            length: '1000',
          },
          {
            name: 'body',
            type: 'text',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('component_customization')
      .values({
        component: 'Navbar',
        body: '',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('component_customization', true);
  }
}
