import { MigrationInterface, QueryRunner } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class kycTranslations1634867369046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const insert = async (values: QueryDeepPartialEntity<unknown>[]): Promise<unknown> =>
      queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('translations')
        .values(values)
        .execute();

    await insert([
      { key: 'kyc-investor-info', locale: 'en', translation: 'Investor Info' },
      { key: 'kyc-investor-info', locale: 'de', translation: 'Investor Info' },
      { key: 'kyc-investor-info', locale: 'fr', translation: 'Renseignements sur l’investisseur' },
    ]);
    await insert([
      { key: 'kyc-investment', locale: 'en', translation: 'Investment' },
      { key: 'kyc-investment', locale: 'de', translation: 'Investition' },
      { key: 'kyc-investment', locale: 'fr', translation: 'Investissement' },
    ]);
    await insert([
      { key: 'kyc-investment-details', locale: 'en', translation: 'Investment Details' },
      { key: 'kyc-investment-details', locale: 'de', translation: 'Investitionsdetails' },
      { key: 'kyc-investment-details', locale: 'fr', translation: 'Détails des investissements' },
    ]);
    await insert([
      {
        key: 'kyc-investment-details-text-one',
        locale: 'en',
        translation: `
<p>The public offering of shares in <b><a href="https://digishares.io" target="_blank" rel="noreferrer">DigiShares</a></b> has not yet started.
But you can register here to be ready. Please contact <b><a href="mailto:info@digishares.io?Subject=Investor query" target="_top">info@digishares.io</a></b>  for more information</p><p>
<a href="http://localhost:4000/static/media/DigiShares.394dbe95.pdf?download=true" target="_blank">Download company slide deck</a>
<a href="http://localhost:4000/static/media/digishares-brochure.d7df8773.pdf?download=true" target="_blank">Download brochure</a>
<a href="http://localhost:4000/static/media/DigiShares-OM.8bc74b9b.pdf?download=true" target="_blank">Download investor materials</a><br></p>
<p>Also please see <b><a href="https://digishares.io" target="_blank" rel="noreferrer">http://www.digishares.io</a></b></p>
<p>Below please indicate how much you are interested in investing in DigiShares.</p>
<p>The number is not in any way binding.</p>
      `,
      },
      {
        key: 'kyc-investment-details-text-one',
        locale: 'de',
        translation: `
<p>Das öffentliche Angebot von Aktien in <b><a href="https://digishares.io" target="_blank" rel="noreferrer">DigiShares</a></b> hat noch nicht begonnen.
Aber Sie können sich hier registrieren, um bereit zu sein. Bitte kontaktieren Sie <b><a href="mailto:info@digishares.io?Subject=Investor query" target="_top">info@digishares.io</a></b> für weitere Informationen</p><p>
<a href="http://localhost:4000/static/media/DigiShares.394dbe95.pdf?download=true" target="_blank">Company slide deck herunterladen</a>
<a href="http://localhost:4000/static/media/digishares-brochure.d7df8773.pdf?download=true" target="_blank">Download Broschüre</a>
<a href="http://localhost:4000/static/media/DigiShares-OM.8bc74b9b.pdf?download=true" target="_blank">Investor Materials herunterladen</a><br></p>
<p>Siehe auch <b><a href="https://digishares.io" target="_blank" rel="noreferrer">http://www.digishares.io</a></b></p>
<p>Bitte geben Sie unten an, wie viel Sie in DigiShares investieren möchten.</p>
<p>Die Nummer ist in keiner Weise verbindlich.</p>
      `,
      },
      {
        key: 'kyc-investment-details-text-one',
        locale: 'fr',
        translation: `
<p>L’offre publique d’actions dans <b><a href="https://digishares.io" target="_blank" rel="noreferrer">DigiShares</a></b> n’a pas encore commencé.
Mais vous pouvez vous inscrire ici pour être prêt. Veuillez contacter <b><a href="mailto:info@digishares.io?Subject=Investor query" target="_top">info@digishares.io</a></b> pour plus d’informations</p><p>
<a href="http://localhost:4000/static/media/DigiShares.394dbe95.pdf?download=true" target="_blank">Télécharger le diaporama de l’entreprise</a>
<a href="http://localhost:4000/static/media/digishares-brochure.d7df8773.pdf?download=true" target="_blank">Télécharger la brochure</a>
<a href="http://localhost:4000/static/media/DigiShares-OM.8bc74b9b.pdf?download=true" target="_blank">Télécharger des documents pour les investisseurs</a><br></p>
<p>Voir aussi <b><a href="https://digishares.io" target="_blank" rel="noreferrer">http://www.digishares.io</a></b></p>
<p>Veuillez indiquer ci-dessous dans quelle mesure vous êtes intéressé à investir dans DigiShares.</p>
<p>Le numéro n’est d’aucune façon contraignant.</p>
      `,
      },
    ]);

    await insert([
      {
        key: 'kyc-investment-details-select-currency-label',
        locale: 'en',
        translation: 'Select Currency',
      },
      {
        key: 'kyc-investment-details-select-currency-label',
        locale: 'de',
        translation: 'Währung wählen',
      },
      {
        key: 'kyc-investment-details-select-currency-label',
        locale: 'fr',
        translation: 'Sélectionnez la devise',
      },
    ]);
    await insert([
      {
        key: 'kyc-investment-details-enter-amount-label',
        locale: 'en',
        translation: 'Enter Amount ( Minimum  $10000 )',
      },
      {
        key: 'kyc-investment-details-enter-amount-label',
        locale: 'de',
        translation: 'Betrag eingeben ( Minimum $10000 )',
      },
      {
        key: 'kyc-investment-details-enter-amount-label',
        locale: 'fr',
        translation: 'Entrez le montant (minimum de $10000 ).',
      },
    ]);
    await insert([
      {
        key: 'kyc-investment-details-investor-type-label',
        locale: 'en',
        translation: 'Do you view yourself as',
      },
      {
        key: 'kyc-investment-details-investor-type-label',
        locale: 'de',
        translation: 'Siehst du dich selbst als',
      },
      {
        key: 'kyc-investment-details-investor-type-label',
        locale: 'fr',
        translation: 'Vous considérez-vous comme',
      },
    ]);
    await insert([
      {
        key: 'kyc-investment-details-investor-type-retail',
        locale: 'en',
        translation: 'A retail investor ($100-$10,000 investments)',
      },
      {
        key: 'kyc-investment-details-investor-type-retail',
        locale: 'de',
        translation: 'Ein Privatanleger ($100-$10.000 Investitionen)',
      },
      {
        key: 'kyc-investment-details-investor-type-retail',
        locale: 'fr',
        translation: 'Un investisseur de détail (placements de $100 à $10 000)',
      },
    ]);
    await insert([
      {
        key: 'kyc-investment-details-investor-type-angel',
        locale: 'en',
        translation: 'An angel investor ($10,000-$100,000 investments)',
      },
      {
        key: 'kyc-investment-details-investor-type-angel',
        locale: 'de',
        translation: 'Ein Angel-Investor ($10.000-$100.000 Investitionen)',
      },
      {
        key: 'kyc-investment-details-investor-type-angel',
        locale: 'fr',
        translation: 'Un investisseur providentiel (investissements de $10 000 à @100 000$)',
      },
    ]);
    await insert([
      { key: 'kyc-upload-submit', locale: 'en', translation: 'Upload / Submit' },
      { key: 'kyc-upload-submit', locale: 'de', translation: 'Hochladen / Abschicken' },
      { key: 'kyc-upload-submit', locale: 'fr', translation: 'Téléverser / soumettre' },
    ]);
    await insert([
      { key: 'kyc-prove-identity', locale: 'en', translation: 'Prove your identity' },
      { key: 'kyc-prove-identity', locale: 'de', translation: 'Ihre Identität nachweisen' },
      { key: 'kyc-prove-identity', locale: 'fr', translation: 'Prouver votre identité' },
    ]);
    await insert([
      { key: 'kyc-prove-identity', locale: 'en', translation: 'Prove your identity' },
      { key: 'kyc-prove-identity', locale: 'de', translation: 'Ihre Identität nachweisen' },
      { key: 'kyc-prove-identity', locale: 'fr', translation: 'Prouver votre identité' },
    ]);
    await insert([
      {
        key: 'kyc-upload-submit-identity-text-one',
        locale: 'en',
        translation: `
        <p>Please verify your identity so we can comply with international financial regulations.</p>
        <p>Please upload a scanned copy of your passport in high quality.</p>
        `,
      },
      {
        key: 'kyc-upload-submit-identity-text-one',
        locale: 'de',
        translation: `
        <p>Bitte überprüfen Sie Ihre Identität, damit wir die internationalen Finanzvorschriften einhalten können.</p>
        <p>Bitte laden Sie eine gescannte Kopie Ihres Reisepasses in hoher Qualität hoch.</p>
        `,
      },
      {
        key: 'kyc-upload-submit-identity-text-one',
        locale: 'fr',
        translation: `
        <p>Veuillez vérifier votre identité afin que nous puissions nous conformer à la réglementation financière internationale.</p>
        <p>Veuillez télécharger une copie numérisée de votre passeport en haute qualité.</p>
        `,
      },
    ]);
    await insert([
      { key: 'kyc-prove-address', locale: 'en', translation: 'Prove your address' },
      { key: 'kyc-prove-address', locale: 'de', translation: 'Beweisen Sie Ihre Adresse' },
      { key: 'kyc-prove-address', locale: 'fr', translation: 'Prouver votre adresse' },
    ]);
    await insert([
      {
        key: 'kyc-upload-submit-address-text-one',
        locale: 'en',
        translation: `<p>Please upload a scanned copy of a utility bill or similar that documents your address</p>`,
      },
      {
        key: 'kyc-upload-submit-address-text-one',
        locale: 'de',
        translation: `<p>Bitte laden Sie eine gescannte Kopie einer Stromrechnung oder ähnlichem hoch, die Ihre Adresse dokumentiert</p>`,
      },
      {
        key: 'kyc-upload-submit-address-text-one',
        locale: 'fr',
        translation: `<p>Veuillez téléverser une copie numérisée d’une facture de services publics ou d’un document semblable qui documente votre adresse.</p>`,
      },
    ]);
    await insert([
      { key: 'kyc-submit-profile', locale: 'en', translation: 'Submit your profile' },
      { key: 'kyc-submit-profile', locale: 'de', translation: 'Senden Sie Ihr Profil' },
      { key: 'kyc-submit-profile', locale: 'fr', translation: 'Soumettre votre profil' },
    ]);
    await insert([
      {
        key: 'kyc-upload-submit-apply-text-one',
        locale: 'en',
        translation: `
<p>Please select Yes to give your consent and submit your profile. Our administrator will review your information and may contact your for further details or changes. Your profile will get activated after verification of your information</p>
`,
      },
      {
        key: 'kyc-upload-submit-apply-text-one',
        locale: 'de',
        translation: `
<p>Bitte wählen Sie Ja, um Ihre Zustimmung zu geben und Ihr Profil einzureichen. Unser Administrator prüft Ihre Daten und kann Sie für weitere Details oder Änderungen kontaktieren. Ihr Profil wird nach der Überprüfung Ihrer Informationen aktiviert</p>
`,
      },
      {
        key: 'kyc-upload-submit-apply-text-one',
        locale: 'fr',
        translation: `
<p>Veuillez sélectionner Oui pour donner votre consentement et soumettre votre profil. Notre administrateur examinera vos informations et pourra communiquer avec vous pour obtenir plus de détails ou des changements. Votre profil sera activé après vérification de vos informations</p>
`,
      },
    ]);
    await insert([
      {
        key: 'kyc-upload-submit-apply-consent-label',
        locale: 'en',
        translation: 'Please select yes to apply',
      },
      {
        key: 'kyc-upload-submit-apply-consent-label',
        locale: 'de',
        translation: 'Bitte wählen Sie Ja, um sich zu bewerben',
      },
      {
        key: 'kyc-upload-submit-apply-consent-label',
        locale: 'fr',
        translation: 'Veuillez sélectionner oui pour postuler',
      },
    ]);
    await insert([
      {
        key: 'kyc-upload-submit-apply-consent-yes',
        locale: 'en',
        translation: 'Yes, I give my consent',
      },
      {
        key: 'kyc-upload-submit-apply-consent-yes',
        locale: 'de',
        translation: 'Ja, ich gebe meine Zustimmung',
      },
      {
        key: 'kyc-upload-submit-apply-consent-yes',
        locale: 'fr',
        translation: 'Oui, je donne mon consentement',
      },
    ]);
    await insert([
      {
        key: 'kyc-upload-submit-apply-consent-no',
        locale: 'en',
        translation: 'Yes, I give my consent',
      },
      {
        key: 'kyc-upload-submit-apply-consent-no',
        locale: 'de',
        translation: 'Nein danke, ich bin nicht interessiert',
      },
      {
        key: 'kyc-upload-submit-apply-consent-no',
        locale: 'fr',
        translation: 'Non merci, je ne suis pas intéressé',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const keys = [
      'kyc-investor-info',
      'kyc-investment',
      'kyc-investment-details',
      'kyc-investment-details-text-one',
      'kyc-investment-details-select-currency-label',
      'kyc-investment-details-enter-amount-label',
      'kyc-investment-details-investor-type-label',
      'kyc-investment-details-investor-type-retail',
      'kyc-investment-details-investor-type-angel',
      'kyc-upload-submit',
      'kyc-prove-identity',
      'kyc-upload-submit-identity-text-one',
      'kyc-prove-address',
      'kyc-upload-submit-address-text-one',
      'kyc-submit-profile',
      'kyc-upload-submit-apply-text-one',
      'kyc-upload-submit-apply-consent-label',
      'kyc-upload-submit-apply-consent-yes',
      'kyc-upload-submit-apply-consent-no',
    ];
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .where('key IN (:...keys)', { keys })
      .from('translations')
      .execute();
  }
}
