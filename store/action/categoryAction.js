import Axios from "axios";

export function getCategoriesWithRedux() {
  return async dispatch => {
    dispatch({ type: "GET_REQUEST" });
    const res = await Axios("/api/producers/");
    return dispatch({ type: "GET_SUCCESS", categories: res.data });
  };
}

export const createCategory = category => {
  return async (dispatch, getState) => {
    try {
      // adding category
      const res = await Axios.post(
        "/api/producers/",
        category
      );
      if (res.data.err) {
        return dispatch({ type: "CREATE_ERROR", err: res.data.err });
      }
      return dispatch({ type: "CREATE_SUCCESS" });
    } catch (err) {
      return dispatch({ type: "CREATE_ERROR", err: err.message });
    }
  };
};

export const deleteCategories = categories => {
  return async (dispatch, getState) => {
    try {
      let del = [];
      categories.forEach(category => {
        del.push(
          Axios.delete(`/api/producers/${category}`)
        );
      });
      await Promise.all(del);
      dispatch(getCategoriesWithRedux());
      return dispatch({
        type: "DELETE_SUCCESS",
        numDeleted: categories.length
      });
    } catch (err) {
      return dispatch({ type: "DELETE_ERROR", err: err.message });
    }
  };
};

export const closeAlertDeleted = () => {
  return dispatch => {
    return dispatch({ type: "CLOSE_ALERT_DELETED" });
  };
};

export const editCategory = category => {
  return async dispatch => {
    try {
      const promiseData = await Axios.put(
        `/api/producers/${category._id}`,
        category
      );
      if (promiseData.data.err) {
        return dispatch({ type: "EDIT_ERROR", err: promiseData.data.err });
      }
      return dispatch({ type: "EDIT_SUCCESS" });
    } catch (err) {
      return dispatch({ type: "EDIT_ERROR", err: err.message });
    }
  };
};
