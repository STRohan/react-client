import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { callApi } from '../../../../lib/utils/api';
import { SnackBarConsumer } from '../../../../contexts/index';

class RemoveDialog extends React.Component {
  state = {
    sub: false,
    spinner: false,
  };

  submitHandler= async (e, openSnackBar) => {
    this.setState({ sub: true, spinner: true });
    e.preventDefault();
    const { dataDisplay, data } = this.props;
    const url = '/api/trainee';
    const method = 'delete';
    const headers = { Authorization: localStorage.getItem('jwtToken') };
    const res = await callApi(`${url}/${data.originalId}`, method, '', headers);
    this.setState({ sub: false, spinner: false });
    if (res.status === 'ok') {
      this.setState({ spinner: false, sub: true },
        () => openSnackBar(res.message, 'success'));
    } else {
      this.setState({ spinner: false, sub: true },
        () => openSnackBar(res.message, 'error'));
    }
    return dataDisplay();
  }

  render() {
    const { sub, spinner } = this.state;
    const { open, onClose } = this.props;
    return (
      <SnackBarConsumer>
        { openSnackBar => (
          <div>
            <Dialog
              open={open}
              fullWidth
              maxWidth="md"
              aria-labelledby="remove-dialog-title"
            >
              <DialogTitle id="remove-dialog-title">Delete</DialogTitle>
              <DialogContent>
                <DialogContentText>
              Do you really want to delete the entry?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} color="primary">
              Cancel
                </Button>
                <Button disabled={sub} onClick={e => this.submitHandler(e, openSnackBar)} color="primary">
              Delete
                  {(spinner) ? (
                    <CircularProgress
                      style={{ position: 'absolute', bottom: 0 }}
                      color="secondary"
                    />
                  ) : ''}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </SnackBarConsumer>
    );
  }
}

export default RemoveDialog;

RemoveDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.shape().isRequired,
  dataDisplay: PropTypes.func,
};
RemoveDialog.defaultProps = {
  open: false,
  onClose: () => {},
  dataDisplay: () => {},
};
