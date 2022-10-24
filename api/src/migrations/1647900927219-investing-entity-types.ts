import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class investingEntityTypes1647900927219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'investing_entity_types',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'countries',
            type: 'varchar',
            length: '10000',
          },
        ],
      }),
    );
    await queryRunner.addColumn(
      'investing_entity',
      new TableColumn({
        name: 'typeID',
        type: 'int',
        default: '1',
      }),
    );

    const types = [
      'Individual Account',
      'Joint Account',
      'Limited Liability Company',
      'Corporation',
      'Partnership',
      'Retirement Plan 401k',
      'Single Member LLC',
      'Sole Proprietor',
      'Trust',
    ];

    // Inserting Values in Order
    const insertTypes = async () => {
      for (let i = 0; i < types.length; i++) {
        await new Promise((next) => {
          queryRunner.manager
            .insert('investing_entity_types', {
              title: types[i],
              countries: ['ALL'],
            })
            .then(() => {
              next(null);
            });
        });
      }
    };
    await insertTypes();

    types.forEach(async (unit, index) => {
      await queryRunner.manager.update(
        'investing_entity',
        {
          type: unit,
        },
        {
          typeID: index + 1,
        },
      );
    });
    await queryRunner.dropColumn('investing_entity', 'type');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('investing_entity_types', true);
    await queryRunner.dropColumn('investing_entity', 'typeID');
    await queryRunner.addColumn(
      'investing_entity',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        length: '255',
      }),
    );
  }
}
