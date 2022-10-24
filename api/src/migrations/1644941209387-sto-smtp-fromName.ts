import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class stoSmtpFromName1644941209387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'stos',
            new TableColumn({
                name: 'SMTP_FromName',
                type: 'varchar',
                isNullable: true,
                default: null,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('stos', 'SMTP_FromName');
    }

}
