import React from 'react';
import { Helmet } from 'react-helmet';

const Title = ({title}) => (
    <Helmet>
      <title>{title} - MusiRoom</title>
    </Helmet>
);

export default Title;
