import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import MathField from '../../components/Math/Math';

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Typography>
        <h2> Math Operations</h2>
        <div>
          <MathField first={22} second={7} operator="+">
            {(first, second, result, operator) => (
              <div>
                {' '}
                {` ${first} ${operator} ${second} = ${result}` }
              </div>
            )
            }
          </MathField>
        </div>
        <div>
          <MathField first={9} second={22} operator="p">
            {(first, second, result, operator) => (
              <div>
                {' '}
                {` ${first} ${operator} ${second} = ${result}` }
              </div>
            )
            }
          </MathField>
        </div>
        <div>
          <MathField first={22} second={7} operator="*">
            {(first, second, result) => (
              <div>
                {' '}
                {` here ${first} and ${second} will give ${result}` }
              </div>
            )
            }
          </MathField>
        </div>
        <div>
          <MathField first={9} second={0} operator="/">
            {(first, second, result) => (
              <div>
                {' '}
                {` here ${first} and ${second} will give ${result}` }
              </div>
            )
            }
          </MathField>
        </div>
        <div>
          <MathField first={9} second={0} operator="/">
            {(first, second, result) => (
              <div>
                {' '}
                {` here ${first} and ${second} will give ${result}` }
              </div>
            )
            }
          </MathField>
        </div>
      </Typography>
    );
  }
}
export default ChildrenDemo;
