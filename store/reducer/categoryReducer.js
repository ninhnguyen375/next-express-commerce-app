const initialState = {
  categories: [],
  getError: null,
  createError: null,
  deleteError: []
};

export default (
  state = initialState,
  { type, payload, categories, err, numDeleted }
) => {
  switch (type) {
    case 'GET_CATEGORIES_REQUEST':
      return { ...state, ...payload, categories: categories, getError: null };
    case 'GET_CATEGORIES_SUCCESS':
      return { ...state, ...payload, categories: categories, getError: null };
    case 'GET_CATEGORIES_ERROR':
      return { ...state, ...payload, getError: err };
    case 'CREATE_CATEGORY_SUCCESS':
      return { ...state, ...payload, createError: null };
    case 'CREATE_CATEGORY_ERROR':
      return { ...state, ...payload, createError: err };
    case 'CLOSE_ALERT_DELETED':
      return { ...state, ...payload, numDeleted: null };
    case 'DELETE_CATEGORIES_SUCCESS':
      return {
        ...state,
        ...payload,
        numDeleted: numDeleted,
        deleteError: null
      };
    case 'DELETE_CATEGORIES_ERROR':
      return { ...state, ...payload, numDeleted: null, deleteError: err };
    case 'EDIT_CATEGORIY_SUCCESS':
      return { ...state, ...payload, editError: null };
    case 'EDIT_CATEGORIY_ERROR':
      return { ...state, ...payload, editError: err };

    default:
      return state;
  }
};
