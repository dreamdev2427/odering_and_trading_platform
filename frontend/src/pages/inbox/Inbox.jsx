import React from 'react';
import { useHistory } from 'react-router-dom';

import { useInboxDataQuery } from 'services/apollo';
import { useActiveSto } from 'hooks';

import { Button, Card, CardBody, Loading, TABLE, TD, TH, THEAD, TR } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';
import { parseISO } from 'date-fns';
import useLocalDate from 'hooks/useLocalDate';

const Inbox = () => {
  const { sto } = useActiveSto();
  const history = useHistory();
  const { t } = useTranslation();
  const toLocalDate = useLocalDate();
  const { data, loading } = useInboxDataQuery({
    variables: {
      sto: Number(sto),
      limit: 70,
      offset: 0,
    },
    fetchPolicy: "no-cache"
  });

  const SendMessage = sto === -5 ? null: <Button size="sm" onClick={() => history.push('/investor/new-message/')}>
    Send Message to Company
  </Button>


  if (loading || !data) {
    return <Loading />;
  }
  const { investorInboxes } = data;
  const sortedInbox = investorInboxes.sort((previous, next) => {
    return next.ID - previous.ID;
  });
  return (
    <div className="content">
      <Card>
        <CardHeader
          text={t('Inbox')}
          caption={investorInboxes ? t('Communicate-with-the-company') : ''}
          rightButton={() => (
            SendMessage
          )}
          imgSrc="/img/email.png"
        />
        <CardBody className="mb-2">
          {investorInboxes?.length ? (
            <TABLE responsive>
              <THEAD>
                <TR>
                  <TH min="100px">#</TH>
                  <TH min="100px" max="15%">
                    {t('Date')}
                  </TH>
                  <TH min="170px" width="100%">
                    Subject
                  </TH>
                  <TH min="200px">Actions</TH>
                </TR>
              </THEAD>
              <tbody>
                {sortedInbox.map((elem) => (
                  <TR key={elem.ID}>
                    <TD>{elem.ID}</TD>
                    <TD>{toLocalDate(parseISO(elem.date))}</TD>
                    <TD className="d-inline-block text-truncate">{elem.title}</TD>
                    <TD className="">
                      {elem.isResponded ? (
                        <Button size="sm" onClick={() => history.push(`/investor/details-message/${elem.ID}`)}>
                          {t('View-Response')}
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => history.push(`/investor/details-message/${elem.ID}`)}>
                          {t('View')}
                        </Button>
                      )}
                    </TD>
                  </TR>
                )) || <label>{t('No-messages-found')}</label>}
              </tbody>
            </TABLE>
          ) : (
            <label>{t('No-messages-found')}</label>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Inbox;
