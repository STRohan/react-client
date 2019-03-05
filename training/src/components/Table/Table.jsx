import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as moment from 'moment';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[200],
    },
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[500],
    },
  },
  table: {
    minWidth: 700,
  },
});

class GenericTable extends React.Component {
  state = {

  };

  getDateFormatted = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')






  render() {
    const {
      classes, coloumns, data, orderBy, order, onSort, onSelect,
    } = this.props;
    console.log(':::',order,orderBy);

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {coloumns.map(item => (
                <TableCell align={item.align}>
                  {
                    <TableSortLabel
                      active={orderBy === item.field}
                      direction={order}
                      onClick={onSort(order, item.field)}
                    >
                      {item.label}
                    </TableSortLabel>}

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <>
                <TableRow key={item.id} className={classes.row} onClick={onSelect(item.id)}>
                  {coloumns.map((coloum) => {
                    const { align, field, format } = coloum;
                    return (
                      <TableCell align={align}>
                        {(!format) ? item[field] : format(item[field])}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </>
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
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func,
  onSelect: PropTypes.func,

};

GenericTable.defaultProps = {
  orderBy: '',
  order: 'asc',
  onSort: () => {},
  onSelect: () => {},
};
export default withStyles(styles)(GenericTable);
