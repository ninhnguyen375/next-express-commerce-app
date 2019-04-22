import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
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
    adminAccess: true
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
  render() {
    const { classes, numDeleted } = this.props;
    return (
      <>
        {this.state.adminAccess ? (
          <>
            <div className={`${classes.root} fadeIn`}>
              <div className={classes.header}>Category Manager</div>
              <Divider variant="middle" className={classes.m_20} />
              {/* Add new Product */}
              <AddCategory />
              <Divider variant="middle" className={classes.m_20} />
              {/* List Category */}
              {this.props.categories ? (
                <CategoryList categories={this.props.categories.data} />
              ) : (
                <div className={`${classes.root} fadeIn`}>
                  <div className={classes.header}>Loading...</div>
                </div>
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
