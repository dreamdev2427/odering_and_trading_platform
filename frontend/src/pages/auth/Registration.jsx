import React, { memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Favicon from 'react-favicon';
import { Helmet } from 'react-helmet';

import Auth from 'services/core/auth';
import { useInfoQuery } from 'services/apollo';
import { signIn } from 'lib/routing/route-sets/public-routes';

import { Button, Card, CardBody, CardHeader, Container, Loading } from 'atoms';
import RegistrationForm from './components/RegistrationForm';
import MarketSpaceForm from './components/MarketSpaceForm';
import { useInvestorAppDataQuery } from '../../services/apollo';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Registration = memo(() => {
  const history = useHistory();
  const query = useQuery();
  const {data: appData, loading: load1} = useInvestorAppDataQuery();
  const { data: stoData, loading: stoLoading } = useInfoQuery({ variables: { _id:0 } });

  const { data, loading: load2 } = useInfoQuery({
    variables: { _id: Number(Auth.STO)}});
  if (load1 || load2 || !data || !appData || !stoData || stoLoading) {
    return <Loading />;
  }
  const isMarketSpace = appData.investorAppParameters?.IsMarketSpace;

  const { settings, registrationText, title } = data.publicSto;

  return (
    <div className="login-page">
      <Favicon url={data?.publicSto?.settings?.favicon ?? ''} />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data?.publicSto?.settings?.tabTitle ?? 'DigiShares'}</title>
      </Helmet>
      <Container>
        <Card>
          <CardHeader>
            <h3>
              {!isMarketSpace && 'Create your free investor account now' }
              <Button size="sm" className="pull-right" onClick={() => history.push(signIn.path)}>
                Investor Login
              </Button>
            </h3>
          </CardHeader>
          <CardBody>
            {isMarketSpace ?
              <MarketSpaceForm InvestorTypes={settings.investorCategories} /> :
              <RegistrationForm
                brokerID={query.get('brokerID')}
                registrationText={registrationText}
                title={title}
                InvestorTypes={settings.investorCategories} />
            }
          </CardBody>
        </Card>
      </Container>
    </div>
  );
});

export default Registration;
