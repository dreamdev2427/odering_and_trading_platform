import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tables = [
  new Table({
    name: 'polymeshAttestationProviders',
    columns: [
      {
        name: 'ID',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'sharetypeid',
        type: 'int',
        default: '0',
      },
      {
        name: 'title',
        type: 'varchar',
        length: '1000',
      },
      {
        name: 'did',
        type: 'varchar',
        length: '300',
      },
      {
        name: 'details',
        type: 'varchar',
        length: '4000',
      },
      {
        name: 'Accredited',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'Affiliate',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'BuyLockup',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'SellLockup',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'KnowYourCustomer',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'Jurisdiction',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'Exempted',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'Blocked',
        type: 'boolean',
        default: 0,
      },
    ],
  }),
  new Table({
    name: 'polymeshTokenRestrictionsSettings',
    columns: [
      {
        name: 'ID',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'sharetypeid',
        type: 'int',
        default: '0',
      },
      {
        name: 'title',
        type: 'varchar',
        length: '1000',
      },
      {
        name: 'Accredited',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'Affiliate',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'BuyLockup',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'SellLockup',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'KnowYourCustomer',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'Jurisdiction',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'JurisdictionPlace',
        type: 'varchar',
        length: '300',
      },
      {
        name: 'Exempted',
        type: 'boolean',
        default: 0,
      },
      {
        name: 'Blocked',
        type: 'boolean',
        default: 0,
      },
    ],
  }),
];

export class createPolymeshDataStructureTables1658151843123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const t of tables) {
      await queryRunner.createTable(t);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const t of tables) {
      await queryRunner.dropTable(t.name);
    }
  }
}
