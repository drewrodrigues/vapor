import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';

const uiReducer = combineReducers({
  loading: loadingReducer
});

export default uiReducer;