const initialState = {
  bills: [],
  getError: null,
  createError: null,
  deleteError: null
};

export default (
  state = initialState,
  { type, payload, bills, err, numDeleted }
) => {
  switch (type) {
    case 'GET_BILLS_REQUEST':
      return { ...state, ...payload, bills: bills, getError: null };
    case 'GET_BILLS_SUCCESS':
      return { ...state, ...payload, bills: bills, getError: null };
    case 'GET_BILLS_ERROR':
      return { ...state, ...payload, getError: err };
    case 'CREATE_BILL_SUCCESS':
      return { ...state, ...payload, createError: null };
    case 'CREATE_BILL_ERROR':
      return { ...state, ...payload, createError: err };
    case 'DELETE_BILLS_SUCCESS':
      return {
        ...state,
        ...payload,
        numDeleted: numDeleted,
        deleteError: null
      };
    case 'DELETE_BILLS_ERROR':
      return { ...state, ...payload, deleteError: err };
    case 'CLOSE_ALERT_DELETED':
      return { ...state, ...payload, numDeleted: null };
    case 'EDIT_BILL_SUCCESS':
      return { ...state, ...payload, editError: null };
    case 'EDIT_BILL_ERROR':
      return { ...state, ...payload, editError: err };

    default:
      return state;
  }
};
