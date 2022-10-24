import styled from 'styled-components';

const TH = styled.th<{ max?: string; min?: string; width?: string }>`
  max-width: ${(p) => p.max || '100%'};
  min-width: ${(p) => p.min || 'none'};
  width: ${(p) => p.width || 'none'};
  font-weight: 500;
  padding: 7px !important;
  border: none !important;
`;

export default TH;
