import React from 'react';

import { StoMetaValue } from 'services/apollo';

import MetaContent from './MetaContent';

interface DynamicContentProps {
  meta: Array<StoMetaValue>;
}

const DynamicContent: React.FC<DynamicContentProps> = ({ meta }) => {
  const metaKeys = meta
    .filter((value) => {
      // if we found tab content, then do not show it directly
      const tab = meta.find((item) => item.key !== value.key && value.key.startsWith(item.key));
      return value.display && !tab;
    })
    .sort((a, b) => a.order - b.order)
    .map((value) => value.key);

  return (
    <>
      {metaKeys.map((key) => (
        <MetaContent key={key} meta={meta} name={key} />
      ))}
    </>
  );
};

export default DynamicContent;
