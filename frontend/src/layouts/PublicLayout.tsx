import React from 'react';

const PublicLayout: React.FC = ({ children }) => (
  <div className="wrapper wrapper-full-page">
    <div className="full-page section-image">{children}</div>
  </div>
);

export default PublicLayout;
