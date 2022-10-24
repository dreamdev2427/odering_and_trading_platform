import React from 'react';

import { Label, Col, Row, RadioInput } from 'atoms';

interface SellOrderOptionProps {
  id: string;
  onChange: () => void;
  label1: string;
  text1: string;
  label2?: string;
  text2?: string;
}

const SellOrderOption: React.FC<SellOrderOptionProps> = ({
  id,
  onChange,
  label1,
  text1,
  label2,
  text2,
}) => {
  return (
    <>
      <RadioInput
        big
        id={id}
        type="radio"
        name="sell-option"
        onChange={onChange}
        label={(
          <Row className="font-weight-bold">
            <Col md={6}>
              <Label>{label1}:</Label>
              {text1}
            </Col>
            {label2 ? (
              <Col xs="auto">
                <Label>{label2}:</Label>
                {text2}
              </Col>
            ) : null}
          </Row>
        )}
      />
      <hr />
    </>
  );
};

export default SellOrderOption;
