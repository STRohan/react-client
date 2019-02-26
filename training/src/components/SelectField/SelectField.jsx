/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    err,
    onChange,
    value,
    defaultText,
    options,
    ...rest
  } = props;
  const error = (err.length) ? style.err : {};
  return (
    <>
      <select onChange={onChange} value={value} checked {...rest} style={{ ...style.base }}>
        <option key="" value="">{defaultText}</option>
        {options.map(option => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {(err.length) ? <p style={{ ...error }}>{err}</p> : '' }
    </>
  );
};

SelectField.propTypes = {
  defaultText: PropTypes.string,
  err: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
};
SelectField.defaultProps = {
  defaultText: 'Select Field',
  err: '',
  onChange: () => {},
  options: [],
  value: '',
};
export default SelectField;
