export interface BlockPassParam {
  ClientId: string;
  ApiKey: string;
  BlockPassWebhookToken: string;
}

export interface BlockPassKycDataResponse {
  status: string,
  data:{
    status: string,
    recordId:string,
    refId:string,
    submitCount:number,
    blockPassID:string,
    isArchived:boolean,
    inreviewDate:string,
    waitingDate:string,
    approvedDate:string,
    customFields:{

    },
    identities:{
      email:{
        type:string,
        value:string
      },
      family_name:{
        type:string,
        value:string
      },
      given_name:{
        type:string,
        value:string
      },
      dob:{
        type:string,
        value:string
      },
      phone:{
        type:string,
        value: string
      },
      address:{
        type:string,
        value:string,
      },
      national_id_issuing_country:{
        type:string,
        value:string,
      },
      national_id_number:{
        type:string,
        value:string,
      },
      passport_number: {
        type: string,
        value: string
      }
      passport_issuing_country: {
        type:string,
        value:string
      }
      national_id_dob:{
        type:string,
        value:string,
      },
      national_id_expiration:{
        type:string,
        value:string,
      },
      national_id_given_name:{
        type:string,
        value:string,
      },
      national_id_family_name:{
        type:string,
        value:string,
      },
      selfie:{
        type: string,
        value: string,
      },
      passport:{
        type: string,
        value: string,
      },
      national_id: {
        type: string,
        value: string,
      },
      driving_license_issuing_country: {
        type: string,
        value: string,
      },
      driving_license_number:{
        type: string,
        value: string,
      },
      driving_license: {
        type: string,
        value: string,
      },
    },
    certs: {

    }
  }
}

export type BlockPassResponsePhone = {
  countryCode2:string,
  number: string,
  countryCode: string,
  phoneNumber: string
}

export type BlockPassResponseAddress = {
  address:string,
  extraInfo: string,
  city: string,
  state: string,
  postalCode: string,
  country: string
}
