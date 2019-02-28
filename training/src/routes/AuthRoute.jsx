import { Route } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts/index';


const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )}
  />
);

AuthRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
export default AuthRoute;
