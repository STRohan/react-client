import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts/index';

const AuthRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem('jwtToken')) return <Redirect to="/trainee" />;
  return (
    <Route
      {...rest}
      render={matchProps => (
        <AuthLayout>
          <Component {...matchProps} />
        </AuthLayout>
      )}
    />
  );
};

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
export default AuthRoute;
