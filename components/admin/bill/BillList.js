import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Checkbox,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Button,
  TextField,
  CircularProgress
} from '@material-ui/core';
import { Build, Delete, Autorenew } from '@material-ui/icons';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {
  deleteBills,
  getBillsWithRedux
} from '../../../store/action/billAction';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { _id: 'createAt', numeric: true, disablePadding: false, label: 'Create At' },
  { _id: '_id', numeric: true, disablePadding: false, label: 'Bill Id' },
  {
    _id: 'authId',
    numeric: true,
    disablePadding: false,
    label: 'User Id'
  },
  {
    _id: 'totalPrice',
    numeric: true,
    disablePadding: false,
    label: 'Total Price ($)'
  },
  { _id: 'status', numeric: true, disablePadding: false, label: 'Status' }
];

class BillListHead extends React.Component {
  state = {
    selectedDate: new Date()
  };
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onSearch,
      onFilterDate
    } = this.props;

    return (
      <TableHead>
        {/* Search */}
        <TableRow>
          <TableCell colSpan={4}>
            <TextField
              _id="standard-search"
              label="Search by Bill ID"
              type="search"
              margin="normal"
              onChange={onSearch}
            />
          </TableCell>
          <TableCell colSpan={4}>
            <TextField
              id="dateFrom"
              label="From"
              type="date"
              defaultValue=""
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="dateTo"
              label="To"
              type="date"
              defaultValue=""
              InputLabelProps={{
                shrink: true
              }}
            />
            <Button
              style={{ marginTop: '15px' }}
              variant="contained"
              color="primary"
              size="small"
              onClick={onFilterDate}
            >
              Filter
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row._id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row._id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row._id}
                    direction={order}
                    onClick={this.createSortHandler(row._id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

BillListHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
});
class BillListToolbar extends React.Component {
  handleDelete = async () => {
    if (!confirm('Are you sure?')) return;
    this.setState({ isDeleting: true });
    await this.props.deleteBills(this.props.selected);
    if (this.props.deleteError) {
      alert('Permission Denied!');
      window.location = '/admin';
    }
  };

  componentWillUnmount() {
    this.setState({ isDeleting: false });
  }

  state = {
    isDeleting: false
  };
  render() {
    const { numSelected, classes } = this.props;
    return (
      <>
        <Toolbar
          className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0
          })}
        >
          <div className={classes.title}>
            {numSelected > 0 ? (
              <Typography color="inherit" variant="subtitle1">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography variant="h6" _id="tableTitle">
                Bills
              </Typography>
            )}
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            {numSelected > 0 ? (
              <Tooltip title="Delete">
                <IconButton onClick={this.handleDelete} aria-label="Delete">
                  {this.state.isDeleting ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Delete />
                  )}
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Filter list">
                <IconButton
                  aria-label="Filter list"
                  onClick={this.props.onRenew}
                >
                  <Autorenew />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Toolbar>
      </>
    );
  }
}

BillListToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    numDeleted: state.bill.numDeleted,
    deleteError: state.bill.deleteError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteBills: bills => dispatch(deleteBills(bills))
  };
};

BillListToolbar = withStyles(toolbarStyles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BillListToolbar)
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

class BillList extends React.Component {
  componentDidMount() {
    if (this.props.bills) {
      this.setState({ data: this.props.bills });
    }
  }
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n._id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleSearch = event => {
    const value = event.target.value;
    let filterSearch = [];
    filterSearch = this.props.bills.filter(bill => {
      const val = value.trim().toLowerCase();
      const _id = bill._id.trim().toLowerCase();
      return _id.indexOf(val) !== -1;
    });
    this.setState({ data: filterSearch });
  };

  handleFilterDate = () => {
    let dateFrom = window.document.getElementById('dateFrom').value;
    let dateTo = window.document.getElementById('dateTo').value;
    if (!dateFrom && !dateTo) this.setState({ data: this.props.bills });
    if (dateFrom === '') return;
    dateFrom = moment(dateFrom, 'YYYY-MM-DD');
    if (dateTo === '') dateTo = undefined;
    else dateTo = moment(dateTo, 'YYYY-MM-DD');
    let filterDate = [];
    filterDate = this.props.bills.filter(bill => {
      return moment(bill.createAt, 'YYYY-MM-DD').isBetween(
        dateFrom,
        dateTo,
        null,
        '[]'
      );
    });
    this.setState({ data: filterDate });
  };

  handleClick = (event, _id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRenew = async () => {
    this.props.getBillsWithRedux();
  };

  isSelected = _id => this.state.selected.indexOf(_id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <BillListToolbar
          numSelected={selected.length}
          selected={selected}
          onRenew={this.handleRenew}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <BillListHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              onSearch={this.handleSearch}
              onFilterDate={this.handleFilterDate}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n._id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n._id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onClick={event => this.handleClick(event, n._id)}
                        />
                      </TableCell>
                      <TableCell
                        style={{ maxWidth: '30px', wordWrap: 'break-word' }}
                        align="right"
                      >
                        {n.createAt}
                      </TableCell>
                      <TableCell
                        style={{ maxWidth: '30px', wordWrap: 'break-word' }}
                        align="right"
                      >
                        {n._id}
                      </TableCell>
                      <TableCell
                        style={{ maxWidth: '30px', wordWrap: 'break-word' }}
                        align="right"
                      >
                        {n.authId}
                      </TableCell>
                      <TableCell align="right">{n.totalPrice} $</TableCell>
                      <TableCell align="right">{n.status}</TableCell>
                      <TableCell>
                        <Link href={`/admin/bill?id=${n._id}`}>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                          >
                            <Build style={{ fontSize: 20 }} />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

BillList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps2 = dispatch => {
  return { getBillsWithRedux: () => dispatch(getBillsWithRedux()) };
};

export default connect(
  null,
  mapDispatchToProps2
)(withStyles(styles)(BillList));
