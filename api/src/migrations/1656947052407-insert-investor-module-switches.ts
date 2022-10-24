import { MigrationInterface, QueryRunner } from 'typeorm';

const names = [
  'isWalletManagementModuleEnabled',
  'isMyPortfolioModuleEnabled',
  'isActiveOfferingsModuleEnabled',
  'isNewsModuleEnabled',
  'isContractsModuleEnabled',
  'isCorporateActionsModuleEnabled',
  'isTradingModuleEnabled',
  'isChatModuleEnabled',
  'isSupportModuleEnabled',
  'isInvestorOwnershipModuleEnabled',
  'isSettingsModuleEnabled',
  'isTellAFriendModuleEnabled',
  'isAccreditationModuleEnabled',
];

export class insertInvestorModuleSwitches1656947052407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const values: {
      param: string;
      isGlobal: number;
      dataType: number;
      intValue: number;
    }[] = [];
    names.map((n) => {
      values.push({
        param: n,
        isGlobal: 1,
        dataType: 2,
        intValue: 1,
      });
    });

    await queryRunner.manager.createQueryBuilder().insert().into('params').values(values).execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const condition = `param = "${names.join('" || param = "')}"`;

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where(condition)
      .execute();
  }
}
