import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    hieght: 10,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logout: {
    flexGrow: 0.2,
    textAlign: 'right',
  },
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography color="inherit" className={classes.grow}>
            Trainee Portal
            </Typography>
            <Button size="small" color="inherit">Trainee</Button>
            <Button size="small" color="inherit">TextField Demo</Button>
            <Button size="small" color="inherit">Input Demo</Button>
            <Button size="small" color="inherit">Children Demo</Button>
            <Typography color="inherit" className={classes.logout}>
              <Button size="small" color="inherit">Logout</Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.PropTypes.objectOf(PropTypes.object),
};

Navbar.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Navbar);
