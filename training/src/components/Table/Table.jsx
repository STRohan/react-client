/* eslint-disable react/no-array-index-key */
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
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';
import { withLoaderAndMessage } from '../HOC/index';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  circularProgress: {
    position: 'absolute',
    top: 250,
    left: '50%',
  },
  message: {
    textAlign: 'center',
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
  }

  getDateFormatted = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')

  render() {
    const {
      classes, coloumns, data, orderBy, order, onSort, count, actions, onSelect, onChangePage, page,
    } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow key="abc">
              {coloumns.map(item => (
                <TableCell key={item.field} align={item.align}>
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
            {data.map((item, index) => (
              <TableRow key={`${item.id}.${index}`} className={classes.row}>
                {coloumns.map((coloum) => {
                  const { align, field, format } = coloum;
                  return (
                    <TableCell key={`${item.id}.${field}`} onClick={onSelect(item.id)} align={align}>
                      {(!format) ? item[field] : format(item[field])}
                    </TableCell>
                  );
                })}
                <TableCell>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                      actions.map((action, indexAction) => {
                        const { icon, handler } = action;
                        return (
                          <IconButton key={`${item.id}.${indexAction}`} onClick={() => handler(item)}>
                            {icon}
                          </IconButton>
                        );
                      })}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={count}
                rowsPerPageOptions={[]}
                rowsPerPage={10}
                page={page}
                onChangePage={onChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}
GenericTable.propTypes = {
  classes: PropTypes.shape().isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  coloumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func,
  onSelect: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,

};

GenericTable.defaultProps = {
  orderBy: '',
  order: 'asc',
  onChangePage: () => {},
  onSort: () => {},
  onSelect: () => {},
};
export default withLoaderAndMessage(withStyles(styles)(GenericTable));
