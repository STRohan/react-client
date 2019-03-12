import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import trainee from './data/trainee';
import { NoMatch } from '..';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: '1% 0%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  button: {
    margin: theme.spacing.unit,
    textAlign: 'center',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});


class TraineeDetail extends React.Component {
dataFinder = async () => {
  const { match: { params: { id } } } = this.props;
  const result = trainee.find(item => item.id === id);
  return result;
}

getDateFormatted = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')

render() {
  const { classes } = this.props;
  const result = this.dataFinder();
  if (!result) return <NoMatch />;
  const date = this.getDateFormatted(result.createdAt);
  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={result.img}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {result.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              { date }
            </Typography>
            <Typography variant="subtitle2" color="textTertiary">
              {result.email}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <div className={classes.button}>
        <Button variant="contained" className={classes.button}>
          <Link style={{ textDecoration: 'none' }} to="/trainee">Back</Link>
        </Button>
      </div>
    </>
  );
}
}

TraineeDetail.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default withStyles(styles, { withTheme: true })(TraineeDetail);
