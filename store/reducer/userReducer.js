const initialState = {
  users: [],
  getError: null,
  createError: null,
  deleteError: null,
  editError: null,
  numDeleted: null
};

export default (state = initialState, { type, users, err, numDeleted }) => {
  switch (type) {
    case 'GET_USER_REQUEST':
      return { ...state, users: users, getError: null };
    case 'GET_USER_SUCCESS':
      return { ...state, users: users, getError: null };
    case 'GET_USER_ERROR':
      return { ...state, getError: err };
    case 'CREATE_USER_SUCCESS':
      return { ...state, createError: null };
    case 'CREATE_USER_ERROR':
      return { ...state, createError: err };
    case 'DELETE_USER_SUCCESS':
      return { ...state, numDeleted: numDeleted, deleteError: null };
    case 'DELETE_USER_ERROR':
      return { ...state, deleteError: err };
    case 'CLOSE_ALERT_DELETED':
      return { ...state, numDeleted: null };
    case 'EDIT_USER_SUCCESS':
      return { ...state, editError: null };
    case 'EDIT_USER_ERROR':
      return { ...state, editError: err };

    default:
      return state;
  }
};
