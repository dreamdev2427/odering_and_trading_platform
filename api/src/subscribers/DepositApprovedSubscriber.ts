import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { doAutomaticPurchase, isInvoicingEnabled } from 'core/feature-flags-checkers';
import { automaticPurchaseAfterAllDocumentsSigned } from 'services/automaticPurchase/automatic-purchase-after-all-documents-signed';
import { InvestorBuyPropertyAlert, InvestorDepositReceivedAlert } from '../entities';

@EventSubscriber()
export class DepositApprovedSubscriber
  implements EntitySubscriberInterface<InvestorDepositReceivedAlert>
{
  listenTo(): typeof InvestorDepositReceivedAlert {
    return InvestorDepositReceivedAlert;
  }

  async afterUpdate(event: UpdateEvent<InvestorDepositReceivedAlert>): Promise<void> {
    if (
      event.entity &&
      (await doAutomaticPurchase()) &&
      (await isInvoicingEnabled()) &&
      event.updatedColumns.find((column) => column.propertyName === 'isApproved') &&
      event.entity.isApproved === 1
    ) {
      const buyAlert = await InvestorBuyPropertyAlert.findOneOrFail({
        ID: event.entity.buyAlertID,
      });
      await automaticPurchaseAfterAllDocumentsSigned(buyAlert);
    }
  }
}
