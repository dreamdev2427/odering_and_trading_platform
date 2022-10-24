import { ExternalKYCInvestorRecord } from './dto/ExternalKYCInvestorRecordType';

export default interface IExternalKycService {
    updateKycStatus(investorRecord: ExternalKYCInvestorRecord): Promise<boolean>;
    updateLogin(investorRecord: ExternalKYCInvestorRecord): Promise<void>;
}
