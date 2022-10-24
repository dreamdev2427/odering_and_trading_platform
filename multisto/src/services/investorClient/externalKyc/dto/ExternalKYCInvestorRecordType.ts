export type ExternalKYCInvestorRecord = {
    firstName: string,
    lastName: string,
    middleNames: string,
    dob: string,
    phoneNumber: string,
    email: string,
    residencyAddress: {
        country: string,
        city: string,
        postalCode: string,
        address: string
    },
    investorId: string,
    stoId: string,
    countryCitizenship: string,
    nationalIdNumber: string,
    passportNumber: string,
    socialSecurityNumber: string,
    taxIdNo: string,
    kycStatus: number,
    kycCurrentStatus: number,
    KycExpiryDate: string | null,
    kycApplied: number | null
}