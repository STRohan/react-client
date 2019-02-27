import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
// import { InputFileDemo } from './pages/index';
// import ChildrenDemo from './pages/ChildrenDemo/ChildrenDemo';
import Trainee from './pages/Trainee/Trainee';
// import Login from './pages/Login';

const App = () => (
  <>
    <MuiThemeProvider theme={theme}>
      {/* <ChildrenDemo /> */}
      <Trainee />
      {/* <Login /> */}
    </MuiThemeProvider>
  </>

  // <div>
  //   <TextFileDemo />
  // </div>
);
// class App extends Component {
//   render() {

//   }
// }

export default App;
