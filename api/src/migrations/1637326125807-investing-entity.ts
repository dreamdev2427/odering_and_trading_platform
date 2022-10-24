import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class investingEntity1637326125807 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'investing_entity',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'investorID',
            type: 'int',
          },
          {
            name: 'type',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'taxId',
            type: 'varchar',
            length: '9',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'nickname',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'accredited',
            type: 'tinyint',
            width: 1,
          },
          {
            name: 'paymentMethod',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'postalCode',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'country',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'state',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'ach',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'wire',
            type: 'text',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'investing_entity_member',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'investorID',
            type: 'int',
          },
          {
            name: 'entityID',
            type: 'int',
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'role',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'signatory',
            type: 'tinyint',
            width: 1,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'investing_entity_member',
      new TableForeignKey({
        name: 'FC_investing_entity',
        columnNames: ['entityID'],
        referencedColumnNames: ['ID'],
        referencedTableName: 'investing_entity',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'investing_entity',
      new TableForeignKey({
        name: 'FC_investing_entity_investor',
        columnNames: ['investorID'],
        referencedColumnNames: ['ID'],
        referencedTableName: 'investor',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'investing_entity_member',
      new TableForeignKey({
        name: 'FC_investing_entity_member_investor',
        columnNames: ['investorID'],
        referencedColumnNames: ['ID'],
        referencedTableName: 'investor',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const entity = await queryRunner.getTable('investing_entity');
    if (entity) {
      await Promise.all(entity.foreignKeys.map((key) => queryRunner.dropForeignKey(entity, key)));
    }
    const member = await queryRunner.getTable('investing_entity_member');
    if (member) {
      await Promise.all(member.foreignKeys.map((key) => queryRunner.dropForeignKey(member, key)));
    }

    await queryRunner.dropTable('investing_entity', true);
    await queryRunner.dropTable('investing_entity_member', true);
  }
}
