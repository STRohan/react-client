import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const {
    err,
    onChange,
    value,
    ...rest
  } = props;
  const error = (err.length) ? style.err : {};
  return (
    <>
      <input type="text" onChange={onChange} value={value} {...rest} style={{ ...style.base, ...error }} />
      {(err.length) ? <p style={{ ...error }}>{err}</p> : '' }
    </>
  );
};

TextField.propTypes = {
  err: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
TextField.defaultProps = {
  err: '',
  onChange: () => {},
  value: '',
};
export default TextField;
