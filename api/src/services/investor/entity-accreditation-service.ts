import { ValidationError } from 'apollo-server-core';
import { InvestingEntity, Investor, InvestorSto, Stos } from 'entities';
import Email from 'services/email';

class EntityAccreditationService {
  sto: Stos;

  async setEntityAccreditation(entityID: number, isAccredited: boolean): Promise<boolean> {
    const entity = await InvestingEntity.findOneOrFail({ ID: entityID });
    const investor = await Investor.findOneOrFail({ ID: entity.investorID });
    const investorSto = await InvestorSto.findOneOrFail({ investorID: entity.investorID });

    const sto = await Stos.findOne(investorSto.stoID);
    if (!sto) {
      throw new ValidationError('Wrong sto number');
    }
    this.sto = sto;

    entity.accredited = isAccredited;
    await entity.type; // type becomes null otherwise
    await entity.save();

    if (isAccredited) {
      const mail = new Email(this.sto);
      await mail.sendEntityAccreditationApproved(investor);
    }
    return true;
  }
}

export { EntityAccreditationService };
