import { Investor, InvestorSto, Stos } from 'entities';
import Email from 'services/email';
import { InvestorCompanyProfileInput, InvestorProfileInput } from 'api/kyc.types';

const updateProfile = async (
  investor: Investor,
  stoID: number,
  { notes, ...data }: InvestorProfileInput | InvestorCompanyProfileInput,
): Promise<boolean> => {
  const investorSTO = await InvestorSto.findOne({ investorID: investor.ID, stoID });

  if (!investorSTO) {
    return false;
  }

  await Investor.update(investor.ID, data);

  await InvestorSto.update(investorSTO.ID, { notes });

  const sto = await Stos.findOneOrFail({ ID: stoID });
  const email = new Email(sto);
  await email.userProfileUpdatedEmail(investor);

  return true;
};

export default updateProfile;
