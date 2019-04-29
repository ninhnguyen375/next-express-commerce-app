const initialState = {
  products: [],
  categories: [],
  getError: null,
  createError: null,
  editError: null,
  deleteError: null,
  numDeleted: null
};

export default (
  state = initialState,
  { type, products, err, numDeleted, categories }
) => {
  switch (type) {
    case 'GET_PRODUCTS_REQUEST':
      return { ...state, products: products, getError: null };
    case 'GET_PRODUCTS_SUCCESS':
      return { ...state, products: products, getError: null };
    case 'GET_PRODUCTS_ERROR':
      return { ...state, getError: err };
    case 'CREATE_PRODUCT_SUCCESS':
      return { ...state, createError: null };
    case 'CREATE_PRODUCT_ERROR':
      return { ...state, createError: err };
    case 'DELETE_PRODUCTS_SUCCESS':
      return { ...state, deleteError: null, numDeleted: numDeleted };
    case 'DELETE_PRODUCTS_ERROR':
      return { ...state, deleteError: err, numDeleted: null };
    case 'CLOSE_ALERT_DELETED':
      return { ...state, numDeleted: null };
    case 'EDIT_PRODUCT_SUCCESS':
      return { ...state, editError: null };
    case 'EDIT_PRODUCT_ERROR':
      return { ...state, editError: err };
    case 'GET_PRODUCTS_AND_CATEGORIES_SUCCESS':
      return {
        ...state,
        getError: null,
        products: products,
        categories: categories
      };
    case 'GET_PRODUCTS_AND_CATEGORIES_ERROR':
      return {
        ...state,
        getError: err,
        products: products,
        categories: categories
      };
    default:
      return state;
  }
};
