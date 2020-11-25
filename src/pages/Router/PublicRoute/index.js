import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from 'services/Auth/api';

const PublicRoute = ({ component: Component, render, ...props }) => {
    return (
        <Route {...props} render={(props) => (
            getUser() ? <Redirect to='/404' /> :
                <Component {...props} />
        )} />
    );
};

export default PublicRoute;
