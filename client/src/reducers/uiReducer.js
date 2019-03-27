import { combineReducers } from 'redux';
import backgroundReducer from './backgroundReducer';

const uiReducer = combineReducers({
  background: backgroundReducer
});

export default uiReducer;