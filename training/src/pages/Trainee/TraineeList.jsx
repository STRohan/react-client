import React from 'react';
import Button from '@material-ui/core/Button';
// import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import AddDialog from './components/AddDialog/AddDialog';
import trainee from './data/trainee';
import GenericTable from '../../components/Table';


class Trainee extends React.Component {
  state = {
    orderBy: 'field',
    order: 'asc',
    open: false,
  };


  sortRequestHandler = (order, field) => () => {
    const { orderBy } = this.state;
    if (orderBy !== field) {
      this.setState({ orderBy: field, order: 'asc' });
    }
    return (order === 'asc') ? this.setState({ order: 'desc' }) : this.setState({ order: 'asc' });
  }

  selectHandler = id => () => {
    const { match: { path }, history } = this.props;
    return (
      history.push(`${path}/${id}`)
    );
  }

  getFormatData = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')

  render() {
    const { open, order, orderBy } = this.state;
    return (
      <>
        <div style={{
          margin: 10, display: 'flex', flex: 1, justifyContent: 'flex-end',
        }}
        >
          <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={this.handleClickOpen}>
      Add Trainee
          </Button>
          {(!open) ? '' : (
            <AddDialog open={open} onClose={this.handleClose} dataDisplay={this.displayHandler}>
              {(name, email, password) => (
                <div>
                  {' '}
                  {` here ${name} and ${email} will give ${password}` }
                </div>
              )
              }
            </AddDialog>
          )}
        </div>
        <GenericTable
          id="id"
          data={trainee}
          coloumns={[
            {
              field: 'name',
              label: 'Name',
              align: 'left',
            },
            {
              field: 'email',
              label: 'Email Address',
              format: value => value.toUpperCase(),
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: this.getFormatData,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.sortRequestHandler}
          onSelect={this.selectHandler}

        />
      </>
    );
  }
}
Trainee.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};
export default Trainee;
