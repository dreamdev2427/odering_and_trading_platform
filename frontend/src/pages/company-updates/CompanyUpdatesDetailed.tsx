import React from 'react';
import { useParams } from 'react-router';

import { useUpdateQuery } from 'services/apollo/graphql';
import { parseISO } from 'date-fns';
import { Loading, Card, CardBody } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';

import LIST from 'assets/img/list.png';
import useLocalDate from 'hooks/useLocalDate';

const CompanyUpdatesDetailed: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const { data, loading } = useUpdateQuery({ variables: { _id: Number(_id) } });
  const toLocalDate = useLocalDate();
  if (loading || !data?.investorUpdate) {
    return <Loading />;
  }

  const update = data.investorUpdate;
  return (
    <div className="content">
      <Card>
        <CardHeader text={update.title} caption={toLocalDate(parseISO(update.date))} imgSrc={LIST} />
        <CardBody className="mb-2 overflow-hidden">
          <div dangerouslySetInnerHTML={{ __html: update.details || '' }} />
        </CardBody>
      </Card>
    </div>
  );
};

export default CompanyUpdatesDetailed;