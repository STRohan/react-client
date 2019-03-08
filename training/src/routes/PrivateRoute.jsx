/* eslint-disable react/jsx-wrap-multilines */
import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts/index';

function PrivateRoute({ component: Component, ...rest }) {
  if (!localStorage.getItem('jwtToken')) return <Redirect to="/login" />;
  return <Route
    {...rest}
    render={matchProps => (
      <PrivateLayout>
        <Component {...matchProps} />
      </PrivateLayout>
    )}
  />;
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
