import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Spinner } from 'reactstrap';
import SignatureCanvas from 'react-signature-canvas';
import { Markup } from 'interweave';

import {
  DocumentFieldValueDto,
  useOfferedDocumentQuery,
  useSaveContractFieldsMutation,
  useSaveContractSignatureMutation,
  useSendContractMutation,
} from 'services/apollo';

import { BsSwal, Button, Label, Row } from 'atoms';

const Contract: React.FC<{ id: string }> = ({ id }) => {
  const documentID: number = parseInt(id, 10);
  const { data } = useOfferedDocumentQuery({ variables: { documentID } });

  // const rawContents = data?.offeredDocument?.document?.contents ?? '';
  const [fieldValues] = useState<{ [id: string]: string }>({});
  const history = useHistory();

  // TODO: Fix document fill fields
  // useEffect(() => {
  //   if (data?.unfinishedDocument?.fieldValues)
  //     setFieldValues(
  //       data?.unfinishedDocument?.fieldValues.reduce(
  //         (acc, fieldValue) => ({ ...acc, [fieldValue.ID]: fieldValue.value }),
  //         {},
  //       ),
  //     );
  // }, [data?.unfinishedDocument?.fieldValues]);

  const [isSignature, setIsSignature] = useState<boolean>(false);
  const signatureRef = useRef<SignatureCanvas>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | undefined>();
  useEffect(() => {
    if (data?.unfinishedDocument?.signature?.url) setSignatureUrl(data.unfinishedDocument.signature.url);
  }, [data?.unfinishedDocument?.signature?.url]);
  const onClear = () => {
    signatureRef.current?.clear();
    setIsSignature(false);
    setSignatureUrl(undefined);
  };
  const onSignatureEnd = () => setIsSignature(true);
  // const fieldValueHandler = (key: string) => (value: any) => setFieldValues((state) => ({ ...state, [key]: value }));
  // const contents: string = useMemo(
  //   () =>
  //     data?.documentFields?.reduce<string>(
  //       (acc: string, field) => acc.replaceAll(field.ID.toString(), fieldValues[field.ID] ?? field.title),
  //       rawContents,
  //     ) ?? '',
  //   [data?.documentFields, fieldValues, rawContents],
  // );
  const complete = useMemo<boolean>(
    () => !!data?.documentFields.every((field) => fieldValues[field.ID]) && (isSignature || !!signatureUrl),
    [data?.documentFields, fieldValues, isSignature, signatureUrl],
  );

  useEffect(() => {
    if ((data?.unfinishedDocument?.status ?? 0) > 1) history.push(`/investor/contracts-documents`);
  }, [data, history]);

  const [saveFields] = useSaveContractFieldsMutation();
  const [saveSignature] = useSaveContractSignatureMutation();
  const [sendContract] = useSendContractMutation();
  const [loading, setLoading] = useState(false);

  const saveContract = async () => {
    const fields: DocumentFieldValueDto[] = Object.keys(fieldValues).map(
      (ID): DocumentFieldValueDto => ({
        ID,
        value: fieldValues[ID],
      }),
    );
    const success = await saveFields({ variables: { documentID, fieldValues: fields } });
    if (success && signatureRef?.current && !signatureRef.current.isEmpty()) {
      const result = await saveSignature({
        variables: { documentID, signature: signatureRef?.current?.toDataURL('image/png') },
      });
      setSignatureUrl(result.data?.setSignature);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    await saveContract();
    setLoading(false);
    BsSwal.fire({
      title: 'Contract has been saved',
      icon: 'success',
    });
  };

  const handleSaveSend = async () => {
    setLoading(true);
    await saveContract();
    const result = await sendContract({
      variables: { documentID },
    });
    if (result.data?.sendContract) {
      history.push(`/investor/contracts-documents`);
      BsSwal.fire({
        title: 'Contract has been sent',
        icon: 'success',
      });
    } else {
      BsSwal.fire({
        title: 'Failed to send a document',
        icon: 'error',
      });
    }
    setLoading(false);
  };

  //  const data1: any = {};
  //   const contents1: any = {};
  //   const complete1 = false;
  return (
    <div className="content">
      <Markup content={data?.offeredDocument?.document?.contents ?? '<p>loading</p>'} />

      {/* {data?.documentFields?.map((field) => (* /}
            {/*  <ContractInput */}
      {/*    key={field.ID} */}
      {/*    ID={field.ID} */}
      {/*    value={fieldValues[field.ID]} */}
      {/*    title={field.title} */}
      {/*    helperText={field.helperText} */}
      {/*    onChange={fieldValueHandler(field.ID)} */}
      {/*  /> */}
      {/* ))} */}

      {signatureUrl ? (
        <SignatureCanvasContainer>
          <img alt="signature" src={signatureUrl} />
        </SignatureCanvasContainer>
      ) : (
        <>
          <SignatureTitle>
            Signature
            <SignatureCanvasContainer>
              <ClearSignatureButton disabled={!isSignature && !signatureUrl} onClick={onClear}>
                Clear
              </ClearSignatureButton>
              <SignatureCanvas
                ref={signatureRef}
                onEnd={onSignatureEnd}
                canvasProps={{
                  width: 300,
                  height: 100,
                  style: { display: 'block', borderWidth: '3px', borderColor: '#9b9b9b' },
                }}
              />
            </SignatureCanvasContainer>
          </SignatureTitle>
        </>
      )}

      <Row>
        {loading ? (
          <Spinner />
        ) : (
          <div className="ml-auto">
            <Button disabled={!complete} onClick={handleSave}>
              Save
            </Button>
            <Button disabled={!complete} onClick={handleSaveSend}>
              Save & Send
            </Button>
          </div>
        )}
      </Row>
    </div>
  );
};

// const CotractfieldTitle = styled(Label)`
//   font-size: 20px;
//   display: block;
// `;
const SignatureTitle = styled(Label)`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 450px;
  margin-left: auto;
  color: black;
  font-size: 20px;
  border: 0 solid;
  border-bottom: 2px solid;
`;
const ClearSignatureButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 5px 8px;
`;
const SignatureCanvasContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 26px;
  float: right;
  border-radius: 10px;
  min-width: 300px;
  min-height: 100px;
  overflow: hidden;
  border-style: solid;
  border-width: 1px;
  border-color: #dddddd;
  background-color: #f5f5f5;
`;

export default Contract;
