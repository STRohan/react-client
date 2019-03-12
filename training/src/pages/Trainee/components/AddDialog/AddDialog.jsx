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
import CircularProgress from '@material-ui/core/CircularProgress';
import { SnackBarConsumer } from '../../../../contexts/index';
import { callApi } from '../../../../lib/utils/api';

const schema = yup.object().shape({
  name: yup.string().required().label('Name').min(3),
  email: yup.string().email().required().label('Email'),
  password: yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Must contain one Upper-Case, one Lower-Case , one digit and atleast 8 characters')
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
      spinner: false,
      sub: false,
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
    this.hasError();
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showPassword2: !state.showPassword2 }));
  };

  handleErr = () => <div>eror</div>

  submitHandler= async (event, openSnackBar) => {
    const { dataDisplay } = this.props;
    const { name, email, password } = this.state;
    this.setState({ spinner: true, sub: false });
    event.preventDefault();
    const url = '/api/trainee';
    const method = 'post';
    const headers = { Authorization: localStorage.getItem('jwtToken') };
    const res = await callApi(url, method, { name, email, password }, headers);

    if (res.status === 'ok') {
      this.setState({ spinner: false, sub: true },
        () => openSnackBar(res.message, 'success'));
    } else {
      this.setState({ spinner: false, sub: true },
        () => openSnackBar(res.message, 'error'));
    }
    const data = { name, email, password };
    return dataDisplay(data, openSnackBar);
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
    return this.setState({ sub: (!(check === 4 && touchCheck === 4)) });
  }

  fieldEntry = (field, entry, lable, icon, show) => {
    const { err } = this.state;
    return (
      <TextField
        required
        label={lable}
        error={err[field]}
        value={entry}
        fullWidth
        type={show}
        helperText={this.handleErr}
        onChange={this.handleChange(field)}
        onBlur={this.onBlurHandler(field)}
        margin="dense"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              { icon }
            </InputAdornment>
          ),
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        helperText={(err[field]) ? err[field] : ''}
      />
    );
  }

  iconPasswaordHandler = (field, method) => (
    <IconButton
      aria-label="Toggle password visibility"
      onClick={method}
    >
      {field ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  )

  render() {
    const {
      name, email, sub, spinner, confirmPassword, password, showPassword, showPassword2,
    } = this.state;
    const { open, onClose, classes } = this.props;
    return (
      <SnackBarConsumer>
        {openSnackBar => (
          <div>
            <Dialog
              open={open}
              onClose={onClose}
              maxWidth="md"
              className={classes.container}
              aria-labelledby="dialog-title"
            >
              <DialogTitle id="dialog-title" color="primary">Add Trainee</DialogTitle>
              <DialogContent fullWidth>
                <DialogContentText>
              Add Your Trainee Details
                </DialogContentText>
              </DialogContent>
              <div style={styles.textField}>
                {this.fieldEntry('name', name, 'Name', <Person />)}
              </div>
              <div style={styles.textField}>
                {this.fieldEntry('email', email, 'Email', <Email />)}
              </div>
              <div style={styles.passwordStyle}>
                <div>
                  {this.fieldEntry('password', password, 'Password', this.iconPasswaordHandler(showPassword, this.handleClickShowPassword), showPassword ? 'text' : 'password')}
                </div>
                <div style={{ flex: '1 1 0%', paddingLeft: '34px' }}>
                  {this.fieldEntry('confirmPassword', confirmPassword, 'Confirm Password', this.iconPasswaordHandler(showPassword2, this.handleClickShowConfirmPassword), showPassword2 ? 'text' : 'password')}
                </div>
              </div>
              <DialogActions>
                <Button onClick={onClose} color="primary">
              Cancle
                </Button>
                <Button onClick={event => this.submitHandler(event, openSnackBar)} disabled={sub} color="primary" autoFocus>
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

export default AddDialog;

AddDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  dataDisplay: PropTypes.func,
  classes: PropTypes.func,
};
AddDialog.defaultProps = {
  open: false,
  onClose: () => {},
  dataDisplay: () => {},
  classes: () => {},
};
