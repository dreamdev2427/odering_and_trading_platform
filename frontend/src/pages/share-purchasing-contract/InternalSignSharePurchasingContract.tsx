import React from 'react';
import { Loading } from 'atoms';
import { DocumentUserFieldValue, useGetInternalSigningDataQuery } from 'services/apollo';
import { useParams } from 'react-router';
import Fields from './internal-signing-components/Fields';
import Document from './internal-signing-components/Document';
import DrawSignature from './internal-signing-components/DrawSignature';
import CheckMarkSignature from './internal-signing-components/CheckMarkSignature';

interface FieldValues {
  [id: string]: string;
}

const InternalSignSharePurchasingContract: React.FC = () => {
  const params = useParams<{ sharepurchaseid: string; documentid: string }>();
  const documentID: number = parseInt(params.documentid, 10);
  const sharePurchaseID: number = parseInt(params.sharepurchaseid, 10);
  const { data, loading: dataLoading } = useGetInternalSigningDataQuery({ variables: { documentID, sharePurchaseID } });
  let fieldValues: FieldValues = {};

  if (!data || dataLoading) {
    return <Loading />;
  }

  const fields: DocumentUserFieldValue[] = data.sharePurchaseDocument?.fieldValues || data.getPrefilledDocumentValues;
  if (fields) {
    fieldValues = fields.reduce<{ [id: string]: string }>(
      (acc, fieldValue) => ({
        ...acc,
        [fieldValue.ID ?? '']: fieldValue.value ?? '',
      }),
      {},
    );
  }

  const { investorAppParameters, sharePurchaseDocument, documentFields, document } = data;
  const { IsCheckMarkSignatureActive, IsDarwSignatureActive, drawSignaturePrefillFonts } = investorAppParameters;

  const visibleFields = documentFields ?? [];

  return (
    <div className="content">
      <Document documentFields={visibleFields} rawContents={document?.contents ?? ''} fieldValues={fieldValues} />
      {visibleFields.length > 0 ? <Fields visibleFields={visibleFields} fieldValues={fieldValues} /> : ''}
      {IsDarwSignatureActive ? (
        <DrawSignature
          sharePurchaseID={sharePurchaseID}
          documentID={documentID}
          signatureUrl={sharePurchaseDocument?.signature?.url ?? ''}
          fieldValues={fieldValues}
          prefillFonts={drawSignaturePrefillFonts}
        />
      ) : (
        ''
      )}
      {IsCheckMarkSignatureActive ? (
        <CheckMarkSignature
          sharePurchaseID={sharePurchaseID}
          documentID={documentID}
          status={sharePurchaseDocument?.status ?? 0}
          fieldValues={fieldValues}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default InternalSignSharePurchasingContract;
