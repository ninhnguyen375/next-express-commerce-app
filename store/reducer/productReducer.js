const initialState = {
  products: [],
  categories: [],
  getError: null,
  createError: null
};

export default (
  state = initialState,
  { type, payload, products, err, numDeleted, categories }
) => {
  switch (type) {
    case "GET_REQUEST":
      return { ...state, ...payload, products: products, getError: null };
    case "GET_SUCCESS":
      return { ...state, ...payload, products: products, getError: null };
    case "GET_ERROR":
      return { ...state, ...payload, getError: err };
    case "CREATE_SUCCESS":
      return { ...state, ...payload, createError: null };
    case "CREATE_ERROR":
      return { ...state, ...payload, createError: err };
    case "DELETE_SUCCESS":
      return { ...state, ...payload, numDeleted: numDeleted };
    case "CLOSE_ALERT_DELETED":
      return { ...state, ...payload, numDeleted: null };
    case "DELETE_ERROR":
      return { ...state, ...payload, deleteError: err };
    case "EDIT_SUCCESS":
      return { ...state, ...payload, editError: null };
    case "EDIT_ERROR":
      return { ...state, ...payload, editError: err };
    case "GET_PRODUCTS_AND_CATEGORIES_SUCCESS":
      return {
        ...state,
        ...payload,
        getError: null,
        products: products,
        categories: categories
      };

    default:
      return state;
  }
};
