import React, { memo } from 'react';
import { Card, CardBody } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { gql, useQuery } from '@apollo/client';
import { useTranslation } from "react-i18next";

const GET_UPDATED_COMPANY_DETAILED = gql`
  query dashboard {
    investorDashboard {
      updates
    }
  }
`;

const CompanyUpdatesDetailed = memo((props) => {
  const {
    data: {
      investorDashboard: { updates },
    },
  } = useQuery(GET_UPDATED_COMPANY_DETAILED);
  const newsData = updates.find(({ ID }) => ID === props.match.params.id);
  const { t } = useTranslation();
  return (
    <div className="content">
      <Card>
        <CardHeader
          text={newsData.TITLE}
          caption={t('Company-News-Updates-from-Administration')}
          imgSrc="/img/news.png"
        />
        <CardBody className="mb-2 overflow-hidden">
          <div dangerouslySetInnerHTML={{ __html: newsData.details }} />
        </CardBody>
      </Card>
    </div>
  );
});

export default CompanyUpdatesDetailed;
