import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { err, ...rest } = props;
  const error = (err) ? style.err : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...error }} />
      {(err) ? <p style={{ ...error }}>{err}</p> : '' }
    </>
  );
};

TextField.propTypes = {
  err: PropTypes.string,
};
TextField.defaultProps = {
  err: '',
};
export default TextField;
