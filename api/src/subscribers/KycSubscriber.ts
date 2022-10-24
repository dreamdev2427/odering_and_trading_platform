import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { Investor, InvestorSto, Stos } from 'entities';
import { KycData } from 'api/external-kyc.types';
import { pubSub } from 'core/graphql-server';
import Email from 'services/email';
import { InvestorKycData } from 'services/sharePurchaseDocuments/SharePurchaseSignatureService';
import { handleAlertPostKycUpdate } from '../services/buyalert/buyAlertHelpers';

/**
 * TypeOrm calls this whenever something changes in the db using typeorm
 */
@EventSubscriber()
export class KycSubscriber implements EntitySubscriberInterface<InvestorSto> {
  /**
   * Indicates that this subscriber only listens to InvestorSto events.
   */
  listenTo(): typeof InvestorSto {
    return InvestorSto;
  }

  private static async updateWebhook(investorSto: InvestorSto): Promise<void> {
    const payload: KycData = {
      ID: investorSto.investorID,
      isKYC: !!investorSto.isKYC,
      isActive: !!investorSto.isActive,
      status: investorSto.status,
    };
    await pubSub.publish('KYC', payload);
  }

  /**
   * Called after InvestorSto Update.
   */
  async afterUpdate(event: UpdateEvent<InvestorSto>): Promise<void> {
    const propertyNames = ['status', 'isKYC', 'applied'];
    if (event.entity) {
      if (event.updatedColumns.find((c) => propertyNames.includes(c.propertyName))) {
        const investorSto = event.entity as InvestorSto;
        const investor = await Investor.findOneOrFail({ ID: investorSto.investorID });
        for (const updatedColumn of event.updatedColumns) {
          if (updatedColumn.propertyName === 'applied') {
            if (investorSto.applied) {
              const sto = await Stos.findOneOrFail({ ID: investorSto.stoID });
              const email = new Email(sto);
              await email.verificationUploadedEmail(investor);
            }
          } else {
            await KycSubscriber.updateWebhook(investorSto);
            const data: InvestorKycData = {
              investorID: investorSto.investorID,
              isKyc: !!investorSto.isKYC,
              status: investorSto.status,
              country: investor.taxCountry || investor.country,
            };
            await handleAlertPostKycUpdate(data);
          }
        }
      }
    }
  }
}
