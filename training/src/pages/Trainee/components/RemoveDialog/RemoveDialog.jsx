import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class RemoveDialog extends React.Component {
  state = {
  };

  submitHandler=() => {
    const { dataDisplay, data } = this.props;
    const { img, ...rest } = data;
    return dataDisplay(rest);
  }

  render() {
    const { open, onClose } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          fullWidth={[true]}
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
            <Button onClick={this.submitHandler} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
