import React from 'react';
import { CardHeader as CardHead } from 'reactstrap';
import styled from 'styled-components';

interface CardHeaderProps {
  text: string;
  caption?: string;
  imgSrc?: string;
  size?: string;
  icon?: React.ReactElement;
  rightButton?: React.ReactElement;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  text,
  caption = '',
  imgSrc = '',
  size = '',
  icon = null,
  rightButton = null
}) => (
  <CardHead>
    <CardH4>
      {icon ? (
        <span className="mr-2">
          {icon}
        </span>
      ) : null}
      {imgSrc && (
        <CardIcon size={size} src={imgSrc} alt={imgSrc.slice(imgSrc.lastIndexOf('/') + 1, imgSrc.length - 4)} />
      )}
      {text}
      {rightButton && (
        <span className="ml-auto">
          {rightButton}
        </span>
      )}
    </CardH4>
    {caption && <CardCaption>{caption}</CardCaption>}
  </CardHead>
);

const CardCaption = styled.span`
  font-size: 0.8571em;
  margin-bottom: 5px;
  color: #9a9a9a;
`;

const CardIcon = styled(({ size, ...props }) => <img {...props} />)`
  width: ${(p) => p.size || '25px'};
  height: ${(p) => p.size || '25px'};
  margin-right: 8px;
`;

export const CardH4 = styled.h4`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
  margin-bottom: 8px;
`;
