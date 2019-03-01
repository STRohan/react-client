import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class GenericTable extends React.Component {
  state = {
  };

  render() {
    const {
      classes, coloumns, data,
    } = this.props;
    const myobj = {};
    coloumns.forEach((element) => {
      myobj[element.field] = element.align;
    });

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {coloumns.map(item => <TableCell align={item.align}>{item.label}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell align={myobj.name}>{item.name}</TableCell>
                <TableCell align={myobj.email}>{item.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
GenericTable.propTypes = {
  classes: PropTypes.shape().isRequired,
  data: PropTypes.shape().isRequired,
  coloumns: PropTypes.shape().isRequired,

};

export default withStyles(styles)(GenericTable);
