import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const {
    err,
    onChange,
    value,
    options,
  } = props;
  const error = (err) ? style.err : {};
  return (
    <>
      {options.map(option => (
        <label htmlFor={option.label}>
          <input type="radio" id={option.label} value={option.label} checked={option.label === value} onChange={onChange} />
          {option.label}
        </label>
      ))}
      {(err) ? <p style={{ ...error }}>{err}</p> : '' }
    </>
  );
};

TextField.propTypes = {
  err: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
};
TextField.defaultProps = {
  err: '',
  onChange: () => {},
  options: [],
  value: '',
};
export default TextField;
