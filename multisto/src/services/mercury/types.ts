export type TransactionStatus = 'pending' | 'sent' | 'cancelled' | 'failed';
export type MercuryTransaction = {
  id: string;
  note: string | null;
  externalMemo: string | null;
  bankDescription: string | null;
  amount: number;
  createdAt: string;
  status: TransactionStatus;
};

export type MercuryPaymentMethod = 'check' | 'electronic' | 'domesticWire' | 'internationalWire';
export type MercuryAccountType =
  | 'businessChecking'
  | 'businessSavings'
  | 'personalChecking'
  | 'personalSavings';
export type MercuryRecipient = {
  id: string;
  name: string;
  emails: string[];
  paymentMethod: MercuryPaymentMethod;
  electronicRoutingInfo: {
    accountNumber: string;
    routingNumber: string;
    electronicAccountType: MercuryAccountType;
    address: {
      address1: string;
      city: string;
      region: string;
      postalCode: string;
      country: string;
    };
  };
};
export type MercuryConfig = {
  APIKey: string;
  accountID: string;
  lastProcessedTransaction: number;
};
export type MercuryParam =
  | { enabled: false }
  | ({
      enabled: true;
    } & MercuryConfig);

export type MercuryAccount = {
  accountNumber: string;
  routingNumber: string;
};
