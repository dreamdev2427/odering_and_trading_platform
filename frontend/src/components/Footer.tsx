import React from 'react';
import { Container, Row } from 'reactstrap';

import { useGetThemeConfigQuery, useMeQuery } from 'services/apollo';
import { Markup } from 'interweave';

interface FooterProps {
  default?: string;
  fluid?: boolean;
}

const Footer: React.FC<FooterProps> = ({ default: def, fluid }) => {
  const { data, loading } = useMeQuery();
  const { data: dt } = useGetThemeConfigQuery();
  const { investorAppParameters: params } = dt || {};

  if (loading || !data?.investorUser) {
    return <></>;
  }
  const { sto } = data?.investorUser;
  return (
    <footer className={`footer${def ? ' footer-default' : ''}`}>
      <Container fluid={fluid}>
        <Row>
          <div className="w-100 footer-default text-sm-center" style={{ color: '#66615b' }}>
            <p>
              <Markup content={sto.disclaimer || ''} />
            </p>
            <span className="text-sm-center" style={{ fontSize: '13px' }}>
              {params?.poweredByLabel ? (
                <Markup content={params.poweredByLabel} />
              ) : (
                <p>
                  Powered by <a href="https://digishares.io"> DigiShares </a>
                </p>
              )}
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
