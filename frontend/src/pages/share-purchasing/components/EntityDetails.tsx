import React from 'react';
import { Col, Row, Loading } from 'atoms';
import styled from 'styled-components';
import { useGetInvestingEntityQuery } from 'services/apollo';

interface EntityDetailsProps {
  entityID: number;
}

const EntityDetails: React.FC<EntityDetailsProps> = (props) => {
  const { entityID } = props;
  const { data: entityData, loading: entityLoading } = useGetInvestingEntityQuery({
    variables: { id: entityID },
  });

  if (entityLoading || !entityData) {
    return <Loading />;
  }

  const entity = entityData.investorInvestingEntity;
  return (
    <>
      <Row>
        <Col>
          <b>Invested Through Entity:</b>
        </Col>
      </Row>
      <Row>
        <Col>
          <ColinCol>
            {entity.name} ({entity.nickname})
          </ColinCol>
          <ColinCol>
            {entity.address} {entity.city}
          </ColinCol>
          <ColinCol>{entity.country}</ColinCol>
        </Col>
      </Row>
    </>
  );
};

export default EntityDetails;

const ColinCol = styled(Col)`
  padding: 0;
  margin: 0;
  border-radius: 0;
`;
