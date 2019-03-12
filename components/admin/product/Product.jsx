import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

import AddProduct from './AddProduct';
import ProductList from './ProductList';
import CustomizedSnackbars from '../snackbar/CustomizedSnackbars';

import {
  getProductsWithRedux,
  closeAlertDeleted
} from '../../../store/action/productAction';

import ProductStyles from './product.styles.jss';

const styles = ProductStyles;

class Product extends Component {
  state = {
    openSnackNumDeleted: false,
    messDeleted: '',
    adminAccess: true
  };

  async componentDidMount() {
    const admin_key = JSON.parse(window.localStorage.getItem('adminPageAccess'))
      .admin_key;
    const admin = await Axios.get(`/api/users/${admin_key}/adminPermission`);
    if (!admin.data.admin.product) {
      this.setState({ ...this.state, adminAccess: false });
      return;
    } else {
      this.setState({ ...this.state, adminAccess: true });
      const { dispatch } = this.props;
      await dispatch(getProductsWithRedux());
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
        messDeleted: `${nextProps.numDeleted} products has been deleted`
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
              <div className={classes.header}>Product Manager</div>

              {/* Add new Product */}
              <Divider variant="middle" className={classes.m_20} />
              <AddProduct />

              {/* List Product */}
              <Divider variant="middle" className={classes.m_20} />
              <div className={classes.header}>All Products</div>
              {this.props.products ? (
                <ProductList products={this.props.products.data} />
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
    products: state.product.products,
    numDeleted: state.product.numDeleted
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Product));
