import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardImg } from 'reactstrap';
import styled from 'styled-components';

import { useUpdatesQuery } from 'services/apollo';
import { useActiveSto } from 'hooks';

import { Loading } from 'atoms';
import REAL from 'assets/img/realestate.jpg';

const CompanyUpdates: React.FC = () => {
  const { sto } = useActiveSto();
  const { data, loading } = useUpdatesQuery({
    variables: { _id: Number(sto), limit: 20 },
    fetchPolicy: 'no-cache',
  });
  const history = useHistory();
  if (loading || !data?.investorUpdates) {
    return <Loading />;
  }

  const updates = data.investorUpdates;

  return (
    <MainContent>
      <Content>
        {updates.map((elem, index) => (
          <MainCard key={index} style={{ backgroundColor: '#f0f2f5' }}>
            <CardImg alt={elem.date} src={elem.coverphoto ? elem.coverphoto : REAL} height="200px" />
            <CardBody>
              <MainText>
                <b>{elem.title}</b>
              </MainText>
              <p>{elem.title}</p>
              <Button onClick={() => history.push(`/investor/company-update/${elem.ID}`)}>Read more &#9658;</Button>
            </CardBody>
          </MainCard>
        ))}
      </Content>
      {/* <Card>
        <CardHeader
          text={t('Company-Updates')}
          caption={t('Company-News-Updates-from-Administration')}
          imgSrc={LIST}
        />
        <CardBody className="mb-2">
          <TABLE responsive>
            <THEAD>
              <tr>
                <TH min="150px" max="20%">
                  {t('Date')}
                </TH>
                <TH min="180px" width="80%">
                  {t('Title')}
                </TH>
                <TH min="150px" width="150px">
                  Actions
                </TH>
              </tr>
            </THEAD>
            <tbody>
              {updates.map((elem) => (
                <TR key={elem.ID}>
                  <TD>{toLocalDate(parseISO(elem.date))}</TD>
                  <TD>{elem.title}</TD>
                  <TD min="120px">
                    <Button size="sm" onClick={() => history.push(`/investor/company-update/${elem.ID}`)}>
                      {t('View-Details')}
                    </Button>
                  </TD>
                </TR>
              ))}
            </tbody>
          </TABLE>
        </CardBody>
      </Card> */}
    </MainContent>
  );
};

const MainContent = styled.div`
  padding: 30px;
  background-color: white;
  overflow: true;
`;

const MainText = styled.div`
  font-size: 16px;
  font-weight: 50px;
`;

const Button = styled.a`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: black;
  font-weight: bold;
  width: 11rem;
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:active {
    color: blue;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  background-color: #ffffff;
  padding: 100px 30px 30px 30px;
`;

const MainCard = styled(Card)`
  background-color: #f0f2f5;
  border-radius: 0px;
`;

export default CompanyUpdates;
