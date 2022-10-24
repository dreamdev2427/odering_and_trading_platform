import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardBody } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import styled, { useTheme } from 'styled-components';
import ActiveProperty from '../ActiveProperty';
import { ThemeType } from '../../../lib/themes/themeTypes';
import { ActiveProperty as IActiveProperty } from '../../../services/apollo';

interface PropertiesGridProps {
  properties: IActiveProperty[];
  isClosedOffering: boolean;
}

const PropertiesGrid: React.FC<PropertiesGridProps> = ({ properties, isClosedOffering }) => {
  const { t } = useTranslation();
  const theme: ThemeType = useTheme() as ThemeType;

  const cardStyle = {
    backgroundColor: theme.backgroundSideBar,
    fontWeight: theme.fontWeightSideBar,
    color: theme.fontColorSideBar,
  };

  return (
    <Card style={cardStyle}>
      <CardHeader
        text={
          isClosedOffering
            ? t('ActiveProperties-NonBuyProperty-CardHeader')
            : t('ActiveProperties-BuyProperty-CardHeader')
        }
      />
      <CardBody>
        <Container>
          <Content>
            {properties.map((card) => (
              <Item key={card.ID}>
                <ActiveProperty props={card} isClosedOffering={isClosedOffering} />
              </Item>
            ))}
          </Content>
        </Container>
      </CardBody>
    </Card>
  );
};

export default PropertiesGrid;

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
