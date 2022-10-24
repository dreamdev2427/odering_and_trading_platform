import { MigrationInterface, QueryRunner } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class defaultKyc1634500601872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const insert = async (
      page: string,
      values: QueryDeepPartialEntity<unknown>,
    ): Promise<unknown> => {
      const res = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(page)
        .values(values)
        .execute();

      return res.raw.insertId;
    };

    const insertPage = (values: QueryDeepPartialEntity<unknown>): Promise<unknown> =>
      insert('kyc_pages', values);

    const insertField = (values: QueryDeepPartialEntity<unknown>): Promise<unknown> =>
      insert('kyc_fields', values);

    const insertValue = (values: QueryDeepPartialEntity<unknown>): Promise<unknown> =>
      insert('kyc_field_values', values);

    const page1 = await insertPage({
      name: 'investor-info',
      title: 'kyc-investor-info',
      icon: 'ti-user',
    });

    await insertField({
      pageID: page1,
      name: 'personal-info',
      type: 'personalInfo',
    });

    const page2 = await insertPage({
      name: 'investment',
      title: 'kyc-investment',
      icon: 'ti-money',
    });

    const card21 = await insertPage({
      name: 'investment-details',
      title: 'kyc-investment-details',
      pageID: page2,
    });

    const field21 = await insertField({
      pageID: card21,
      name: 'investment-details-text',
      type: 'html',
    });

    await insertValue({
      fieldID: field21,
      value: 'kyc-investment-details-text-one',
    });

    const field22 = await insertField({
      pageID: card21,
      name: 'currency',
      type: 'select',
      required: true,
      label: 'kyc-investment-details-select-currency-label',
    });

    await insertValue({
      fieldID: field22,
      value: 'USD',
      label: 'USD',
    });

    await insertValue({
      fieldID: field22,
      value: 'EUR',
      label: 'EUR',
    });

    await insertField({
      pageID: card21,
      name: 'amount',
      type: 'number',
      required: true,
      label: 'kyc-investment-details-enter-amount-label',
      placeholder: 'kyc-investment-details-enter-amount-placeholder',
    });

    const field23 = await insertField({
      pageID: card21,
      name: 'investor-type-label',
      type: 'h4',
    });

    await insertValue({
      fieldID: field23,
      value: 'kyc-investment-details-investor-type-label',
    });

    const field24 = await insertField({
      pageID: card21,
      name: 'type-investor',
      type: 'radio',
      required: true,
    });

    await insertValue({
      fieldID: field24,
      value: 'retail',
      label: 'kyc-investment-details-investor-type-retail',
    });

    await insertValue({
      fieldID: field24,
      value: 'angel',
      label: 'kyc-investment-details-investor-type-angel',
    });

    const page3 = await insertPage({
      name: 'upload-submit',
      title: 'kyc-upload-submit',
      icon: 'ti-upload',
    });

    const card31 = await insertPage({
      name: 'upload-submit-identity',
      title: 'kyc-prove-identity',
      pageID: page3,
    });

    const field31 = await insertField({
      pageID: card31,
      name: 'upload-submit-identity-text',
      type: 'html',
    });

    await insertValue({
      fieldID: field31,
      value: 'kyc-upload-submit-identity-text-one',
    });

    await insertField({
      pageID: card31,
      name: 'identity',
      type: 'upload',
      required: true,
    });

    const card32 = await insertPage({
      name: 'upload-submit-address',
      title: 'kyc-prove-address',
      pageID: page3,
    });

    const field32 = await insertField({
      pageID: card32,
      name: 'upload-submit-address-text',
      type: 'html',
    });

    await insertValue({
      fieldID: field32,
      value: 'kyc-upload-submit-address-text-one',
    });

    await insertField({
      pageID: card32,
      name: 'address',
      type: 'upload',
      required: true,
    });

    const card33 = await insertPage({
      name: 'upload-submit-apply',
      title: 'kyc-submit-profile',
      pageID: page3,
    });

    const field33 = await insertField({
      pageID: card33,
      name: 'upload-submit-apply-text',
      type: 'html',
    });

    await insertValue({
      fieldID: field33,
      value: 'kyc-upload-submit-apply-text-one',
    });

    const field34 = await insertField({
      pageID: card33,
      name: 'upload-submit-apply-consent',
      type: 'h4',
    });

    await insertValue({
      fieldID: field34,
      value: 'kyc-upload-submit-apply-consent-label',
    });

    const field44 = await insertField({
      pageID: card33,
      name: 'consent',
      type: 'radio',
      required: true,
    });

    await insertValue({
      fieldID: field44,
      value: 'yes',
      label: 'kyc-upload-submit-apply-consent-yes',
    });

    await insertValue({
      fieldID: field44,
      value: 'no',
      label: 'kyc-upload-submit-apply-consent-no',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .where('pageID is null')
      .from('kyc_pages')
      .execute();
  }
}
