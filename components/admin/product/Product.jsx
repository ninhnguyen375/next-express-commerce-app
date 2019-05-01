import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Button } from '@material-ui/core';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import CustomizedSnackbars from '../snackbar/CustomizedSnackbars';
import {
  getProductsWithRedux,
  closeAlertDeleted
} from '../../../store/action/productAction';
import ProductStyles from './product.styles.jss';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';

const styles = ProductStyles;

class Product extends PureComponent {
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
              <div className="admin-content-header">Product Manager</div>
              <div className="divider" />

              {/* Button Add */}
              <Button
                onClick={this.toggleOpenAddForm}
                variant={'contained'}
                color={'primary'}
              >
                Add Product{' '}
                {isAddFormOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </Button>

              {/* Form Add*/}
              {isAddFormOpen && <AddProduct />}

              {/* List Product */}
              <div className="divider" />

              {this.props.products ? (
                <ProductList products={this.props.products.data} />
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
    products: state.product.products,
    numDeleted: state.product.numDeleted,
    deleteError: state.product.deleteError
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Product));
