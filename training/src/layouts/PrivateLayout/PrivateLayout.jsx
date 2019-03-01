import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components';

const PrivateLayout = ({ children }) => (
  <>
    <Navbar />
    <div>{children}</div>
  </>
);

PrivateLayout.propTypes = {
  children: PropTypes.shape().isRequired,
};
export default PrivateLayout;
