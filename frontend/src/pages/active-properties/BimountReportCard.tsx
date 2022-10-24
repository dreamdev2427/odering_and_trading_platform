import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Card, CardBody, Col, Loading, Row, TABLE, TH, THEAD, TR, TD } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import AGENDA_ITEM from 'assets/img/agendaitem.png';

type Report = {
  smartContract: Record<string, Record<string, string>>;
  calculations: Record<string, string>;
  transactions: Record<string, string>[];
  status: string;
};

const fetchReport = async (id: number | string): Promise<Report | undefined> => {
  const response = await fetch(`http://bimount-qa.kelltontech.net/api/v1/property-status/${id}`);
  const json = await response.json();
  if (json.success) {
    return json.data[0];
  }
};

const BimountReportCard: React.FC<{ id: string | number }> = ({ id }) => {
  const [report, setReport] = useState<Report | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchReport(id)
      .then(setReport)
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }
  if (!report) {
    return null;
  }
  return (
    <Card>
      <CardHeader text="Report" imgSrc={AGENDA_ITEM} />
      <CardBody>
        <CalculationRow>
          <Col xs={5}>
            <b>Status:</b>
          </Col>
          <Col xs={5}>
            <b>{report.status}</b>
          </Col>
        </CalculationRow>
        <Calculations calculations={report.calculations} />
        <SmartContract smartContract={report.smartContract} />
        <Transactions transactions={report.transactions} />
      </CardBody>
    </Card>
  );
};

export default BimountReportCard;

const Calculations: React.FC<{ calculations: Record<string, string> }> = ({ calculations }) => {
  return (
    <>
      {Object.keys(calculations).map((calculationID) => (
        <CalculationRow key={calculationID}>
          <Col xs={5}>{calculationID.replace('_', ' ')}:</Col>
          <Col xs={5}>{calculations[calculationID]}</Col>
        </CalculationRow>
      ))}
    </>
  );
};
const CalculationRow = styled(Row)`
  max-width: 500px;
`;

const SmartContract: React.FC<{ smartContract: Record<string, Record<string, string>> }> = ({ smartContract }) => {
  if (Object.keys(smartContract).length === 0) return null;

  const smartContractTableColumns: string[] = Object.keys(smartContract[Object.keys(smartContract)[0]]).map((column) =>
    column.replace('_', ' '),
  );
  return (
    <>
      <CardHeader
        text="Smart contract"
        // caption="Questionnaire and your responses from your earlier registration"
      />
      <FullWidthTable>
        <THEAD>
          <TR>
            <TH>ID</TH>
            {smartContractTableColumns.map((columnName) => (
              <TH key={columnName}>{columnName}</TH>
            ))}
          </TR>
        </THEAD>

        <tbody>
          {Object.keys(smartContract).map((contractID) => (
            <TR key={contractID}>
              <TD>{contractID}</TD>
              {smartContractTableColumns.map((columnName) => (
                <TD key={columnName}>{smartContract[contractID][columnName]}</TD>
              ))}
            </TR>
          ))}
        </tbody>
      </FullWidthTable>
    </>
  );
};

const Transactions: React.FC<{ transactions: Record<string, string>[] }> = ({ transactions }) => {
  if (transactions.length === 0) return null;

  const columnNames: string[] = Object.keys(transactions[0]).map((column) => column.replace('_', ' '));
  return (
    <>
      <CardHeader text="Smart contract" />
      <FullWidthTable>
        <THEAD>
          <TR>
            {columnNames.map((columnName) => (
              <TH key={columnName}>{columnName}</TH>
            ))}
          </TR>
        </THEAD>

        <tbody>
          {transactions.map((transaction, index) => (
            <TR key={index}>
              {columnNames.map((columnName) => (
                <TD key={columnName}>{transaction[columnName]}</TD>
              ))}
            </TR>
          ))}
        </tbody>
      </FullWidthTable>
    </>
  );
};

const FullWidthTable = styled(TABLE)`
  display: table;
`;
