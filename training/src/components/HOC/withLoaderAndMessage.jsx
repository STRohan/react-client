/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  container: {
    position: 'relative',
  },
  circularProgress: {
    position: 'absolute',
    top: 250,
    left: '50%',
  },
  message: {
    textAlign: 'center',
  },
};
export default (WrappedComponent) => {
  const HOC = (props) => {
    const { loader, classes, data } = props;
    return (
      <div>
        {loader && <CircularProgress size={100} className={classes.circularProgress} />}
        {data.length === 0 && !loader && <Typography component="h2" variant="display1" className={classes.message} gutterBottom> No Data Found !!!:&#40; </Typography> }
        { (data.length !== 0) && !loader && <WrappedComponent {...props} />}
      </div>
    );
  };


  HOC.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    loader: PropTypes.bool.isRequired,
    classes: PropTypes.shape().isRequired,

  };
  return withStyles(styles)(HOC);
};
