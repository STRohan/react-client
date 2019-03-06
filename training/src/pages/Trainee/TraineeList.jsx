import React from 'react';
import Button from '@material-ui/core/Button';
// import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AddDialog, EditDialog, RemoveDialog } from './components/index';
import trainee from './data/trainee';
import GenericTable from '../../components/Table';

class Trainee extends React.Component {
  state = {
    orderBy: 'field',
    order: 'asc',
    open: false,
    openEditor: false,
    openDelete: false,
    page: 0,
    data: {},
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = field => () => {
    this.setState({ [field]: false });
  };


  displayHandler= (data) => {
    console.log('Data::::', data);
    this.setState({ open: false });
  }

  displayEditHandler= (data) => {
    console.log('Data Edited::::', data);
    this.setState({ openEditor: false });
  }

  displayDeleteHandler= (data) => {
    console.log('Data Deleted::::', data);
    this.setState({ openDelete: false });
  }


  handleEditDialogOpen= (item) => {
    this.setState({ openEditor: true, data: item });
  }

  handleDeleteDialogOpen= (item) => {
    this.setState({ openDelete: true, data: item });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const {
      open,
      order,
      orderBy,
      page,
      openDelete,
      openEditor,
      data,
    } = this.state;
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
            <AddDialog open={open} onClose={this.handleClose('open')} dataDisplay={this.displayHandler}>
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
        {(!openEditor) ? '' : (
          <EditDialog open={openEditor} data={data} onClose={this.handleClose('openEditor')} dataDisplay={this.displayEditHandler} />
        )}
        {(!openDelete) ? '' : (
          <RemoveDialog open={openDelete} data={data} onClose={this.handleClose('openDelete')} dataDisplay={this.displayDeleteHandler} />
        )}
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
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleDeleteDialogOpen,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.sortRequestHandler}
          onSelect={this.selectHandler}
          count={100}
          page={page}
          onChangePage={this.handleChangePage}
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
