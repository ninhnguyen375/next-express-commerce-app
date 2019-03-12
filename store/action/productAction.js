import Axios from "axios";

export function getProductsWithRedux() {
  return async dispatch => {
    dispatch({ type: "GET_REQUEST" });
    const res = await Axios("/api/products/");
    return dispatch({ type: "GET_SUCCESS", products: res.data });
  };
}

export const createProduct = product => {
  return async (dispatch, getState) => {
    try {
      const data = new FormData();
      data.append("product_img", product.product_img);
      // adding image to hosting
      await Axios.post("/api/products/", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      // adding product
      await Axios.post("/api/products/", product);

      return dispatch({ type: "CREATE_SUCCESS" });
    } catch (err) {
      return dispatch({ type: "CREATE_ERROR", err: err.message });
    }
  };
};

export const deleteProducts = products => {
  return async (dispatch, getState) => {
    try {
      let del = [];
      products.forEach(product => {
        del.push(Axios.delete(`/api/products/${product}`));
      });
      await Promise.all(del);
      dispatch(getProductsWithRedux());
      return dispatch({ type: "DELETE_SUCCESS", numDeleted: products.length });
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

export const editProduct = product => {
  return async dispatch => {
    try {
      if (product.product_img) {
        // adding image to hosting
        const data = new FormData();
        data.append("product_img", product.product_img);
        await Axios.post("/api/products/", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        product.product_img_path = product.product_img.name;
      } else {
        product.product_img_path = null;
      }
      // put product
      await Axios.put(`/api/products/${product._id}`, product);
      return dispatch({ type: "EDIT_SUCCESS" });
    } catch (err) {
      return dispatch({ type: "EDIT_ERRO", err });
    }
  };
};

export const getProductsAndCategories = () => {
  return async dispatch => {
    try {
      const products = await Axios("/api/products/");
      const producers = await Axios("/api/producers/");
      return dispatch({
        type: "GET_PRODUCTS_AND_CATEGORIES_SUCCESS",
        products: products.data,
        categories: producers.data
      });
    } catch (err) {
      return dispatch({
        type: "GET_PRODUCTS_AND_CATEGORIES_ERROR",
        err: err.message
      });
    }
  };
};
