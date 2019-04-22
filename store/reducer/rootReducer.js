import productReducer from './productReducer';
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import billReducer from './billReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  bill: billReducer,
  category: categoryReducer
});

export default rootReducer;
