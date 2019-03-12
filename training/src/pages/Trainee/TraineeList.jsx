import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AddDialog, EditDialog, RemoveDialog } from './components/index';
import GenericTable from '../../components/Table';
import { callApi } from '../../lib/utils/api';


class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.recordFinder();
  }

  state = {
    orderBy: 'field',
    order: 'asc',
    open: false,
    spinner: true,
    openEditor: false,
    openDelete: false,
    count: 0,
    records: [],
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

  recordFinder = async () => {
    this.setState({ spinner: true });
    const headers = { Authorization: localStorage.getItem('jwtToken') };
    const { page } = this.state;
    const params = { limit: 10, skip: page * 10 };
    const res = await callApi('api/trainee', 'get', {}, headers, params);
    this.setState({ count: res.data.count, records: res.data.records, spinner: false });
    return res.data;
  }

  displayHandler= (data) => {
    console.log('Data::::', data);
    this.setState({ open: false });
  }

  displayEditHandler= (data, openSnackBar) => {
    console.log('Data Edited::::', data);
    this.setState({ openEditor: false }, () => openSnackBar('Trainee added successfully', 'success'));
  }

  displayDeleteHandler= (data, openSnackBar) => {
    const { createdAt } = data;
    const valid = moment(createdAt).isBefore('2019-02-14T18:15:11.778Z');
    const status = (valid) ? 'error' : 'success';
    const message = (valid) ? 'Sorry the trainee can not be deleted' : 'Trainee deleted successfully';
    console.log('Data Deleted::::', data);

    this.setState({ openDelete: false }, () => openSnackBar(message, status));
  }


  handleEditDialogOpen= (item) => {
    this.setState({ openEditor: true, data: item });
  }

  handleDeleteDialogOpen= (item) => {
    this.setState({ openDelete: true, data: item });
  }

  handleChangePage = (event, page) => {
    this.setState({ page }, () => this.recordFinder());
  };

  render() {
    const {
      open,
      order,
      orderBy,
      page,
      count,
      spinner,
      records,
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
          data={records}
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
          count={count}
          page={page}
          loader={spinner}
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
