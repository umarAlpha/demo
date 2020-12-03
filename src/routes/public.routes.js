import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem('login_token') && restricted ? (
          <Redirect to='/home' />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default PublicRoute;
