/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const {
    err,
    onChange,
    value,
    defaultText,
    options,
    ...rest
  } = props;
  const error = (err) ? style.err : {};
  return (
    <>
      <select onChange={onChange} value={value} checked {...rest} style={{ ...style.base, ...error }}>
        <option value="">{defaultText}</option>
        {options.map(option => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {(err) ? <p style={{ ...error }}>{err}</p> : '' }
    </>
  );
};

TextField.propTypes = {
  defaultText: PropTypes.string,
  err: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
};
TextField.defaultProps = {
  defaultText: 'Select Field',
  err: '',
  onChange: () => {},
  options: [],
  value: '',
};
export default TextField;
