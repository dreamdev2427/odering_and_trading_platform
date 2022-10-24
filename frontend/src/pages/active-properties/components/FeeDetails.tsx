import React from 'react';
import { Col, Row } from 'atoms';

import { CommissionType } from 'services/apollo/graphql';
import { FetchFees } from 'services/apollo/fee';

interface FeeDetailsProps {
  fees: FetchFees[];
  currencySymbol: string;
}

const FeeDetails: React.FC<FeeDetailsProps> = (prop) => {
  const { fees, currencySymbol } = prop;

  return (
    <>
      {fees.map((f) => (
        <Row key={f.ID}>
          <Col md={8}>
            <b>
              {f.beneficiary} ({f.status}):
            </b>
          </Col>
          <Col md={4}>
            {f.status === CommissionType.Percentage ? (
              <label>{f.amount}%</label>
            ) : (
              <label>
                {currencySymbol}
                {f.amount}
              </label>
            )}
          </Col>
        </Row>
      ))}
    </>
  );
};

export default FeeDetails;
