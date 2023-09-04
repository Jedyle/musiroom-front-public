import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({title, overrideTitle=false, description, image, url}) => {
    let displayTitle = overrideTitle ? title : `${title} - MusiRoom`;
    return (
	<Helmet>
	    <title>{displayTitle}</title>
	    <meta property="og:title" content={displayTitle} />
	    <meta property="og:description" content={description} />
	    <meta property="og:image" content={image} />
	    <meta property="og:url" content={url} />
	    <meta name="twitter:title" content={displayTitle} />
	    <meta name="twitter:description" content={description} />
	    <meta name="twitter:url" content={image} />
	    <meta name="twitter:card" content={description} />
	</Helmet>
    );
};

export default Head;
