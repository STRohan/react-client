import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Person, Email } from '@material-ui/icons';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required().label('Name').min(3),
  email: yup.string().email().required().label('Email'),
  password: yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'must contain one UperCase, one lowercase , one digit and atleast 8 characters')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
});

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '0px 6px',
    width: '95%',

  },
  passwordStyle: {
    display: 'flex',
    width: '95%',
    margin: '0px 6px',
  },
};
// eslint-disable-next-line no-unused-vars
let isExist = false;
class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      err: {},
      confirmPassword: '',
      password: '',
      showPassword: false,
      showPassword2: false,
      isTouch: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,

      },
      hasError: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleChange = field => (event) => {
    const { isTouch } = this.state;
    this.setState({
      [field]: event.target.value,
      err: {},
      isTouch: { ...isTouch, [field]: true },
    });
  };

  onBlurHandler = field => () => {
    this.errorHandler(field);
  }

  errorHandler = (field) => {
    const {
      name,
      email,
      password,
      confirmPassword,
      hasError,
      err,
    } = this.state;
    const allErrors = { ...err };
    schema.validate({
      name, email, password, confirmPassword,
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
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showPassword2: !state.showPassword2 }));
  };

  handleErr = () => <div>eror</div>

  submitHandler=() => {
    const { name, email, password } = this.state;
    const { dataDisplay } = this.props;
    const data = { name, email, password };
    return dataDisplay(data);
  }

  hasError = () => {
    const { hasError, isTouch } = this.state;
    let check = 0;
    let touchCheck = 0;
    Object.keys(hasError).forEach((element) => {
      if (!hasError[element]) check += 1;
    });
    Object.keys(isTouch).forEach((element) => {
      if (isTouch[element]) touchCheck += 1;
    });
    return !(check === 4 && touchCheck === 4);
  }

  render() {
    const {
      name, email, err, confirmPassword, password, showPassword, showPassword2,
    } = this.state;
    const sub = this.hasError();
    const { open, onClose, classes } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title" color="primary">Add Trainee</DialogTitle>
          <DialogContent fullWidth>
            <DialogContentText>
              Add Your Trainee Details
            </DialogContentText>
          </DialogContent>
          <div style={styles.textField}>
            <TextField
              required
              id="outlined-name"
              label="Name"
              error={err.name}
              value={name}
              fullWidth
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
              id="outlined-name"
              label="Email Address"
              value={email}
              fullWidth
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
          <div style={styles.passwordStyle}>
            <TextField
              id="outlined-adornment-password"
              className={classes.password}
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={password}
              error={err.password}
              onChange={this.handleChange('password')}
              onBlur={this.onBlurHandler('password')}
              helperText={(err.password) ? err.password : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="outlined-adornment-password"
              variant="outlined"
              type={showPassword2 ? 'text' : 'password'}
              label="Confirm Password"
              value={confirmPassword}
              error={err.confirmPassword}
              onChange={this.handleChange('confirmPassword')}
              onBlur={this.onBlurHandler('confirmPassword')}
              helperText={(err.confirmPassword) ? err.confirmPassword : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowConfirmPassword}
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancle
            </Button>
            <Button onClick={this.submitHandler} disabled={sub} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddDialog;

AddDialog.propTypes = {
  open: PropTypes.func,
  onClose: PropTypes.func,
  dataDisplay: PropTypes.func,
  classes: PropTypes.func,
};
AddDialog.defaultProps = {
  open: () => {},
  onClose: () => {},
  dataDisplay: () => {},
  classes: () => {},
};
