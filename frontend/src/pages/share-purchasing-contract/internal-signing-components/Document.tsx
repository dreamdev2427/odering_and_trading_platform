import React, { useMemo } from 'react';
import { Card, CardBody } from 'atoms';
import { DocumentFields } from 'services/apollo/documents';
import { CardHeader } from 'components/card-header/CardHeader';
import { Markup } from 'interweave';

type DocumentProps = {
  documentFields: DocumentFields;
  rawContents: string;
  fieldValues: { [p: string]: string };
};

const Document: React.FC<DocumentProps> = (props) => {
  const { documentFields, rawContents, fieldValues } = props;

  const contents: string = useMemo(
    () =>
      documentFields?.reduce<string>(
        (acc: string, field) => acc.replaceAll(field.title.toString(), fieldValues[field.title] ?? field.title),
        rawContents,
      ) ?? '',
    [documentFields, fieldValues, rawContents],
  );

  return (
    <Card>
      <CardHeader text="Document" imgSrc="/img/contracts.png" />
      <CardBody>
        <Markup content={contents} />
      </CardBody>
    </Card>
  );
};

export default Document;
