import { MigrationInterface, QueryRunner } from 'typeorm';

const names = [
  'not-connected',
  'connected',
  'duplicate-address-in-list',
  'please-select-address-type',
  'invalid-etherium-address',
  'metamask-disconnected-verify',
  'incorrect-metamask-account-selected',
  'input-eth',
  'non-numeric',
  'amount-failed-verify',
  'incorrect-wallet-amount',
  'invalid-ravencoin-address',
  'verify-crypto-amount',
  'verify-metamask',
  'eth-wallet-balance',
];

export class insertIsBankDetailsSwitchEnabledParam1658161773600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values([
        {
          param: 'isBankDetailsSwitchEnabled',
          isGlobal: 1,
          dataType: 2,
          intValue: 1,
        },
        {
          param: 'isBlockchainAddressSwitchEnabled',
          isGlobal: 1,
          dataType: 2,
          intValue: 1,
        },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values([
        {
          key: 'not-connected',
          locale: 'en',
          translation: 'Not connected',
        },
        {
          key: 'connected',
          locale: 'en',
          translation: 'Connected',
        },
        {
          key: 'duplicate-address-in-list',
          locale: 'en',
          translation: 'Address already in your provided list of addresses',
        },
        {
          key: 'please-select-address-type',
          locale: 'en',
          translation: 'Please select the address type',
        },
        {
          key: 'invalid-etherium-address',
          locale: 'en',
          translation: 'Ethereum Address is not valid',
        },
        {
          key: 'metamask-disconnected-verify',
          locale: 'en',
          translation:
            'MetaMask is not connected. Please connect with MetaMask to verify your account',
        },
        {
          key: 'incorrect-metamask-account-selected',
          locale: 'en',
          translation:
            'Correct account is not selected in MetaMask. Please select the account that you have entered in the textbox',
        },
        {
          key: 'input-eth',
          locale: 'en',
          translation: 'Please enter ETH amount',
        },
        {
          key: 'non-numeric',
          locale: 'en',
          translation: 'Please enter a numeric amount',
        },
        {
          key: 'amount-failed-verify',
          locale: 'en',
          translation: 'Amount could not be verified',
        },
        {
          key: 'incorrect-wallet-amount',
          locale: 'en',
          translation: 'The amount in the wallet is different from what you entered',
        },
        {
          key: 'invalid-ravencoin-address',
          locale: 'en',
          translation: 'Ravencoin Address is not valid',
        },
        {
          key: 'verify-crypto-amount',
          locale: 'en',
          translation: 'Verify with crypto amount',
        },
        {
          key: 'verify-metamask',
          locale: 'en',
          translation: 'Verify with MetaMask',
        },
        {
          key: 'eth-wallet-balance',
          locale: 'en',
          translation: 'Please specify the ETH balance of your wallet here',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "isBankDetailsSwitchEnabled"')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "isBlockchainAddressSwitchEnabled"')
      .execute();

    const condition = `key = "${names.join('" || key = "')}"`;

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('translations')
      .where(condition)
      .execute();
  }
}
