import React, { useRef, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Row, BsSwal, Loading } from 'atoms';
import {
  DocumentFieldValueDto,
  useSaveSharePurchaseContractFieldsMutation,
  useSaveSharePurchaseContractSignatureMutation,
} from 'services/apollo';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SignatureCanvas from 'react-signature-canvas';
import { CardHeader } from 'components/card-header/CardHeader';
import WebFont from 'webfontloader';
import { useTranslation } from 'react-i18next';

type SignatureProps = {
  signatureUrl: string | undefined;
  fieldValues: { [p: string]: string };
  sharePurchaseID: number;
  documentID: number;
  prefillFonts: string[];
};

const DrawSignature: React.FC<SignatureProps> = (props) => {
  const { sharePurchaseID, documentID, fieldValues, prefillFonts } = props;
  const [isSignature, setIsSignature] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signatureRef = useRef<SignatureCanvas>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | undefined>();
  const [saveFields] = useSaveSharePurchaseContractFieldsMutation();
  const [saveSignature] = useSaveSharePurchaseContractSignatureMutation();
  const history = useHistory();
  const { t } = useTranslation();

  if (isLoading) {
    return <Loading />;
  }
  if (prefillFonts.length > 0 && prefillFonts[0] !== '') {
    WebFont.load({
      google: {
        families: prefillFonts,
      },
    });
  }

  const onClear = () => {
    signatureRef.current?.clear();
    setIsSignature(false);
    setSignatureUrl(undefined);
  };

  const onSignatureEnd = () => setIsSignature(true);

  const saveContract = async () => {
    setIsLoading(true);
    const fields: DocumentFieldValueDto[] = Object.keys(props.fieldValues).map(
      (ID): DocumentFieldValueDto => ({
        ID,
        value: props.fieldValues[ID],
      }),
    );
    const { current } = signatureRef;
    const signature = signatureRef?.current?.toDataURL('image/png');
    const success = await saveFields({ variables: { sharePurchaseID, documentID, fieldValues: fields } });
    if (success && current && !current?.isEmpty() && signature) {
      const result = await saveSignature({
        variables: { sharePurchaseID, documentID, signature },
      });
      if (result.data?.setSharePurchaseDocumentSignature) {
        setSignatureUrl(result.data?.setSharePurchaseDocumentSignature);
        return undefined;
      }
      return result;
    }
    setIsLoading(false);
    return t('contract-not-signed');
  };

  const handleSave = async () => {
    const result = await saveContract();
    if (!result) {
      BsSwal.fire({
        title: t('contract-saved'),
        icon: 'success',
      }).then(() => {
        history.push(`/investor/share-purchase-signing/${sharePurchaseID}`);
      });
    } else {
      BsSwal.fire({
        title: result,
        icon: 'error',
      }).then(() => {
        history.push(`/investor/share-purchase-signing/${sharePurchaseID}`);
      });
    }
  };

  const fullName = `${fieldValues.investorfirstname} ${fieldValues.investorlastname}`;
  const generateSignature = (font: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = `50px ${font}`;
      context.fillText(
        fullName,
        (canvas.width - context.measureText(fullName).width) / 1.5,
        canvas.height / 1.5,
        context.measureText(fullName).width,
      );

      onClear();
      signatureRef.current?.fromDataURL(canvas.toDataURL());
      onSignatureEnd();
    }
  };

  return (
    <Card>
      <CardHeader text={t('checkMarkSignature-cardHeader-Label')} imgSrc="/img/docsigned1.png" />
      <CardBody className="mb-2">
        <Container>
          <Row>
            <Col xs={12}>
              <ClearSignatureButton disabled={!isSignature && !signatureUrl} onClick={onClear}>
                Clear
              </ClearSignatureButton>
            </Col>
          </Row>
          {signatureUrl ? (
            <Row>
              <Col xs={12}>
                <SignatureCanvasContainer>
                  <img src={signatureUrl} alt="signature" />
                </SignatureCanvasContainer>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col xs={6}>
                <SignatureCanvasContainer>
                  <SignatureCanvas
                    ref={signatureRef}
                    onEnd={onSignatureEnd}
                    canvasProps={{
                      className: 'signatureCanvas',
                      width: 400,
                      height: 150,
                    }}
                  />
                </SignatureCanvasContainer>
              </Col>
              {prefillFonts.length > 0 && prefillFonts[0] !== '' ? (
                <Col>
                  <b>{t('drawSignature-suggestedSignature-Label')}</b>
                  <br />
                  <>
                    {prefillFonts.map((f) => (
                      <Row key={f}>
                        <Col xs={12}>
                          <Button style={{ fontFamily: f }} size="large" onClick={() => generateSignature(f)}>
                            {fullName}
                          </Button>
                        </Col>
                      </Row>
                    ))}
                  </>
                </Col>
              ) : (
                ''
              )}
            </Row>
          )}
          <Row>
            <Col>
              <Button disabled={!isSignature} onClick={handleSave}>
                {t('save-sign-button')}
              </Button>
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  );
};

export default DrawSignature;

const ClearSignatureButton = styled(Button)`
  margin-left: 10px;
  padding: 5px 8px;
`;
const SignatureCanvasContainer = styled.div`
  display: inline-block;
  border-radius: 10px;
  min-width: 400px;
  min-height: 150px;
  overflow: hidden;
  border-style: solid;
  border-width: 1px;
  border-color: #dddddd;
  background-color: #f5f5f5;
`;
