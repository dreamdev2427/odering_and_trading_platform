import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Row, BsSwal, FormGroup, Loading } from 'atoms';
import {
  DocumentFieldValueDto,
  useSaveSharePurchaseContractFieldsMutation,
  useSaveSharePurchaseContractSignatureMutation,
} from 'services/apollo';
import { useHistory } from 'react-router-dom';
import { CardHeader } from 'components/card-header/CardHeader';
import { CustomInput } from 'reactstrap';
import { useTranslation } from 'react-i18next';

type SignatureProps = {
  status: number;
  fieldValues: { [p: string]: string };
  sharePurchaseID: number;
  documentID: number;
};

const CheckMarkSignature: React.FC<SignatureProps> = (props) => {
  const { sharePurchaseID, documentID, status, fieldValues } = props;
  const [isSignature, setIsSignature] = useState<boolean>(status > 2);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [saveFields] = useSaveSharePurchaseContractFieldsMutation();
  const [saveSignature] = useSaveSharePurchaseContractSignatureMutation();
  const history = useHistory();
  const { t } = useTranslation();
  if (isLoading) {
    return <Loading />;
  }
  const saveContract = async () => {
    setIsLoading(true);
    const fields: DocumentFieldValueDto[] = Object.keys(fieldValues).map(
      (ID): DocumentFieldValueDto => ({
        ID,
        value: fieldValues[ID],
      }),
    );
    const success = await saveFields({ variables: { sharePurchaseID, documentID, fieldValues: fields } });
    if (success && isSignature) {
      await saveSignature({
        variables: { sharePurchaseID, documentID, signature: 'true' },
      });
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    await saveContract();
    BsSwal.fire({
      title: t('contract-saved'),
      icon: 'success',
    }).then(() => {
      history.push(`/investor/share-purchase-signing/${sharePurchaseID}`);
    });
  };

  const onChange = () => setIsSignature(!isSignature);

  return (
    <Card>
      <CardHeader text={t('checkMarkSignature-cardHeader-Label')} imgSrc="/img/docsigned1.png" />
      <CardBody className="mb-2">
        <Container>
          <Row>
            <Col>
              <FormGroup switch>
                <CustomInput
                  id="sign-contract"
                  type="switch"
                  onChange={onChange}
                  label={t('checkMarkSignature-checkBox-Label')}
                  checked={isSignature}
                  width={100}
                  heigth={50}
                />
              </FormGroup>
            </Col>
          </Row>
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

export default CheckMarkSignature;
