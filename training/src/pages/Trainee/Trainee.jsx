import React from 'react';
import Button from '@material-ui/core/Button';
// import { Typography } from '@material-ui/core';
import AddDialog from './components/AddDialog/AddDialog';

class Trainee extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  displayHandler= (data) => {
    console.log('Data::::', data);
    this.setState({ open: false });
  }

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
      </>
    );
  }
}
export default Trainee;
