import React from 'react';
import Button from '@material-ui/core/Button';
// import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddDialog from './components/AddDialog/AddDialog';
import trainee from './data/trainee';


class Trainee extends React.Component {
  state = {
    open: false,
  };

  render() {
    console.log('Props:', this.props);

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
            {trainee.map(item => (
              <li>
                <Link to={`/trainee/${item.id}`}>{item.name}</Link>
              </li>
            ))
            }
          </ul>
        </div>

      </>
    );
  }
}
export default Trainee;
