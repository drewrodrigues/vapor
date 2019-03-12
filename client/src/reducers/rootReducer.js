import { combineReducers } from 'redux';
import sessionsReducer from './sessionsReducer';
import entitiesReducer from './entitiesReducer';
import uiReducer from './uiReducer';

const RootReducer = combineReducers({
  session: sessionsReducer,
  entities: entitiesReducer,
  ui: uiReducer
});

export default RootReducer;