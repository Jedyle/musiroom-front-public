import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from 'services/Auth/api';

const PublicRoute = ({ component: Component, ...props }) => {
    return (
        <Route {...props} render={(props) => (
            getUser() ? <Redirect to='/404' /> :
                <Component {...props} />
        )} />
    );
};

const PublicRouteRender = ({ render, ...props }) => {
    const renderFunc = (props) => (
        getUser() ? <Redirect to ='/404'/> : render(props)
    )

    return (
        <Route {...props} render={props => renderFunc(props)} />
    );
};

export { PublicRoute, PublicRouteRender };
