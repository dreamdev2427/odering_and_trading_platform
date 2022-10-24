import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class bulkWhitelistingFunction1662636101499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bulkwhitelistingaddresses', true);
    await queryRunner.createTable(
      new Table({
        name: 'bulkwhitelistingaddresses',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'address',
            type: 'varchar',
            length: '300',
          },
          {
            name: 'investorID',
            type: 'int',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bulkwhitelistingaddresses', true);
  }
}
