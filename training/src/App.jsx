import
{ BrowserRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import {
  InputFileDemo, TextFieldDemo, ChildrenDemo, Trainee, LogIn, NoMatch,
} from './pages/index';
import { PrivateRoute, AuthRoute } from './routes';

const App = () => (

  <>
    <MuiThemeProvider theme={theme}>


      <Router>
        <Switch>
          <PrivateRoute path="/trainee" component={Trainee} />
          <PrivateRoute exact path="/textFieldDemo" component={TextFieldDemo} />
          <PrivateRoute exact path="/inputDemo" component={InputFileDemo} />
          <PrivateRoute exact path="/childrenDemo" component={ChildrenDemo} />
          <AuthRoute exact path="/login" component={LogIn} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </>

);

export default App;
