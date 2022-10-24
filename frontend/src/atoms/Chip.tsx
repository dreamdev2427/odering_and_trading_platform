import styled from 'styled-components';

const Chip = styled.div<{ color: string }>`
  display: inline-block;
  padding: 0 25px;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  border-radius: 25px;
  background-color: ${(p) => p.color};
`;

export default Chip;
