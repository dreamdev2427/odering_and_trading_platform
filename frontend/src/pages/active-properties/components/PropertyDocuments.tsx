import React from 'react';

import { PropertyFile } from 'services/apollo';

import { Row, Col, Button } from 'atoms';

interface PropertyDocumentsProps {
  documents: PropertyFile[];
}

const PropertyDocuments: React.FC<PropertyDocumentsProps> = ({ documents = [] }) => {
  if (!documents.length) {
    return <></>;
  }

  const downloadFile = (url: string) => {
    const filename = url.substring(url.lastIndexOf('/') + 1);
    fetch(url, {
      method: 'GET'
    }).then((response) => response.blob().then((blobData) => {
      const imageElement = document.createElement('a');
      imageElement.href = URL.createObjectURL(blobData);
      imageElement.setAttribute('download', filename);
      imageElement.click();
    }));
  };

  return (
    <div className="mt-4">
      <b>Documents</b>
      {documents.map((doc) => (
        <Row key={doc.ID}>
          <Col md={7}>{doc.title}</Col>
          <Col md={5}>
            <Button size="sm" onClick={() => downloadFile(doc.url)}>
              Download
            </Button>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default PropertyDocuments;