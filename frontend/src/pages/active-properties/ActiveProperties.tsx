import React, { useState } from 'react';

import {
  ActiveProperty as IActiveProperty,
  useInvestorActivePropertiesQuery,
  useInvestorAppDataQuery,
} from 'services/apollo';

import { Loading, Row, Col, Select } from 'atoms';
import PropertiesGrid from './components/PropertiesGrid';

const sortOptions = [
  { label: 'Sort properties by', value: '' },
  { label: 'Price from low to high', value: 'projectCost-asc' },
  { label: 'Price from high to low', value: 'projectCost-desc' },
  { label: 'Popularity from low to high', value: 'popularity-asc' },
  { label: 'Popularity from high to low', value: 'popularity-desc' },
  { label: 'Created from low to high', value: 'createdAt-asc' },
  { label: 'Created from high to low', value: 'createdAt-desc' },
];

const ActiveProperties: React.FC = () => {
  const [sort, setSort] = useState('');
  const { data, loading } = useInvestorActivePropertiesQuery({ fetchPolicy: 'no-cache' });
  const { data: appData, loading: appDataLoading } = useInvestorAppDataQuery();
  if (!data || loading || !appData || appDataLoading) {
    return <Loading />;
  }
  const { investorActiveProperties } = data;
  const onChange = ({ value }: { value: string }) => {
    setSort(value);
  };

  const sorted = sort
    ? [...investorActiveProperties].sort((a, b) => {
        const [name, type] = sort.split('-') as ['projectCost' | 'popularity' | 'createdAt', 'asc' | 'desc'];
        return type === 'asc' ? a[name] - b[name] : b[name] - a[name];
      })
    : [];

  const properties = sorted.length ? sorted : investorActiveProperties;

  const buyPorperties: IActiveProperty[] = [];
  const nonBuyPorperties: IActiveProperty[] = [];
  properties.map((p) => (p.isBuyButtonEnabled ? buyPorperties.push(p) : nonBuyPorperties.push(p)));

  const { isPropertySortingEnabled } = appData.investorAppParameters;

  const selected = sortOptions.find((c) => c.value === sort);
  return (
    <div className="content">
      {isPropertySortingEnabled ? (
        <Row className="mb-4">
          <Col md={4}>
            <Select options={sortOptions} value={selected} onChange={onChange} />
          </Col>
        </Row>
      ) : null}
      {buyPorperties.length > 0 ? <PropertiesGrid properties={buyPorperties} isClosedOffering={false} /> : null}
      <br />
      {nonBuyPorperties.length > 0 ? <PropertiesGrid properties={nonBuyPorperties} isClosedOffering /> : null}
    </div>
  );
};

export default ActiveProperties;
