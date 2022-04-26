import ReactGA from 'react-ga4';

export function trackAnalytics(){
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search});
};
