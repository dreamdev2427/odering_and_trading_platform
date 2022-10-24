import React, { useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { Row, Col, FontAweIcon, Button } from 'atoms';
import TypeSelect from './TypeSelect';
import SideSelect from './SideSelect';
import UploadFile from './UploadFile';

interface IdentityFile {
  link: string;
  name: string;
  type: string;
  side?: string;
}

interface IdentityUploadProps {
  files?: IdentityFile[];
  addFile: (file: IdentityFile) => void;
  removeFile: (filename: string) => void;
}

const IdentityUpload: React.FC<IdentityUploadProps> = ({ files = [], addFile, removeFile }) => {
  const [type, setType] = useState('');
  const [side, setSide] = useState('');
  const [loading, setLoading] = useState(false);

  const afterUpload = (file: Pick<IdentityFile, 'link' | 'name'>) => {
    const newFile = {
      ...file,
      type,
      side,
    };

    addFile(newFile);
    setType('');
    setSide('');
  };

  return (
    <>
      <Row>
        <Col>
          <TypeSelect type={type} changeType={setType} disabled={loading} />
          {type ? (
            <>
              <SideSelect side={side} changeSide={setSide} disabled={loading} />
              <UploadFile afterUpload={afterUpload} setLoading={setLoading} />
            </>
          ) : null}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col sm={6} lg={4}>
          <ListGroup flush>
            {files.map((file) => (
              <ListGroupItem key={file.name}>
                <FontAweIcon className="text-primary mr-1" icon="file" />
                {file.name.slice(37)}
                <Button size="sm" color="danger" className="ml-4" onClick={() => removeFile(file.name)}>
                  <FontAweIcon icon="trash" />
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default IdentityUpload;
