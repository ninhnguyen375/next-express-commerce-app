import Axios from 'axios';
import checkAdmin from './checkAdmin';

export function getUsersWithRedux() {
  return async dispatch => {
    dispatch({ type: 'GET_REQUEST' });
    const res = await Axios('/api/users/');
    return dispatch({ type: 'GET_SUCCESS', users: res.data });
  };
}

export const createUser = user => {
  return async (dispatch, getState) => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({ type: 'CREATE_ERROR', err: 'Permision Denied' });
    }
    try {
      // adding user
      const res = await Axios.post('/api/users/', user);
      console.log(res);

      if (res.data.err)
        return dispatch({ type: 'CREATE_ERROR', err: res.data.err });

      return dispatch({ type: 'CREATE_SUCCESS' });
    } catch (err) {
      return dispatch({ type: 'CREATE_ERROR', err: err.message });
    }
  };
};

export const deleteUsers = users => {
  return async (dispatch, getState) => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({ type: 'DELETE_ERROR', err: 'Permision Denied' });
    }
    try {
      let del = [];
      users.forEach(user => {
        del.push(Axios.delete(`/api/users/${user}`));
      });
      await Promise.all(del);
      dispatch(getUsersWithRedux());
      return dispatch({ type: 'DELETE_SUCCESS', numDeleted: users.length });
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

export const editUser = user => {
  return async dispatch => {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return dispatch({ type: 'EDIT_ERROR', err: 'Permision Denied' });
    }
    try {
      const promiseData = await Axios.put(`/api/users/${user._id}`, user);
      if (promiseData.data.err) {
        return dispatch({ type: 'EDIT_ERROR', err: promiseData.data.err });
      }
      return dispatch({ type: 'EDIT_SUCCESS' });
    } catch (err) {
      return dispatch({ type: 'EDIT_ERROR', err: err.message });
    }
  };
};
