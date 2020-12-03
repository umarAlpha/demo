import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem('login_token') ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: props.location }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
