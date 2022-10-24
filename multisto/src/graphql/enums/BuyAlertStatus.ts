export type BuyAlertStatus =
  | "Unused"
  | "Pending"
  | "Accepted"
  | "Declined"
  | "PaymentFailure"
  | "PaymentOngoing"
  | "PaymentAwaiting"
  | "KycRequired"
  | "AccreditationRequired"
  | "PendingDocuments";
