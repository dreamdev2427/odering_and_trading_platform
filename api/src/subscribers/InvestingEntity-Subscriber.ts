import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { InvestingEntity, InvestorSto } from 'entities';
import { InvestorKycData } from 'services/sharePurchaseDocuments/SharePurchaseSignatureService';
import { handleAlertPostKycUpdate } from '../services/buyalert/buyAlertHelpers';

@EventSubscriber()
export class InvestingEntitySubscriber implements EntitySubscriberInterface<InvestingEntity> {
  listenTo(): typeof InvestingEntity {
    return InvestingEntity;
  }

  async afterUpdate(event: UpdateEvent<InvestingEntity>): Promise<void> {
    const propertyNames = ['accredited'];
    if (event.entity) {
      if (event.updatedColumns.find((c) => propertyNames.includes(c.propertyName))) {
        const entity = event.entity as InvestingEntity;
        const investorSto = await InvestorSto.findOneOrFail({
          investorID: entity.investorID,
          stoID: 0,
        });
        const data: InvestorKycData = {
          investorID: entity.investorID,
          isKyc: !!investorSto.isKYC,
          status: entity.accredited ? 3 : investorSto.status,
          country: entity.country,
          entityID: entity.ID,
        };
        await handleAlertPostKycUpdate(data);
      }
    }
  }
}
