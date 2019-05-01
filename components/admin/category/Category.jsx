import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Button } from '@material-ui/core';
import CategoryList from './CategoryList';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  getCategoriesWithRedux,
  closeAlertDeleted
} from '../../../store/action/categoryAction';
import CustomizedSnackbars from '../snackbar/CustomizedSnackbars';
import AddCategory from './AddCategory';
import Axios from 'axios';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';

const styles = () => ({
  root: {
    backgroundColor: 'white',
    minHeight: '100vh',
    borderRadius: '7px',
    padding: 20
  },
  header: {
    fontSize: '1.7em',
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  m_20: {
    margin: 20
  }
});
export class Category extends Component {
  state = {
    openSnackNumDeleted: false,
    messDeleted: '',
    adminAccess: true,
    isAddFormOpen: false
  };

  async componentDidMount() {
    const admin_key = JSON.parse(
      window.sessionStorage.getItem('adminPageAccess')
    ).admin_key;
    const admin = await Axios.get(`/api/users/${admin_key}/adminPermission`);
    if (!admin.data.admin.category) {
      this.setState({ ...this.state, adminAccess: false });
      return;
    } else {
      const { dispatch } = this.props;
      await dispatch(getCategoriesWithRedux());
    }
  }

  handleClose = () => {
    this.setState({ openSnackNumDeleted: false });
    const { dispatch } = this.props;
    dispatch(closeAlertDeleted());
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.numDeleted) {
      this.setState({
        openSnackNumDeleted: true,
        messDeleted: `${nextProps.numDeleted} categories has been deleted`
      });
    }
  }

  toggleOpenAddForm = () => {
    this.setState({ isAddFormOpen: !this.state.isAddFormOpen });
  };

  render() {
    const { classes, numDeleted } = this.props;
    const { isAddFormOpen } = this.state;
    return (
      <>
        {this.state.adminAccess ? (
          <>
            <div className="admin-content fadeIn">
              <div className="admin-content-header">Category Manager</div>
              <div className="divider" />
              {/* Button Add */}
              <Button
                onClick={this.toggleOpenAddForm}
                variant={'contained'}
                color={'primary'}
              >
                Add Category{' '}
                {isAddFormOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </Button>

              {/* Form Add*/}
              {isAddFormOpen && <AddCategory />}

              <div className="divider" />
              {/* List Category */}
              {this.props.categories ? (
                <CategoryList categories={this.props.categories.data} />
              ) : (
                <div className="loading-text">Loading...</div>
              )}
            </div>

            {numDeleted && (
              <div onClick={this.handleClose}>
                <CustomizedSnackbars open={this.state.openSnackNumDeleted}>
                  {this.state.messDeleted}
                </CustomizedSnackbars>
              </div>
            )}
          </>
        ) : (
          <>{Router.push('/admin')}</>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    numDeleted: state.category.numDeleted
  };
};
export default withStyles(styles)(connect(mapStateToProps)(Category));
