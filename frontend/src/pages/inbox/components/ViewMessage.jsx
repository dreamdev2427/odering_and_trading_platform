import React from 'react';
import { CardHeader } from 'components/card-header/CardHeader';
import { Card, CardBody, Loading } from 'atoms';
import { useInboxMessageQuery } from 'services/apollo';

const ViewMessage = (props) => {
  const { data, loading } = useInboxMessageQuery({
    variables: { _id: Number(props.match.params.id) },
    fetchPolicy: 'no-cache'
  });
  if (loading) {
    return <Loading />;
  }
  const { investorInbox = {} } = data || {};
  return (
    <div className="content">
      <Card>
        <CardHeader text="Message Details" imgSrc="/img/email.png" />
        <CardBody className="mb-2 overflow-hidden">
          <p className='mb-3'>
            <span className="d-inline-block mr-3 font-weight-bold text-secondary"> Title: </span>
            <span className="fs-18">{investorInbox.title}</span>
          </p>
          <p className='mb-4'>
          {investorInbox.details && (
            <>
              <div className='font-weight-bold text-secondary'> Message: </div>
              <div dangerouslySetInnerHTML={{ __html: investorInbox.details }} />
              {!investorInbox.response && <hr />}
            </>
          )}
          </p>
          <p>
          {investorInbox.response && (
            <>
              <div className='font-weight-bold text-secondary'> Response: </div>
              <div dangerouslySetInnerHTML={{ __html: investorInbox.response }} />
              <hr />
            </>
          )}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewMessage;