import { Col, Container, Loading, Row } from 'atoms';
import { Markup } from 'interweave';
import React from 'react';
import { useCustomizationAppDataQuery } from 'services/apollo';

interface CustomizationComponentProps {
  name: string;
}

const CustomizationComponent: React.FC<CustomizationComponentProps> = ({ name }) => {
  const { data: customizationData, loading: customizationLoading } = useCustomizationAppDataQuery({
    variables: { componentTitle: name },
  });

  if (!customizationData || customizationLoading) {
    return <Loading />;
  }

  const customNavbarTags = customizationData?.fetchCustomizedComponent.body;

  return (
    <Container fluid className="bg-white">
      <Row>
        <Col>
          <Markup content={customNavbarTags} />
        </Col>
      </Row>
    </Container>
  );
};

export default CustomizationComponent;
