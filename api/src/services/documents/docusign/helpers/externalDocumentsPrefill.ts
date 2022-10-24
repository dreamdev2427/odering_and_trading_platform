import {
  Investor,
  InvestorBuyPropertyAlert,
  DocumentField,
  InvestingEntity,
  ShareTypes,
  Stos,
  Document,
  SharePurchaseDocument,
  Currency,
} from 'entities';
import moment from 'moment';
import * as math from 'mathjs';
import { isMarketSpace, sharePurchaseDocumentsModes } from 'core/feature-flags-checkers';

export interface PrefilledFields {
  tabLabel: string;
  value: string;
}

export interface PrefillData {
  prefilledFields: PrefilledFields[];
  clientName: string;
  titleOfEmail: string;
  investorEmail: string;
  targetStoID: number;
  externalDocumentID: string;
  documentTitle: string;
}

const prefillDetails = async (
  investor: Investor,
  sharePurchase: InvestorBuyPropertyAlert,
  stoTitle: string,
  documentFields: DocumentField[],
  shareType: ShareTypes,
  currency: Currency,
  isHelloSign: boolean,
  document: Document,
  entity?: InvestingEntity,
): Promise<{ tabLabel: string; value: string }[]> => {
  const purchasePrice = math.multiply(
    math.bignumber(shareType?.premiumValue ?? 0),
    math.bignumber(sharePurchase?.shares ?? 0),
  ) as number;
  const autofilledFields: any = (await isMarketSpace())
    ? {
        shares: sharePurchase.shares ?? 0,
        investorfirstname: investor.firstName ?? '',
        investorlastname: investor.lastName ?? '',
        investorphone: investor.phone ?? '',
        investorinitial: investor.firstName?.charAt(0) ?? '',
        investorcompanyname: entity?.name ?? '',
        investorprimaryphonecontact: investor.primaryContactPhone ?? '',
        investoraddress: entity?.address ?? '',
        investortown: entity?.city ?? '',
        investorstate: entity?.state ?? '',
        investorzip: entity?.postalCode ?? '',
        investorCountry: entity?.country ?? '',
        investoremail: investor.email,
        projectname: stoTitle,
        currentDate: moment(new Date()).format('MMMM DD YYYY'),
        totalprice: `${currency.symbol} ${purchasePrice}`,
        sharePurchaseID: sharePurchase.ID,
        investorID: investor.ID,
        documentID: document.ID,
        shareprice: shareType?.premiumValue ?? 0,
        sharecurrency: currency.abbreviation ?? '',
      }
    : {
        shares: sharePurchase.shares ?? 0,
        investorfirstname: investor.firstName ?? '',
        investorlastname: investor.lastName ?? '',
        investorphone: investor.phone ?? '',
        investorinitial: investor.firstName?.charAt(0) ?? '',
        investorcompanyname: investor.companyName ?? '',
        investorprimaryphonecontact: investor.primaryContactPhone ?? '',
        investoraddress: investor.address ?? '',
        investortown: investor.town ?? '',
        investorstate: investor.state ?? '',
        investorzip: investor.zip ?? '',
        investorCountry: investor.country ?? '',
        investoremail: investor.email,
        projectname: stoTitle,
        currentDate: moment(new Date()).format('MMMM DD YYYY'),
        totalprice: `${currency.symbol} ${purchasePrice}`,
        sharePurchaseID: sharePurchase.ID,
        investorID: investor.ID,
        documentID: document.ID,
        shareprice: shareType?.premiumValue ?? 0,
        sharecurrency: currency.abbreviation ?? '',
      };
  const details: any = [];
  // map fields from the db with known fields
  if (documentFields) {
    documentFields.forEach((f) => {
      if (f.fieldID) {
        const tempField = {
          tabLabel: f.externalFileDataLabel || f.fieldID,
          value: autofilledFields[f.fieldID],
        };
        details.push(tempField);
      }
    });
  }
  if (!isHelloSign) {
    // helloSign doesn't like fields that might not be present on the template
    Object.keys(autofilledFields).forEach((key) => {
      const tempField = {
        tabLabel: key,
        value: autofilledFields[key],
      };
      details.push(tempField);
    });
  }
  return details;
};

const externalDocumentsPrefill = async (
  purchaseID: number,
  investorID: number,
  documentID: number,
): Promise<PrefillData> => {
  const buyRequest = await InvestorBuyPropertyAlert.findOneOrFail({ ID: purchaseID });

  const shareType = await ShareTypes.findOneOrFail({ ID: buyRequest.shareTypeID ?? 0 });
  const sto = await Stos.findOneOrFail({ ID: buyRequest.stoID });
  const investor = await Investor.findOneOrFail({ ID: investorID });
  const currency = await shareType.currency;
  const document = await Document.findOneOrFail({ ID: documentID, stoID: buyRequest.stoID ?? 0 });
  const sharePurchaseDocument = await SharePurchaseDocument.findOneOrFail({ ID: documentID });
  const documentFields = await DocumentField.find({ documentID, stoID: buyRequest.stoID ?? 0 }); // NB: Originally this allowed undefined stoID, so it's unsure if it will work
  const investingEntity = await InvestingEntity.findOne({ ID: buyRequest.entityID });

  const modes = await sharePurchaseDocumentsModes();
  const prefilledFields: any = await prefillDetails(
    investor,
    buyRequest,
    sto?.title,
    documentFields,
    shareType,
    currency,
    modes.isHelloSign(),
    document,
    investingEntity,
  );

  const titleOfEmail =
    sharePurchaseDocument.requireOnce === 0
      ? `${sto?.title} - Investment Advisory Contract`
      : `${sto?.title} - ${buyRequest.shares} Subscription Agreement`;

  const clientName =
    investor.investorType === 0
      ? `${investor.firstName} ${investor.lastName}`
      : `${investor.companyName}`;
  let externalDocumentID = '';
  if (modes.isDocuSign()) {
    externalDocumentID = document.docusignDocumentID ?? '';
  } else if (modes.isHelloSign()) {
    externalDocumentID = document.helloSignDocumentID ?? '';
  }
  return {
    prefilledFields,
    clientName,
    titleOfEmail,
    investorEmail: investor.email,
    externalDocumentID,
    targetStoID: sto?.ID,
    documentTitle: document.title,
  };
};

export default externalDocumentsPrefill;
