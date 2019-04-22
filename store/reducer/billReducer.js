const initialState = {
  bills: [],
  getError: null,
  createError: null
};

export default (
  state = initialState,
  { type, payload, bills, err, numDeleted }
) => {
  switch (type) {
    case 'GET_REQUEST':
      return { ...state, ...payload, bills: bills, getError: null };
    case 'GET_SUCCESS':
      return { ...state, ...payload, bills: bills, getError: null };
    case 'GET_ERROR':
      return { ...state, ...payload, getError: err };
    case 'CREATE_SUCCESS':
      return { ...state, ...payload, createError: null };
    case 'CREATE_ERROR':
      return { ...state, ...payload, createError: err };
    case 'DELETE_SUCCESS':
      return { ...state, ...payload, numDeleted: numDeleted };
    case 'DELETE_ERROR':
      return { ...state, ...payload, deleteError: err };
    case 'CLOSE_ALERT_DELETED':
      return { ...state, ...payload, numDeleted: null };
    case 'EDIT_SUCCESS':
      return { ...state, ...payload, editError: null };
    case 'EDIT_ERROR':
      return { ...state, ...payload, editError: err };

    default:
      return state;
  }
};
