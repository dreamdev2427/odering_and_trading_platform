import { EventSubscriber, EntitySubscriberInterface, UpdateEvent } from 'typeorm';

import { InvestorBuyPropertyAlert, Stos } from 'entities';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import Email from 'services/email';
import { isMarketSpace } from 'core/feature-flags-checkers';

@EventSubscriber()
export class BuyPropertySubscriber implements EntitySubscriberInterface<InvestorBuyPropertyAlert> {
  /**
   * Indicates that this subscriber only listen to InvestorBuyPropertyAlert events.
   */
  listenTo(): typeof InvestorBuyPropertyAlert {
    return InvestorBuyPropertyAlert;
  }

  /**
   * Called after InvestorBuyPropertyAlert Update.
   */
  async afterUpdate(event: UpdateEvent<InvestorBuyPropertyAlert>): Promise<void> {
    const propertyNames = ['status', 'isSubscriptionSigned', 'isBuySharesSigned'];
    if (event.entity) {
      if (event.updatedColumns.find((c) => propertyNames.includes(c.propertyName))) {
        const investorBuyPropertyAlert = event.entity as InvestorBuyPropertyAlert;
        const sto = await Stos.findOneOrFail({ ID: investorBuyPropertyAlert.stoID });
        const email = new Email(sto);
        const isMS = await isMarketSpace();
        for (const updatedColumn of event.updatedColumns) {
          if (updatedColumn.propertyName === 'status') {
            if (investorBuyPropertyAlert.status === PURCHASE_STATUS_TYPE.Accepted) {
              if (isMS) {
                await email.marketSpaceFinalizedInvestmentEmail(
                  investorBuyPropertyAlert.investorID,
                );
              } else {
                await email.finalizedInvestmentEmail(investorBuyPropertyAlert.investorID);
              }
            }
          }
          if (
            updatedColumn.propertyName === 'isBuySharesSigned' ||
            updatedColumn.propertyName === 'isSubscriptionSigned'
          ) {
            if (
              investorBuyPropertyAlert.isBuySharesSigned === 1 &&
              investorBuyPropertyAlert.isSubscriptionSigned === 1
            ) {
              if (isMS) {
                await email.marketSpaceDocumentSubscriptionCompletedEmail(
                  investorBuyPropertyAlert.investorID,
                );
              } else {
                await email.documentSubscriptionCompletedEmailForInvestor(
                  investorBuyPropertyAlert.investorID,
                );
              }
              // await email.documentSubscriptionCompletedEmailForAdmin(
              //   investorBuyPropertyAlert.investorID,
              // );
              /*
                await email.documentsESignedEmail(investorBuyPropertyAlert.investorID);
              */
            }
          }
        }
      }
    }
  }
}
