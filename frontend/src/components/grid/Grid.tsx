import React, { FunctionComponent, memo } from 'react';
import styled from 'styled-components';
import { ActiveProperty as IActiveProperty } from '../../services/apollo';

interface GridProps {
  component: FunctionComponent<{ responsive?: boolean }>;
  data: Array<IActiveProperty>;
}

export const Grid = memo(({ data, component: Card }: GridProps): JSX.Element => {
  return (
    <Container>
      <Content>
        {data.map((card) => (
          <Item key={card.ID}>
            <Card {...card} responsive />
          </Item>
        ))}
      </Content>
    </Container>
  );
});

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const Item = styled.div`
  height: 420px;
  align-content: center;
  vertical-align: top;
`;
