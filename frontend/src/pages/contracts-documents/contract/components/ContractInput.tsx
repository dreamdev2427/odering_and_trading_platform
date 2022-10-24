import { Col, FormGroup, Input, Row } from 'atoms';
import styled from 'styled-components';
import Label from 'reactstrap/lib/Label';
import React from 'react';

type ContractInputProps = {
  ID: string;
  title: string;
  helperText: string;
  value: string;
};

const ContractInput: React.FC<ContractInputProps> = (props) => {
  const { ID, value, helperText, title } = props;
  return (
    <Row>
      <Col xs={12}>
        <FormGroup>
          <CotractfieldTitle for={ID}>{title}</CotractfieldTitle>
          <Label for={ID}>{helperText}</Label>
          <Input disabled type="text" value={value} />
        </FormGroup>
      </Col>
    </Row>
  );
};
export default ContractInput;

const CotractfieldTitle = styled(Label)`
  font-size: 20px;
  display: block;
`;
