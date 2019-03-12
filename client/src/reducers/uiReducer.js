import { combineReducers } from 'redux';
import backgroundFetchedReducer from './backgroundFetchedReducer';

const uiReducer = combineReducers({
  backgroundFetched: backgroundFetchedReducer
});

export default uiReducer;