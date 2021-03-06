import Axios from 'axios';
import checkAdmin from './checkAdmin';

export function getCategoriesWithRedux() {
  return async dispatch => {
    dispatch({ type: 'GET_CATEGORIES_REQUEST' });
    const res = await Axios('/api/producers/');
    return dispatch({ type: 'GET_CATEGORIES_SUCCESS', categories: res.data });
  };
}

export const createCategory = category => {
  return async (dispatch, getState) => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({
        type: 'CREATE_CATEGORY_ERROR',
        err: 'Permision Denied'
      });
    }
    try {
      // adding category
      const res = await Axios.post('/api/producers/', category);
      if (res.data.err) {
        return dispatch({ type: 'CREATE_CATEGORY_ERROR', err: res.data.err });
      }
      return dispatch({ type: 'CREATE_CATEGORY_SUCCESS' });
    } catch (err) {
      return dispatch({ type: 'CREATE_CATEGORY_ERROR', err: err.message });
    }
  };
};

export const deleteCategories = categories => {
  return async (dispatch, getState) => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({
        type: 'DELETE_CATEGORIES_ERROR',
        err: 'Permision Denied'
      });
    }
    try {
      let del = [];
      let err = [];

      categories.forEach(category => {
        del.push(Axios.delete(`/api/producers/${category}`));
      });

      del = await Promise.all(del);

      del.forEach(item => {
        if (item.data.err) {
          err.push(item.data.err);
        }
      });

      if (err[0]) {
        return dispatch({ type: 'DELETE_CATEGORIES_ERROR', err: err });
      }

      return dispatch({
        type: 'DELETE_CATEGORIES_SUCCESS',
        numDeleted: categories.length
      });

      dispatch(getCategoriesWithRedux());
    } catch (err) {
      return dispatch({ type: 'DELETE_CATEGORIES_ERROR', err: [err.message] });
    }
  };
};

export const closeAlertDeleted = () => {
  return dispatch => {
    return dispatch({ type: 'CLOSE_ALERT_DELETED' });
  };
};

export const editCategory = category => {
  return async dispatch => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({ type: 'EDIT_CATEGORY_ERROR', err: 'Permision Denied' });
    }
    try {
      const promiseData = await Axios.put(
        `/api/producers/${category._id}`,
        category
      );
      if (promiseData.data.err) {
        return dispatch({
          type: 'EDIT_CATEGORY_ERROR',
          err: promiseData.data.err
        });
      }
      return dispatch({ type: 'EDIT_CATEGORY_SUCCESS' });
    } catch (err) {
      return dispatch({ type: 'EDIT_CATEGORY_ERROR', err: err.message });
    }
  };
};
