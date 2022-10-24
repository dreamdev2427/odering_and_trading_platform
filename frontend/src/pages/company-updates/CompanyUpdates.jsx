import React from 'react';
import en from 'services/locales';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { TABLE, Card, CardBody, TH, THEAD, TD, TR, Button, Loading } from 'atoms';
import { GET_UPDATES } from 'services/apollo/updates/queries';
import { CardHeader } from 'components/card-header/CardHeader';

const CompanyUpdates = () => {
  const { data, loading } = useQuery(GET_UPDATES, {
    variables: { limit: 4, offset: 1 },
  });
  const history = useHistory();
  if (loading) {
    return <Loading />;
  }
  const { investorUpdates: updates } = data;
  return (
    <div className="content">
      <div>
        <Card>
          <CardHeader
            text={en('Company-Updates')}
            caption={en('Company-News-Updates-from-Administration')}
            imgSrc="/img/list.png"
          />
          <CardBody className="mb-2">
            <TABLE responsive>
              <THEAD>
                <TR>
                  <TH min="100px" max="15%">
                    {en('Date')}
                  </TH>
                  <TH min="180px" width="100%">
                    {en('Title')}
                  </TH>
                  <TH min="150px" width="150px">
                    Actions
                  </TH>
                </TR>
              </THEAD>
              <tbody>
                {updates.map((elem) => (
                  <TR key={elem.ID}>
                    <TD>{elem.UpdateDate}</TD>
                    <TD>{elem.TITLE}</TD>
                    <TD min="120px">
                      <Button size="sm" onClick={() => history.push(`/investor/company-update/${elem.ID}`)}>
                        {en('View-Details')}
                      </Button>
                    </TD>
                  </TR>
                ))}
              </tbody>
            </TABLE>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CompanyUpdates;
