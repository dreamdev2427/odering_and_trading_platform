import React, { useState } from 'react';

import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Row, Col } from '../atoms';

interface PopoverProps {
  label: string;
  target: React.ReactElement;
  title?: string;
  body?: React.ReactElement;
}

const PopoverHover: React.FC<PopoverProps> = ({ label, target, title, body }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const mouseHoverFalse = () => {
    setPopoverOpen(false);
  };
  const mouseHoverTrue = () => {
    setPopoverOpen(true);
  };
  const popID = label.trim().replaceAll(' ', '');
  return (
    <>
      <Row>
        <Col>
          {label}
          {React.cloneElement(target, {
            id: popID,
            onMouseEnter: mouseHoverTrue,
            onMouseLeave: mouseHoverFalse,
          })}
        </Col>
      </Row>
      <Popover placement="bottom" isOpen={popoverOpen} target={popID} hideArrow>
        <PopoverHeader as="h3">{title}</PopoverHeader>
        <PopoverBody>{body}</PopoverBody>
      </Popover>
    </>
  );
};

export default PopoverHover;
