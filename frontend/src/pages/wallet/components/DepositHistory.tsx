import React from 'react';

import { InvestorWalletHistory } from 'services/apollo/multisto';

import WALLET from 'assets/img/wallet.png';
import { Card, CardBody, TABLE, TH, TR, THEAD } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import HistoryItem from 'pages/wallet/components/HistoryItem';

interface DepositHistoryProps {
  history: InvestorWalletHistory[];
}

const DepositHistory: React.FC<DepositHistoryProps> = ({ history }) => {
  return (
    <Card>
      <CardHeader text="Deposit History" imgSrc={WALLET} />
      <CardBody className="mb-2">
        {history ? (
          <TABLE responsive>
            <THEAD>
              <TR>
                <TH max="200px">Date Received</TH>
                <TH max="200px">Amount</TH>
                <TH width="50%" min="280px">
                  Status
                </TH>
                <TH width="50%" min="280px">
                  Message
                </TH>
              </TR>
            </THEAD>

            <tbody>
              {history.map((hst) => (
                <HistoryItem key={hst.ID} history={hst} />
              ))}
            </tbody>
          </TABLE>
        ) : (
          <label>No Records Founds</label>
        )}
      </CardBody>
    </Card>
  );
};

export default DepositHistory;
