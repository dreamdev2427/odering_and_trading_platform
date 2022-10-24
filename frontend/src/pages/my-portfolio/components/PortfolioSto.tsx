import React from 'react';
import styled from 'styled-components';

import { ActiveProperty } from 'services/apollo/graphql';
import { InvestorPortfolioShares } from 'services/apollo/multisto';

import { Card, CardBody, Col, Row } from 'atoms';
import { CardH4 } from 'components/card-header/CardHeader';
import PortfolioItem from 'pages/my-portfolio/components/PortfolioItem';
import SellBuyButton from './SellBuyButton';

interface PortfolioStoProps {
  property: ActiveProperty;
  shares: InvestorPortfolioShares[];
  isMarketSpace: boolean;
  isSellBackEnabled: boolean;
}

const PortfolioSto: React.FC<PortfolioStoProps> = ({ property, shares, isMarketSpace, isSellBackEnabled }) => {
  const isSellBackButtonEnabled =
    shares.filter((share) => share.shareType.sellToCompany).length > 0 && isSellBackEnabled;

  if (!shares) {
    return <></>;
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <ColImage className="d-flex justify-content-center pb-0" xl={4} lg={5} md={5} sm={12} xs={12}>
            <ImgCard alt={property.title} src={property.picture} />
          </ColImage>
          <ColContent className="pt-0" xl={8} lg={7} md={7} sm={12} xs={12}>
            <Row id="row-btn" className="justify-content-md-start">
              <SellBuyButton
                isEnabled
                isVisible
                text="View-Details"
                redirectURL={`/investor/detail-property/${property.ID}`}
              />
              <SellBuyButton
                isEnabled
                isVisible={property.isBuyButtonEnabled}
                text="ActiveProperty-Buy"
                redirectURL={`/investor/buy-property/${property.ID}`}
              />
              <SellBuyButton
                isEnabled={!property.isBuyButtonEnabled}
                isVisible={isSellBackButtonEnabled && !property.isBuyButtonEnabled && !isMarketSpace}
                text="shareItem-sellToCompany"
                redirectURL={`/investor/sell-property/${property.ID}`}
              />
            </Row>
            <div className="mb-3 text-justify">
              <CardH4 className="mt-2">{property.title}</CardH4>
              {property.details}
              <hr />
              {shares.map((share) => (
                <>
                  <PortfolioItem key={share?.ID} share={share} />
                  <hr />
                </>
              ))}
            </div>
          </ColContent>
        </Row>
      </CardBody>
    </Card>
  );
};

export default PortfolioSto;

const ColImage = styled(Col)`
  padding: 15px;
`;

const ColContent = styled(Col)`
  min-width: 250px;
  padding: 15px;

  @media (max-width: 760px) {
    display: flex;
    flex-direction: column-reverse;
    #row-btn {
      justify-content: space-around;
      button {
        padding: 10px;
      }
    }
  }
`;

const ImgCard = styled.img`
  width: 100%;
  margin: auto;
  max-width: 340px;
  border-radius: 4px;
  height: 220px;
  max-height: 250px;
  object-fit: contain;
`;
