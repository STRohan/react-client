import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Person, Email } from '@material-ui/icons';
import * as yup from 'yup';
import { callApi } from '../../../../lib/utils/api';
import { SnackBarConsumer } from '../../../../contexts/index';


const schema = yup.object().shape({
  name: yup.string().required().label('Name').min(3),
  email: yup.string().email().required().label('Email'),
});

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '0px 12px',
    width: '95%',
  },
  button: {
    margin: '0px 16px',
  },
};
// eslint-disable-next-line no-unused-vars
let isExist = false;
class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      sub: true,
      spinner: false,
      err: {},
      hasError: {
        name: false,
        email: false,
      },
    };
  }

  componentDidMount() {
    const { data: { name, email } } = this.props;
    this.setState({
      name,
      email,
    });
  }

  handleChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
      err: {},
    });
  };

  onBlurHandler = field => () => {
    this.errorHandler(field);
  }

  errorHandler = (field) => {
    const {
      name,
      email,
      hasError,
      err,
    } = this.state;
    const allErrors = { ...err };
    schema.validate({
      name, email,
    }, { abortEarly: false })
      .then(() => {
        allErrors[field] = '';
        this.setState({ err: {}, hasError: { ...hasError, [field]: false } });
      })
      .catch((error) => {
        error.inner.forEach((element) => {
          if (element.path === field) {
            isExist = true;
            allErrors[field] = element.message;
            hasError[field] = true;
          }
        });
        this.setState({ err: allErrors, hasError });
      });
    this.hasError();
  }

  handleErr = () => <div>eror</div>

  submitHandler= async (e, openSnackBar) => {
    this.setState({ sub: true, spinner: true });
    e.preventDefault();
    const { name, email } = this.state;
    const { dataDisplay, data } = this.props;
    const url = '/api/trainee';
    const method = 'put';
    const headers = { Authorization: localStorage.getItem('jwtToken') };
    const res = await callApi(url, method, { id: data.originalId, name, email }, headers);

    if (res.status === 'ok') {
      this.setState({ spinner: false, sub: true },
        () => openSnackBar(res.message, 'success'));
    } else {
      this.setState({ spinner: false, sub: true },
        () => openSnackBar(res.message, 'error'));
    }
    return dataDisplay();
  }

  hasError = () => {
    const { hasError, name, email } = this.state;
    const { data } = this.props;
    let check = 0;
    let change = false;
    Object.keys(hasError).forEach((element) => {
      if (!hasError[element]) check += 1;
    });
    if (name === data.name && email === data.email) change = true;

    return this.setState({ sub: (!(check === 2 && !change)) });
  };

  render() {
    const {
      name, email, err, spinner, sub,
    } = this.state;
    const { open, onClose, classes } = this.props;

    return (
      <SnackBarConsumer>
        {openSnackBar => (
          <div>
            <Dialog
              open={open}
              onClose={onClose}
              fullWidth
              maxWidth="md"
              aria-labelledby="alert-dialog-title"
            >
              <DialogTitle id="alert-dialog-title" color="primary">Edit Trainee</DialogTitle>
              <DialogContent fullWidth>
                <DialogContentText>
                  Enter Your Trainee Details
                </DialogContentText>
              </DialogContent>
              <div style={styles.textField}>
                <TextField
                  required
                  id="outlined-name"
                  label="Name"
                  fullWidth
                  maxWidth="md"
                  error={err.name}
                  value={name}
                  helperText={this.handleErr}
                  onChange={this.handleChange('name')}
                  onBlur={this.onBlurHandler('name')}
                  margin="dense"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  helperText={(err.name) ? err.name : ''}
                />
              </div>
              <div style={styles.textField}>
                <TextField
                  required
                  id="outlined-email"
                  label="Email Address"
                  value={email}
                  fullWidth
                  maxWidth="md"
                  error={err.email}
                  onChange={this.handleChange('email')}
                  onBlur={this.onBlurHandler('email')}
                  margin="normal"
                  variant="outlined"
                  helperText={(err.email) ? err.email : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <DialogActions style={styles.button}>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button disabled={sub} onClick={e => this.submitHandler(e, openSnackBar)} color="primary" autoFocus>
                  Submit
                  {(spinner) ? (
                    <CircularProgress
                      style={{ position: 'absolute', bottom: 0 }}
                      className={classes.progress}
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

export default EditDialog;

EditDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.shape().isRequired,
  dataDisplay: PropTypes.func,
  classes: PropTypes.func,

};
EditDialog.defaultProps = {
  open: false,
  onClose: () => {},
  dataDisplay: () => {},
  classes: () => {},
};
