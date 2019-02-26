import React from 'react';
import PropTypes from 'prop-types';
import styleButton from './style';

const Button = (props) => {
  const {
    color,
    disabled,
    style,
    onClick,
    value,
  } = props;
  const disableStyle = (disabled) ? styleButton.dis : style;
  const disable = (disabled) ? styleButton.dis : false;
  return (
    <>
      <button style={disableStyle} disabled={disable} type="submit" color={color} value={value} onClick={onClick}>
        {value}
      </button>
    </>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func,
  value: PropTypes.string,
};
Button.defaultProps = {
  color: 'default' || 'Primary',
  disabled: false,
  style: {},
  onClick: () => {},
  value: '',
};
export default Button;
