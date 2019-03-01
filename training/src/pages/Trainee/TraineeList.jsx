import React from 'react';
import Button from '@material-ui/core/Button';
// import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddDialog from './components/AddDialog/AddDialog';

class Trainee extends React.Component {
  state = {
    open: false,
  };

  render() {
    const { open } = this.state;
    return (
      <>

        <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={this.handleClickOpen}>
      Add Trainee
        </Button>
        {(!open) ? '' : (
          <AddDialog open={open} onClose={this.handleClose} dataDisplay={this.displayHandler}>
            {(name, email, password) => (
              <div>
                {' '}
                {` here ${name} and ${email} will give ${password}` }
              </div>
            )
            }
          </AddDialog>
        )}
        <div>
          <ul>
            <li>
              <Link to="/trainee/5c6c47af7740654f0915fac9">Sachin Tendulkar</Link>
            </li>
            <li>
              <Link to="/trainee/5c6c47af7740654f0455fac9">Virat Kohli</Link>
            </li>
            <li>
              <Link to="/trainee/5c6567af7740654f0915fac9">M.S. Dhoni</Link>
            </li>
            <li>
              <Link to="/trainee/5c6c47af7747854f0915fac9">Rohit Sharma</Link>
            </li>
            <li>
              <Link to="/trainee/5c6c47af7740654f0915876c9">Bumrah</Link>
            </li>
          </ul>
        </div>

      </>
    );
  }
}
export default Trainee;
