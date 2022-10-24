import React from 'react';
import styled from 'styled-components';

type ContractInputProps = {
  ID: number;
  handleShowModal: (title: string, id: string) => void;
  title: string;
  to: string;
};

export const Offer: React.FC<ContractInputProps> = (props) => {
  const { title, handleShowModal, ID } = props;
  // const { t, i1s8n } = useTranslation();
  return (
    <Doc onClick={() => handleShowModal(title, String(ID))}>
      <img alt="doc" width="65px" src="/img/document.png" />
      {title}
    </Doc>
  );
};

const Doc = styled.div`
  margin: 10px;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
  height: 85px;
  width: 90px;
`;
