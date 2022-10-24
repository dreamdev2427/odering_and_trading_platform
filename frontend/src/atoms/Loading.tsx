import React from 'react';
import { Spinner as SpinnerBS, SpinnerProps } from 'reactstrap';
import styled from 'styled-components';

const Spinner = styled((p) => <SpinnerBS type="grow" color="primary" {...p} />)`
  width: 3rem;
  height: 3rem;
  z-index: 2;
  margin: auto;
`;

const Loading: React.FC<SpinnerProps> = (p) => (
  <div className="content d-flex">
    <Spinner {...p} />
  </div>
);

export const SpinnerSmall = styled((p) => <SpinnerBS color="primary" {...p} />)`
  width: 1rem;
  height: 1rem;
  z-index: 2;
  margin: auto;
`;

export default Loading;
