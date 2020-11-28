import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from 'services/Auth/api';

export const PrivateRoute = ({ component: Component, render, ...props }) => {
    return (
        <Route {...props} render={(props) => (
            getUser()
                ? <Component username={getUser()} {...props} />
            : <Redirect to='/' />
        )} />
    );
};

export const PrivateRouteRender = ({ render, ...props }) => {
    return (
        <Route {...props} render={(props) => (
            getUser()
                ? render(props)
            : <Redirect to='/' />
        )} />
    );
};
