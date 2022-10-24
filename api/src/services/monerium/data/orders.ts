export enum ORDER_STATE {
  PLACED = 'placed',
  PENDING = 'pending',
  PROCESSED = 'processed',
  REJECTED = 'rejected',
}
export enum ORDER_TYPE {
  /** Used when paying back to investor. Burns tokens from client address and converts to fiat. */
  REDEEM = 'redeem',
  /** Used when investing into company. Issues tokens to client address upon receiving fiat. */
  ISSUE = 'issue',
}
export interface OrderDto {
  /** Order ID */
  id: string;
  /** Client profile ID */
  profile: string;
  /** Type of order */
  kind: ORDER_TYPE;
  /** ETH address of our client */
  address: string;
  /** Client signature */
  signature: string;
  /** Precise amount to be paid */
  amount: string;
  /** Three-letter currency code */
  currency: string;
  /** Our client's investor */
  counterpart: {
    /** How to identify the investor account */
    identifier: {
      /** Such as IBAN */
      standard: string;
      [key: string]: string;
    };
    /** Details of investor company or individual person */
    details: {
      /** Used in case of a company investor */
      name: string;
      /** Used for individuals */
      firstName: string;
      /** Used for individuals */
      lastName: string;
    };
  };
  /** Memo visible by both sender and receiver */
  memo?: string;
  /** Memo visible by both sender and receiver */
  message?: string;
  /** Only provided if rejected */
  rejectedReason?: string;
  /** Order status details */
  meta: {
    state: ORDER_STATE;
    placedBy: string;
    placedAt: Date;
    approvedAt: Date;
  };
}

/**
 * Temporary solution.
 * @thorws Error on validation
 */
export const validateRequestOrderDto = (order: Partial<OrderDto>): void => {
  const missingFields: string[] = [];
  const errors: string[] = [];
  if (!order.amount) missingFields.push('amount');
  if (!order.counterpart) missingFields.push('counterpart');
  if (!order.counterpart?.identifier) missingFields.push('counterpart.identifier');
  if (!order.counterpart?.identifier.standard)
    missingFields.push('counterpart.identifier.standard');
  if (!order.counterpart?.details) missingFields.push('counterpart.details');
  if (
    !order.counterpart?.details.name &&
    !order.counterpart?.details.firstName &&
    !order.counterpart?.details.lastName
  )
    missingFields.push('counterpart.details.name');
  if (!order.currency) missingFields.push('currency');
  if (!order.kind) missingFields.push('kind');
  if (order.kind && order.kind !== 'redeem' && order.kind !== 'issue')
    errors.push("Orders can only be 'redeem' or 'issue'");
  if (!order.address) missingFields.push('address');
  // if (!order.signature) missingFields.push('signature');

  if (missingFields.length) {
    throw new Error(
      `Monerium: Invalid order details.\nMissing fields: ${missingFields.join(',')}${
        errors.length ? `\nErrors:` : ``
      }${errors.join(',')}`,
    );
  }
};
