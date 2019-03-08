import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CallApi } from '../../lib/utils/api';
import { SnackBarConsumer } from '../../contexts/SnackBarProvider';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 4,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .label('Email'),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'must contain one UperCase, one lowercase , one digit and atleast 8 characters',
    )
    .required('Password is required'),
});
  // eslint-disable-next-line no-unused-vars
let isExist = false;

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      err: {},
      password: '',
      spinner: false,
      showPassword: false,
      isTouch: {
        email: false,
        password: false,
      },
      hasError: {
        email: false,
        password: false,
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
  };

  errorHandler = (field) => {
    const {
      email, password, hasError, err,
    } = this.state;
    const allErrors = { ...err };
    schema
      .validate(
        {
          email,
          password,
        },
        { abortEarly: false },
      )
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
  };


  submitHandler = async (event, openSnackBar) => {
    this.setState({ spinner: true });
    event.preventDefault();
    const url = 'https://express-training.herokuapp.com/api/user/login';
    const method = 'post';
    const { email, password } = this.state;
    const { history } = this.props;
    const res = await CallApi(url, method, { email, password });
    localStorage.setItem('jwtToken', res.data);
    if (res.status === 'ok') {
      this.setState({ spinner: false },
        () => openSnackBar('Trainee logged in successfully', 'success'));
      history.push('/trainee');
    } else {
      this.setState({ spinner: false },
        () => openSnackBar(res.message, 'error'));
    }
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

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
    return !(check === 2 && touchCheck === 2);
  };

  render() {
    const {
      email, err, password, showPassword, spinner,
    } = this.state;
    const sub = this.hasError();
    const { classes } = this.props;
    return (
      <SnackBarConsumer>
        {openSnackBar => (
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
            Login
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    required
                    id="outlined-name"
                    label="Email Address"
                    fullWidth
                    value={email}
                    error={err.email}
                    onChange={this.handleChange('email')}
                    onBlur={this.onBlurHandler('email')}
                    margin="normal"
                    variant="outlined"
                    helperText={err.email ? err.email : ''}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    id="outlined-adornment-password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={password}
                    required
                    error={err.password}
                    onChange={this.handleChange('password')}
                    onBlur={this.onBlurHandler('password')}
                    helperText={err.password ? err.password : ''}
                    InputProps={{
                      startAdornment: (
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
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  style={{ position: 'relative' }}
                  disabled={sub}
                  variant="contained"
                  color="primary"
                  onClick={event => this.submitHandler(event, openSnackBar)}
                  className={classes.submit}
                >
              Sign in
                  {(spinner) ? (
                    <CircularProgress
                      style={{ position: 'absolute', bottom: 0 }}
                      className={classes.progress}
                      color="secondary"
                    />
                  ) : ''}
                </Button>
              </form>
            </Paper>
          </main>
        )}
      </SnackBarConsumer>
    );
  }
}

LogIn.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,

};

export default withStyles(styles)(LogIn);
