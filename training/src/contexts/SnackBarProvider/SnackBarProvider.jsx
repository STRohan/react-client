/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const SnackBarContext = React.createContext('ALL');
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};
const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class SnackBarProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'success',
      message: '',
      open: false,
    };
  }

  openSnackBar= (message, status) => {
    this.setState({
      open: true,
      message,
      status,
    });
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };


  render() {
    const { classes, children } = this.props;
    const { open, status, message } = this.state;
    const Icon = variantIcon[status];
    return (
      <>
        <SnackBarContext.Provider value={this.openSnackBar}>
          {children}
          <div>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={open}
              autoHideDuration={6000}
              onClose={this.handleClose}
            >
              <SnackbarContent
                className={classes[status]}
                aria-describedby="client-snackbar"
                message={(
                  <span id="client-snackbar" className={classes.message}>
                    <Icon className={(classes.icon, classes.iconVariant)} />
                    {message}
                  </span>
                )}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.handleClose}
                  >
                    <CloseIcon className={classes.icon} />
                  </IconButton>,
                ]}
              />
            </Snackbar>
          </div>
        </SnackBarContext.Provider>
      </>
    );
  }
}

SnackBarProvider.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.shape().isRequired,
};

export const SnackBarConsumer = SnackBarContext.Consumer;
export default withStyles(styles2)(SnackBarProvider);
