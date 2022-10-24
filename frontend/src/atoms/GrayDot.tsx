import styled from 'styled-components';

const GrayDot = styled.div<{ big?: boolean }>`
  height: ${(p) => (p.big ? 20 : 10)}px;
  width: ${(p) => (p.big ? 20 : 10)}px;
  background-color: #c1c1c1;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.5rem;
`;

export default GrayDot;
