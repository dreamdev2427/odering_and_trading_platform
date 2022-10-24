import React from 'react';
import styled from 'styled-components';

import { useInfoQuery } from 'services/apollo';
import LOGO from '../assets/img/logo/digishares.png';

const Logo = styled.img`
  max-width: 100%;
`;

const StoLogo: React.FC<{ style?: React.CSSProperties; _id?: number; title?: string }> = ({
  style,
  _id = 0,
  title = 'logo',
}) => {
  const { data, loading } = useInfoQuery({ variables: { _id } });
  if (loading || !data?.publicSto) {
    return <></>;
  }

  const { logo } = data.publicSto;

  return <Logo style={style} src={logo || LOGO} title={title} />;
};

export default StoLogo;
