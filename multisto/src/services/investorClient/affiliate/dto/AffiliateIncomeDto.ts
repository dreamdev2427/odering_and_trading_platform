import { Affiliateincomes } from '../../../../Schema';

export default interface AffiliateIncomeDto {
    userid: number;
    amount: number;
    token: number;
    remark: string;
}

export const mapToAffiliateincomes = (dto: AffiliateIncomeDto): Affiliateincomes => {
    const regExp = /Level ([0-9]+)/;
    const match = regExp.exec(dto.remark);
    const remarkLevel: number | null = (match) ? +(match[1]) : null;
    return {
        id: 0,
        investorId: dto.userid,
        amount: dto.amount,
        tokens: dto.token,
        remark: dto.remark,
        affiliateLevel: remarkLevel,
        stoId: 0, // Default
        awarded: 0, // Default
    }
};
