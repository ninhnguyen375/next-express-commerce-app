import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
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
import { Build, FilterList, Delete } from '@material-ui/icons';
import { connect } from 'react-redux';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { deleteCategories } from '../../../store/action/categoryAction';

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
  { _id: '_id', numeric: true, disablePadding: false, label: 'ID' },
  {
    _id: 'producer_id',
    numeric: true,
    disablePadding: false,
    label: 'Category ID'
  },
  {
    _id: 'producer_name',
    numeric: true,
    disablePadding: false,
    label: 'Name'
  }
];

class CategoryListHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onSearch
    } = this.props;

    return (
      <TableHead>
        {/* Search */}
        <TableRow>
          <TableCell colSpan={8}>
            <TextField
              label="Search by ID   "
              type="search"
              margin="normal"
              onChange={onSearch}
            />
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

CategoryListHead.propTypes = {
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
class CategoryListToolbar extends React.Component {
  handleDelete = async () => {
    this.setState({ isDeleting: true });
    await this.props.deleteCategories(this.props.selected);
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
                Categories
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
                <IconButton aria-label="Filter list">
                  <FilterList />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Toolbar>
      </>
    );
  }
}

CategoryListToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    numDeleted: state.category.numDeleted
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteCategories: categories => dispatch(deleteCategories(categories))
  };
};

CategoryListToolbar = withStyles(toolbarStyles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoryListToolbar)
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

class CategoryList extends React.Component {
  componentDidMount() {
    if (this.props.categories) {
      this.setState({ data: this.props.categories });
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

  handleSearch = e => {
    const value = e.target.value;
    let filterSearch = [];
    filterSearch = this.props.categories.filter(category => {
      const val = value.trim().toLowerCase();
      const _id = category._id;
      return _id.indexOf(val) !== -1;
    });
    this.setState({ data: filterSearch });
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

  isSelected = _id => this.state.selected.indexOf(_id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <CategoryListToolbar
          numSelected={selected.length}
          selected={selected}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <CategoryListHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              onSearch={this.handleSearch}
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
                        align="right"
                        style={{
                          padding: '0',
                          maxWidth: '30px',
                          wordWrap: 'break-word'
                        }}
                      >
                        {n._id}
                      </TableCell>
                      <TableCell align="right">{n.producer_id}</TableCell>
                      <TableCell align="right">{n.producer_name}</TableCell>
                      <TableCell>
                        <Link href={`/admin/category?id=${n._id}`}>
                          <a>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              <Build style={{ fontSize: 20 }} />
                            </Button>
                          </a>
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

CategoryList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryList);
