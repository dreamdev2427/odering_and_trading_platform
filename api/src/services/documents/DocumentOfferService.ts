import { Investor, DocumentOfferInvestor as OfferedDocument } from 'entities';
import { LessThan, MoreThan } from 'typeorm';
import { ForbiddenError } from 'apollo-server-core';
import { investorHasAccess } from './DocumentsService';

class DocumentOfferServiceClass {
  offeredDocuments = async (investorID: number): Promise<OfferedDocument[]> => {
    const investor = await Investor.findOne(investorID);
    if (!investor) {
      throw new ForbiddenError('Investor not found');
    }
    const documentsOffered = await OfferedDocument.find({
      relations: ['document'],
      where: {
        from: LessThan(new Date()),
        to: MoreThan(new Date()),
      },
    });
    return documentsOffered.filter(investorHasAccess(investor));
  };

  async offeredDocument(
    investorID: number,
    documentID: number,
  ): Promise<OfferedDocument | undefined> {
    const investor = await Investor.findOne(investorID);
    if (!investor) {
      throw new ForbiddenError('Investor not found');
    }
    const offer = await OfferedDocument.findOne({
      relations: ['document'],
      where: {
        document: { ID: documentID },
      },
    });
    // Returned undefined if No Offers are found.
    if (!offer) return undefined;
    if (investorHasAccess(investor)(offer)) return offer;
  }
}

const DocumentOfferService = new DocumentOfferServiceClass();
export default DocumentOfferService;
