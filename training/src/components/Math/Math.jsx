import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MathField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  mathFunc = (props) => {
    let result = 0;
    const { operator, first, second } = props;
    if (operator === '+') result = first + second;
    else if (operator === '-') result = first - second;
    else if (operator === '*') result = first * second;
    else if (operator === '/') {
      result = (second === 0) ? 'infinite' : first / second;
    } else { result = 'Invalid Operator'; }
    return result;
  }

  render() {
    const {
      children, first, second, operator,
    } = this.props;
    const result = this.mathFunc(this.props);
    return (
      <div>
        {
          children && children(first, second, result, operator)
        }
      </div>
    );
  }
}

MathField.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string,
  children: PropTypes.func.isRequired,
};
MathField.defaultProps = {
  operator: '',
};
export default MathField;
