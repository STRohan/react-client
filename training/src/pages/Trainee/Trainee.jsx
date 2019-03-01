import
{ Route, Switch } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import TraineeDetail from './TraineeDetail';
import TraineeList from './TraineeList';

class Trainee extends React.Component {
  state = {
  };

  render() {
    const { match: { path: Path } } = this.props;
    return (
      <>
        <Switch>
          <Route exact path={`${Path}`} component={TraineeList} />
          <Route exact path={`${Path}/:id`} component={TraineeDetail} />
        </Switch>
      </>
    );
  }
}
Trainee.propTypes = {
  match: PropTypes.shape().isRequired,
};
export default Trainee;
