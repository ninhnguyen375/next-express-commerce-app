import Axios from 'axios';
import checkAdmin from './checkAdmin';

export function getBillsWithRedux() {
  return async (dispatch, getState) => {
    dispatch({ type: 'GET_REQUEST' });
    const res = await Axios('/api/bills/');
    return dispatch({ type: 'GET_SUCCESS', bills: res.data });
  };
}

export const createBill = bill => {
  return async (dispatch, getState) => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({ type: 'CREATE_ERROR', err: 'Permision Denied' });
    }
    try {
      await Axios.post('/api/bills/', bill);
      return dispatch({ type: 'CREATE_SUCCESS' });
    } catch (err) {
      return dispatch({ type: 'CREATE_ERROR', err: err.message });
    }
  };
};

export const deleteBills = bills => {
  return async (dispatch, getState) => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({ type: 'DELETE_ERROR', err: 'Permision Denied' });
    }
    try {
      let del = [];
      bills.forEach(bill => {
        del.push(Axios.delete(`/api/bills/${bill}`));
      });
      await Promise.all(del);
      dispatch(getBillsWithRedux());
      return dispatch({ type: 'DELETE_SUCCESS', numDeleted: bills.length });
    } catch (err) {
      return dispatch({ type: 'DELETE_ERROR', err: err.message });
    }
  };
};

export const closeAlertDeleted = () => {
  return dispatch => {
    return dispatch({ type: 'CLOSE_ALERT_DELETED' });
  };
};

export const editBill = bill => {
  return async dispatch => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({ type: 'EDIT_ERROR', err: 'Permision Denied' });
    }
    try {
      const promiseData = await Axios.put(`/api/bills/${bill._id}`, bill);
      if (promiseData.data.err) {
        return dispatch({ type: 'EDIT_ERROR', err: promiseData.data.err });
      }
      return dispatch({ type: 'EDIT_SUCCESS' });
    } catch (err) {
      return dispatch({ type: 'EDIT_ERROR', err: err.message });
    }
  };
};
