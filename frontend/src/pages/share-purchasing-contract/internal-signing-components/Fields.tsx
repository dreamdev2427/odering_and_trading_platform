import React from 'react';
import { Card, CardBody, Container } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { DocumentFields } from 'services/apollo/documents';
import ContractInput from '../../contracts-documents/contract/components/ContractInput';

type FieldsProps = {
  visibleFields: DocumentFields;
  fieldValues: { [p: string]: string };
};

const Fields: React.FC<FieldsProps> = (props) => {
  const { visibleFields, fieldValues } = props;
  return (
    <Card>
      <CardHeader text="Fields" imgSrc="/img/contracts.png" />
      <CardBody className="mb-2">
        {visibleFields ? (
          <Container>
            {visibleFields.map((field) => (
              <ContractInput
                key={field.ID}
                ID={field.title.toString()}
                value={fieldValues[field.title] ?? ''}
                title={field.title}
                helperText={field.helperText}
              />
            ))}
          </Container>
        ) : (
          ''
        )}
      </CardBody>
    </Card>
  );
};

export default Fields;
