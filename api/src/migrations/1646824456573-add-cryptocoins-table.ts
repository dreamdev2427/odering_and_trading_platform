import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addCryptocoinsTable1646824456573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cryptocoins',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'cryptoName',
            type: 'varchar',
            length: '300',
          },
          {
            name: 'Address',
            type: 'varchar',
            length: '300',
          },
          {
            name: 'Symbol',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'blockchainID',
            type: 'int',
          },
          {
            name: 'isNative',
            type: 'int',
          },
          {
            name: 'currencyID',
            type: 'int',
          },
          {
            name: 'settleInCurrencyID',
            type: 'int',
          },
          {
            name: 'cryptoReceivingAddress',
            type: 'varchar',
            length: '200',
          },
        ],
      }),
    );
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('cryptocoins')
      .values({
        CryptoName: 'Ether',
        Address: '0x0',
        Symbol: 'Ether',
        BlockchainID: 1,
        isNative: 1,
        CurrencyID: 1,
        SettleInCurrencyID: 1,
        cryptoReceivingAddress: ' ',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('cryptocoins')
      .values({
        CryptoName: 'USDC',
        Address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        Symbol: 'USDC',
        BlockchainID: 1,
        isNative: 0,
        CurrencyID: 1,
        SettleInCurrencyID: 1,
        cryptoReceivingAddress: ' ',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('cryptocoins')
      .values({
        CryptoName: 'Tether',
        Address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        Symbol: 'USDT',
        BlockchainID: 1,
        isNative: 0,
        CurrencyID: 1,
        SettleInCurrencyID: 1,
        cryptoReceivingAddress: ' ',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cryptocoins');
  }
}
