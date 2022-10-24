import React from 'react';
import { Button } from 'reactstrap';
import { FontAweIcon } from './Icons';

interface DocumentLinkProps {
  link: string;
  title?: string;
  download?: boolean;
}

const DocumentLink: React.FC<DocumentLinkProps> = ({ link, title = '', download = false }) => (
  <Button
    target="_blank"
    rel="noreferrer"
    className="rounded-pill"
    href={`${link}${download ? '?download=true' : ''}`}
    color="primary"
    outline
    size="sm"
  >
    <FontAweIcon icon="file" /> {title}
  </Button>
);

export default DocumentLink;
