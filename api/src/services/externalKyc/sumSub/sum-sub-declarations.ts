export interface RequestToken {
  token: string;
  signature: string;
  timestamp: number;
}

export interface SumSubParam {
  AppToken: string;
  LevelName: string;
  ApiSecretKey: string;
  WebhookSecretKey: string;
}

export interface SumSubWebhookPayload {
  applicantId: string;
  inspectionId: string;
  applicantType: string;
  correlationId: string;
  levelName: string;
  sandboxMode: boolean;
  externalUserId: string;
  type: string;
  reviewResult: {
    reviewAnswer: string;
  };
  reviewStatus: string;
  createdAt: string;
  clientId: string;
}

export interface SumSubResponseAddress {
  flatNumber: string;
  street: string;
  buildingNumber: string;
  town: string;
  postCode: string;
  country: string;
}

export interface SumSubResponse {
  id: string;
  createdAt: string;
  clientId: string;
  inspectionId: string;
  externalUserId: string;
  fixedInfo: {
    firstName: string;
    lastName: string;
    country: string;
    addresses: [SumSubResponseAddress];
  };
  info: {
    firstName: string;
    lastName: string;
    middleName: string;
    dob: string;
    country: string;
    addresses: [SumSubResponseAddress];
    city: string;
    postalCode: string;
    state: string;
    phone: string;
    nationality: string;
    idDocs: [
      {
        idDocType: string;
        country: string;
        firstName: string;
        firstNameEn: string;
        lastName: string;
        lastNameEn: string;
        validUntil: string;
        number: string;
        dob: string;
        mrzLine1: string;
        mrzLine2: string;
        mrzLine3: string;
      },
    ];
  };
  email: string;
  applicantPlatform: string;
  requiredIdDocs: {
    docSets: [
      {
        idDocSetType: string;
        types: [string, string];
      },
      {
        idDocSetType: string;
        types: [string];
      },
    ];
  };
  review: {
    elapsedSincePendingMs: number;
    elapsedSinceQueuedMs: number;
    reprocessing: boolean;
    levelName: string;
    createDate: string;
    reviewDate: string;
    startDate: string;
    reviewResult: {
      reviewAnswer: string;
      reviewRejectType: string;
    };
    reviewStatus: string;
  };
  lang: string;
  type: string;
  metadata: [
    {
      key: string;
      value: string;
    },
  ];
}

export type Method = 'POST' | 'GET';
