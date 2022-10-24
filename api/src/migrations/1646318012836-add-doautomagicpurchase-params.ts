import {MigrationInterface, QueryRunner} from "typeorm";

export class addDoautomagicpurchaseParams1646318012836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('params')
            .values({
                param: 'doAutomaticPurchase',
                intValue: 0,
            })
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('params')
            .where('param = "doAutomaticPurchase"')
            .execute();
    }

}
