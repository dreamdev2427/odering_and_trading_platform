import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Markup } from 'interweave';
import { useReactToPrint } from 'react-to-print';

import { useSubmittedDocumentQuery, useMeQuery } from 'services/apollo';
import { useLocalDate } from 'hooks';

import { Card, CardBody, Label } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useHistory, useLocation } from 'react-router-dom';

const SignedContract: React.FC = () => {
  const history = useHistory();
  const componentRef = useRef(null);
  const { id } = useParams<{ id: string }>();
  const submittedDocumentID: number = parseInt(id, 10);
  const { data } = useSubmittedDocumentQuery({ variables: { submittedDocumentID } });
  const { data: dataMe } = useMeQuery();
  const toLocalDate = useLocalDate();
  const { firstName, lastName } = dataMe?.investorUser?.investor || {};
  const { url, modified } = data?.submittedDocument?.signature || {};
  const location = useLocation<{ print: boolean | undefined }>();
  const documentTitle = data?.submittedDocument?.document.title || '';
  const documentContent = data?.submittedDocument?.contents ?? '';
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle,
  });

  useEffect(() => {
    if (location?.state?.print === true && componentRef.current !== undefined) {
      handlePrint();
      history.push('/investor/contracts-documents');
    }
  }, [handlePrint, history, location?.state?.print]);

  return (
    <div className="content">
      {data?.submittedDocument?.status === 2 ? (
        <Card>
          <CardHeader text="Contract has been signed" imgSrc="" />
          <CardBody className="mb-2">
            <Label>The administration will review your information and settle the contract</Label>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader text="Contract has been settled" imgSrc="" />
          <CardBody className="mb-2">
            <Label>The administration has reviewed and accepted the contract</Label>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardHeader text={documentTitle} imgSrc="/img/contracts.png" />
        <CardBody className="mb-2">
          <div ref={componentRef}>
            <Markup content={documentContent} />
            <SignatureContainer>
              <div className="ml-3">
                <div>
                  <img src={url ?? ''} alt="signature" />
                </div>
                <div className="font-weight-bold">{`${firstName} ${lastName}`}</div>
                <label>{modified && toLocalDate(new Date(modified))}</label>
              </div>
            </SignatureContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const SignatureContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SignedContract;
