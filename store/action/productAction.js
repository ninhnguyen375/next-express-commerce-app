import Axios from 'axios';
import checkAdmin from './checkAdmin';

export function getProductsWithRedux() {
  return async dispatch => {
    dispatch({ type: 'GET_PRODUCTS_REQUEST' });
    const res = await Axios('/api/products/');
    return dispatch({ type: 'GET_PRODUCTS_SUCCESS', products: res.data });
  };
}

export const createProduct = product => {
  return async (dispatch, getState) => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({
        type: 'CREATE_PRODUCT_ERROR',
        err: 'Permision Denied'
      });
    }
    try {
      const data = new FormData();
      data.append('product_img', product.product_img);
      // adding image to hosting
      await Axios.post('/api/products/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // adding product
      await Axios.post('/api/products/', product);

      return dispatch({ type: 'CREATE_PRODUCT_SUCCESS' });
    } catch (err) {
      return dispatch({ type: 'CREATE_PRODUCT_ERROR', err: err.message });
    }
  };
};

export const deleteProducts = products => {
  return async (dispatch, getState) => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({
        type: 'DELETE_PRODUCTS_ERROR',
        err: 'Permision Denied'
      });
    }
    try {
      let del = [];
      let err = [];

      products.forEach(product => {
        del.push(Axios.delete(`/api/products/${product}`));
      });
      del = await Promise.all(del);

      del.forEach(item => {
        if (item.data.err) {
          err.push(item.data.err);
        }
      });

      if (err[0]) {
        return dispatch({ type: 'DELETE_PRODUCTS_ERROR', err: err });
      }

      return dispatch({
        type: 'DELETE_PRODUCTS_SUCCESS',
        numDeleted: products.length
      });
    } catch (err) {
      return dispatch({ type: 'DELETE_PRODUCTS_ERROR', err: err.message });
    }
  };
};

export const closeAlertDeleted = () => {
  return dispatch => {
    return dispatch({ type: 'CLOSE_ALERT_DELETED' });
  };
};

export const editProduct = product => {
  return async dispatch => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({ type: 'EDIT_PRODUCT_ERROR', err: 'Permision Denied' });
    }
    try {
      if (product.product_img) {
        // adding image to hosting
        const data = new FormData();
        data.append('product_img', product.product_img);
        await Axios.post('/api/products/', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        product.product_img_path = product.product_img.name;
      } else {
        product.product_img_path = null;
      }
      // put product
      await Axios.put(`/api/products/${product._id}`, product);
      return dispatch({ type: 'EDIT_PRODUCT_SUCCESS' });
    } catch (err) {
      return dispatch({ type: 'EDIT_PRODUCT_ERROR', err });
    }
  };
};

export const getProductsAndCategories = () => {
  return async dispatch => {
    try {
      const products = await Axios('/api/products/');
      const producers = await Axios('/api/producers/');
      return dispatch({
        type: 'GET_PRODUCTS_AND_CATEGORIES_SUCCESS',
        products: products.data,
        categories: producers.data
      });
    } catch (err) {
      return dispatch({
        type: 'GET_PRODUCTS_AND_CATEGORIES_ERROR',
        err: err.message
      });
    }
  };
};
