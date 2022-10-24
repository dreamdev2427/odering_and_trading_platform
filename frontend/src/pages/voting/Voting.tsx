import React from 'react';
import { Button, Card, CardBody, Col, Loading, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useGetMeetingsQuery } from 'services/apollo';
import styled from 'styled-components';
import { useActiveSto } from '../../hooks';

const Voting: React.FC = () => {
  const { t } = useTranslation();
  const { sto } = useActiveSto();
  const { data, loading } = useGetMeetingsQuery({
    variables: {
      stoId: Number(sto),
    },
  });
  const history = useHistory();
  if (loading || !data) return <Loading />;
  const { investorAllMeeting } = data;
  const { current, future, past } = investorAllMeeting || {};

  return (
    <div className="content">
      <Card>
        <CardHeader text={t('Future-Votings-Meetings')} imgSrc="/img/voting.jpg" />
        <CardBody>
          {future.length > 0 ? (
            future.map((elem) => (
              <RowContent key={elem.ID}>
                <Col md={1}>{elem.type !== 0 ? t('Meeting') : t('Poll')}</Col>
                <Col md={4}>{elem.title}</Col>
                <Col md={2}>{elem.opendate}</Col>
                <Col md={2}>{elem.closedate}</Col>
                <Col md={3}>
                  {elem.type !== 0 ? (
                    <Button size="sm" onClick={() => history.push(`/investor/meeting-view/${elem.ID}`)}>
                      {t('View-Meeting-Agenda')}
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => history.push(`/investor/meeting-view/${elem.ID}`)}>
                      {t('View-Details')}
                    </Button>
                  )}
                </Col>
              </RowContent>
            ))
          ) : (
            <label>{t('No-Records-Found')}</label>
          )}
        </CardBody>
      </Card>
      <Card>
        <CardHeader text={t('Current-Polls-and-Meetings')} imgSrc="/img/polls.png" />
        <CardBody>
          {current.length > 0 ? (
            current.map((elem) => (
              <RowContent key={elem.ID}>
                <Col md={1}>{elem.type ? t('Meeting') : t('Poll')}</Col>
                <Col md={4}>{elem.title}</Col>
                <Col md={2}>{elem.opendate}</Col>
                <Col md={2}>{elem.closedate}</Col>
                <Col md={3}>
                  {elem.type !== 0 ? (
                    <Button size="sm" onClick={() => history.push(`/investor/meeting-view/${elem.ID}`)}>
                      {t('View-Meeting-Agenda')}
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => history.push(`/investor/voting-view/${elem.ID}`)}>
                      {t('View-Cast-Vote')}
                    </Button>
                  )}
                </Col>
              </RowContent>
            ))
          ) : (
            <label>{t('No-Records-Found')}</label>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader text={t('Past-Votings-Meetings')} imgSrc="/img/voting.png" />
        <CardBody>
          {past.length > 0 ? (
            past.map((elem) => (
              <RowContent key={elem.ID}>
                <Col md={1}>{elem.type !== 0 ? t('Meeting') : t('Poll')}</Col>
                <Col md={4}>{elem.title}</Col>
                <Col md={2}>{elem.opendate}</Col>
                <Col md={2}>{elem.closedate}</Col>
                <Col md={3}>
                  {elem.type !== 0 ? (
                    <Button size="sm" onClick={() => history.push(`/investor/meeting-view/${elem.ID}`)}>
                      {t('View-Meeting')}
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => history.push(`/investor/meeting-view/${elem.ID}`)}>
                      {t('View-Poll')}
                    </Button>
                  )}
                </Col>
              </RowContent>
            ))
          ) : (
            <label>{t('No-Records-Found')}</label>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Voting;

const RowContent = styled(Row)`
  div {
    align-self: center;
  }
`;
